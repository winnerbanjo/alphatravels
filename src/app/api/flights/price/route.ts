export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';
import { success, error } from '@/src/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightOffer } = body;

    if (!flightOffer) {
      return error('flightOffer is required', 400);
    }

    const amadeus = getAmadeusClient();
    if (!amadeus) {
      return success({
        data: { type: 'flight-offers-pricing', flightOffers: [flightOffer] },
        meta: { mock: true, message: 'Price confirmed (using original offer - API not configured)' },
      });
    }

    try {
      const response = await amadeus.shopping.flightOffersPricing.post(
        JSON.stringify({
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOffer],
          },
        })
      );
      return success({
        data: response.data,
        meta: response.result?.meta,
      });
    } catch (apiErr) {
      console.warn('Amadeus pricing API failed, returning original offer:', apiErr);
      return success({
        data: { type: 'flight-offers-pricing', flightOffers: [flightOffer] },
        meta: { mock: true, message: 'Price confirmed (using original offer)' },
      });
    }
  } catch (err) {
    console.error('Amadeus Pricing API Error:', err);
    return error(err instanceof Error ? err.message : 'An unexpected error occurred', 500);
  }
}
