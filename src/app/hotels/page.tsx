'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Building2, MapPin, Calendar, Users, Star, Wifi, Car, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LuxuryHotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
}

const luxuryHotels: LuxuryHotel[] = [
  {
    id: '1',
    name: 'The Ritz-Carlton',
    location: 'Dubai, UAE',
    price: '₦85,000',
    rating: 5,
    image: 'ritz',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    description: 'Luxury waterfront resort with stunning views',
  },
  {
    id: '2',
    name: 'Four Seasons',
    location: 'London, UK',
    price: '₦120,000',
    rating: 5,
    image: 'fourseasons',
    amenities: ['WiFi', 'Gym', 'Spa', 'Restaurant'],
    description: 'Elegant sophistication in the heart of Mayfair',
  },
  {
    id: '3',
    name: 'Burj Al Arab',
    location: 'Dubai, UAE',
    price: '₦150,000',
    rating: 5,
    image: 'burj',
    amenities: ['WiFi', 'Pool', 'Spa', 'Butler'],
    description: 'The world\'s most luxurious hotel',
  },
  {
    id: '4',
    name: 'The Savoy',
    location: 'London, UK',
    price: '₦95,000',
    rating: 5,
    image: 'savoy',
    amenities: ['WiFi', 'Restaurant', 'Spa', 'Concierge'],
    description: 'Iconic luxury on the Thames',
  },
  {
    id: '5',
    name: 'Mandarin Oriental',
    location: 'New York, USA',
    price: '₦110,000',
    rating: 5,
    image: 'mandarin',
    amenities: ['WiFi', 'Gym', 'Spa', 'Restaurant'],
    description: 'Modern luxury in Manhattan',
  },
  {
    id: '6',
    name: 'Emirates Palace',
    location: 'Abu Dhabi, UAE',
    price: '₦130,000',
    rating: 5,
    image: 'emirates',
    amenities: ['WiFi', 'Pool', 'Beach', 'Restaurant'],
    description: 'Palatial luxury by the Arabian Gulf',
  },
];

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
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
              Premium Stays
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Experience world-class hospitality at the finest hotels
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
                  Destination
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value,
                      })
                    }
                    placeholder="City or Hotel"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={searchParams.checkIn}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        checkIn: e.target.value,
                      })
                    }
                    min={today}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={searchParams.checkOut}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        checkOut: e.target.value,
                      })
                    }
                    min={searchParams.checkIn || today}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="number"
                    value={searchParams.guests}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        guests: e.target.value,
                      })
                    }
                    min="1"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
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
              Search Hotels
            </button>
          </motion.div>
        </div>
      </section>

      {/* Luxury Collection */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-4">
              Luxury Collection
            </h2>
            <p className="text-lg text-[#1A1830]/60">
              Curated selection of the world's most prestigious hotels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {luxuryHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={cn(
                  'group relative bg-white rounded-2xl border border-[#E2E8F0]',
                  'overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300',
                  'cursor-pointer flex flex-col'
                )}
              >
                {/* Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                    alt={hotel.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark to Transparent Gradient Overlay (Bottom-up) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/80" />
                      <span className="text-sm text-white/80">{hotel.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-[#1A1830]/70 mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs px-3 py-1 bg-[#F8FAFC] text-[#1A1830]/70 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                    <div>
                      <p className="text-xs text-[#1A1830]/60 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-[#1A1830]">
                        {hotel.price}
                        <span className="text-sm font-normal text-[#1A1830]/60">
                          /night
                        </span>
                      </p>
                    </div>
                    <button
                      className={cn(
                        'px-6 py-2.5 bg-[#3B82F6] text-white',
                        'text-sm font-semibold rounded-xl',
                        'transition-all duration-200',
                        'hover:bg-[#2563EB]',
                        'transform group-hover:scale-105'
                      )}
                    >
                      Book Now
                    </button>
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
