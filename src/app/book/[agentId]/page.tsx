'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import BentoSearch, { BentoSearchRef } from '@/src/components/search/BentoSearch';
import TrendingDeals from '@/src/components/sections/TrendingDeals';
import EliteDestinations from '@/src/components/sections/EliteDestinations';
import WhyAlphaTravels from '@/src/components/sections/WhyAlphaTravels';

// Agent data mapping
const agentData: Record<string, { name: string; agentId: string }> = {
  'agent-001': {
    name: 'Oyekunle Ade',
    agentId: 'agent-001',
  },
  // Add more agents as needed
};

export default function AgentBookingPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const agent = agentData[agentId] || { name: 'Alpha Travels Partner', agentId: agentId || 'unknown' };
  const bentoSearchRef = useRef<BentoSearchRef>(null);

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
      {/* Agent Branding Header */}
      <div className="bg-gradient-to-r from-[#1A1830] to-[#2A2540] text-white py-6 px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1 tracking-tight">Booking via</p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {agent.name} - Alpha Travels Partner
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-tight">Verified Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-40 px-8 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2000&auto=format&fit=crop"
            alt="Elite travel concept"
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-none drop-shadow-lg">
              Premium Travel for the Global Nigerian.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-light tracking-tight drop-shadow-md">
              Experience the world with unmatched elegance and convenience.
            </p>
          </motion.div>

          {/* Bento Search - Elevated with Results */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <BentoSearch ref={bentoSearchRef} />
          </motion.div>
        </div>
      </section>

      {/* Trending Deals Section */}
      <TrendingDeals />

      {/* Elite Destinations */}
      <EliteDestinations onDestinationClick={handleDestinationClick} />

      {/* Why Alpha Travels */}
      <WhyAlphaTravels />
    </motion.div>
  );
}
