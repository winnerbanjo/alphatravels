import Amadeus from 'amadeus';

// Initialize Amadeus SDK
let amadeus: Amadeus | null = null;

export function getAmadeusClient(): Amadeus {
  if (!amadeus) {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
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
