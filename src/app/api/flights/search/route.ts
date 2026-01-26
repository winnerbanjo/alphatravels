export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    const infants = searchParams.get('infants') || '0';

    // Validate required parameters
    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'Origin, destination, and departureDate are required',
        },
        { status: 400 }
      );
    }

    // Validate IATA codes (3 letters)
    if (!/^[A-Z]{3}$/i.test(origin) || !/^[A-Z]{3}$/i.test(destination)) {
      return NextResponse.json(
        {
          error: 'Invalid IATA code',
          message: 'Origin and destination must be valid 3-letter IATA codes',
        },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
      return NextResponse.json(
        {
          error: 'Invalid date format',
          message: 'Date must be in YYYY-MM-DD format',
        },
        { status: 400 }
      );
    }

    const amadeus = getAmadeusClient();
    
    // Handle missing Amadeus client (build-time safety)
    if (!amadeus) {
      return NextResponse.json(
        {
          success: false,
          error: 'Amadeus API not configured',
          message: 'Flight search is temporarily unavailable. Please try again later.',
        },
        { status: 503 }
      );
    }

    // Build request parameters
    const params: any = {
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate: departureDate,
      adults: parseInt(adults, 10),
      children: parseInt(children, 10),
      infants: parseInt(infants, 10),
      currencyCode: 'USD',
      max: 10, // Limit results to 10 offers
    };

    // Add return date if provided
    if (returnDate && dateRegex.test(returnDate)) {
      params.returnDate = returnDate;
    }

    // Call Amadeus API
    const response = await amadeus.shopping.flightOffersSearch.get(params);

    return NextResponse.json({
      success: true,
      data: response.data,
      meta: response.result?.meta,
    });
  } catch (error: any) {
    console.error('Amadeus API Error:', error);

    // Handle Amadeus API errors
    if (error.response) {
      return NextResponse.json(
        {
          error: 'Amadeus API Error',
          message: error.response.data?.errors?.[0]?.detail || error.message,
        },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
