'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, XCircle, Users, Mail, Calendar, TrendingUp, Clock, Search, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import AdminSidebar from '@/src/components/admin/AdminSidebar';

// DEMO_DATA - Merchant Management
const DEMO_DATA = {
  merchants: [
    {
      id: 'MERCH-001',
      name: 'Oyekunle Ade',
      email: 'oyekunle@alpha.com',
      totalSales: '₦8,450,000',
      bookings: 67,
      status: 'Verified',
      joinDate: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-002',
      name: 'Chioma Nwosu',
      email: 'chioma@alpha.com',
      totalSales: '₦12,200,000',
      bookings: 98,
      status: 'Verified',
      joinDate: '2023-11-20',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-003',
      name: 'Emeka Okoro',
      email: 'emeka@alpha.com',
      totalSales: '₦6,800,000',
      bookings: 54,
      status: 'Verified',
      joinDate: '2024-03-10',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-004',
      name: 'Folake Adeyemi',
      email: 'folake@alpha.com',
      totalSales: '₦9,100,000',
      bookings: 72,
      status: 'Verified',
      joinDate: '2024-02-05',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-005',
      name: 'Tunde Adebayo',
      email: 'tunde@alpha.com',
      totalSales: '₦15,600,000',
      bookings: 124,
      status: 'Verified',
      joinDate: '2023-09-12',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'PEND-001',
      name: 'Amina Bello',
      email: 'amina@alpha.com',
      totalSales: '₦0',
      bookings: 0,
      status: 'Pending',
      joinDate: '2026-01-20',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'PEND-002',
      name: 'David Okonkwo',
      email: 'david@alpha.com',
      totalSales: '₦0',
      bookings: 0,
      status: 'Pending',
      joinDate: '2026-01-22',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'PEND-003',
      name: 'Blessing Eze',
      email: 'blessing@alpha.com',
      totalSales: '₦0',
      bookings: 0,
      status: 'Pending',
      joinDate: '2026-01-23',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'MERCH-006',
      name: 'Sarah Jenkins',
      email: 'sarah@alpha.com',
      totalSales: '₦11,300,000',
      bookings: 89,
      status: 'Verified',
      joinDate: '2023-12-08',
      avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop',
    },
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

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchMerchants();
  }, [searchQuery, statusFilter]);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/admin/merchants?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setMerchants(data.merchants || []);
      }
    } catch (error) {
      console.error('Failed to fetch merchants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (merchantId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/merchants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, action }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh merchants list
        fetchMerchants();
      } else {
        alert(data.message || 'Failed to update merchant status');
      }
    } catch (error) {
      console.error('Failed to update merchant:', error);
      alert('Failed to update merchant status');
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
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">Merchant Management</h1>
                  <p className="text-slate-600 mt-2 tracking-tight">Agent approval list & network overview</p>
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
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email, ID, or company name..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
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
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Verified Agents</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {loading ? '...' : merchants.filter((m) => m.status === 'Verified').length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Pending Approval</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">
                    {loading ? '...' : merchants.filter((m) => m.status === 'Pending').length}
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
                  <TrendingUp className="w-6 h-6 text-[#1A1830]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 tracking-tight">Total Network Sales</p>
                  <p className="text-3xl font-medium text-[#1A1830] tracking-tight">₦140M</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Merchant Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6 border-b border-white/20">
              <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">All Merchants</h2>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="px-8 py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1A1830] mx-auto mb-4" />
                  <p className="text-slate-600">Loading merchants...</p>
                </div>
              ) : merchants.length === 0 ? (
                <div className="px-8 py-12 text-center">
                  <p className="text-slate-600">No merchants found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Contact
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
                    {merchants.map((merchant, index) => (
                    <motion.tr
                      key={merchant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-white/10 hover:bg-white/40 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={merchant.avatar}
                              alt={merchant.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1A1830] tracking-tight">{merchant.name}</p>
                            <p className="text-xs text-slate-500 tracking-tight flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              Joined {merchant.joinDate}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-sm text-slate-700 tracking-tight">
                          <Mail className="w-4 h-4" />
                          {merchant.email}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm font-medium text-slate-700 tracking-tight">{merchant.totalSales}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm text-slate-700 tracking-tight">{merchant.bookings}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={cn(
                            'px-3 py-1 text-xs font-medium rounded-full tracking-tight',
                            merchant.status === 'Verified'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          )}
                        >
                          {merchant.status === 'Verified' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 inline" />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 inline" />
                              Pending
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        {merchant.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(merchant.id, 'approve')}
                              className={cn(
                                'inline-flex items-center gap-2',
                                'px-4 py-2 bg-green-600 text-white',
                                'rounded-xl text-xs font-medium tracking-tight',
                                'hover:bg-green-700 transition-all duration-200'
                              )}
                            >
                              <CheckCircle className="w-3 h-3" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(merchant.id, 'reject')}
                              className={cn(
                                'inline-flex items-center gap-2',
                                'px-4 py-2 bg-red-100 text-red-700',
                                'rounded-xl text-xs font-medium tracking-tight',
                                'hover:bg-red-200 transition-all duration-200'
                              )}
                            >
                              <XCircle className="w-3 h-3" />
                              Reject
                            </button>
                          </div>
                        ) : merchant.status === 'Verified' ? (
                          <button
                            onClick={() => handleStatusUpdate(merchant.id, 'suspend')}
                            className={cn(
                              'inline-flex items-center gap-2',
                              'px-4 py-2 bg-yellow-100 text-yellow-700',
                              'rounded-xl text-xs font-medium tracking-tight',
                              'hover:bg-yellow-200 transition-all duration-200'
                            )}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusUpdate(merchant.id, 'verify')}
                            className={cn(
                              'inline-flex items-center gap-2',
                              'px-4 py-2 bg-green-600 text-white',
                              'rounded-xl text-xs font-medium tracking-tight',
                              'hover:bg-green-700 transition-all duration-200'
                            )}
                          >
                            <CheckCircle className="w-3 h-3" />
                            Verify
                          </button>
                        )}
                      </td>
                    </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
