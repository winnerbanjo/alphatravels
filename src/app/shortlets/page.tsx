'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Home, MapPin, Star, Wifi, Car, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import ShortletBookingForm from '@/src/components/booking/ShortletBookingForm';

interface Shortlet {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
}

const shortlets: Shortlet[] = [
  {
    id: '1',
    name: 'Luxury Apartment - Victoria Island',
    location: 'Lagos, Nigeria',
    price: '₦45,000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym'],
    description: 'Modern 2-bedroom apartment in the heart of Victoria Island',
  },
  {
    id: '2',
    name: 'Cozy Studio - Lekki',
    location: 'Lagos, Nigeria',
    price: '₦25,000',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    amenities: ['WiFi', 'Kitchen', 'Parking'],
    description: 'Perfect for solo travelers or couples',
  },
  {
    id: '3',
    name: 'Penthouse Suite - Ikoyi',
    location: 'Lagos, Nigeria',
    price: '₦85,000',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym', 'Concierge'],
    description: 'Luxurious penthouse with stunning city views',
  },
  {
    id: '4',
    name: 'Beachfront Villa - Tarkwa Bay',
    location: 'Lagos, Nigeria',
    price: '₦120,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    amenities: ['WiFi', 'Kitchen', 'Beach Access', 'Pool'],
    description: 'Private villa steps away from the beach',
  },
];

export default function ShortletsPage() {
  const [selectedShortlet, setSelectedShortlet] = useState<Shortlet | null>(null);

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
              Premium Shortlets
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Your home away from home, curated for comfort and style
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shortlets Collection */}
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
              Available Shortlets
            </h2>
            <p className="text-lg text-[#1A1830]/60">
              Discover comfortable and stylish accommodations for your stay
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shortlets.map((shortlet, index) => (
              <motion.div
                key={shortlet.id}
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
                    src={shortlet.image}
                    alt={shortlet.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark to Transparent Gradient Overlay (Bottom-up) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {shortlet.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/80" />
                      <span className="text-sm text-white/80">{shortlet.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">
                        {shortlet.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-[#1A1830]/70 mb-4 line-clamp-2">
                    {shortlet.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {shortlet.amenities.slice(0, 4).map((amenity) => (
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
                        {shortlet.price}
                        <span className="text-sm font-normal text-[#1A1830]/60">
                          /night
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedShortlet(shortlet)}
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

      {/* Shortlet Booking Form Modal */}
      {selectedShortlet && (
        <ShortletBookingForm
          shortlet={{
            id: selectedShortlet.id,
            name: selectedShortlet.name,
            location: selectedShortlet.location,
            price: selectedShortlet.price,
          }}
          onClose={() => setSelectedShortlet(null)}
        />
      )}
    </motion.div>
  );
}
