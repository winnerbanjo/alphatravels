'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Search, Building2, Plus, Minus, ChevronDown, Clock, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import FlightResultCard from './FlightResultCard';
import BookingProgress from '../booking/BookingProgress';
import PassengerForm from '../booking/PassengerForm';
import BookingSummary from '../booking/BookingSummary';

type SearchTab = 'flights' | 'hotels' | 'cars';
type BookingStep = 'search' | 'select' | 'checkout' | 'confirm';

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

export interface BentoSearchRef {
  triggerQuickSearch: (destination: string, airportCode: string, image: string) => void;
}

const BentoSearch = forwardRef<BentoSearchRef>((props, ref) => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [isPricing, setIsPricing] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [flightResults, setFlightResults] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [confirmedPrice, setConfirmedPrice] = useState<FlightOffer | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>('search');
  const [pnr, setPnr] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [flightData, setFlightData] = useState({
    origin: 'LOS', // Default: Lagos
    destination: 'DXB', // Default: Dubai
    departureDate: '2026-03-15', // Sandbox date
    class: 'economy',
  });
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showTravelersPopover, setShowTravelersPopover] = useState(false);
  const travelersPopoverRef = useRef<HTMLDivElement>(null);
  const [destinationImage, setDestinationImage] = useState<string>('');
  const [destinationName, setDestinationName] = useState<string>('');
  const [isPriceVerified, setIsPriceVerified] = useState(false);
  const [hotelData, setHotelData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
  });
  const [carData, setCarData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'flights') {
      // Validate required fields
      if (!flightData.origin || !flightData.destination) {
        return;
      }

      // Force valid date for Sandbox (2026-03-15 if empty or past)
      const SANDBOX_DATE = '2026-03-15';
      const today = new Date().toISOString().split('T')[0];
      const departureDate = flightData.departureDate && flightData.departureDate >= today 
        ? flightData.departureDate 
        : SANDBOX_DATE;
      
      // Redirect to flights page with search parameters
      const params = new URLSearchParams({
        origin: flightData.origin.toUpperCase(),
        destination: flightData.destination.toUpperCase(),
        departureDate: departureDate,
        adults: travelers.adults.toString(),
        children: travelers.children.toString(),
        infants: travelers.infants.toString(),
      });
      
      router.push(`/flights?${params.toString()}`);
    } else if (activeTab === 'hotels') {
      const params = new URLSearchParams({
        destination: hotelData.destination,
        checkIn: hotelData.checkIn,
        checkOut: hotelData.checkOut,
        guests: hotelData.guests,
      });
      router.push(`/hotels?${params.toString()}`);
    } else if (activeTab === 'cars') {
      const params = new URLSearchParams({
        pickup: carData.pickup,
        dropoff: carData.dropoff,
        date: carData.date,
        time: carData.time,
      });
      router.push(`/cars?${params.toString()}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        travelersPopoverRef.current &&
        !travelersPopoverRef.current.contains(event.target as Node)
      ) {
        setShowTravelersPopover(false);
      }
    };

    if (showTravelersPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTravelersPopover]);

  const updateTraveler = (type: 'adults' | 'children' | 'infants', delta: number) => {
    setTravelers((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      // Ensure at least 1 adult if there are children or infants
      if (type === 'adults' && newValue === 0 && (prev.children > 0 || prev.infants > 0)) {
        return prev;
      }
      return { ...prev, [type]: newValue };
    });
  };

  const getTotalTravelers = () => {
    return travelers.adults + travelers.children + travelers.infants;
  };

  const getTravelersLabel = () => {
    const total = getTotalTravelers();
    if (total === 1) return '1 Traveler';
    return `${total} Travelers`;
  };

  // Fallback flight data - Cached demo flights for home page
  const getFallbackFlightData = (origin: string, destination: string): FlightOffer[] => {
    // Use fixed date 2026-03-15 for Sandbox compatibility
    const baseDate = new Date('2026-03-15T08:00:00Z');
    
    return [
      {
        id: 'fallback-emirates-los-dxb',
        price: {
          total: '300.00', // USD equivalent of ₦450,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: origin || 'LOS',
                  at: baseDate.toISOString(),
                },
                arrival: {
                  iataCode: destination || 'DXB',
                  at: new Date(baseDate.getTime() + 6.5 * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'EK',
                duration: 'PT6H30M',
              },
            ],
            duration: 'PT6H30M',
          },
        ],
        numberOfBookableSeats: 9,
        validatingAirlineCodes: ['EK'],
      },
      {
        id: 'fallback-ba-los-dxb',
        price: {
          total: '453.33', // USD equivalent of ₦680,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: origin || 'LOS',
                  at: new Date(baseDate.getTime() + 3 * 60 * 60 * 1000).toISOString(),
                },
                arrival: {
                  iataCode: destination || 'DXB',
                  at: new Date(baseDate.getTime() + 9.75 * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'BA',
                duration: 'PT6H45M',
              },
            ],
            duration: 'PT6H45M',
          },
        ],
        numberOfBookableSeats: 7,
        validatingAirlineCodes: ['BA'],
      },
      {
        id: 'fallback-qatar-los-dxb',
        price: {
          total: '320.00', // USD equivalent of ₦480,000 at ~1500 rate
          currency: 'USD',
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: origin || 'LOS',
                  at: new Date(baseDate.getTime() + 6 * 60 * 60 * 1000).toISOString(),
                },
                arrival: {
                  iataCode: destination || 'DXB',
                  at: new Date(baseDate.getTime() + 12.5 * 60 * 60 * 1000).toISOString(),
                },
                carrierCode: 'QR',
                duration: 'PT6H30M',
              },
            ],
            duration: 'PT6H30M',
          },
        ],
        numberOfBookableSeats: 5,
        validatingAirlineCodes: ['QR'],
      },
    ];
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    triggerQuickSearch: async (destination: string, airportCode: string, image: string) => {
      // Set default origin to Lagos (LOS) if not set
      const origin = flightData.origin || 'LOS';
      
      // Use fixed Sandbox date for best compatibility
      const SANDBOX_DATE = '2026-03-15';
      const formattedDate = SANDBOX_DATE;
      
      // Update state
      setDestinationImage(image);
      setDestinationName(destination);
      setFlightData(prev => ({
        ...prev,
        origin: prev.origin || 'LOS',
        destination: airportCode,
        departureDate: prev.departureDate || formattedDate,
      }));

      // Trigger search after state updates
      setTimeout(async () => {
        setIsSearching(true);
        setFlightResults([]);
        setBookingStep('search');
        
        try {
          const params = new URLSearchParams({
            origin: origin.toUpperCase(),
            destination: airportCode.toUpperCase(),
            departureDate: formattedDate,
            adults: travelers.adults.toString(),
            children: travelers.children.toString(),
            infants: travelers.infants.toString(),
          });

          const response = await fetch(`/api/flights/search?${params.toString()}`);
          const data = await response.json();
          
          if (response.ok && data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const offersWithIds = data.data.map((offer: any, index: number) => ({
              ...offer,
              id: offer.id || `flight-${index}-${Date.now()}`,
            }));
            setFlightResults(offersWithIds);
            setBookingStep('select');
          } else {
            // Fallback: Show cached demo data if API returns no results
            const fallbackOffers = getFallbackFlightData(origin, airportCode);
            setFlightResults(fallbackOffers);
            setBookingStep('select');
          }
        } catch (error) {
          // Fallback: Show cached demo data on error
          const fallbackOffers = getFallbackFlightData(origin, airportCode);
          setFlightResults(fallbackOffers);
          setBookingStep('select');
        } finally {
          setIsSearching(false);
        }
      }, 100);
    },
  }));

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['flights', 'hotels', 'cars'] as SearchTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300',
              activeTab === tab
                ? 'bg-[#1A1830] text-white shadow-lg'
                : 'bg-white text-[#1A1830] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-[2.5rem] px-4 py-8 md:p-12 relative shadow-2xl">
        {/* Shimmer Loading Overlay */}
        {isSearching && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md border border-white/20 rounded-[2.5rem] z-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3B82F6] animate-spin"></div>
              </div>
              <p className="text-[#1A1830] font-medium animate-pulse">
                Searching the globe...
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSearch}>
          {/* Flights Tab */}
          <div
            className={cn(
              'transition-all duration-500 ease-in-out',
              activeTab === 'flights'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 absolute pointer-events-none -translate-y-4'
            )}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={flightData.origin}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        origin: e.target.value.toUpperCase().slice(0, 3),
                      })
                    }
                    placeholder="LOS"
                    maxLength={3}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={flightData.destination}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        destination: e.target.value.toUpperCase().slice(0, 3),
                      })
                    }
                    placeholder="DXB"
                    maxLength={3}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Departure
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={flightData.departureDate}
                    onChange={(e) =>
                      setFlightData({ ...flightData, departureDate: e.target.value })
                    }
                    min={today}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Travelers
                </label>
                <div className="relative" ref={travelersPopoverRef}>
                  <button
                    type="button"
                    onClick={() => setShowTravelersPopover(!showTravelersPopover)}
                    className="w-full h-12 md:h-14 flex items-center justify-between pl-4 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium hover:border-[#3B82F6] transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#1A1830]/40" />
                      <span>{getTravelersLabel()}</span>
                    </div>
                    <ChevronDown className={cn(
                      'h-4 w-4 text-[#1A1830]/40 transition-transform',
                      showTravelersPopover && 'rotate-180'
                    )} />
                  </button>

                  {/* Travelers Popover */}
                  {showTravelersPopover && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-white/10 shadow-xl z-50 p-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-semibold text-[#1A1830]">Adults</p>
                          <p className="text-xs text-slate-500">12+ years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateTraveler('adults', -1)}
                            disabled={travelers.adults <= 1}
                            className={cn(
                              'w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center',
                              'hover:border-[#1A1830] transition-colors',
                              'disabled:opacity-30 disabled:cursor-not-allowed'
                            )}
                          >
                            <Minus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#1A1830]">
                            {travelers.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateTraveler('adults', 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#1A1830] transition-colors"
                          >
                            <Plus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-semibold text-[#1A1830]">Children</p>
                          <p className="text-xs text-slate-500">2-12 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateTraveler('children', -1)}
                            disabled={travelers.children <= 0}
                            className={cn(
                              'w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center',
                              'hover:border-[#1A1830] transition-colors',
                              'disabled:opacity-30 disabled:cursor-not-allowed'
                            )}
                          >
                            <Minus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#1A1830]">
                            {travelers.children}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateTraveler('children', 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#1A1830] transition-colors"
                          >
                            <Plus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-semibold text-[#1A1830]">Infants</p>
                          <p className="text-xs text-slate-500">Under 2 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateTraveler('infants', -1)}
                            disabled={travelers.infants <= 0}
                            className={cn(
                              'w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center',
                              'hover:border-[#1A1830] transition-colors',
                              'disabled:opacity-30 disabled:cursor-not-allowed'
                            )}
                          >
                            <Minus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#1A1830]">
                            {travelers.infants}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateTraveler('infants', 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#1A1830] transition-colors"
                          >
                            <Plus className="h-4 w-4 text-[#1A1830]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hotels Tab */}
          <div
            className={cn(
              'transition-all duration-500 ease-in-out',
              activeTab === 'hotels'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 absolute pointer-events-none -translate-y-4'
            )}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Destination
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={hotelData.destination}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, destination: e.target.value })
                    }
                    placeholder="City or Hotel"
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelData.checkIn}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, checkIn: e.target.value })
                    }
                    min={today}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelData.checkOut}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, checkOut: e.target.value })
                    }
                    min={hotelData.checkIn || today}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="number"
                    value={hotelData.guests}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, guests: e.target.value })
                    }
                    min="1"
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cars Tab */}
          <div
            className={cn(
              'transition-all duration-500 ease-in-out',
              activeTab === 'cars'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 absolute pointer-events-none -translate-y-4'
            )}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={carData.pickup}
                    onChange={(e) =>
                      setCarData({ ...carData, pickup: e.target.value })
                    }
                    placeholder="City or Airport"
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Drop-off Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={carData.dropoff}
                    onChange={(e) =>
                      setCarData({ ...carData, dropoff: e.target.value })
                    }
                    placeholder="Same or Different"
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={carData.date}
                    onChange={(e) =>
                      setCarData({ ...carData, date: e.target.value })
                    }
                    min={today}
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="time"
                    value={carData.time}
                    onChange={(e) =>
                      setCarData({ ...carData, time: e.target.value })
                    }
                    required
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSearching}
              className={cn(
                'inline-flex items-center gap-2',
                'px-10 py-4 bg-[#3B82F6] text-white',
                'text-sm font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-[#2563EB] hover:shadow-xl',
                'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2',
                'transform hover:scale-[1.02] active:scale-[0.98]',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              )}
            >
              <Search className="h-5 w-5" />
              Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>

          {/* Recent Searches - Only show for flights tab */}
          {activeTab === 'flights' && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1830]/60 uppercase tracking-wider">
                <History className="h-3.5 w-3.5" />
                <span>Recent Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFlightData({
                      ...flightData,
                      origin: 'LOS',
                      destination: 'DXB',
                      departureDate: '2026-03-15',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1A1830]/70 bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] transition-all duration-200"
                >
                  <span>LOS → DXB</span>
                  <span className="text-[#1A1830]/50">(Mar 15)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFlightData({
                      ...flightData,
                      origin: 'LOS',
                      destination: 'LHR',
                      departureDate: '2026-02-22',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1A1830]/70 bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] transition-all duration-200"
                >
                  <span>LOS → LHR</span>
                  <span className="text-[#1A1830]/50">(Feb 22)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFlightData({
                      ...flightData,
                      origin: 'LOS',
                      destination: 'JFK',
                      departureDate: '2026-04-10',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1A1830]/70 bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] transition-all duration-200"
                >
                  <span>LOS → JFK</span>
                  <span className="text-[#1A1830]/50">(Apr 10)</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Flight Results Section */}
      {activeTab === 'flights' && (
        <div className="mt-12">
          {isSearching && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
                >
                  <div className="h-20 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-12 bg-slate-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isSearching && flightResults.length > 0 && bookingStep === 'select' && (
            <div className={cn(
              'space-y-4 relative',
              selectedFlight && 'pr-0 lg:pr-96'
            )}>
              {/* Booking Summary Sidebar */}
              {selectedFlight && confirmedPrice && (
                <BookingSummary
                  flightOffer={confirmedPrice}
                  travelers={travelers}
                  destinationImage={destinationImage}
                  destinationName={destinationName}
                  isVisible={!!selectedFlight}
                  isPriceVerified={isPriceVerified}
                />
              )}

              <BookingProgress currentStep={bookingStep} />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-bold text-[#1A1830]">
                  Found {flightResults.length} Flight{flightResults.length !== 1 ? 's' : ''}
                </h3>
                {selectedFlight && (
                  <button
                    onClick={() => {
                      setBookingStep('checkout');
                    }}
                    className="px-6 py-3 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg whitespace-nowrap"
                  >
                    Proceed to Passenger Details
                  </button>
                )}
              </div>
              {flightResults.map((offer) => (
                <FlightResultCard
                  key={offer.id}
                  offer={offer}
                  onSelect={async () => {
                    setSelectedFlight(offer);
                    setIsPricing(true);
                    setBookingStep('select'); // Keep on select step to show summary

                    try {
                      // Step 2: Confirm Price
                      const priceResponse = await fetch('/api/flights/price', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ flightOffer: offer }),
                      });

                      const priceData = await priceResponse.json();
                      if (priceData.success) {
                        setConfirmedPrice(priceData.data.flightOffers?.[0] || offer);
                        setIsPriceVerified(true);
                      } else {
                        setConfirmedPrice(offer);
                        setIsPriceVerified(false);
                      }
                    } catch (error) {
                      setConfirmedPrice(offer);
                      setIsPriceVerified(false);
                    } finally {
                      setIsPricing(false);
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Default Fallback Flights - Show when no results yet */}
          {!isSearching && flightResults.length === 0 && bookingStep === 'search' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1A1830] mb-6">
                Popular Routes from Lagos
              </h3>
              {getFallbackFlightData(flightData.origin || 'LOS', flightData.destination || 'DXB').map((offer) => (
                <FlightResultCard
                  key={offer.id}
                  offer={offer}
                  onSelect={async () => {
                    setSelectedFlight(offer);
                    setIsPricing(true);
                    setBookingStep('select');

                    try {
                      const priceResponse = await fetch('/api/flights/price', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ flightOffer: offer }),
                      });

                      const priceData = await priceResponse.json();
                      if (priceData.success) {
                        setConfirmedPrice(priceData.data.flightOffers?.[0] || offer);
                        setIsPriceVerified(true);
                      } else {
                        setConfirmedPrice(offer);
                        setIsPriceVerified(false);
                      }
                    } catch (error) {
                      setConfirmedPrice(offer);
                      setIsPriceVerified(false);
                    } finally {
                      setIsPricing(false);
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Checkout Step - Passenger Form */}
          {bookingStep === 'checkout' && confirmedPrice && (
            <div className="space-y-6">
              <BookingProgress currentStep={bookingStep} />
              
              {isPricing && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-slate-200 border-t-[#1A1830] rounded-full animate-spin mx-auto"></div>
                      <p className="text-[#1A1830] font-medium">Confirming price...</p>
                    </div>
                  </div>
                </div>
              )}

              {!isPricing && (
                <>
                  {/* Selected Flight Summary */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#1A1830] mb-4">Selected Flight</h3>
                    <FlightResultCard
                      offer={confirmedPrice}
                      onSelect={() => {}}
                    />
                  </div>

                  {/* Passenger Form */}
                  <PassengerForm
                    passengerCount={travelers.adults + travelers.children}
                    onSubmit={async (passengers, contacts) => {
                      // Route to checkout page with flight details
                      const price = confirmedPrice.price.total;
                      const destination = confirmedPrice.itineraries[0]?.segments[0]?.arrival.iataCode || destinationName || 'Flight';
                      const origin = confirmedPrice.itineraries[0]?.segments[0]?.departure.iataCode || 'LOS';
                      
                      // Store passenger and contact data in sessionStorage for checkout
                      sessionStorage.setItem('bookingPassengers', JSON.stringify(passengers));
                      sessionStorage.setItem('bookingContacts', JSON.stringify(contacts));
                      sessionStorage.setItem('bookingFlightOffer', JSON.stringify(confirmedPrice));
                      
                      // Redirect to checkout
                      router.push(`/checkout?type=flight&name=${encodeURIComponent(`${origin} to ${destination}`)}&price=${price}&currency=${confirmedPrice.price.currency}`);
                    }}
                    onCancel={() => {
                      setBookingStep('select');
                      setSelectedFlight(null);
                      setConfirmedPrice(null);
                    }}
                  />
                </>
              )}
            </div>
          )}

          {/* Confirmation Step */}
          {bookingStep === 'confirm' && (
            <div className="space-y-6">
              <BookingProgress currentStep={bookingStep} />
              
              {isBooking && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-slate-200 border-t-[#1A1830] rounded-full animate-spin mx-auto"></div>
                      <p className="text-[#1A1830] font-medium">Creating your booking...</p>
                    </div>
                  </div>
                </div>
              )}

              {!isBooking && pnr && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[#1A1830] mb-4">Booking Confirmed!</h3>
                  <p className="text-slate-600 mb-2">Your PNR: <span className="font-bold text-[#1A1830]">{pnr}</span></p>
                  <p className="text-sm text-slate-500 mb-8">A confirmation email has been sent to your registered email address.</p>
                  <button
                    onClick={() => {
                      setBookingStep('search');
                      setFlightResults([]);
                      setSelectedFlight(null);
                      setConfirmedPrice(null);
                      setPnr(null);
                    }}
                    className="px-8 py-3 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors"
                  >
                    Book Another Flight
                  </button>
                </div>
              )}
            </div>
          )}

          {!isSearching && flightResults.length === 0 && bookingStep === 'search' && flightData.origin && flightData.destination && (
            <div className="text-center py-12">
              <p className="text-slate-500">No results yet. Search for flights to see offers.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

BentoSearch.displayName = 'BentoSearch';

export default BentoSearch;
