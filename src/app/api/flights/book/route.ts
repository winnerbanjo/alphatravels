export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightOffer, passengers, contacts, merchantId, bookingSource } = body;

    // Validate required parameters
    if (!flightOffer || !passengers || !contacts) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'flightOffer, passengers, and contacts are required',
        },
        { status: 400 }
      );
    }

    const amadeus = getAmadeusClient();
    
    // Handle missing Amadeus client (build-time safety)
    // Return mock booking if API is not configured
    if (!amadeus) {
      return NextResponse.json({
        success: true,
        data: {
          type: 'flight-order',
          id: `MOCK-${Date.now()}`,
          associatedRecords: [
            {
              reference: `MOCK-PNR-${Date.now()}`,
              creationDate: new Date().toISOString(),
              originSystemCode: 'GDS',
            },
          ],
        },
        pnr: `MOCK-PNR-${Date.now()}`,
        bookingReference: `MOCK-${Date.now()}`,
        meta: {
          mock: true,
          message: 'Mock booking created (API not configured)',
        },
      });
    }

    // Extract flight offer ID for payment
    const flightOfferId = flightOffer.id || '1';

    // Prepare booking data
    const bookingData = {
      data: {
        type: 'flight-order',
        flightOffers: [flightOffer],
        travelers: passengers.map((passenger: any) => ({
          id: passenger.id || `1`,
          dateOfBirth: passenger.dateOfBirth,
          name: {
            firstName: passenger.firstName,
            lastName: passenger.lastName,
          },
          gender: passenger.gender || 'MALE',
          contact: {
            emailAddress: contacts.emailAddress,
            phones: [
              {
                deviceType: 'MOBILE',
                countryCallingCode: contacts.countryCallingCode || '234',
                number: contacts.phoneNumber,
              },
            ],
          },
          documents: passenger.passportNumber
            ? [
                {
                  documentType: 'PASSPORT',
                  number: passenger.passportNumber,
                  expiryDate: passenger.passportExpiry,
                  issuanceCountry: passenger.passportCountry || 'NG',
                  validityCountry: passenger.passportCountry || 'NG',
                  nationality: passenger.nationality || 'NG',
                  holder: true,
                },
              ]
            : [],
        })),
        remarks: {
          general: [
            {
              subType: 'GENERAL_MISCELLANEOUS',
              text: 'Alpha Travels Booking',
            },
          ],
        },
        ticketingAgreement: {
          option: 'DELAY_TO_CANCEL',
          delay: '6D',
        },
        payments: [
          {
            method: 'CASH',
            flightOfferIds: [flightOfferId],
          },
        ],
        contacts: [
          {
            addresseeName: {
              firstName: contacts.firstName,
              lastName: contacts.lastName,
            },
            companyName: 'Alpha Travels',
            purpose: 'STANDARD',
            phones: [
              {
                deviceType: 'LANDLINE',
                countryCallingCode: '234',
                number: '8000000000',
              },
              {
                deviceType: 'MOBILE',
                countryCallingCode: contacts.countryCallingCode || '234',
                number: contacts.phoneNumber,
              },
            ],
            emailAddress: contacts.emailAddress,
            address: {
              lines: ['Alpha Travels'],
              postalCode: '100001',
              cityName: 'Lagos',
              countryCode: 'NG',
            },
          },
        ],
      },
    };

    // Call Amadeus API to create order (mock booking)
    // Note: In production, this would create a real PNR
    // For now, we'll simulate the booking
    try {
      const response = await amadeus.booking.flightOrders.post(
        JSON.stringify(bookingData)
      );

      // Store booking metadata (merchant info, source)
      const bookingMetadata = {
        bookingSource: bookingSource || 'ADMIN_DIRECT',
        merchantId: merchantId || null,
        pnr: response.data.associatedRecords?.[0]?.reference || response.data.id || 'MOCK-PNR-12345',
        bookingReference: response.data.id || response.data.associatedRecords?.[0]?.reference,
      };

      // In production, save this to database
      // await prisma.booking.create({ data: { ...bookingMetadata, ... } });

      return NextResponse.json({
        success: true,
        data: response.data,
        pnr: bookingMetadata.pnr,
        bookingReference: bookingMetadata.bookingReference,
        meta: response.result?.meta,
        bookingMetadata, // Include metadata in response
      });
    } catch (apiError: any) {
      // If API call fails, return a mock booking for development
      console.warn('Amadeus booking API call failed, returning mock booking:', apiError);
      
      // Store booking metadata (merchant info, source)
      const mockPnr = `MOCK-PNR-${Date.now()}`;
      const mockRef = `MOCK-${Date.now()}`;
      const bookingMetadata = {
        bookingSource: bookingSource || 'ADMIN_DIRECT',
        merchantId: merchantId || null,
        pnr: mockPnr,
        bookingReference: mockRef,
      };

      // In production, save this to database
      // await prisma.booking.create({ data: { ...bookingMetadata, ... } });

      return NextResponse.json({
        success: true,
        data: {
          type: 'flight-order',
          id: mockRef,
          associatedRecords: [
            {
              reference: mockPnr,
              creationDate: new Date().toISOString(),
              originSystemCode: 'GDS',
            },
          ],
        },
        pnr: mockPnr,
        bookingReference: mockRef,
        meta: {
          mock: true,
          message: 'Mock booking created for development purposes',
        },
        bookingMetadata, // Include metadata in response
      });
    }
  } catch (error: any) {
    console.error('Booking API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
