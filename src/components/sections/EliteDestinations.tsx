'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/src/lib/utils';

// IATA Code Mapping for Destinations
const IATA_MAP: Record<string, string> = {
  "Lagos": "LOS",
  "London": "LHR",
  "Dubai": "DXB",
  "Paris": "CDG",
  "Tokyo": "HND",
  "New York": "JFK"
};

// Framer Motion Variants - Defined at top level
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Power Trio: 3 Large Cards
const destinations = [
  {
    id: 1,
    name: 'Lagos',
    country: 'Nigeria',
    image: '/bridge-with-city.jpg',
    price: 'From $699',
    airportCode: 'LOS',
  },
  {
    id: 2,
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    price: 'From $1,099',
    airportCode: 'LHR',
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    price: 'From $899',
    airportCode: 'DXB',
  },
];

interface EliteDestinationsProps {
  onDestinationClick?: (destination: string, airportCode: string, image: string) => void;
}

export default function EliteDestinations({ onDestinationClick }: EliteDestinationsProps) {
  const router = useRouter();

  const handleDestinationClick = (destination: string, airportCode: string, image: string) => {
    // If parent component has a handler, use it (for BentoSearch integration)
    if (onDestinationClick) {
      onDestinationClick(destination, airportCode, image);
    } else {
      // Use IATA_MAP to get the correct IATA code, fallback to airportCode if not found
      const iataCode = IATA_MAP[destination] || airportCode;
      
      // Redirect to flights page with search parameters
      // Default origin is always LOS (Lagos) for Nigerian Tech Authority brand
      const params = new URLSearchParams({
        destination: iataCode,
        origin: 'LOS', // Default origin from Lagos
      });
      router.push(`/flights?${params.toString()}`);
    }
  };

  return (
    <section className="py-24 px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-medium text-[#1A1830] tracking-tight mb-6">
            Elite Destinations
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto tracking-tight">
            Discover the world's most sought-after destinations, curated for the
            discerning traveler.
          </p>
        </motion.div>

        {/* Power Trio: 3 Large Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              onClick={() => handleDestinationClick(destination.name, destination.airportCode, destination.image)}
              className={cn(
                'group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl',
                'cursor-pointer h-[600px]'
              )}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Full-bleed Image with Gradient Overlay */}
              <div className="relative overflow-hidden rounded-[2.5rem] absolute inset-0 w-full h-full">
                {/* Background Image - Full Bleed */}
                {destination.image.startsWith('/') ? (
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    priority={destination.name === 'Lagos'}
                    className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* #1A1830 Navy Overlay (60% opacity) for 2026 aesthetic */}
                <div className="absolute inset-0 bg-[#1A1830]/60 rounded-[2.5rem]" />
                
                {/* Dark to Transparent Gradient Overlay (Bottom-up) - Enhanced for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-[2.5rem]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="space-y-3">
                    <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
                      {destination.name}
                    </h3>
                    <p className="text-white/80 text-lg tracking-tight">
                      {destination.country}
                    </p>
                    <div className="flex flex-col gap-3 pt-4">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium text-sm tracking-tight w-fit">
                        {destination.price}
                      </span>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ y: 0, scale: 1.05 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDestinationClick(destination.name, destination.airportCode, destination.image);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1A1830] rounded-xl font-semibold text-sm hover:bg-white/90 tracking-tight shadow-lg transition-all duration-300"
                      >
                        Direct Book
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Hover Scale Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#1A1830] to-[#3B82F6] opacity-0 group-hover:opacity-10 rounded-[2.5rem]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
