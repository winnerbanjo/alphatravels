'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MerchantRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1830] via-[#2A2540] to-[#1A1830] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Become a Partner
          </h1>
          <p className="text-white/60 text-sm">
            Join Alpha Travels and grow your travel business
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="Your Travel Agency"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Contact Person Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Business Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="business@example.com"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+234 800 000 0000"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5',
                    'bg-white/10 border border-white/20 rounded-xl',
                    'text-white placeholder:text-white/40',
                    'text-sm font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent',
                    'transition-all duration-200',
                    'backdrop-blur-sm'
                  )}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]"
              />
              <label htmlFor="terms" className="text-sm text-white/70">
                I agree to the{' '}
                <Link href="/terms" className="text-[#3B82F6] hover:text-[#2563EB]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#3B82F6] hover:text-[#2563EB]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-4 bg-[#3B82F6] text-white',
                'text-sm font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-[#2563EB] hover:shadow-xl',
                'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-transparent',
                'transform hover:scale-[1.02] active:scale-[0.98]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2 mt-6'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  Register Business
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/60">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/merchant/login"
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'py-3 px-4 bg-white/10 border border-white/20 rounded-xl',
              'text-sm font-medium text-white',
              'hover:bg-white/20 transition-all duration-200'
            )}
          >
            <CheckCircle className="h-4 w-4" />
            Sign In Instead
          </Link>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center space-x-4 text-sm"
        >
          <Link href="/" className="text-white/60 hover:text-white transition-colors">
            Back to Home
          </Link>
          <span className="text-white/40">•</span>
          <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
            Terms
          </Link>
          <span className="text-white/40">•</span>
          <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
            Privacy
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
