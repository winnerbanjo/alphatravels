'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Plane, Bed, Home, Briefcase, Car, MapPin, Compass, Phone } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState('flights');

  return (
    <>
      {/* Tier 1: Emergency Bar - Mobile Only */}
      <div className="sm:hidden bg-[#000080] text-white text-center py-2 px-2 text-[11px] sm:text-xs font-medium w-full">
        For emergency, kindly contact 0906 339 9174. Immediate response is assured.
      </div>
      {/* Desktop Emergency Bar */}
      <div className="hidden sm:block bg-[#000080] text-white text-center py-2 text-xs sm:text-sm font-medium w-full">
        For emergency, kindly contact 07037744475 an immediate response is assured.
      </div>

      {/* Tier 2: Business Info Bar - Mobile Only */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-slate-600">Address: </span>
            <span className="text-xs text-slate-900 font-medium leading-tight">
              7 Chief Tajudeen Odubiyi St, Ilasamaja, Lagos 102214, Lagos
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-slate-600 flex-shrink-0" />
          <span className="text-xs font-medium text-slate-600">Get there: </span>
          <span className="text-xs text-slate-900 font-medium">1 hr 4 mins</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-600 flex-shrink-0" />
          <span className="text-xs font-medium text-slate-600">Phone: </span>
          <a href="tel:09063399174" className="text-xs text-slate-900 font-medium hover:text-[#000080]">
            0906 339 9174
          </a>
        </div>
      </div>

      {/* Tier 3: Brand & Hamburger - Mobile Only */}
      <div className="sm:hidden sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4">
          <div className="flex h-[60px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-2xl font-serif font-bold text-white">A</span>
              </div>
              <span className="text-lg font-semibold text-[#1A1830] tracking-tight block">
                Alpha Travels
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-[#1A1830] hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2"
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

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            'border-t border-[#E2E8F0] bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-1 px-4 pb-6 pt-4">
            <Link
              href="/hotels"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotel
            </Link>
            <Link
              href="/visa"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Visa
            </Link>
            <Link
              href="/services"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vacation Packages
            </Link>
            <Link
              href="/merchant/onboarding"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become an affiliate
            </Link>
            <Link
              href="/login"
              className="block rounded-xl px-4 py-3 text-base font-medium text-[#1A1830] border border-slate-200 hover:bg-slate-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/merchant/register"
              className="block rounded-xl px-4 py-3 text-base font-medium text-white bg-[#FFB800] hover:bg-[#FFB800]/90 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2: Navigation Bar - Desktop Only */}
      <header className="hidden sm:block sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
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

            {/* Desktop Navigation - Centered Links */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <Link
                href="/hotels"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] transition-all duration-200 hover:text-[#000080]"
              >
                Hotel
              </Link>
              <Link
                href="/visa"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] transition-all duration-200 hover:text-[#000080]"
              >
                Visa
              </Link>
              <Link
                href="/services"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] transition-all duration-200 hover:text-[#000080]"
              >
                Vacation Packages
              </Link>
              <Link
                href="/merchant/onboarding"
                className="px-4 py-2 text-sm font-medium text-[#1A1830] transition-all duration-200 hover:text-[#000080]"
              >
                Become an affiliate
              </Link>
            </div>

            {/* Desktop Right Side - Login & Create Account */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-semibold text-[#1A1830] transition-all duration-200 hover:text-[#000080]"
              >
                Login
              </Link>
              <Link
                href="/merchant/register"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#FFB800] rounded-lg transition-all duration-200 hover:bg-[#FFB800]/90 shadow-sm"
              >
                Create account
              </Link>
            </div>

            {/* Desktop menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-[#1A1830] hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2"
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
      </header>

      {/* Tier 4: Service Icon Grid - Mobile Only */}
      <div className="sm:hidden sticky top-[60px] z-40 w-full bg-white shadow-md border-b border-slate-200 mt-2">
        <div className="px-4">
          <div className="grid grid-cols-2 gap-2 py-3">
            {/* Flights - Active */}
            <button
              type="button"
              onClick={() => setActiveServiceTab('flights')}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all',
                'border-b-2 border-transparent',
                activeServiceTab === 'flights'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-900'
              )}
            >
              <Plane className="h-4 w-4" />
              <span className="uppercase">FLIGHTS</span>
            </button>

            {/* Hotels */}
            <button
              type="button"
              onClick={() => setActiveServiceTab('hotels')}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all',
                'border-b-2 border-transparent',
                activeServiceTab === 'hotels'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-900'
              )}
            >
              <Bed className="h-4 w-4" />
              <span className="uppercase">HOTELS</span>
            </button>

            {/* Shortlets */}
            <button
              type="button"
              onClick={() => setActiveServiceTab('shortlets')}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all',
                'border-b-2 border-transparent',
                activeServiceTab === 'shortlets'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-900'
              )}
            >
              <Home className="h-4 w-4" />
              <span className="uppercase">SHORTLETS</span>
            </button>

            {/* Manage Bookings */}
            <button
              type="button"
              onClick={() => setActiveServiceTab('bookings')}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all',
                'border-b-2 border-transparent',
                activeServiceTab === 'bookings'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-900'
              )}
            >
              <Briefcase className="h-4 w-4" />
              <span className="uppercase">MANAGE BOOKINGS</span>
            </button>

            {/* Car Rental */}
            <button
              type="button"
              onClick={() => setActiveServiceTab('cars')}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all',
                'border-b-2 border-transparent',
                activeServiceTab === 'cars'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-900'
              )}
            >
              <Car className="h-4 w-4" />
              <span className="uppercase">CAR RENTAL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: Service Tabs Bar - Desktop Only */}
      <div className="hidden sm:block sticky top-16 md:top-20 z-40 w-full bg-white shadow-md border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => setActiveServiceTab('flights')}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap',
                'border-b-2 border-transparent',
                activeServiceTab === 'flights'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-600 hover:text-[#000080]'
              )}
            >
              <Plane className="h-4 w-4" />
              <span>Flight</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab('hotels')}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap',
                'border-b-2 border-transparent',
                activeServiceTab === 'hotels'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-600 hover:text-[#000080]'
              )}
            >
              <Bed className="h-4 w-4" />
              <span>Hotel</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab('shortlets')}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap',
                'border-b-2 border-transparent',
                activeServiceTab === 'shortlets'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-600 hover:text-[#000080]'
              )}
            >
              <Home className="h-4 w-4" />
              <span>Shortlets</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab('business')}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap',
                'border-b-2 border-transparent',
                activeServiceTab === 'business'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-600 hover:text-[#000080]'
              )}
            >
              <Briefcase className="h-4 w-4" />
              <span>Business</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab('cars')}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap',
                'border-b-2 border-transparent',
                activeServiceTab === 'cars'
                  ? 'text-[#000080] border-b-2 border-[#000080]'
                  : 'text-slate-600 hover:text-[#000080]'
              )}
            >
              <Car className="h-4 w-4" />
              <span>Car Rental</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
