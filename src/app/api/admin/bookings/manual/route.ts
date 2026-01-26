export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock bookings database - In production, use Prisma
let bookings: any[] = [];

// POST - Create manual booking override
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type, // 'flight', 'hotel', 'car', 'shortlet'
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

    // Validate required parameters
    if (!type || !pnr || !price || !customerName || !customerEmail) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'type, pnr, price, customerName, and customerEmail are required',
        },
        { status: 400 }
      );
    }

    // Create manual booking record
    const booking = {
      id: `MANUAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      pnr,
      price: parseFloat(price),
      customerId: customerId || null,
      customerName,
      customerEmail,
      merchantId: merchantId || null,
      airline: airline || null,
      route: route || null,
      flightNumber: flightNumber || null,
      departureDate: departureDate || null,
      arrivalDate: arrivalDate || null,
      manualOverride: true, // Tag as manual override
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      createdBy: 'admin', // Admin user ID
    };

    // In production: await prisma.booking.create({ data: booking });
    bookings.push(booking);

    // Simulate email notification
    // In production: await sendEmail({ to: customerEmail, template: 'booking-confirmation', data: booking });

    return NextResponse.json({
      success: true,
      booking,
      message: 'Manual booking created successfully',
    });
  } catch (error: any) {
    console.error('Manual booking creation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create manual booking',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
