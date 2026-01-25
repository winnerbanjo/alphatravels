'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const type = searchParams.get('type') || 'flight';
  const name = searchParams.get('name') || 'Item';
  const price = searchParams.get('price') || '0';
  const currency = searchParams.get('currency') || 'USD';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || '';

  // For flight bookings, get price from stored flight offer if available
  let priceNum = parseInt(price, 10) || 0;
  if (type === 'flight') {
    const flightOfferData = sessionStorage.getItem('bookingFlightOffer');
    if (flightOfferData) {
      try {
        const flightOffer = JSON.parse(flightOfferData);
        // Convert USD/EUR to NGN for display (approximate rate)
        const rate = currency === 'USD' ? 1500 : 1750;
        const basePrice = parseFloat(flightOffer.price.total);
        priceNum = Math.round(basePrice * rate);
      } catch (e) {
        // Fallback to URL price - if it's already in NGN, use as is, otherwise convert
        if (currency !== 'NGN' && priceNum > 0) {
          const rate = currency === 'USD' ? 1500 : 1750;
          priceNum = Math.round(priceNum * rate);
        }
      }
    } else if (currency !== 'NGN' && priceNum > 0) {
      // Convert URL price if not already in NGN
      const rate = currency === 'USD' ? 1500 : 1750;
      priceNum = Math.round(priceNum * rate);
    }
  }
  const serviceFee = 25000; // Fixed ₦25,000 service fee
  const taxes = Math.round(priceNum * 0.15); // 15% taxes
  const total = priceNum + serviceFee + taxes;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getItemTitle = () => {
    if (type === 'hotel') return `${name} Hotel${location ? ` - ${location}` : ''}`;
    if (type === 'car') return `${name}${category ? ` (${category})` : ''}`;
    return name;
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Check if this is a flight booking with passenger data
      const passengersData = sessionStorage.getItem('bookingPassengers');
      const contactsData = sessionStorage.getItem('bookingContacts');
      const flightOfferData = sessionStorage.getItem('bookingFlightOffer');
      
      if (type === 'flight' && passengersData && contactsData && flightOfferData) {
        // Call the booking API
        const bookingResponse = await fetch('/api/flights/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            flightOffer: JSON.parse(flightOfferData),
            passengers: JSON.parse(passengersData).map((p: any, i: number) => ({
              ...p,
              id: String(i + 1),
            })),
            contacts: JSON.parse(contactsData),
          }),
        });

        const bookingData = await bookingResponse.json();
        if (bookingData.success) {
          const bookingRef = bookingData.bookingReference || bookingData.pnr;
          const pnrCode = bookingData.pnr || bookingRef || bookingData.data?.id;
          
          // Store in localStorage
          if (pnrCode) localStorage.setItem('bookingPnr', pnrCode);
          if (bookingRef) localStorage.setItem('bookingReference', bookingRef);
          
          // Clear sessionStorage
          sessionStorage.removeItem('bookingPassengers');
          sessionStorage.removeItem('bookingContacts');
          sessionStorage.removeItem('bookingFlightOffer');
          
          router.push(`/booking/success?pnr=${pnrCode}&ref=${bookingRef}`);
          return;
        }
      }
      
      // For non-flight bookings or fallback, generate mock booking
      const bookingRef = `ALPHA-${Date.now()}`;
      const pnr = `PNR-${Date.now().toString().slice(-6)}`;
      
      localStorage.setItem('bookingPnr', pnr);
      localStorage.setItem('bookingReference', bookingRef);
      
      router.push(`/booking/success?pnr=${pnr}&ref=${bookingRef}`);
    } catch (error) {
      console.error('Payment error:', error);
      // Fallback to mock booking
      const bookingRef = `ALPHA-${Date.now()}`;
      const pnr = `PNR-${Date.now().toString().slice(-6)}`;
      localStorage.setItem('bookingPnr', pnr);
      localStorage.setItem('bookingReference', bookingRef);
      router.push(`/booking/success?pnr=${pnr}&ref=${bookingRef}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1830]/60 hover:text-[#1A1830] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1830] mb-2">
            Checkout
          </h1>
          <p className="text-lg text-slate-600">Review your booking and complete payment</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Item Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-[#1A1830] mb-6">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1830] mb-1">
                      {getItemTitle()}
                    </h3>
                    {type === 'hotel' && (
                      <p className="text-sm text-slate-600">Luxury Hotel Stay</p>
                    )}
                    {type === 'car' && (
                      <p className="text-sm text-slate-600">Premium Car Rental</p>
                    )}
                    {type === 'flight' && (
                      <p className="text-sm text-slate-600">Flight Booking</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1A1830]">
                      {formatCurrency(priceNum)}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-[#1A1830]">{formatCurrency(priceNum)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Taxes & Fees</span>
                    <span className="font-medium text-[#1A1830]">{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Service Fee</span>
                    <span className="font-medium text-[#1A1830]">{formatCurrency(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-200">
                    <span className="text-lg font-semibold text-[#1A1830]">Total</span>
                    <span className="text-2xl font-bold text-[#1A1830]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4"
            >
              <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-blue-700">
                  Your payment information is encrypted and secure. This is a demo booking system.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Payment Sidebar */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sticky top-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1A1830] mb-2">Total Amount</h3>
                <p className="text-4xl font-bold text-[#1A1830]">
                  {formatCurrency(total)}
                </p>
                <p className="text-sm text-slate-500 mt-2">All fees included</p>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className={cn(
                  'w-full py-4 bg-[#1A1830] text-white',
                  'text-sm font-semibold rounded-xl',
                  'shadow-lg transition-all duration-200',
                  'hover:bg-[#1A1830]/90 hover:shadow-xl',
                  'focus:outline-none focus:ring-2 focus:ring-[#1A1830] focus:ring-offset-2',
                  'transform hover:scale-[1.02] active:scale-[0.98]',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                  'flex items-center justify-center gap-2'
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Confirm & Pay
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
