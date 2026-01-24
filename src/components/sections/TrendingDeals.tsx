'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const deals = [
  {
    id: 1,
    city: 'Lagos',
    country: 'Nigeria',
    description: 'Explore the vibrant heart of Nigeria',
    code: 'LOS',
    oldPrice: 295000,
    price: 250000,
    discount: '15% OFF',
    image: '/bridge-with-city.jpg',
  },
  {
    id: 2,
    city: 'London',
    country: 'United Kingdom',
    description: 'Historic charm meets modern luxury',
    code: 'LHR',
    oldPrice: 850000,
    price: 680000,
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    city: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Where dreams become reality',
    code: 'DXB',
    oldPrice: 500000,
    price: 450000,
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    city: 'New York',
    country: 'United States',
    description: 'The city that never sleeps',
    code: 'JFK',
    oldPrice: 1130000,
    price: 850000,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
  },
];

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

export default function TrendingDeals() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <Sparkles className="h-6 w-6 text-[#3B82F6]" />
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#1A1830]">
              Trending Deals
            </h2>
            <p className="text-slate-500 mt-4 text-lg tracking-tight">Elite destinations at exclusive rates.</p>
          </div>
        </motion.div>

        {/* 2026 Mobile: Horizontal Glass Swipe */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8 -mx-4 px-4"
        >
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="min-w-[85vw] snap-center bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="relative h-[280px] w-full rounded-[2.5rem] overflow-hidden">
                <span className="absolute top-4 left-4 z-10 bg-[#1A1830] text-white text-xs font-medium px-4 py-1.5 rounded-full tracking-tight">
                  {deal.discount}
                </span>
                {deal.image.startsWith('/') ? (
                  <Image
                    src={deal.image}
                    alt={deal.city}
                    fill
                    className="object-cover brightness-90 transition-transform duration-500 hover:scale-105 rounded-[2.5rem]"
                    priority={deal.city === 'Lagos'}
                  />
                ) : (
                  <img
                    src={deal.image}
                    alt={deal.city}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 hover:scale-105 rounded-[2.5rem]"
                  />
                )}
                {/* #1A1830 Navy Overlay (60% opacity) for 2026 aesthetic */}
                <div className="absolute inset-0 bg-[#1A1830]/60 rounded-[2.5rem]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-[2.5rem]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">{deal.city}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-white/80" />
                    <span className="text-sm text-white/90 tracking-tight">{deal.country}</span>
                  </div>
                  <p className="text-xs text-white/80 line-clamp-2 tracking-tight">{deal.description}</p>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-white tracking-tight">
                    {deal.code}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 line-through tracking-tight">
                      ₦{deal.oldPrice.toLocaleString('en-NG')}
                    </p>
                    <p className="text-2xl font-medium text-[#1A1830] tracking-tight">
                      ₦{deal.price.toLocaleString('en-NG')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tracking-tight">per person</p>
                  </div>
                  <Link
                    href={`/flights?destination=${deal.code}&origin=LOS`}
                    className={cn(
                      'w-12 h-12 rounded-full bg-[#1A1830]',
                      'flex items-center justify-center',
                      'hover:bg-[#1A1830]/90 transition-colors',
                      'transform hover:scale-110 transition-transform'
                    )}
                  >
                    <ArrowRight className="h-5 w-5 text-white" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2026 Desktop: Glass Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="relative h-[280px] w-full md:h-64 overflow-hidden rounded-[2.5rem]">
                <span className="absolute top-4 right-4 z-10 bg-[#3B82F6] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg tracking-tight">
                  {deal.discount}
                </span>
                {deal.image.startsWith('/') ? (
                  <Image
                    src={deal.image}
                    alt={deal.city}
                    fill
                    className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 rounded-[2.5rem]"
                    priority={deal.city === 'Lagos'}
                  />
                ) : (
                  <img
                    src={deal.image}
                    alt={deal.city}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 rounded-[2.5rem]"
                  />
                )}
                {/* #1A1830 Navy Overlay (60% opacity) for 2026 aesthetic */}
                <div className="absolute inset-0 bg-[#1A1830]/60 rounded-[2.5rem]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-[2.5rem]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">{deal.city}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-white/80" />
                    <span className="text-sm text-white/90 tracking-tight">{deal.country}</span>
                  </div>
                  <p className="text-xs text-white/80 line-clamp-2 tracking-tight">{deal.description}</p>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-white tracking-tight">
                    {deal.code}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 line-through tracking-tight">
                      ₦{deal.oldPrice.toLocaleString('en-NG')}
                    </p>
                    <p className="text-2xl font-medium text-[#1A1830] tracking-tight">
                      ₦{deal.price.toLocaleString('en-NG')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tracking-tight">per person</p>
                  </div>
                  <Link
                    href={`/flights?destination=${deal.code}&origin=LOS`}
                    className={cn(
                      'w-12 h-12 rounded-full bg-[#1A1830]',
                      'flex items-center justify-center',
                      'group-hover:bg-[#1A1830]/90 transition-colors',
                      'transform group-hover:scale-110 transition-transform'
                    )}
                  >
                    <ArrowRight className="h-5 w-5 text-white" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
