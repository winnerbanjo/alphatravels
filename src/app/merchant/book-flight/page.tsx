'use client';

export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import BentoSearch, { BentoSearchRef } from '@/src/components/search/BentoSearch';
import FlightResultCard from '@/src/components/search/FlightResultCard';
import BookingSummary from '@/src/components/booking/BookingSummary';

interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      duration: string;
    }>;
    duration: string;
  }>;
  numberOfBookableSeats?: number;
  validatingAirlineCodes?: string[];
}

export default function MerchantBookFlightPage() {
  const bentoSearchRef = useRef<BentoSearchRef>(null);
  const [flightResults, setFlightResults] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Calculate commission (5% of total booking)
  const calculateCommission = (totalPrice: string) => {
    const price = parseFloat(totalPrice);
    const commission = price * 0.05;
    return commission;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 1750); // Convert EUR/USD to NGN
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/merchant/dashboard"
                className="text-[#1A1830] hover:text-[#1A1830]/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#1A1830]">Book Flight for Client</h1>
                  <span className="px-3 py-1 bg-[#1A1830] text-white text-xs font-semibold rounded-full tracking-tight">
                    Agent Mode
                  </span>
                </div>
                <p className="text-slate-600">Search and book flights with commission visibility</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">5% Commission</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <BentoSearch ref={bentoSearchRef} />
        </motion.div>

        {/* Results Section */}
        {flightResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1A1830]">
                Available Flights ({flightResults.length})
              </h2>
            </div>

            <div className="grid gap-6">
              {flightResults.map((offer, index) => {
                const totalPrice = parseFloat(offer.price.total);
                const commission = calculateCommission(offer.price.total);
                const commissionNGN = commission * 1750; // Convert to NGN

                return (
                  <motion.div
                    key={offer.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      {/* Agent Commission Badge */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 border-b border-green-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-700">
                              Your Commission
                            </span>
                          </div>
                          <span className="text-xl font-bold text-green-700">
                            ₦{commissionNGN.toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          5% of ₦{formatPrice(totalPrice).replace('₦', '').replace(/,/g, '')}
                        </p>
                      </div>

                      {/* Flight Card */}
                      <div className="p-6">
                        <FlightResultCard
                          offer={offer}
                          onSelect={() => setSelectedFlight(offer)}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!isSearching && flightResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">No flights found</p>
            <p className="text-slate-500 text-sm">
              Use the search form above to find flights for your client
            </p>
          </motion.div>
        )}
      </div>

      {/* Booking Summary Sidebar */}
      {selectedFlight && (
        <BookingSummary 
          flightOffer={selectedFlight}
          travelers={{ adults: 1, children: 0, infants: 0 }}
          isVisible={!!selectedFlight}
          onClose={() => setSelectedFlight(null)} 
        />
      )}
    </div>
  );
}
