'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* The "A" in a square */}
            <div className="w-10 h-10 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-2xl font-serif font-bold text-white">A</span>
            </div>
            {/* Typographic text */}
            <span className="text-lg sm:text-xl font-semibold text-[#1A1830] tracking-tight block">
              Alpha Travels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {/* Navigation Links */}
            <Link
              href="/flights"
              className={cn(
                'px-4 py-2 text-sm font-medium text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'hover:bg-[#F8FAFC]'
              )}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className={cn(
                'px-4 py-2 text-sm font-medium text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'hover:bg-[#F8FAFC]'
              )}
            >
              Hotels
            </Link>
            <Link
              href="/cars"
              className={cn(
                'px-4 py-2 text-sm font-medium text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'hover:bg-[#F8FAFC]'
              )}
            >
              Cars
            </Link>
            <Link
              href="/visa"
              className={cn(
                'px-4 py-2 text-sm font-medium text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'hover:bg-[#F8FAFC]'
              )}
            >
              Visa
            </Link>

            {/* Partner with Us Link */}
            <Link
              href="/merchant/onboarding"
              className={cn(
                'px-4 py-2 text-sm font-medium text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'hover:bg-[#F8FAFC]'
              )}
            >
              Partner with Us
            </Link>

            {/* Merchant Portal - Ghost Button */}
            <Link
              href="/login"
              className={cn(
                'px-5 py-2.5 text-sm font-semibold text-[#1A1830]',
                'rounded-xl transition-all duration-200',
                'border border-slate-200 bg-transparent',
                'hover:bg-slate-50'
              )}
            >
              Merchant Portal
            </Link>

            {/* Sign In - Solid Button */}
            <Link
              href="/login"
              className={cn(
                'px-5 py-2.5 text-sm font-semibold text-white',
                'bg-[#1A1830] rounded-xl',
                'transition-all duration-200',
                'hover:bg-[#1A1830]/90 shadow-sm',
                'transform hover:scale-[1.02] active:scale-[0.98]'
              )}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-[#1A1830] hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white/95 backdrop-blur-md">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/flights"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/cars"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              href="/visa"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Visa
            </Link>
            <Link
              href="/merchant/onboarding"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner with Us
            </Link>
            <Link
              href="/login"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] border border-slate-200 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Merchant Portal
            </Link>
            <Link
              href="/login"
              className="block rounded-xl px-4 py-3 text-base font-medium text-white bg-[#1A1830] hover:bg-[#1A1830]/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
