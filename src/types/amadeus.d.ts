declare module 'amadeus' {
  export interface AmadeusConfig {
    clientId: string;
    clientSecret: string;
  }

  interface FlightOfferPricingRequest {
    data: {
      type: 'flight-offers-pricing';
      flightOffers: unknown[];
    };
  }

  interface FlightOrderRequest {
    data: {
      type: 'flight-order';
      flightOffers: unknown[];
      travelers: unknown[];
      remarks?: unknown;
      ticketingAgreement?: unknown;
      payments?: unknown[];
      contacts?: unknown[];
    };
  }

  interface FlightOffersSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    currencyCode?: string;
    max?: number;
  }

  interface ApiResponse<T> {
    data: T;
    result?: { meta?: unknown };
  }

  interface AmadeusShopping {
    flightOffersSearch: { get: (params: FlightOffersSearchParams) => Promise<ApiResponse<unknown>> };
    flightOffersPricing: { post: (body: string) => Promise<ApiResponse<{ flightOffers?: unknown[] }>> };
  }

  interface AmadeusBooking {
    flightOrders: { post: (body: string) => Promise<ApiResponse<{ id?: string; associatedRecords?: Array<{ reference?: string }> }>> };
  }

  export interface AmadeusClient {
    shopping: AmadeusShopping;
    booking: AmadeusBooking;
  }

  export default class Amadeus {
    constructor(config: AmadeusConfig);
    shopping: AmadeusShopping;
    booking: AmadeusBooking;
  }
}
