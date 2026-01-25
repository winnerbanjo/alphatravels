'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Emergency Contact Banner */}
      <div className="bg-[#1D4ED8] text-white text-center py-2 text-xs sm:text-sm font-medium w-full">
        Emergency Contact
      </div>

      {/* Sticky White Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-2xl font-serif font-bold text-white">A</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-[#1A1830] tracking-tight block">
                Alpha Travels
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex md:items-center md:gap-6">
              <Link
                href="/flights"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] rounded-xl transition-all duration-200 hover:bg-[#F8FAFC]"
              >
                Flights
              </Link>
              <Link
                href="/hotels"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] rounded-xl transition-all duration-200 hover:bg-[#F8FAFC]"
              >
                Hotels
              </Link>
              <Link
                href="/cars"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] rounded-xl transition-all duration-200 hover:bg-[#F8FAFC]"
              >
                Car Rental
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1A1830] rounded-xl transition-all duration-200 hover:bg-[#1A1830]/90"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-[#1A1830] hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer - Full width slide down with animation */}
        <div
          className={cn(
            'md:hidden border-t border-[#E2E8F0] bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-1 px-4 pb-6 pt-4">
            <Link
              href="/flights"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/hotels"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shortlets
            </Link>
            <Link
              href="/profile"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Manage Bookings
            </Link>
            <Link
              href="/cars"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Car Rental
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
