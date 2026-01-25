'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ArrowUpDown, ChevronRight, Plane } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function TravelbetaHeroSearch() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'round' | 'oneway' | 'multicity'>('round');
  const [passengers, setPassengers] = useState('1');
  const [cabinClass, setCabinClass] = useState('Economy');
  
  // Default values pre-populated
  const [searchParams, setSearchParams] = useState({
    from: 'Lagos (LOS)',
    to: 'Dubai (DXB)',
    departure: '2026-03-15',
    return: '2026-03-22',
  });

  // Extract IATA code from input (e.g., "Lagos (LOS)" -> "LOS")
  const extractIATACode = (input: string): string => {
    const match = input.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : input.toUpperCase().slice(0, 3);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSwap = () => {
    setSearchParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract IATA codes
    const origin = extractIATACode(searchParams.from);
    const destination = extractIATACode(searchParams.to);
    
    // Validate required fields
    if (!origin || !destination || !searchParams.departure) {
      return;
    }

    // Build search params
    const params = new URLSearchParams({
      origin: origin,
      destination: destination,
      departureDate: searchParams.departure,
      adults: passengers,
    });

    // Add return date for round trip
    if (tripType === 'round' && searchParams.return) {
      params.append('returnDate', searchParams.return);
    }

    // Navigate to flights page with search parameters
    router.push(`/flights?${params.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
      {/* Navy Blue Search Container */}
      <div className="bg-[#000080] rounded-2xl shadow-2xl overflow-hidden w-[92%] md:w-full mx-auto">
        {/* Top Row - Toggles */}
        <div className="px-6 pt-6 pb-4 flex flex-wrap items-center gap-4 text-white">
          {/* Round Trip Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTripType('round')}
              className={cn(
                'px-4 py-2 rounded-sm text-sm font-medium transition-all',
                tripType === 'round'
                  ? 'bg-white text-[#000080]'
                  : 'bg-transparent text-white hover:bg-white/10'
              )}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('oneway')}
              className={cn(
                'px-4 py-2 rounded-sm text-sm font-medium transition-all',
                tripType === 'oneway'
                  ? 'bg-white text-[#000080]'
                  : 'bg-transparent text-white hover:bg-white/10'
              )}
            >
              One Way
            </button>
          </div>

          {/* Mobile Toggles - Round Trip, One Way, Multi-city */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTripType('round')}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-medium transition-all',
                tripType === 'round'
                  ? 'bg-white text-[#000080]'
                  : 'bg-transparent text-white'
              )}
            >
              ROUND TRIP
            </button>
            <button
              type="button"
              onClick={() => setTripType('oneway')}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-medium transition-all',
                tripType === 'oneway'
                  ? 'bg-white text-[#000080]'
                  : 'bg-transparent text-white'
              )}
            >
              ONE WAY
            </button>
            <button
              type="button"
              onClick={() => setTripType('multicity')}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-medium transition-all',
                tripType === 'multicity'
                  ? 'bg-white text-[#000080]'
                  : 'bg-transparent text-white'
              )}
            >
              MULTI-CITY
            </button>
          </div>

          {/* Passenger Count */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer"
            >
              <option value="1" className="bg-[#000080] text-white">1 Passenger</option>
              <option value="2" className="bg-[#000080] text-white">2 Passengers</option>
              <option value="3" className="bg-[#000080] text-white">3 Passengers</option>
              <option value="4" className="bg-[#000080] text-white">4 Passengers</option>
            </select>
          </div>

          {/* Cabin Class */}
          <div className="flex items-center gap-2">
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer"
            >
              <option value="Economy" className="bg-[#000080] text-white">Economy</option>
              <option value="Business" className="bg-[#000080] text-white">Business</option>
              <option value="First" className="bg-[#000080] text-white">First</option>
            </select>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="px-6 pb-6">
          {/* Desktop Layout - Grid with 4 inputs + button */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-4">
            {/* From */}
            <div className="col-span-3">
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchParams.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    placeholder="Enter City"
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* To */}
            <div className="col-span-3">
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchParams.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    placeholder="Enter City"
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Departure Date */}
            <div className="col-span-2">
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={searchParams.departure}
                    onChange={(e) => handleInputChange('departure', e.target.value)}
                    min={today}
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base"
                  />
                </div>
              </div>
            </div>

            {/* Return Date - Only for round trip */}
            {tripType === 'round' && (
              <div className="col-span-2">
                <div className="bg-white rounded-sm p-4">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={searchParams.return}
                      onChange={(e) => handleInputChange('return', e.target.value)}
                      min={searchParams.departure || today}
                      className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className={cn('col-span-2 flex items-end', tripType === 'oneway' && 'col-span-2')}>
              <button
                type="submit"
                className="w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-white font-bold py-4 px-6 rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Search Flights <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="md:hidden space-y-4">
            {/* From */}
            <div className="bg-white rounded-sm p-4">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base font-semibold placeholder-slate-400"
                />
              </div>
            </div>

            {/* Swap Icon - Centered */}
            <div className="flex justify-center -my-2">
              <button
                type="button"
                onClick={handleSwap}
                className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                aria-label="Swap From and To"
              >
                <ArrowUpDown className="h-5 w-5 text-[#000080]" />
              </button>
            </div>

            {/* To */}
            <div className="bg-white rounded-sm p-4">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base font-semibold placeholder-slate-400"
                />
              </div>
            </div>

            {/* Date Row - 50/50 Split */}
            <div className="grid grid-cols-2 gap-4">
              {/* Departure */}
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Departure
                </label>
                <div className="relative">
                  <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={searchParams.departure}
                    onChange={(e) => handleInputChange('departure', e.target.value)}
                    min={today}
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base font-semibold"
                  />
                </div>
              </div>

              {/* Return - Only for round trip */}
              {tripType === 'round' && (
                <div className="bg-white rounded-sm p-4">
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Return
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={searchParams.return}
                      onChange={(e) => handleInputChange('return', e.target.value)}
                      min={searchParams.departure || today}
                      className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-base font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passenger/Class Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Passengers */}
              <div className="bg-white rounded-sm p-4">
                <div className="relative">
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full pl-2 pr-8 py-2 bg-white text-black border-none outline-none text-base font-semibold appearance-none"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Class */}
              <div className="bg-white rounded-sm p-4">
                <div className="relative">
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                    className="w-full pl-2 pr-8 py-2 bg-white text-black border-none outline-none text-base font-semibold appearance-none"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width Orange Search Button */}
            <button
              type="submit"
              className="w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-white font-bold py-4 px-6 rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Search Flights <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
