'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Building2, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MerchantLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
        className="w-full max-w-md"
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
            Merchant Portal
          </h1>
          <p className="text-white/60 text-sm">
            Sign in to manage your travel business
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white/90">
                  Password
                </label>
                <Link
                  href="/merchant/forgot-password"
                  className="text-xs text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
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

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]"
              />
              <label htmlFor="remember" className="text-sm text-white/70">
                Keep me signed in
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
                'flex items-center justify-center gap-2'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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
                New merchant?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/merchant/register"
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'py-3 px-4 bg-white/10 border border-white/20 rounded-xl',
              'text-sm font-medium text-white',
              'hover:bg-white/20 transition-all duration-200'
            )}
          >
            <Shield className="h-4 w-4" />
            Register Your Business
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
