'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Mail, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pnr, setPnr] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [isMerchantBooking, setIsMerchantBooking] = useState(false);
  const [merchantId, setMerchantId] = useState<string | null>(null);

  useEffect(() => {
    // Get PNR and Booking Reference from URL params or localStorage
    const pnrFromUrl = searchParams.get('pnr');
    const refFromUrl = searchParams.get('ref');
    const pnrFromStorage = localStorage.getItem('bookingPnr');
    const refFromStorage = localStorage.getItem('bookingReference');
    
    setPnr(pnrFromUrl || pnrFromStorage);
    setBookingRef(refFromUrl || refFromStorage || pnrFromUrl || pnrFromStorage);

    // Check if this is a merchant booking
    const bookingSource = localStorage.getItem('bookingSource') || 'ADMIN_DIRECT';
    const merchantIdFromStorage = localStorage.getItem('merchantId');
    setIsMerchantBooking(bookingSource === 'MERCHANT_MANUAL');
    setMerchantId(merchantIdFromStorage);
  }, [searchParams]);

  if (!pnr) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No booking found</p>
          <Link
            href="/"
            className="px-6 py-3 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-20 h-20 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1830] mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your flight has been successfully booked. A confirmation email has been sent to your registered email address.
          </p>
          {isMerchantBooking && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium mb-4">
              <span>Processed by Alpha Merchant Network</span>
            </div>
          )}
        </motion.div>

        {/* Booking Reference Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Your Booking Reference
            </p>
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-[#1A1830] to-[#2A2540] rounded-xl mb-4">
              <p className="text-4xl font-bold text-white tracking-wider font-mono">
                {bookingRef || pnr}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Booking Reference (PNR)
              </p>
              <p className="text-lg font-semibold text-[#1A1830] font-mono">{pnr || bookingRef}</p>
              <p className="text-xs text-slate-500 mt-2">
                This code confirms your reservation is live in the system. Save it for your records.
              </p>
            </div>
            <p className="text-sm text-slate-600">
              Please save this reference number for your records
            </p>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#1A1830] mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#1A1830]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-[#1A1830]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1830] mb-1">Check Your Email</h3>
                <p className="text-slate-600">
                  We've sent a detailed confirmation email with your booking details and e-ticket information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#1A1830]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Download className="w-5 h-5 text-[#1A1830]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1830] mb-1">Download Your E-Ticket</h3>
                <p className="text-slate-600">
                  Your e-ticket will be available in your email within 24 hours. You can also download it from your account.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#1A1830]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-5 h-5 text-[#1A1830]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1830] mb-1">Need Assistance?</h3>
                <p className="text-slate-600">
                  Our customer support team is available 24/7. Contact us at +234 800 000 0000 or support@alphatravels.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Return Home
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#1A1830] text-[#1A1830] rounded-xl font-semibold hover:bg-[#1A1830]/5 transition-colors"
          >
            <Download className="w-5 h-5" />
            Print Confirmation
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
