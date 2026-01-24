'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const trendingDestinations = [
  {
    id: '1',
    city: 'Lagos',
    country: 'Nigeria',
    code: 'LOS',
    price: '₦250,000',
    discount: '15% OFF',
    image: '/bridge-with-city.jpg',
    description: 'Explore the vibrant heart of Nigeria',
  },
  {
    id: '2',
    city: 'London',
    country: 'United Kingdom',
    code: 'LHR',
    price: '₦680,000',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop',
    description: 'Historic charm meets modern luxury',
  },
  {
    id: '3',
    city: 'Dubai',
    country: 'United Arab Emirates',
    code: 'DXB',
    price: '₦450,000',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    description: 'Where dreams become reality',
  },
  {
    id: '4',
    city: 'New York',
    country: 'United States',
    code: 'JFK',
    price: '₦850,000',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop',
    description: 'The city that never sleeps',
  },
];

export default function TrendingDestinations() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <TrendingUp className="h-6 w-6 text-[#3B82F6]" />
          <h2 className="text-4xl md:text-6xl font-medium text-[#1A1830] tracking-tight">
            Trending Destinations
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingDestinations.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={cn(
                'group relative bg-white/70 backdrop-blur-md border border-white/20',
                'overflow-hidden shadow-2xl rounded-[2.5rem] transition-all duration-300',
                'cursor-pointer flex flex-col'
              )}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs font-bold rounded-lg shadow-lg">
                  {deal.discount}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-[280px] w-full md:h-auto md:aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                {deal.image.startsWith('/') ? (
                  <Image
                    src={deal.image}
                    alt={deal.city}
                    fill
                    priority={deal.city === 'Lagos'}
                    className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 rounded-[2.5rem]"
                  />
                ) : (
                  <img
                    src={deal.image}
                    alt={deal.city}
                    className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 rounded-[2.5rem]"
                  />
                )}
                {/* Dark to Transparent Gradient Overlay (Bottom-up) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-[2.5rem]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">
                    {deal.city}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-white/80" />
                    <span className="text-sm text-white/90 tracking-tight">{deal.country}</span>
                  </div>
                  <p className="text-xs text-white/80 line-clamp-2 tracking-tight">
                    {deal.description}
                  </p>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-white tracking-tight">
                    {deal.code}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 line-through">
                      {deal.price === '₦250,000' ? '₦295,000' : 
                       deal.price === '₦680,000' ? '₦850,000' :
                       deal.price === '₦450,000' ? '₦500,000' : '₦1,130,000'}
                    </p>
                    <p className="text-2xl font-medium text-[#1A1830] tracking-tight">
                      {deal.price}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">per person</p>
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
        </div>
      </div>
    </section>
  );
}
