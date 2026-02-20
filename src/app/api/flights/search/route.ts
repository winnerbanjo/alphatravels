export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusClient } from '@/src/lib/amadeus';
import { success, error } from '@/src/lib/api-response';

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

    if (!origin || !destination || !departureDate) {
      return error('Origin, destination, and departureDate are required', 400);
    }
    if (!/^[A-Z]{3}$/i.test(origin) || !/^[A-Z]{3}$/i.test(destination)) {
      return error('Origin and destination must be valid 3-letter IATA codes', 400);
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
      return error('Date must be in YYYY-MM-DD format', 400);
    }

    const amadeus = getAmadeusClient();
    if (!amadeus) {
      return error('Flight search is temporarily unavailable. Please try again later.', 503);
    }

    const params: Record<string, string | number> = {
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate,
      adults: parseInt(adults, 10),
      children: parseInt(children, 10),
      infants: parseInt(infants, 10),
      currencyCode: 'USD',
      max: 10,
    };
    if (returnDate && dateRegex.test(returnDate)) params.returnDate = returnDate;

    const response = await amadeus.shopping.flightOffersSearch.get(params as Parameters<typeof amadeus.shopping.flightOffersSearch.get>[0]);
    return success({
      data: response.data,
      meta: response.result?.meta,
    });
  } catch (err) {
    console.error('Amadeus API Error:', err);
    const msg = err && typeof err === 'object' && 'response' in err
      ? (err as { response?: { data?: { errors?: Array<{ detail?: string }> }; status?: number } }).response?.data?.errors?.[0]?.detail
      : null;
    return error(msg || (err instanceof Error ? err.message : 'An unexpected error occurred'), 500);
  }
}
