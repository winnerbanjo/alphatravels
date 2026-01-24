'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plane, MapPin, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

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

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState({
    origin: 'LOS',
    destination: '',
    departureDate: '',
    returnDate: '',
  });

  const today = new Date().toISOString().split('T')[0];

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
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.origin}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        origin: e.target.value.toUpperCase().slice(0, 3),
                      })
                    }
                    placeholder="LOS"
                    maxLength={3}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
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
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
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
                    value={searchParams.departureDate}
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
              className={cn(
                'mt-6 w-full py-4 bg-[#3B82F6] text-white',
                'text-sm font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-[#2563EB] hover:shadow-xl',
                'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2',
                'transform hover:scale-[1.02] active:scale-[0.98]'
              )}
            >
              Search Flights
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
    </motion.div>
  );
}
