export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Booking } from '@/src/models/Booking';
import { success, error } from '@/src/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      airline,
      pnr,
      price,
      customerId,
      customerName,
      customerEmail,
      merchantId,
      route,
      flightNumber,
      departureDate,
      arrivalDate,
    } = body;

    if (!type || !pnr || !price || !customerName || !customerEmail) {
      return error('type, pnr, price, customerName, and customerEmail are required', 400);
    }

    await connectDb();
    const booking = await Booking.create({
      pnr,
      airline: airline || undefined,
      passengers: [{ firstName: customerName.split(' ')[0] || customerName, lastName: customerName.split(' ').slice(1).join(' ') || '' }],
      totalFare: parseFloat(String(price)),
      bookingStatus: 'confirmed',
      merchantId: merchantId ?? null,
      metadata: {
        manualOverride: true,
        customerId: customerId || null,
        customerEmail,
        route: route || null,
        flightNumber: flightNumber || null,
        departureDate: departureDate || null,
        arrivalDate: arrivalDate || null,
        createdBy: 'admin',
      },
    });

    const doc = booking.toObject();
    return success({
      booking: { ...doc, id: doc._id.toString() },
      message: 'Manual booking created successfully',
    });
  } catch (err) {
    console.error('Manual booking creation error:', err);
    return error(err instanceof Error ? err.message : 'Manual booking failed', 500);
  }
}
