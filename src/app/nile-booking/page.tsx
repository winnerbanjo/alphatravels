export const dynamic = 'force-dynamic';

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
});

export default function NileBookingPage() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${plusJakarta.variable} font-sans bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900`}>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          navbarScrolled ? 'border-slate-200 bg-white/95' : 'border-transparent bg-white/80'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold tracking-tighter text-emerald-800 uppercase">
              Nile Booking
            </Link>
            <div className="hidden lg:flex gap-8 text-sm font-medium text-slate-500">
              <a href="#product" className="hover:text-emerald-800 transition">Product</a>
              <a href="#solutions" className="hover:text-emerald-800 transition">Solutions</a>
              <a href="#pricing" className="hover:text-emerald-800 transition">Pricing</a>
              <a href="#resources" className="hover:text-emerald-800 transition">Resources</a>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/login" className="text-slate-600 hover:text-emerald-800 transition">
              Sign in
            </Link>
            <Link
              href="/nile-booking/signup"
              className="bg-emerald-800 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 bg-gradient-radial from-emerald-50 via-white to-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Sell your time.<br />Get booked. Get paid.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to run a service business. Bookings, payments, AI, and your own domain.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link
              href="/nile-booking/signup"
              className="bg-emerald-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition text-center"
            >
              Get started free
            </Link>
            <button className="bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition">
              See how it works
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto border border-slate-200 rounded-2xl shadow-2xl overflow-hidden bg-white"
          >
            <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-30 h-4 bg-slate-100 rounded-full ml-4"></div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <div className="space-y-6">
                  <div className="h-10 w-48 bg-slate-100 rounded-lg"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-50 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-16 bg-slate-100 rounded-lg border-2 border-emerald-500"></div>
                    <div className="h-16 bg-slate-50 rounded-lg"></div>
                    <div className="h-16 bg-slate-50 rounded-lg"></div>
                    <div className="h-16 bg-slate-50 rounded-lg"></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="h-6 w-32 bg-slate-200 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="flex justify-between h-12 items-center bg-white px-4 rounded-lg border border-slate-200 font-bold">
                      <span>Bridal Makeup</span>
                      <span className="text-emerald-800">₦50,000</span>
                    </div>
                    <button className="w-full h-12 bg-emerald-800 rounded-lg text-white font-bold hover:bg-emerald-900 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-sm font-semibold uppercase tracking-widest text-slate-400"
          >
            Trusted by service professionals across Africa
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center text-emerald-800 text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold mb-3">Accept bookings automatically</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              No more WhatsApp back-and-forth. Clients see your availability and book in seconds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center text-emerald-800 text-2xl">
              💰
            </div>
            <h3 className="text-xl font-bold mb-3">Take payments upfront</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Secure deposits or full payments at the point of booking to eliminate no-shows.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center text-emerald-800 text-2xl">
              🤖
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Management</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Let AI write your service descriptions, suggest pricing, and answer FAQs automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-24 bg-slate-950 text-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Your AI assistant, built into your business.
            </h2>
            <ul className="space-y-6 text-slate-400">
              <li className="flex items-start gap-4">
                <span className="text-emerald-500">✓</span> Writes compelling service descriptions
              </li>
              <li className="flex items-start gap-4">
                <span className="text-emerald-500">✓</span> Answers customer questions 24/7
              </li>
              <li className="flex items-start gap-4">
                <span className="text-emerald-500">✓</span> Suggests optimized pricing and schedules
              </li>
              <li className="flex items-start gap-4">
                <span className="text-emerald-500">✓</span> Summarizes revenue trends for you
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none max-w-xs text-sm">
                Hi! Can you write a description for my 'Premium Bridal Session'?
              </div>
              <div className="bg-emerald-800 p-4 rounded-2xl rounded-br-none max-w-xs ml-auto text-sm">
                "Experience luxury and elegance with our Premium Bridal Session. We focus on long-lasting, HD finish
                makeup designed to look flawless under studio lights and through your entire wedding day."
              </div>
              <div className="h-4 w-32 bg-slate-800 rounded animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Start accepting bookings today
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/nile-booking/signup"
              className="inline-block bg-emerald-800 text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition"
            >
              Create your free booking page
            </Link>
            <p className="mt-6 text-slate-400">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <span className="text-xl font-bold tracking-tighter text-emerald-800 uppercase">Nile Booking</span>
            <p className="mt-4 text-slate-400 text-sm max-w-xs">
              The global standard for African service entrepreneurs.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="#features" className="hover:text-emerald-800 transition">
                Features
              </a>
              <a href="#ai" className="hover:text-emerald-800 transition">
                AI Assistant
              </a>
              <a href="#domains" className="hover:text-emerald-800 transition">
                Domains
              </a>
              <a href="#pricing" className="hover:text-emerald-800 transition">
                Pricing
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Solutions</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="#creators" className="hover:text-emerald-800 transition">
                For Creators
              </a>
              <a href="#freelancers" className="hover:text-emerald-800 transition">
                For Freelancers
              </a>
              <a href="#agencies" className="hover:text-emerald-800 transition">
                For Agencies
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="/about" className="hover:text-emerald-800 transition">
                About
              </a>
              <a href="#blog" className="hover:text-emerald-800 transition">
                Blog
              </a>
              <a href="#legal" className="hover:text-emerald-800 transition">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
