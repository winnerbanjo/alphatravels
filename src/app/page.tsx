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
      {/* Hero Section - Restored Original */}
      <section className="relative pt-40 pb-40 px-8 overflow-hidden">
        {/* Hero Background Image - Original travel concept */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/travel-concept-with-landmarks.jpg"
            alt="Elite travel concept with landmarks"
            fill
            priority
            className="object-cover rounded-[2.5rem]"
          />
          <div className="absolute inset-0 bg-[#1A1830]/75 backdrop-brightness-50 rounded-[2.5rem]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-20 space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none drop-shadow-lg">
              Elite African{' '}
              <span className="inline-block min-w-[200px] md:min-w-[400px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    {services[currentService]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium tracking-tight drop-shadow-md">
              The premier portal for the global Nigerian.
            </p>
          </motion.div>

          {/* Search Container - Overlaps bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <TravelbetaHeroSearch />
          </motion.div>
        </div>
      </section>

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
