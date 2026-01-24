// Flight search related types
export interface FlightSearchParams {
  origin: string; // IATA code
  destination: string; // IATA code
  departureDate: string; // ISO date string (YYYY-MM-DD)
  returnDate?: string; // Optional return date for round trips
  adults?: number;
  children?: number;
  infants?: number;
}

export interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Itinerary[];
  validatingAirlineCodes: string[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft?: {
    code: string;
  };
  duration: string;
}

export interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingSummaryProps {
  flightOffer: FlightOffer | null;
  travelers: Travelers;
  destinationImage?: string;
  destinationName?: string;
  isVisible: boolean;
  isPriceVerified?: boolean;
  onClose?: () => void;
}
