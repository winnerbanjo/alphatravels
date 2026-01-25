'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Percent, DollarSign, Settings, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AdminSidebar from '@/src/components/admin/AdminSidebar';
import { useState, useEffect } from 'react';

// DEMO_DATA - Revenue Control Settings
const DEMO_DATA = {
  currentCommission: 5,
  totalRevenue: '₦140,000,000',
  platformFee: '₦7,000,000',
  merchantPayouts: '₦133,000,000',
  revenueData: [
    { month: 'Oct', revenue: 12, commission: 0.6 },
    { month: 'Nov', revenue: 15, commission: 0.75 },
    { month: 'Dec', revenue: 18, commission: 0.9 },
    { month: 'Jan', revenue: 22, commission: 1.1 },
  ],
};

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

export default function AdminRevenuePage() {
  const [commissionRate, setCommissionRate] = useState(DEMO_DATA.currentCommission);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/revenue');
      const data = await response.json();
      if (data.success) {
        setRevenueData(data.revenue);
      }
    } catch (error) {
      console.error('Failed to fetch revenue:', error);
    } finally {
      setLoading(false);
    }
  };

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
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">Revenue Control</h1>
                  <p className="text-slate-600 mt-2 tracking-tight">Profit margin settings & financial overview</p>
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
          {/* Revenue Stats */}
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
                  <DollarSign className="w-6 h-6 text-[#1A1830]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Total Network Revenue</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (revenueData?.totalRevenue || DEMO_DATA.totalRevenue)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Percent className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Platform Fee Collected</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (revenueData?.platformFee || DEMO_DATA.platformFee)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Service Fees: {loading ? '...' : (revenueData?.serviceFees || '₦0')} | Commission: {loading ? '...' : (revenueData?.commission || '₦0')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Merchant Payouts</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (revenueData?.merchantPayouts || DEMO_DATA.merchantPayouts)}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Commission Settings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-[#1A1830]" />
                  <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Commission Settings</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-4 tracking-tight">
                    Global Commission Rate
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1A1830]"
                    />
                    <div className="w-24 px-4 py-3 bg-[#1A1830] text-white rounded-xl text-center">
                      <span className="text-2xl font-bold tracking-tight">{commissionRate}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 tracking-tight">
                    This rate applies to all merchants across the platform
                  </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 tracking-tight">Example Booking (₦1,000,000)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 tracking-tight">Platform Fee ({commissionRate}%)</span>
                      <span className="text-sm font-semibold text-[#1A1830] tracking-tight">
                        ₦{(1000000 * (commissionRate / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-sm font-medium text-slate-700 tracking-tight">Merchant Receives</span>
                      <span className="text-sm font-semibold text-green-600 tracking-tight">
                        ₦{(1000000 * (1 - commissionRate / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className={cn(
                    'w-full px-6 py-4 bg-gradient-to-r from-[#1A1830] to-[#2A2540] text-white',
                    'rounded-xl text-sm font-medium tracking-tight',
                    'hover:opacity-90 transition-all duration-200',
                    'shadow-lg'
                  )}
                >
                  Save Commission Settings
                </button>
              </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Revenue Trend</h2>
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
        </div>
      </div>
    </div>
  );
}
