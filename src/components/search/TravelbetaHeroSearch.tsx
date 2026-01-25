'use client';

import { useState } from 'react';
import { Plane, Hotel, Car, MapPin, Calendar, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type SearchTab = 'flights' | 'hotels' | 'cars';

export default function TravelbetaHeroSearch() {
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { activeTab, tripType, ...searchParams });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Tabbed Container */}
      <div className="bg-white rounded-t-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('flights')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors',
              'border-b-2 border-transparent',
              activeTab === 'flights'
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8] bg-blue-50/50'
                : 'text-slate-600 hover:text-[#1A1830] hover:bg-slate-50'
            )}
          >
            <Plane className="h-4 w-4" />
            <span className="hidden sm:inline">Flights</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors',
              'border-b-2 border-transparent',
              activeTab === 'hotels'
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8] bg-blue-50/50'
                : 'text-slate-600 hover:text-[#1A1830] hover:bg-slate-50'
            )}
          >
            <Hotel className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cars')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors',
              'border-b-2 border-transparent',
              activeTab === 'cars'
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8] bg-blue-50/50'
                : 'text-slate-600 hover:text-[#1A1830] hover:bg-slate-50'
            )}
          >
            <Car className="h-4 w-4" />
            <span className="hidden sm:inline">Cars</span>
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="p-6">
          {/* Round Trip / One Way Toggle - Only for Flights */}
          {activeTab === 'flights' && (
            <div className="mb-6 bg-[#1A1830] rounded-xl p-1 flex gap-1">
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={cn(
                  'flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all',
                  tripType === 'round'
                    ? 'bg-white text-[#1A1830] shadow-sm'
                    : 'text-white/70 hover:text-white'
                )}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={cn(
                  'flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all',
                  tripType === 'oneway'
                    ? 'bg-white text-[#1A1830] shadow-sm'
                    : 'text-white/70 hover:text-white'
                )}
              >
                One Way
              </button>
            </div>
          )}

          {/* Desktop Layout - Single Row */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-4">
            {/* From */}
            <div className="col-span-3">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* To */}
            <div className="col-span-3">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* Departure */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Departure
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  value={searchParams.departure}
                  onChange={(e) => handleInputChange('departure', e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* Return - Only show for round trip */}
            {tripType === 'round' && (
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Return
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    value={searchParams.return}
                    onChange={(e) => handleInputChange('return', e.target.value)}
                    min={searchParams.departure || today}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className={cn('col-span-2 flex items-end')}>
              <button
                type="submit"
                className="w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Cars'}
              </button>
            </div>
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="md:hidden space-y-4">
            {/* From */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Departure */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Departure
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    value={searchParams.departure}
                    onChange={(e) => handleInputChange('departure', e.target.value)}
                    min={today}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Return - Only show for round trip */}
              {tripType === 'round' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Return
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      value={searchParams.return}
                      onChange={(e) => handleInputChange('return', e.target.value)}
                      min={searchParams.departure || today}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passengers - Only for flights */}
            {activeTab === 'flights' && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="number"
                    value={searchParams.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    min="1"
                    placeholder="1"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Cars'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
