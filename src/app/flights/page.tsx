'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plane, MapPin, Calendar, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import FlightResultCard from '@/src/components/search/FlightResultCard';
import BookingSummary from '@/src/components/booking/BookingSummary';

interface TrendingFlight {
  id: string;
  destination: string;
  destinationCode: string;
  price: string;
  duration: string;
  airline: string;
  image: string;
}

const trendingFlights: TrendingFlight[] = [
  {
    id: '1',
    destination: 'Dubai',
    destinationCode: 'DXB',
    price: '₦450,000',
    duration: '6h 30m',
    airline: 'Emirates',
    image: 'dubai',
  },
  {
    id: '2',
    destination: 'London',
    destinationCode: 'LHR',
    price: '₦680,000',
    duration: '6h 45m',
    airline: 'British Airways',
    image: 'london',
  },
  {
    id: '3',
    destination: 'New York',
    destinationCode: 'JFK',
    price: '₦850,000',
    duration: '11h 20m',
    airline: 'Delta',
    image: 'newyork',
  },
  {
    id: '4',
    destination: 'Paris',
    destinationCode: 'CDG',
    price: '₦720,000',
    duration: '6h 15m',
    airline: 'Air France',
    image: 'paris',
  },
  {
    id: '5',
    destination: 'Istanbul',
    destinationCode: 'IST',
    price: '₦380,000',
    duration: '5h 50m',
    airline: 'Turkish Airlines',
    image: 'istanbul',
  },
  {
    id: '6',
    destination: 'Doha',
    destinationCode: 'DOH',
    price: '₦420,000',
    duration: '6h 10m',
    airline: 'Qatar Airways',
    image: 'doha',
  },
];

interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      duration: string;
    }>;
    duration: string;
  }>;
  numberOfBookableSeats?: number;
  validatingAirlineCodes?: string[];
}

function FlightsPageContent() {
  const urlSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState({
    origin: urlSearchParams.get('origin') || 'LOS',
    destination: urlSearchParams.get('destination') || '',
    departureDate: '',
    returnDate: '',
  });
  const [flightResults, setFlightResults] = useState<FlightOffer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  // Fixed date for Amadeus Sandbox compatibility
  const SANDBOX_DATE = '2026-03-15';
  
  // Helper to ensure date is valid for Sandbox
  const getValidDepartureDate = (date: string | null | undefined): string => {
    if (!date) return SANDBOX_DATE;
    const dateObj = new Date(date);
    const todayObj = new Date();
    // If date is in the past or empty, use Sandbox date
    if (dateObj < todayObj || date === '') {
      return SANDBOX_DATE;
    }
    return date;
  };

  const handleSearch = async (origin: string, destination: string, departureDate: string, returnDate: string) => {
    if (!origin || !destination) {
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Force valid date for Sandbox
    const validDate = getValidDepartureDate(departureDate);

    try {
      const params = new URLSearchParams({
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate: validDate,
        adults: '1',
      });

      if (returnDate) {
        params.append('returnDate', returnDate);
      }

      const response = await fetch(`/api/flights/search?${params.toString()}`);
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        // Transform Amadeus response to match our FlightOffer interface
        const offers = data.data.map((offer: any, index: number) => ({
          id: offer.id || `offer-${index}`,
          price: offer.price,
          itineraries: offer.itineraries,
          numberOfBookableSeats: offer.numberOfBookableSeats,
          validatingAirlineCodes: offer.validatingAirlineCodes,
        }));
        setFlightResults(offers);
      } else {
        // Fallback: Show cached demo data if API returns no results
        setFlightResults(getFallbackFlightData(origin, destination));
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback: Show cached demo data on error
      setFlightResults(getFallbackFlightData(origin, destination));
    } finally {
      setIsSearching(false);
    }
  };

  // Fallback flight data - Cached demo flights (always show these if API fails)
  // Always shows 3 demo flights: Emirates, British Airways, Virgin Atlantic
  const getFallbackFlightData = (origin: string, destination: string): FlightOffer[] => {
    // Use fixed date 2026-03-15 for Sandbox compatibility
    const baseDate = new Date('2026-03-15T08:00:00Z');
    const originCode = origin.toUpperCase() || 'LOS';
    const destCode = destination.toUpperCase() || 'DXB';
    
    // Calculate flight duration based on route (rough estimates)
    const getDuration = (origin: string, destination: string): number => {
      // Default to 6.5 hours for most routes
      if (destination === 'DXB') return 6.5;
      if (destination === 'LHR' || destination === 'LON') return 6.75;
      if (destination === 'JFK' || destination === 'NYC') return 11;
      if (destination === 'NBO') return 5;
      return 6.5;
    };
    
    const durationHours = getDuration(originCode, destCode);
    
    return [
      {
        id: `cached-emirates-${originCode.toLowerCase()}-${destCode.toLowerCase()}`,
        price: {
          total: '300.00', // USD equivalent of ₦450,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: originCode,
                  at: baseDate.toISOString(),
                },
                arrival: {
                  iataCode: destCode,
                  at: new Date(baseDate.getTime() + durationHours * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'EK',
                duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
              },
            ],
            duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
          },
        ],
        numberOfBookableSeats: 9,
        validatingAirlineCodes: ['EK'],
      },
      {
        id: `cached-ba-${originCode.toLowerCase()}-${destCode.toLowerCase()}`,
        price: {
          total: '453.33', // USD equivalent of ₦680,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: originCode,
                  at: new Date(baseDate.getTime() + 3 * 60 * 60 * 1000).toISOString(),
                },
                arrival: {
                  iataCode: destCode,
                  at: new Date(baseDate.getTime() + (durationHours + 3) * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'BA',
                duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
              },
            ],
            duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
          },
        ],
        numberOfBookableSeats: 7,
        validatingAirlineCodes: ['BA'],
      },
      {
        id: `cached-virgin-${originCode.toLowerCase()}-${destCode.toLowerCase()}`,
        price: {
          total: '473.33', // USD equivalent of ₦710,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: originCode,
                  at: new Date(baseDate.getTime() + 6 * 60 * 60 * 1000).toISOString(),
                },
                arrival: {
                  iataCode: destCode,
                  at: new Date(baseDate.getTime() + (durationHours + 6) * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'VS',
                duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
              },
            ],
            duration: `PT${Math.floor(durationHours)}H${Math.floor((durationHours % 1) * 60)}M`,
          },
        ],
        numberOfBookableSeats: 5,
        validatingAirlineCodes: ['VS'],
      },
    ];
  };

  const onSearchClick = () => {
    // Always default origin to LOS (Lagos) for Nigerian Tech Authority brand
    const origin = searchParams.origin || 'LOS';
    // Use valid date (will default to 2026-03-15 if empty or past)
    const departureDate = getValidDepartureDate(searchParams.departureDate);
    handleSearch(
      origin,
      searchParams.destination,
      departureDate,
      searchParams.returnDate
    );
  };

  // Auto-populate and search when destination is in URL
  useEffect(() => {
    const destination = urlSearchParams.get('destination');
    const origin = urlSearchParams.get('origin') || 'LOS';
    const departureDateParam = urlSearchParams.get('departureDate');
    
    if (destination && !hasSearched) {
      // Use date from URL or default to Sandbox date
      const searchDate = departureDateParam || SANDBOX_DATE;
      setSearchParams({
        origin: origin,
        destination: destination,
        departureDate: searchDate,
        returnDate: '',
      });
      // Trigger search automatically
      handleSearch(origin, destination, searchDate, '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearchParams]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Discover Your Next Journey
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Fly to over 200 destinations worldwide with premium airlines
            </p>
          </motion.div>

          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.origin || 'LOS'}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        origin: e.target.value.toUpperCase().slice(0, 3) || 'LOS',
                      })
                    }
                    placeholder="LOS"
                    maxLength={3}
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value.toUpperCase().slice(0, 3),
                      })
                    }
                    placeholder="Anywhere"
                    maxLength={3}
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Departure
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={searchParams.departureDate || SANDBOX_DATE}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        departureDate: e.target.value,
                      })
                    }
                    min={today}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Return
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={searchParams.returnDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        returnDate: e.target.value,
                      })
                    }
                    min={searchParams.departureDate || today}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={onSearchClick}
              disabled={isSearching || !searchParams.destination}
              className={cn(
                'mt-6 w-full py-4 bg-[#3B82F6] text-white',
                'text-sm font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-[#2563EB] hover:shadow-xl',
                'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2',
                'transform hover:scale-[1.02] active:scale-[0.98]',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                'flex items-center justify-center gap-2'
              )}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Flights'
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trending from Lagos */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <TrendingUp className="h-6 w-6 text-[#3B82F6]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830]">
              Trending from Lagos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingFlights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={cn(
                  'group relative bg-white rounded-2xl border border-[#E2E8F0]',
                  'p-6 shadow-sm hover:shadow-xl transition-all duration-300',
                  'cursor-pointer overflow-hidden'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1830]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Plane className="h-5 w-5 text-[#3B82F6]" />
                        <span className="text-sm font-semibold text-[#1A1830]">
                          {flight.airline}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1830] mb-1">
                        {flight.destination}
                      </h3>
                      <p className="text-sm text-[#1A1830]/60">
                        {flight.destinationCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#1A1830]">
                        {flight.price}
                      </p>
                      <p className="text-xs text-[#1A1830]/60 mt-1">
                        {flight.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                    <span className="text-xs text-[#1A1830]/60">
                      LOS → {flight.destinationCode}
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#3B82F6] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {hasSearched && (
        <section className="py-20 px-4 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl">
            {isSearching ? (
              <div className="text-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-[#3B82F6] mx-auto mb-4" />
                <p className="text-[#1A1830] font-medium">Searching for flights...</p>
              </div>
            ) : flightResults.length > 0 ? (
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-8">
                  Available Flights ({flightResults.length})
                </h2>
                <div className="space-y-4">
                  {flightResults.map((offer, index) => (
                    <FlightResultCard
                      key={offer.id || `flight-${index}`}
                      offer={offer}
                      onSelect={() => {
                        setSelectedFlight(offer);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Never show "No flights found" - always show fallback data
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-8">
                  Available Flights (3)
                </h2>
                <div className="space-y-4">
                  {getFallbackFlightData(searchParams.origin || 'LOS', searchParams.destination || 'LHR').map((offer, index) => (
                    <FlightResultCard
                      key={offer.id || `fallback-${index}`}
                      offer={offer}
                      onSelect={() => {
                        setSelectedFlight(offer);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Booking Summary Sidebar */}
      {selectedFlight && (
        <BookingSummary 
          flightOffer={selectedFlight}
          travelers={{ adults: 1, children: 0, infants: 0 }}
          isVisible={true}
          onClose={() => setSelectedFlight(null)} 
        />
      )}
    </motion.div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
      </div>
    }>
      <FlightsPageContent />
    </Suspense>
  );
}
