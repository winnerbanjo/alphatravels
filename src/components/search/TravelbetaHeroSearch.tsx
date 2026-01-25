'use client';

import { useState } from 'react';
import { MapPin, Calendar, Users, ArrowUpDown, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function TravelbetaHeroSearch() {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [passengers, setPassengers] = useState('1');
  const [cabinClass, setCabinClass] = useState('Economy');
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
  });

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
    console.log('Search:', { tripType, passengers, cabinClass, ...searchParams });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Navy Blue Search Container */}
      <div className="bg-[#000080] rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Row - Toggles */}
        <div className="px-6 pt-6 pb-4 flex flex-wrap items-center gap-4 text-white">
          {/* Round Trip Toggle */}
          <div className="flex items-center gap-2">
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
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm placeholder-slate-400"
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
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm placeholder-slate-400"
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
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm"
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
                      className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm"
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
                <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm placeholder-slate-400"
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
                  className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm placeholder-slate-400"
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
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm"
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
                      className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passenger/Class Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Passengers */}
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full pl-6 pr-2 py-2 bg-white text-black border-none outline-none text-sm appearance-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              {/* Class */}
              <div className="bg-white rounded-sm p-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Class
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full pl-2 pr-2 py-2 bg-white text-black border-none outline-none text-sm appearance-none"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
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
