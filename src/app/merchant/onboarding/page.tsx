'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Users, Headphones, Globe, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const benefits = [
  {
    icon: Globe,
    title: 'Global APIs',
    description: 'Access to world-class travel APIs including Amadeus for real-time flight bookings and pricing.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock dedicated support team to help you succeed and resolve issues instantly.',
  },
  {
    icon: Users,
    title: 'High Commissions',
    description: 'Earn competitive 5% commission on every booking. Higher volume means higher earnings.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security and compliance for all your bookings and transactions.',
  },
];

export default function MerchantOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1830]/10 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1830] tracking-tight leading-none">
              Partner with Alpha
            </h1>
            <p className="text-xl sm:text-2xl text-[#1A1830]/60 max-w-3xl mx-auto font-light">
              Join Nigeria's premier travel agent network. Grow your business with our powerful booking platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1830] tracking-tight mb-4">
              Why Partner with Us?
            </h2>
            <p className="text-lg text-[#1A1830]/60 max-w-2xl mx-auto">
              Everything you need to succeed as a travel agent
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#1A1830]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1A1830]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1830] mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Activate your agent account today and start earning commissions on every booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/merchant/paywall"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-8 py-4 bg-white text-[#1A1830]',
                  'text-lg font-semibold rounded-xl',
                  'shadow-lg transition-all duration-200',
                  'hover:bg-white/90 hover:shadow-xl',
                  'transform hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                Activate Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/merchant/login"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-8 py-4 bg-transparent text-white',
                  'text-lg font-semibold rounded-xl',
                  'border-2 border-white/30',
                  'transition-all duration-200',
                  'hover:bg-white/10 hover:border-white/50'
                )}
              >
                Already Have an Account?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
