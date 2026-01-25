'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

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
    }>;
  }>;
}

interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingSummaryProps {
  flightOffer: FlightOffer | null;
  travelers: Travelers;
  destinationImage?: string;
  destinationName?: string;
  isVisible: boolean;
  isPriceVerified?: boolean;
  onClose?: () => void;
}

export default function BookingSummary(props: any) {
  const { flightOffer, travelers, destinationImage, destinationName, isVisible, isPriceVerified = false, onClose } = props;
  if (!flightOffer) return null;

  // Convert from EUR to NGN at 1750 rate
  const EUR_TO_NGN_RATE = 1750;
  const ALPHA_SERVICE_FEE_NGN = 25000; // Fixed ₦25,000 service fee
  
  const basePriceEUR = parseFloat(flightOffer.price.total);
  const basePriceNGN = basePriceEUR * EUR_TO_NGN_RATE;
  const taxesAndFeesNGN = basePriceNGN * 0.15; // 15% taxes and surcharges
  const totalPriceNGN = basePriceNGN + taxesAndFeesNGN + ALPHA_SERVICE_FEE_NGN;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTravelerBreakdown = () => {
    const parts: string[] = [];
    if (travelers.adults > 0) {
      parts.push(`${travelers.adults} ${travelers.adults === 1 ? 'Adult' : 'Adults'}`);
    }
    if (travelers.children > 0) {
      parts.push(`${travelers.children} ${travelers.children === 1 ? 'Child' : 'Children'}`);
    }
    if (travelers.infants > 0) {
      parts.push(`${travelers.infants} ${travelers.infants === 1 ? 'Infant' : 'Infants'}`);
    }
    return parts.join(', ') || '1 Adult';
  };

  const destination = flightOffer.itineraries[0]?.segments[0]?.arrival.iataCode || destinationName || 'Destination';
  const destinationImg = destinationImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=1200&auto=format&fit=crop';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            'fixed top-24 right-4 z-40',
            'w-full max-w-sm',
            'bg-white/80 backdrop-blur-xl',
            'rounded-2xl border border-white/20',
            'shadow-2xl',
            'overflow-hidden',
            'hidden lg:block' // Hide on mobile/tablet, show on desktop
          )}
        >
          {/* Destination Preview */}
          <div className="relative h-48 overflow-hidden">
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                aria-label="Close booking summary"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <img
              src={destinationImg}
              alt={destination}
              className="absolute inset-0 w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-1">{destination}</h3>
              <p className="text-sm text-white/80">{getTravelerBreakdown()}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Price Verified Badge */}
            {isPriceVerified && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Price Verified via Amadeus</span>
              </motion.div>
            )}

            {/* Traveler Breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#1A1830] mb-3 uppercase tracking-wider">
                Travelers
              </h4>
              <p className="text-sm text-slate-600">{getTravelerBreakdown()}</p>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-[#1A1830] mb-3 uppercase tracking-wider">
                Price Breakdown
              </h4>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Base Fare</span>
                <span className="font-medium text-[#1A1830]">{formatCurrency(basePriceNGN)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Taxes & Surcharges</span>
                <span className="font-medium text-[#1A1830]">{formatCurrency(taxesAndFeesNGN)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Alpha Service Fee</span>
                <span className="font-medium text-[#1A1830]">{formatCurrency(ALPHA_SERVICE_FEE_NGN)}</span>
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

              <div className="flex items-center justify-between pt-2">
                <span className="text-base font-bold text-[#1A1830]">Grand Total</span>
                <span className="text-2xl font-bold text-[#1A1830]">{formatCurrency(totalPriceNGN)}</span>
              </div>
            </div>

            {/* Safe & Secure Badge */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
              <Lock className="h-4 w-4 text-[#1A1830]" />
              <span className="text-xs font-medium text-slate-700">Safe & Secure Booking</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
