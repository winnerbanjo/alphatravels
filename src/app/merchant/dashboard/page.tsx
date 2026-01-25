'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Wallet, TrendingUp, Calendar, LayoutDashboard, Plane, FileText, Store, Copy, Check, Building2, Car, Home } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// DEMO_DATA - Consolidated mock database
const DEMO_DATA = {
  stats: {
    totalBookings: 142,
    totalRevenue: '₦18,450,000',
    commissionEarned: '₦922,500',
    walletBalance: '₦120,000',
  },
  recentBookings: [
  {
    id: 'PNR-123456',
    flight: 'LOS → LHR',
    customer: 'Adebayo Okafor',
    status: 'Confirmed',
    commission: '₦45,000',
    date: '2026-01-24',
    revenue: '₦900,000',
  },
  {
    id: 'PNR-234567',
    flight: 'DXB → LOS',
    customer: 'Chioma Nwosu',
    status: 'Confirmed',
    commission: '₦38,500',
    date: '2026-01-24',
    revenue: '₦770,000',
  },
  {
    id: 'PNR-345678',
    flight: 'LOS → JFK',
    customer: 'Emeka Okoro',
    status: 'Confirmed',
    commission: '₦52,000',
    date: '2026-01-23',
    revenue: '₦1,040,000',
  },
  {
    id: 'PNR-456789',
    flight: 'CDG → LOS',
    customer: 'Folake Adeyemi',
    status: 'Confirmed',
    commission: '₦41,200',
    date: '2026-01-23',
    revenue: '₦824,000',
  },
  {
    id: 'PNR-567890',
    flight: 'LOS → YYZ',
    customer: 'Tunde Adebayo',
    status: 'Confirmed',
    commission: '₦48,750',
    date: '2026-01-22',
    revenue: '₦975,000',
  },
  {
    id: 'PNR-678901',
    flight: 'LHR → LOS',
    customer: 'Amina Bello',
    status: 'Confirmed',
    commission: '₦43,000',
    date: '2026-01-22',
    revenue: '₦860,000',
  },
  {
    id: 'PNR-789012',
    flight: 'LOS → DXB',
    customer: 'Chukwuemeka Nwosu',
    status: 'Confirmed',
    commission: '₦35,000',
    date: '2026-01-21',
    revenue: '₦700,000',
  },
  {
    id: 'PNR-890123',
    flight: 'JFK → LOS',
    customer: 'Fatima Ibrahim',
    status: 'Confirmed',
    commission: '₦55,000',
    date: '2026-01-21',
    revenue: '₦1,100,000',
  },
  {
    id: 'PNR-901234',
    flight: 'LOS → LHR',
    customer: 'Oluwaseun Adeyemi',
    status: 'Confirmed',
    commission: '₦46,500',
    date: '2026-01-20',
    revenue: '₦930,000',
  },
  {
    id: 'PNR-012345',
    flight: 'YYZ → LOS',
    customer: 'Kemi Okafor',
    status: 'Pending Payment',
    commission: '₦50,000',
    date: '2026-01-20',
    revenue: '₦1,000,000',
  },
  {
    id: 'PNR-135792',
    flight: 'LOS → JFK',
    customer: 'David Okonkwo',
    status: 'Confirmed',
    commission: '₦51,250',
    date: '2026-01-19',
    revenue: '₦1,025,000',
  },
  {
    id: 'PNR-246813',
    flight: 'DXB → LOS',
    customer: 'Blessing Eze',
    status: 'Confirmed',
    commission: '₦39,000',
    date: '2026-01-19',
    revenue: '₦780,000',
  },
  {
    id: 'PNR-369147',
    flight: 'LOS → LHR',
    customer: 'James Adeleke',
    status: 'Cancelled',
    commission: '₦0',
    date: '2026-01-18',
    revenue: '₦0',
  },
  {
    id: 'PNR-481516',
    flight: 'LHR → LOS',
    customer: 'Maryam Usman',
    status: 'Confirmed',
    commission: '₦44,000',
    date: '2026-01-18',
    revenue: '₦880,000',
  },
  {
    id: 'PNR-592637',
    flight: 'LOS → YYZ',
    customer: 'Peter Okafor',
    status: 'Pending Payment',
    commission: '₦47,500',
    date: '2026-01-17',
    revenue: '₦950,000',
  },
  {
    id: 'PNR-604851',
    flight: 'JFK → LOS',
    customer: 'Grace Chukwu',
    status: 'Confirmed',
    commission: '₦53,500',
    date: '2026-01-17',
    revenue: '₦1,070,000',
  },
  {
    id: 'PNR-715962',
    flight: 'LOS → DXB',
    customer: 'Michael Adebayo',
    status: 'Confirmed',
    commission: '₦36,250',
    date: '2026-01-16',
    revenue: '₦725,000',
  },
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

// Demo agent data
const AGENT_ID = 'agent-001';
const AGENT_NAME = 'Oyekunle Ade';

export default function MerchantDashboardPage() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [manualOrders, setManualOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [filterType, setFilterType] = useState<string>('all'); // 'all', 'hotel', 'car', 'shortlet'

  useEffect(() => {
    // Fetch manual orders
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/create');
        if (response.ok) {
          const data = await response.json();
          setManualOrders(data.orders || []);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/orders/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setManualOrders((prev) =>
          prev.map((order) => (order.id === orderId ? data.order : order))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = filterType === 'all' 
    ? manualOrders 
    : manualOrders.filter((order) => order.type === filterType);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getOrderIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return Building2;
      case 'car':
        return Car;
      case 'shortlet':
        return Home;
      default:
        return FileText;
    }
  };

  const getOrderTitle = (order: any) => {
    switch (order.type) {
      case 'hotel':
        return `${order.orderData.hotelName} - ${order.orderData.location}`;
      case 'car':
        return `${order.orderData.carName} (${order.orderData.category})`;
      case 'shortlet':
        return `${order.orderData.shortletName} - ${order.orderData.location}`;
      default:
        return 'Order';
    }
  };

  const handleCopyLink = async () => {
    try {
      const bookingLink = `${window.location.origin}/book/${AGENT_ID}`;
      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-serif font-bold text-white">A</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">Alpha Partner</h1>
                      <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full tracking-tight">
                        Verified Partner
                      </span>
                    </div>
                    <p className="text-slate-600 mt-2 tracking-tight">Welcome back, Agent</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-6 py-3 text-[#1A1830] tracking-tight',
                    'text-sm font-medium rounded-full',
                    'bg-white border-2 border-[#1A1830]',
                    'transition-all duration-200',
                    'hover:bg-[#1A1830] hover:text-white'
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy My Booking Link
                    </>
                  )}
                </button>
                <Link
                  href="/merchant/book-flight"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-8 py-4 text-white tracking-tight',
                    'text-sm font-medium rounded-full',
                    'bg-gradient-to-r from-[#1A1830] to-[#2A2540]',
                    'backdrop-blur-md shadow-2xl',
                    'transition-all duration-200',
                    'hover:opacity-90 hover:shadow-2xl'
                  )}
                >
                  <Search className="w-4 h-4" />
                  New Booking
                </Link>
              </div>
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
            {/* Wallet Balance */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-[#1A1830]" />
                </div>
              </div>
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Wallet Balance</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.walletBalance}</p>
              <Link
                href="/merchant/wallet"
                className="text-xs text-[#1A1830] hover:underline mt-2 inline-block tracking-tight"
              >
                View Wallet →
              </Link>
            </motion.div>

            {/* Total Bookings */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#1A1830]" />
                </div>
              </div>
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Total Bookings</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.totalBookings}</p>
              <p className="text-xs text-slate-500 mt-2 tracking-tight">All time</p>
            </motion.div>

            {/* Commission Earned */}
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
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Commission Earned</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{DEMO_DATA.stats.commissionEarned}</p>
            <p className="text-xs text-slate-500 mt-2 tracking-tight">Total Revenue: {DEMO_DATA.stats.totalRevenue}</p>
            </motion.div>
          </motion.div>

          {/* Recent Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Recent Activity</h2>
            </div>
            <div className="overflow-x-auto px-8 pb-8">
              <motion.table
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full"
              >
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      PNR
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Flight
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_DATA.recentBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      variants={itemVariants}
                      className="hover:bg-white/40 transition-colors"
                    >
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#1A1830] font-mono tracking-tight">{booking.id}</span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm text-slate-700 tracking-tight">{booking.flight}</span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm text-slate-700 tracking-tight">{booking.customer}</span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span
                          className={cn(
                            'inline-flex px-4 py-1.5 text-xs font-medium rounded-full tracking-tight',
                            booking.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'Pending Payment'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          )}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-700 tracking-tight">{booking.revenue}</span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#1A1830] tracking-tight">{booking.commission}</span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="text-sm text-slate-600 tracking-tight">{booking.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
            {DEMO_DATA.recentBookings.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-slate-500">No bookings yet. Start booking for your clients!</p>
              </div>
            )}
          </motion.div>

          {/* Manual Orders Table (Hotels/Cars/Shortlets) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl mt-8"
          >
            <div className="px-8 py-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Manual Orders</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      filterType === 'all' 
                        ? 'bg-[#1A1830] text-white' 
                        : 'bg-white/50 text-slate-700 hover:bg-white/70'
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('hotel')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      filterType === 'hotel' 
                        ? 'bg-[#1A1830] text-white' 
                        : 'bg-white/50 text-slate-700 hover:bg-white/70'
                    )}
                  >
                    Hotels
                  </button>
                  <button
                    onClick={() => setFilterType('car')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      filterType === 'car' 
                        ? 'bg-[#1A1830] text-white' 
                        : 'bg-white/50 text-slate-700 hover:bg-white/70'
                    )}
                  >
                    Cars
                  </button>
                  <button
                    onClick={() => setFilterType('shortlet')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      filterType === 'shortlet' 
                        ? 'bg-[#1A1830] text-white' 
                        : 'bg-white/50 text-slate-700 hover:bg-white/70'
                    )}
                  >
                    Shortlets
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto px-8 pb-8">
              {loadingOrders ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-slate-500">Loading orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-slate-500">No manual orders yet.</p>
                </div>
              ) : (
                <motion.table
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="w-full"
                >
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const Icon = getOrderIcon(order.type);
                      return (
                        <motion.tr
                          key={order.id}
                          variants={itemVariants}
                          className="hover:bg-white/40 transition-colors"
                        >
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className="text-sm font-medium text-[#1A1830] font-mono tracking-tight">{order.id}</span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-slate-600" />
                              <span className="text-sm text-slate-700 tracking-tight capitalize">{order.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className="text-sm text-slate-700 tracking-tight">{getOrderTitle(order)}</span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div>
                              <span className="text-sm text-slate-700 tracking-tight block">{order.customerInfo.name}</span>
                              <span className="text-xs text-slate-500 tracking-tight">{order.customerInfo.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              className={cn(
                                'px-3 py-1.5 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-[#1A1830]',
                                order.status === 'Confirmed' || order.status === 'Paid'
                                  ? 'bg-green-100 text-green-700'
                                  : order.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              )}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Paid">Paid</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className="text-sm font-medium text-slate-700 tracking-tight">{formatCurrency(order.totalPrice)}</span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className="text-sm text-slate-600 tracking-tight">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <button
                              onClick={() => {
                                const orderData = JSON.stringify(order, null, 2);
                                navigator.clipboard.writeText(orderData);
                                alert('Order details copied to clipboard');
                              }}
                              className="text-xs text-[#1A1830] hover:underline"
                            >
                              View Details
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </motion.table>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
