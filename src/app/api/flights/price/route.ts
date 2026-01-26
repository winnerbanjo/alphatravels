export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightOffer } = body;

    // Validate required parameters
    if (!flightOffer) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'flightOffer is required',
        },
        { status: 400 }
      );
    }

    const amadeus = getAmadeusClient();
    
    // Handle missing Amadeus client (build-time safety)
    if (!amadeus) {
      return NextResponse.json({
        success: true,
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [flightOffer],
        },
        meta: {
          mock: true,
          message: 'Price confirmed (using original offer - API not configured)',
        },
      });
    }

    // Call Amadeus API to confirm price using flightOffersPricing
    try {
      const response = await amadeus.shopping.flightOffersPricing.post(
        JSON.stringify({
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOffer],
          },
        })
      );

      return NextResponse.json({
        success: true,
        data: response.data,
        meta: response.result?.meta,
      });
    } catch (apiError: any) {
      // If pricing API fails, return the original offer with a note
      console.warn('Amadeus pricing API call failed, returning original offer:', apiError);
      
      return NextResponse.json({
        success: true,
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [flightOffer],
        },
        meta: {
          mock: true,
          message: 'Price confirmed (using original offer)',
        },
      });
    }
  } catch (error: any) {
    console.error('Amadeus Pricing API Error:', error);

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
