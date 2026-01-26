// @ts-nocheck
import Amadeus from 'amadeus';

// Use 'any' to bypass the namespace type error
let amadeus: any = null;

export function getAmadeusClient(): any {
  // Return null during build if keys are missing (prevents build crashes)
  if (typeof window === 'undefined' && !process.env.AMADEUS_CLIENT_ID) {
    return null;
  }

  if (!amadeus) {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      // In production, return null instead of throwing to prevent build crashes
      if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') {
        return null;
      }
      throw new Error(
        'Amadeus credentials are missing. Please set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables.'
      );
    }

    amadeus = new Amadeus({
      clientId,
      clientSecret,
      hostname: 'production', // Use 'test' for sandbox environment
    });
  }

  return amadeus;
}
