import Amadeus from 'amadeus';
import type { AmadeusClient } from 'amadeus';

let amadeus: AmadeusClient | null = null;

if (typeof window === 'undefined') {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;
  
  // Export empty object if env vars are missing to prevent server crash
  if (clientId && clientSecret) {
    try {
      amadeus = new Amadeus({
        clientId,
        clientSecret
      });
    } catch {
      amadeus = null;
    }
  } else {
    amadeus = null;
  }
}

export { amadeus };

// Backward compatibility: Export function for existing code
export function getAmadeusClient(): AmadeusClient | null {
  return amadeus;
}
