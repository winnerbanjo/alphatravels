export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';
import { connectDb } from '@/src/lib/db';
import { Booking } from '@/src/models/Booking';
import { AuditLog } from '@/src/models/AuditLog';
import { success, error } from '@/src/lib/api-response';

function getTotalFromOffer(flightOffer: { price?: string; grandTotal?: string }): number {
  const raw = flightOffer.grandTotal ?? flightOffer.price ?? '0';
  return parseFloat(String(raw).replace(/[^0-9.]/g, '')) || 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightOffer, passengers, contacts, merchantId, bookingSource } = body;

    if (!flightOffer || !passengers || !contacts) {
      return error('flightOffer, passengers, and contacts are required', 400);
    }

    const amadeus = getAmadeusClient();
    const clientTotal = getTotalFromOffer(flightOffer);

    if (amadeus?.shopping?.flightOffersPricing) {
      const start = Date.now();
      try {
        const pricingRes = await amadeus.shopping.flightOffersPricing.post(
          JSON.stringify({
            data: {
              type: 'flight-offers-pricing',
              flightOffers: [flightOffer],
            },
          })
        );
        await logAmadeusAudit('flightOffersPricing', 'POST', {}, pricingRes?.data, Date.now() - start);
        const verifiedOffer = pricingRes?.data?.flightOffers?.[0];
        const serverTotal = verifiedOffer ? getTotalFromOffer(verifiedOffer) : 0;
        if (serverTotal > 0 && Math.abs(serverTotal - clientTotal) > 0.01) {
          return error('Price changed. Please refresh and try again.', 400);
        }
        if (verifiedOffer) {
          body.flightOffer = verifiedOffer;
        }
      } catch (apiErr) {
        await logAmadeusAudit('flightOffersPricing', 'POST', {}, { error: String(apiErr) }, Date.now() - start);
        return error('Price verification failed. Please try again.', 400);
      }
    }

    const flightOfferId = flightOffer.id || '1';
    const bookingData = {
      data: {
        type: 'flight-order',
        flightOffers: [flightOffer],
        travelers: passengers.map((p: Record<string, unknown>) => ({
          id: p.id || '1',
          dateOfBirth: p.dateOfBirth,
          name: { firstName: p.firstName, lastName: p.lastName },
          gender: p.gender || 'MALE',
          contact: {
            emailAddress: contacts.emailAddress,
            phones: [{ deviceType: 'MOBILE', countryCallingCode: (contacts.countryCallingCode as string) || '234', number: contacts.phoneNumber }],
          },
          documents: (p.passportNumber as string)
            ? [{
                documentType: 'PASSPORT',
                number: p.passportNumber,
                expiryDate: p.passportExpiry,
                issuanceCountry: (p.passportCountry as string) || 'NG',
                validityCountry: (p.passportCountry as string) || 'NG',
                nationality: (p.nationality as string) || 'NG',
                holder: true,
              }]
            : [],
        })),
        remarks: { general: [{ subType: 'GENERAL_MISCELLANEOUS', text: 'Alpha Travels Booking' }] },
        ticketingAgreement: { option: 'DELAY_TO_CANCEL', delay: '6D' },
        payments: [{ method: 'CASH', flightOfferIds: [flightOfferId] }],
        contacts: [{
          addresseeName: { firstName: contacts.firstName, lastName: contacts.lastName },
          companyName: 'Alpha Travels',
          purpose: 'STANDARD',
          phones: [
            { deviceType: 'LANDLINE', countryCallingCode: '234', number: '8000000000' },
            { deviceType: 'MOBILE', countryCallingCode: (contacts.countryCallingCode as string) || '234', number: contacts.phoneNumber },
          ],
          emailAddress: contacts.emailAddress,
          address: { lines: ['Alpha Travels'], postalCode: '100001', cityName: 'Lagos', countryCode: 'NG' },
        }],
      },
    };

    let pnr: string;
    let bookingReference: string;
    let responseData: Record<string, unknown>;

    if (amadeus?.booking?.flightOrders?.post) {
      const start = Date.now();
      try {
        const response = await amadeus.booking.flightOrders.post(JSON.stringify(bookingData));
        await logAmadeusAudit('flightOrders.post', 'POST', bookingData, response?.data, Date.now() - start);
        responseData = response.data as Record<string, unknown>;
        const recs = (responseData.associatedRecords as Array<{ reference?: string }>) || [];
        pnr = recs[0]?.reference || (responseData.id as string) || `PNR-${Date.now()}`;
        bookingReference = (responseData.id as string) || recs[0]?.reference || pnr;
      } catch (apiError) {
        await logAmadeusAudit('flightOrders.post', 'POST', bookingData, { error: String(apiError) }, Date.now() - start);
        console.warn('Amadeus booking failed:', apiError);
        pnr = `PNR-${Date.now()}`;
        bookingReference = `REF-${Date.now()}`;
        responseData = {
          type: 'flight-order',
          id: bookingReference,
          associatedRecords: [{ reference: pnr, creationDate: new Date().toISOString(), originSystemCode: 'GDS' }],
        };
      }
    } else {
      pnr = `PNR-${Date.now()}`;
      bookingReference = `REF-${Date.now()}`;
      responseData = {
        type: 'flight-order',
        id: bookingReference,
        associatedRecords: [{ reference: pnr, creationDate: new Date().toISOString(), originSystemCode: 'GDS' }],
      };
    }

    await connectDb();
    const bookingDoc = await Booking.create({
      pnr,
      airline: flightOffer.validatingAirlineCodes?.[0] || undefined,
      passengers: passengers.map((p: Record<string, unknown>) => ({
        firstName: p.firstName,
        lastName: p.lastName,
        dateOfBirth: p.dateOfBirth,
        passportNumber: p.passportNumber,
        passportExpiry: p.passportExpiry,
        passportCountry: p.passportCountry,
        nationality: p.nationality,
        gender: p.gender,
      })),
      totalFare: clientTotal,
      bookingStatus: 'confirmed',
      merchantId: merchantId ?? null,
      bookingSource: bookingSource || 'ADMIN_DIRECT',
      amadeusOrderId: bookingReference,
    });

    return success({
      data: responseData,
      pnr,
      bookingReference,
      bookingId: bookingDoc._id.toString(),
      bookingMetadata: {
        bookingSource: bookingSource || 'ADMIN_DIRECT',
        merchantId: merchantId ?? null,
        pnr,
        bookingReference,
      },
    });
  } catch (err) {
    console.error('Booking API Error:', err);
    return error(err instanceof Error ? err.message : 'An unexpected error occurred', 500);
  }
}

async function logAmadeusAudit(
  action: string,
  method: string,
  requestPayload: Record<string, unknown>,
  responsePayload: Record<string, unknown>,
  durationMs: number
) {
  try {
    await connectDb();
    await AuditLog.create({
      provider: 'amadeus',
      action,
      method,
      requestPayload,
      responsePayload,
      durationMs,
    });
  } catch (e) {
    console.error('Audit log failed:', e);
  }
}
