'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Users, Clock, Eye, ArrowRight, CheckCircle, XCircle, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import AdminSidebar from '@/src/components/admin/AdminSidebar';

// DEMO_DATA - Consolidated mock database
const DEMO_DATA = {
  stats: {
    networkVolume: '₦140,000,000',
    activeMerchants: 24,
    pendingApprovals: 3,
  },
  merchants: [
    {
      id: 'MERCH-001',
      name: 'Oyekunle Ade',
      email: 'oyekunle@alpha.com',
      totalSales: '₦8,450,000',
      bookings: 67,
      status: 'Active',
      joinDate: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-002',
      name: 'Chioma Nwosu',
      email: 'chioma@alpha.com',
      totalSales: '₦12,200,000',
      bookings: 98,
      status: 'Active',
      joinDate: '2023-11-20',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-003',
      name: 'Emeka Okoro',
      email: 'emeka@alpha.com',
      totalSales: '₦6,800,000',
      bookings: 54,
      status: 'Active',
      joinDate: '2024-03-10',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-004',
      name: 'Folake Adeyemi',
      email: 'folake@alpha.com',
      totalSales: '₦9,100,000',
      bookings: 72,
      status: 'Active',
      joinDate: '2024-02-05',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-005',
      name: 'Tunde Adebayo',
      email: 'tunde@alpha.com',
      totalSales: '₦15,600,000',
      bookings: 124,
      status: 'Active',
      joinDate: '2023-09-12',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
  ],
  pendingApprovals: [
    {
      id: 'PEND-001',
      name: 'Amina Bello',
      email: 'amina@alpha.com',
      submittedDate: '2026-01-20',
    },
    {
      id: 'PEND-002',
      name: 'David Okonkwo',
      email: 'david@alpha.com',
      submittedDate: '2026-01-22',
    },
    {
      id: 'PEND-003',
      name: 'Blessing Eze',
      email: 'blessing@alpha.com',
      submittedDate: '2026-01-23',
    },
  ],
  recentBookings: [
    { id: 'TICK-001', merchant: 'Oyekunle Ade', booking: 'LOS → LHR', amount: '₦900,000', time: '2m ago' },
    { id: 'TICK-002', merchant: 'Chioma Nwosu', booking: 'DXB → LOS', amount: '₦770,000', time: '5m ago' },
    { id: 'TICK-003', merchant: 'Emeka Okoro', booking: 'LOS → JFK', amount: '₦1,040,000', time: '8m ago' },
    { id: 'TICK-004', merchant: 'Folake Adeyemi', booking: 'CDG → LOS', amount: '₦824,000', time: '12m ago' },
    { id: 'TICK-005', merchant: 'Tunde Adebayo', booking: 'LOS → YYZ', amount: '₦975,000', time: '15m ago' },
  ],
  topPerformers: [
    { name: 'Tunde Adebayo', sales: '₦15.6M', bookings: 124, avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop' },
    { name: 'Chioma Nwosu', sales: '₦12.2M', bookings: 98, avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop' },
    { name: 'Folake Adeyemi', sales: '₦9.1M', bookings: 72, avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop' },
  ],
  revenueData: [
    { month: 'Oct', revenue: 12 },
    { month: 'Nov', revenue: 15 },
    { month: 'Dec', revenue: 18 },
    { month: 'Jan', revenue: 22 },
  ],
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function AdminDashboardPage() {
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
                  <span className="text-2xl font-serif font-bold text-white">A</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">Super Admin</h1>
                  <p className="text-slate-600 mt-2 tracking-tight">God View - Platform Command Center</p>
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
          {/* Stats Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Network Volume */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#1A1830]" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Network Volume</p>
              <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.networkVolume}</p>
              <p className="text-xs text-slate-500 mt-2 tracking-tight">Total platform revenue</p>
            </motion.div>

            {/* Active Merchants */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#1A1830]" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Active Merchants</p>
              <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.activeMerchants}</p>
              <p className="text-xs text-slate-500 mt-2 tracking-tight">Verified partners</p>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#1A1830]" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Pending Approvals</p>
              <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.pendingApprovals}</p>
              <p className="text-xs text-slate-500 mt-2 tracking-tight">Awaiting review</p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Merchant Manager & Revenue Chart */}
            <div className="lg:col-span-2 space-y-8">
              {/* Merchant Manager */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="px-8 py-6 border-b border-white/20">
                  <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Merchant Manager</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Agent Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Total Sales
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_DATA.merchants.map((merchant, index) => (
                        <motion.tr
                          key={merchant.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-white/10 hover:bg-white/40 transition-colors"
                        >
                          <td className="px-6 py-6">
                            <div>
                              <p className="text-sm font-medium text-[#1A1830] tracking-tight">{merchant.name}</p>
                              <p className="text-xs text-slate-500 tracking-tight">{merchant.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className="text-sm font-medium text-slate-700 tracking-tight">{merchant.totalSales}</span>
                          </td>
                          <td className="px-6 py-6">
                            <span className="text-sm text-slate-700 tracking-tight">{merchant.bookings}</span>
                          </td>
                          <td className="px-6 py-6">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full tracking-tight">
                              {merchant.status}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <button
                              className={cn(
                                'inline-flex items-center gap-2',
                                'px-4 py-2 bg-[#1A1830] text-white',
                                'rounded-xl text-xs font-medium tracking-tight',
                                'hover:bg-[#1A1830]/90 transition-all duration-200'
                              )}
                            >
                              <Eye className="w-3 h-3" />
                              Manage
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Global Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="px-8 py-6 border-b border-white/20">
                  <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Global Revenue Chart</h2>
                </div>
                <div className="p-8">
                  <div className="flex items-end justify-between gap-4 h-64">
                    {DEMO_DATA.revenueData.map((data, index) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-3">
                        <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.revenue / 22) * 100}%` }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="w-full bg-gradient-to-t from-[#1A1830] to-[#2A2540] rounded-t-xl min-h-[40px]"
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600 tracking-tight">{data.month}</span>
                        <span className="text-xs text-slate-500 tracking-tight">₦{data.revenue}M</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar: Pending Approvals, Top Performers, Global Ticker */}
            <div className="space-y-8">
              {/* Merchant Approval Queue */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="px-8 py-6 border-b border-white/20">
                  <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Merchant Approval Queue</h2>
                </div>
                <div className="p-6 space-y-4">
                  {DEMO_DATA.pendingApprovals.map((approval) => (
                    <div
                      key={approval.id}
                      className="p-4 rounded-xl bg-white/50 border border-white/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-[#1A1830] tracking-tight">{approval.name}</h3>
                          <p className="text-xs text-slate-500 tracking-tight">{approval.email}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 tracking-tight">Submitted: {approval.submittedDate}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors tracking-tight">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Approve
                        </button>
                        <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors tracking-tight">
                          <XCircle className="w-3 h-3 inline mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Performing Agents */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="px-8 py-6 border-b border-white/20">
                  <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Top Performing Agents</h2>
                </div>
                <div className="p-6 space-y-4">
                  {DEMO_DATA.topPerformers.map((performer, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/20"
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={performer.avatar}
                          alt={performer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#1A1830] tracking-tight truncate">{performer.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-600 tracking-tight">{performer.sales}</span>
                          <span className="text-xs text-slate-500 tracking-tight">• {performer.bookings} bookings</span>
                        </div>
                      </div>
                      {index === 0 && (
                        <Zap className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Global Revenue Ticker */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="px-8 py-6 border-b border-white/20">
                  <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Live Network Feed</h2>
                </div>
                <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
                  {DEMO_DATA.recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3 rounded-xl bg-white/50 border border-white/20"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-[#1A1830] tracking-tight">{booking.merchant}</span>
                        <span className="text-xs text-slate-500 tracking-tight">{booking.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 tracking-tight">{booking.booking}</span>
                        <span className="text-xs font-semibold text-[#1A1830] tracking-tight">{booking.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
