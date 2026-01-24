'use client';

import { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { FlightSearchParams } from '@/src/types';
import { cn } from '@/src/lib/utils';

export default function HeroSearch() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    origin: '',
    destination: '',
    departureDate: '',
  });

  const handleInputChange = (
    field: keyof FlightSearchParams,
    value: string
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Flight Search Intent:', {
      origin: searchParams.origin.toUpperCase(),
      destination: searchParams.destination.toUpperCase(),
      departureDate: searchParams.departureDate,
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#1A1830] tracking-tight leading-none">
            Premium Travel for the Global Nigerian.
          </h1>
          <p className="text-xl sm:text-2xl text-[#1A1830]/60 max-w-3xl mx-auto font-light">
            Experience the world with unmatched elegance and convenience.
          </p>
        </div>

        {/* Bento-style Search Card - Elevated */}
        <div className="relative">
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Origin Input */}
                <div className="relative group">
                  <label
                    htmlFor="origin"
                    className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider"
                  >
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="origin"
                      value={searchParams.origin}
                      onChange={(e) =>
                        handleInputChange(
                          'origin',
                          e.target.value.toUpperCase().slice(0, 3)
                        )
                      }
                      placeholder="JFK"
                      maxLength={3}
                      required
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl',
                        'bg-white/50 border border-[#E2E8F0]',
                        'text-slate-900 placeholder-slate-400',
                        'text-sm font-medium',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent',
                        'focus:bg-white hover:border-slate-300'
                      )}
                    />
                  </div>
                </div>

                {/* Destination Input */}
                <div className="relative group">
                  <label
                    htmlFor="destination"
                    className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider"
                  >
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="destination"
                      value={searchParams.destination}
                      onChange={(e) =>
                        handleInputChange(
                          'destination',
                          e.target.value.toUpperCase().slice(0, 3)
                        )
                      }
                      placeholder="LAX"
                      maxLength={3}
                      required
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl',
                        'bg-white/50 border border-[#E2E8F0]',
                        'text-slate-900 placeholder-slate-400',
                        'text-sm font-medium',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent',
                        'focus:bg-white hover:border-slate-300'
                      )}
                    />
                  </div>
                </div>

                {/* Departure Date Input */}
                <div className="relative group">
                  <label
                    htmlFor="departureDate"
                    className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider"
                  >
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      id="departureDate"
                      value={searchParams.departureDate}
                      onChange={(e) =>
                        handleInputChange('departureDate', e.target.value)
                      }
                      min={today}
                      required
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl',
                        'bg-white/50 border border-[#E2E8F0]',
                        'text-slate-900 text-sm font-medium',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent',
                        'focus:bg-white hover:border-slate-300',
                        '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer'
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-8 py-3.5 bg-[#1D4ED8] text-white',
                    'text-sm font-semibold rounded-xl',
                    'shadow-sm transition-all duration-200',
                    'hover:bg-[#1E40AF] hover:shadow-md',
                    'focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2',
                    'transform hover:scale-[1.02] active:scale-[0.98]'
                  )}
                >
                  <Search className="h-4 w-4" />
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
