// @ts-nocheck
import Amadeus from 'amadeus';

// Use 'any' to bypass the namespace type error
let amadeus: any = null;

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
    } catch (error) {
      // If initialization fails, export empty object
      amadeus = {};
    }
  } else {
    // Export empty object if env vars are missing
    amadeus = {};
  }
}

export { amadeus };

// Backward compatibility: Export function for existing code
export function getAmadeusClient(): any {
  return amadeus || {};
}
