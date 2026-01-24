'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl bg-white/70 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
      <div className="flex items-center justify-between">
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
            <Link
              href="/flights"
              className={cn(
                'px-6 py-2.5 text-sm font-medium text-[#1A1830] tracking-tight',
                'rounded-full transition-all duration-200',
                'hover:bg-white/60 hover:text-[#1A1830]'
              )}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className={cn(
                'px-6 py-2.5 text-sm font-medium text-[#1A1830] tracking-tight',
                'rounded-full transition-all duration-200',
                'hover:bg-white/60 hover:text-[#1A1830]'
              )}
            >
              Hotels
            </Link>
            <Link
              href="/cars"
              className={cn(
                'px-6 py-2.5 text-sm font-medium text-[#1A1830] tracking-tight',
                'rounded-full transition-all duration-200',
                'hover:bg-white/60 hover:text-[#1A1830]'
              )}
            >
              Cars
            </Link>
            <Link
              href="/login"
              className={cn(
                'px-6 py-2.5 text-sm font-medium text-white tracking-tight',
                'lustre-button rounded-full',
                'transition-all duration-200',
                'hover:opacity-90 shadow-lg'
              )}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/20 glass-light rounded-2xl">
          <div className="space-y-2 px-4 pb-4">
            <Link
              href="/flights"
              className="block rounded-full px-6 py-3 text-base font-medium text-[#1A1830] tracking-tight hover:bg-white/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="block rounded-full px-6 py-3 text-base font-medium text-[#1A1830] tracking-tight hover:bg-white/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/cars"
              className="block rounded-full px-6 py-3 text-base font-medium text-[#1A1830] tracking-tight hover:bg-white/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              href="/login"
              className="block rounded-full px-6 py-3 text-base font-medium text-white tracking-tight lustre-button hover:opacity-90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
