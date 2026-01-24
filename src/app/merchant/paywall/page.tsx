'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2, CreditCard, Shield, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const features = [
  'Access to full booking platform',
  '5% commission on all bookings',
  'Dedicated agent support',
  'Custom landing pages',
  'Real-time booking management',
  'Monthly commission payouts',
];

export default function MerchantPaywallPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate Paystack payment (mock)
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to dashboard after "payment"
      router.push('/merchant/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1830] tracking-tight mb-4">
            Join the Elite Network
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Activate your agent account and unlock the full power of Alpha Travels' booking platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
        >
          {/* Pricing Card */}
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Most Popular</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl sm:text-6xl font-bold text-[#1A1830]">₦50,000</span>
                <span className="text-xl text-slate-600 ml-2">Annual Activation Fee</span>
              </div>
              <p className="text-slate-600">
                One-time annual fee. No hidden charges. Cancel anytime.
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#1A1830]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#1A1830]" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={cn(
                  'w-full py-4 bg-[#1A1830] text-white',
                  'text-lg font-semibold rounded-xl',
                  'shadow-lg transition-all duration-200',
                  'hover:bg-[#1A1830]/90 hover:shadow-xl',
                  'focus:outline-none focus:ring-2 focus:ring-[#1A1830] focus:ring-offset-2',
                  'transform hover:scale-[1.02] active:scale-[0.98]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-3'
                )}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay via Paystack
                  </>
                )}
              </button>
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={cn(
                  'w-full py-3 bg-slate-100 text-[#1A1830]',
                  'text-sm font-semibold rounded-xl',
                  'border border-slate-200 transition-all duration-200',
                  'hover:bg-slate-200',
                  'focus:outline-none focus:ring-2 focus:ring-[#1A1830] focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-2'
                )}
              >
                Demo Pay
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Secure payment powered by Paystack</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#1A1830] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#1A1830] mb-1">
                  Instant Activation
                </p>
                <p className="text-xs text-slate-600">
                  Your account will be activated immediately after payment confirmation. You'll receive access credentials via email.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
