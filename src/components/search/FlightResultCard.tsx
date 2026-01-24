'use client';

import { Plane, Clock, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FlightSegment {
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
}

interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: FlightSegment[];
    duration: string;
  }>;
  numberOfBookableSeats?: number;
  validatingAirlineCodes?: string[];
}

interface FlightResultCardProps {
  offer: FlightOffer;
  onSelect?: () => void;
}

export default function FlightResultCard({ offer, onSelect }: FlightResultCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDuration = (duration: string) => {
    // Duration format: PT6H30M
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const outbound = offer.itineraries[0];
  const returnFlight = offer.itineraries[1];
  const firstSegment = outbound?.segments[0];
  const lastSegment = outbound?.segments[outbound.segments.length - 1];
  const stops = outbound?.segments.length - 1 || 0;

  const price = parseFloat(offer.price.total);
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 1500); // Convert USD to NGN (approximate)

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200',
        'shadow-sm hover:shadow-lg transition-all duration-300',
        'overflow-hidden group'
      )}
    >
      {/* Boarding Pass Style Header */}
      <div className="bg-gradient-to-r from-[#1A1830] to-[#2A2540] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Airline Logo Placeholder */}
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">
                {firstSegment?.carrierCode || 'Airline'}
              </p>
              <p className="text-white text-sm font-semibold">
                {offer.validatingAirlineCodes?.[0] || 'Flight'}
              </p>
            </div>
          </div>
          {offer.numberOfBookableSeats && (
            <div className="text-right">
              <p className="text-white/60 text-xs">Seats Available</p>
              <p className="text-white text-sm font-semibold">{offer.numberOfBookableSeats}</p>
            </div>
          )}
        </div>
      </div>

      {/* Flight Details */}
      <div className="p-6">
        {/* Outbound Flight */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#1A1830]">
                    {formatTime(firstSegment?.departure.at || '')}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {firstSegment?.departure.iataCode || 'N/A'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatDate(firstSegment?.departure.at || '')}
                  </p>
                </div>

                <div className="flex-1 px-4">
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="flex-1 h-0.5 bg-slate-300"></div>
                      <div className="mx-2">
                        <Plane className="h-4 w-4 text-slate-400 rotate-90" />
                      </div>
                      <div className="flex-1 h-0.5 bg-slate-300"></div>
                    </div>
                    <div className="flex items-center justify-center mt-2 gap-2">
                      <Clock className="h-3 w-3 text-slate-500" />
                      <span className="text-xs text-slate-600">
                        {calculateDuration(outbound?.duration || '')}
                      </span>
                      {stops > 0 && (
                        <span className="text-xs text-slate-500">
                          • {stops} {stops === 1 ? 'stop' : 'stops'}
                        </span>
                      )}
                      {stops === 0 && (
                        <span className="text-xs text-green-600 font-medium">Direct</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1A1830]">
                    {formatTime(lastSegment?.arrival.at || '')}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {lastSegment?.arrival.iataCode || 'N/A'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatDate(lastSegment?.arrival.at || '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Flight (if exists) */}
        {returnFlight && (
          <div className="mb-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
              Return Flight
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-lg font-bold text-[#1A1830]">
                    {formatTime(returnFlight.segments[0]?.departure.at || '')}
                  </p>
                  <p className="text-xs text-slate-600">
                    {returnFlight.segments[0]?.departure.iataCode || 'N/A'}
                  </p>
                </div>
                <div className="flex-1 px-4">
                  <div className="flex items-center">
                    <div className="flex-1 h-0.5 bg-slate-300"></div>
                    <Plane className="h-3 w-3 text-slate-400 rotate-90 mx-2" />
                    <div className="flex-1 h-0.5 bg-slate-300"></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#1A1830]">
                    {formatTime(returnFlight.segments[returnFlight.segments.length - 1]?.arrival.at || '')}
                  </p>
                  <p className="text-xs text-slate-600">
                    {returnFlight.segments[returnFlight.segments.length - 1]?.arrival.iataCode || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Price</p>
            <p className="text-3xl font-bold text-[#1A1830]">
              {formattedPrice}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {offer.price.currency} {offer.price.total} per person
            </p>
          </div>
          <button
            onClick={onSelect}
            className={cn(
              'px-8 py-3 bg-[#1A1830] text-white',
              'text-sm font-semibold rounded-xl',
              'transition-all duration-200',
              'hover:bg-[#1A1830]/90 shadow-sm',
              'transform hover:scale-105 active:scale-95'
            )}
          >
            Select Flight
          </button>
        </div>
      </div>
    </div>
  );
}
