'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, LayoutDashboard, Plane, FileText, Wallet, Store } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Navigation items
const navItems = [
  {
    name: 'Dashboard',
    href: '/merchant/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Storefront',
    href: '/book/agent-001',
    icon: Store,
  },
  {
    name: 'Book Flight',
    href: '/merchant/book-flight',
    icon: Plane,
  },
  {
    name: 'Client Bookings',
    href: '/merchant/bookings',
    icon: FileText,
  },
  {
    name: 'Earnings',
    href: '/merchant/wallet',
    icon: Wallet,
  },
];

export default function MerchantBookingsPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-xl font-serif font-bold text-white">A</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1A1830] tracking-tight">Alpha Partner</h2>
              <p className="text-xs text-slate-500">Merchant Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-[#1A1830] text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-slate-500')} />
                    <span className="text-sm font-medium tracking-tight">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Link
                href="/merchant/dashboard"
                className="text-[#1A1830] hover:text-[#1A1830]/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">My Bookings</h1>
                <p className="text-slate-600 mt-2 tracking-tight">View all PNRs you've generated</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 mx-auto max-w-7xl px-8 py-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-12 shadow-2xl text-center"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-[#1A1830] mb-2 tracking-tight">No Bookings Yet</h2>
            <p className="text-slate-600 mb-6 tracking-tight">
              Start booking flights for your clients to see them here.
            </p>
            <Link
              href="/merchant/book-flight"
              className={cn(
                'inline-flex items-center gap-2',
                'px-6 py-3 text-white tracking-tight',
                'text-sm font-medium rounded-full',
                'bg-gradient-to-r from-[#1A1830] to-[#2A2540]',
                'transition-all duration-200',
                'hover:opacity-90'
              )}
            >
              <Plane className="w-4 h-4" />
              Book Your First Flight
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
