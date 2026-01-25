'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import BentoSearch from '@/src/components/search/BentoSearch';
import TravelbetaHeroSearch from '@/src/components/search/TravelbetaHeroSearch';
import TrendingDeals from '@/src/components/sections/TrendingDeals';
import EliteDestinations from '@/src/components/sections/EliteDestinations';
import WhyAlphaTravels from '@/src/components/sections/WhyAlphaTravels';

const services = ['Travel', 'Flights', 'Study', 'Business'];

export default function Home() {
  const bentoSearchRef = useRef<{ triggerQuickSearch: (destination: string, airportCode: string, image: string) => void }>(null);
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDestinationClick = (destination: string, airportCode: string, image: string) => {
    if (bentoSearchRef.current) {
      bentoSearchRef.current.triggerQuickSearch(destination, airportCode, image);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section - Travelbeta Style */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Hero Background Image - Plane mid-flight */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Plane mid-flight"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-[#1A1830]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-80 md:pb-96">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
              Going somewhere?
            </h1>
          </motion.div>

          {/* Search Container - Overlaps bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative -mb-32 md:-mb-40"
          >
            <TravelbetaHeroSearch />
          </motion.div>
        </div>
      </section>

      {/* Spacer to account for overlapping search container */}
      <div className="h-32 md:h-40" />

      {/* Trending Deals Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <TrendingDeals />
      </motion.div>

      {/* Elite Destinations */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <EliteDestinations onDestinationClick={handleDestinationClick} />
      </motion.div>

      {/* Why Alpha Travels */}
      <WhyAlphaTravels />
    </motion.div>
  );
}
