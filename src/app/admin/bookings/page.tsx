'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Plane, Calendar, User, DollarSign, CheckCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AdminSidebar from '@/src/components/admin/AdminSidebar';

// DEMO_DATA - Global Bookings (Master PNR List)
const DEMO_DATA = {
  bookings: [
    {
      id: 'RJH3K2',
      pnr: 'RJH3K2',
      merchant: 'Oyekunle Ade',
      route: 'LOS → LHR',
      passenger: 'Adebayo Okafor',
      amount: '₦900,000',
      date: '2026-01-20',
      status: 'Confirmed',
      flightNumber: 'BA 75',
    },
    {
      id: 'DXB7M9',
      pnr: 'DXB7M9',
      merchant: 'Chioma Nwosu',
      route: 'DXB → LOS',
      passenger: 'Folake Adeyemi',
      amount: '₦770,000',
      date: '2026-01-19',
      status: 'Confirmed',
      flightNumber: 'EK 783',
    },
    {
      id: 'JFK4P1',
      pnr: 'JFK4P1',
      merchant: 'Emeka Okoro',
      route: 'LOS → JFK',
      passenger: 'Tunde Adebayo',
      amount: '₦1,040,000',
      date: '2026-01-18',
      status: 'Confirmed',
      flightNumber: 'DL 201',
    },
    {
      id: 'CDG2Q8',
      pnr: 'CDG2Q8',
      merchant: 'Folake Adeyemi',
      route: 'CDG → LOS',
      passenger: 'Sarah Jenkins',
      amount: '₦824,000',
      date: '2026-01-17',
      status: 'Confirmed',
      flightNumber: 'AF 995',
    },
    {
      id: 'YYZ9R3',
      pnr: 'YYZ9R3',
      merchant: 'Tunde Adebayo',
      route: 'LOS → YYZ',
      passenger: 'David Okonkwo',
      amount: '₦975,000',
      date: '2026-01-16',
      status: 'Confirmed',
      flightNumber: 'AC 60',
    },
    {
      id: 'LHR5S7',
      pnr: 'LHR5S7',
      merchant: 'Sarah Jenkins',
      route: 'LHR → LOS',
      passenger: 'Amina Bello',
      amount: '₦890,000',
      date: '2026-01-15',
      status: 'Confirmed',
      flightNumber: 'BA 76',
    },
    {
      id: 'DXB8T2',
      pnr: 'DXB8T2',
      merchant: 'Chioma Nwosu',
      route: 'DXB → LOS',
      passenger: 'Blessing Eze',
      amount: '₦765,000',
      date: '2026-01-14',
      status: 'Confirmed',
      flightNumber: 'EK 784',
    },
    {
      id: 'JFK1U9',
      pnr: 'JFK1U9',
      merchant: 'Oyekunle Ade',
      route: 'LOS → JFK',
      passenger: 'Emeka Okoro',
      amount: '₦1,120,000',
      date: '2026-01-13',
      status: 'Confirmed',
      flightNumber: 'DL 202',
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function AdminBookingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed God-View Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-72">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A1830] to-[#2A2540] rounded-lg flex items-center justify-center shadow-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">Global Bookings</h1>
                  <p className="text-slate-600 mt-2 tracking-tight">Master PNR list across the entire network</p>
                </div>
              </div>
              <Link
                href="/"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-6 py-3 text-white tracking-tight',
                  'text-sm font-medium rounded-full',
                  'bg-gradient-to-r from-[#1A1830] to-[#2A2540]',
                  'transition-all duration-200',
                  'hover:opacity-90'
                )}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Site
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 mx-auto max-w-7xl px-8 py-12 w-full">
          {/* Stats Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-[#1A1830]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Total Bookings</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.bookings.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Confirmed</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {DEMO_DATA.bookings.filter((b) => b.status === 'Confirmed').length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#1A1830]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Total Revenue</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">₦7.3M</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6 border-b border-white/20">
              <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Master PNR List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      PNR
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Passenger
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Merchant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_DATA.bookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-white/10 hover:bg-white/40 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1A1830] tracking-tight font-mono">{booking.pnr}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <Plane className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700 tracking-tight">{booking.route}</span>
                          <span className="text-xs text-slate-500 tracking-tight">({booking.flightNumber})</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-700 tracking-tight">{booking.passenger}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm text-slate-700 tracking-tight">{booking.merchant}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm font-semibold text-[#1A1830] tracking-tight">{booking.amount}</span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-700 tracking-tight">{booking.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full tracking-tight flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          {booking.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
