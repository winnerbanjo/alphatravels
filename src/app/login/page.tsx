'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Briefcase, User, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function LoginPage() {
  const router = useRouter();

  const handleDemoLogin = (email: string) => {
    if (email === 'admin@alpha.com') {
      router.push('/admin/dashboard');
    } else if (email === 'agent@alpha.com') {
      router.push('/merchant/dashboard');
    } else if (email === 'vip@traveler.com') {
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Cinematic Travel Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2000&auto=format&fit=crop"
            alt="High-end Black traveler"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1830]/80 via-[#1A1830]/60 to-transparent" />
        </div>
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg text-white/90 max-w-md">
              Continue your journey with Alpha Travels. Access exclusive deals and manage your bookings.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Glassmorphism Cards */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#F8FAFC] to-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-3xl font-serif font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-semibold text-[#1A1830] tracking-tight">
                Alpha Travels
              </span>
            </Link>
            <p className="text-slate-600 text-sm mt-2">
              Select your access level
            </p>
          </motion.div>

          {/* The Holy Trinity - Glassmorphism Cards */}
          <div className="space-y-6">
            {/* Super Admin Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => handleDemoLogin('admin@alpha.com')}
              className={cn(
                'group relative overflow-hidden',
                'bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl',
                'cursor-pointer transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-3xl'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1A1830] mb-1 tracking-tight">Super Admin Control</h3>
                    <p className="text-sm text-slate-600 tracking-tight">Platform command center & analytics</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-[#1A1830] group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </motion.div>

            {/* Merchant Portal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => handleDemoLogin('agent@alpha.com')}
              className={cn(
                'group relative overflow-hidden',
                'bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl',
                'cursor-pointer transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-3xl'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1A1830] to-[#2A2540] rounded-2xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1A1830] mb-1 tracking-tight">Merchant Portal</h3>
                    <p className="text-sm text-slate-600 tracking-tight">Book flights, manage clients & earnings</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-[#1A1830] group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </motion.div>

            {/* VIP Customer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => handleDemoLogin('vip@traveler.com')}
              className={cn(
                'group relative overflow-hidden',
                'bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl',
                'cursor-pointer transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-3xl'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1A1830] mb-1 tracking-tight">VIP Customer</h3>
                    <p className="text-sm text-slate-600 tracking-tight">View trips, manage bookings & loyalty</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-[#1A1830] group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-[#1A1830] transition-colors tracking-tight"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
