'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText, User, Loader2, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PassengerData {
  fullName: string;
  passportNumber: string;
  passportExpiry: string;
  dateOfBirth: string;
}

function PassengerDetailsContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flightData, setFlightData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [destination, setDestination] = useState<string>('');
  const [destinationImage, setDestinationImage] = useState<string>('');
  
  const [passenger, setPassenger] = useState<PassengerData>({
    fullName: '',
    passportNumber: '',
    passportExpiry: '',
    dateOfBirth: '',
  });

  // Load flight data from sessionStorage
  useEffect(() => {
    const flightOfferData = sessionStorage.getItem('bookingFlightOffer');
    const travelersData = sessionStorage.getItem('bookingTravelers');
    const dest = sessionStorage.getItem('bookingDestination') || '';
    const price = sessionStorage.getItem('bookingTotalPrice') || '0';
    const img = sessionStorage.getItem('bookingDestinationImage') || '';

    if (flightOfferData) {
      setFlightData(JSON.parse(flightOfferData));
    }
    setTotalPrice(parseFloat(price));
    setDestination(dest);
    setDestinationImage(img);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleChange = (field: keyof PassengerData, value: string) => {
    setPassenger({ ...passenger, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Store passenger data
      sessionStorage.setItem('passengerDetails', JSON.stringify(passenger));
      
      // Generate booking reference
      const bookingRef = `ALPHA-${Date.now()}`;
      const pnr = `PNR-${Date.now().toString().slice(-6)}`;
      
      // Store booking info
      localStorage.setItem('bookingPnr', pnr);
      localStorage.setItem('bookingReference', bookingRef);
      
      // Redirect to success page
      router.push(`/booking/success?pnr=${pnr}&ref=${bookingRef}`);
    }, 1500);
  };

  const origin = flightData?.itineraries?.[0]?.segments?.[0]?.departure.iataCode || 'LOS';
  const arrival = flightData?.itineraries?.[0]?.segments?.[0]?.arrival.iataCode || destination || 'Destination';

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
            href="/merchant/book-flight"
            className="inline-flex items-center gap-2 text-[#1A1830]/60 hover:text-[#1A1830] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Flight Selection</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1830] mb-2">
            Passenger Details
          </h1>
          <p className="text-lg text-slate-600">Please provide the passenger information as it appears on their passport</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 md:p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1A1830] mb-2">Alpha Standard Fields</h2>
                <p className="text-sm text-slate-600">All fields are required for international travel</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name (as per Passport) */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Full Name (as per Passport) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={passenger.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Enter full name exactly as shown on passport"
                      className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Passport Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Passport Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={passenger.passportNumber}
                      onChange={(e) => handleChange('passportNumber', e.target.value.toUpperCase())}
                      placeholder="A12345678"
                      maxLength={20}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent transition-all uppercase"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={passenger.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>

                {/* Passport Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Passport Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={passenger.passportExpiry}
                      onChange={(e) => handleChange('passportExpiry', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Passport must be valid for at least 6 months from travel date
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full py-4 bg-[#1A1830] text-white',
                      'font-bold rounded-xl',
                      'shadow-lg transition-all duration-200',
                      'hover:bg-[#1A1830]/90 hover:shadow-xl',
                      'focus:outline-none focus:ring-2 focus:ring-[#1A1830] focus:ring-offset-2',
                      'transform hover:scale-[1.02] active:scale-[0.98]',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        Confirm & Pay
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sticky top-8"
            >
              <h3 className="text-lg font-bold text-[#1A1830] mb-4">Booking Summary</h3>
              
              {/* Flight Route */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Route</span>
                </div>
                <p className="text-lg font-semibold text-[#1A1830]">
                  {origin} → {arrival}
                </p>
                {destination && (
                  <p className="text-sm text-slate-600 mt-1">{destination}</p>
                )}
              </div>

              {/* Total Price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Total Amount</span>
                </div>
                <p className="text-3xl font-bold text-[#1A1830]">
                  {formatCurrency(totalPrice)}
                </p>
                <p className="text-xs text-slate-500 mt-1">All fees included</p>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-900 mb-1">Secure Payment</p>
                    <p className="text-xs text-blue-700">
                      Your information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PassengerDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
      </div>
    }>
      <PassengerDetailsContent />
    </Suspense>
  );
}
