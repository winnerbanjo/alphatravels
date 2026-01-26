// @ts-nocheck
import Amadeus from 'amadeus';

// Use 'any' to bypass the namespace type error
let amadeus: any = null;

if (typeof window === 'undefined') {
  amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
  });
}

export { amadeus };

// Backward compatibility: Export function for existing code
export function getAmadeusClient(): any {
  return amadeus;
}
