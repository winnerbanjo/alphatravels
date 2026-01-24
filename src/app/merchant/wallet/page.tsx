'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Wallet, ArrowLeft, Building2, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const pendingCommissions = [
  {
    id: 'PNR-123456',
    booking: 'LHR → LOS',
    customer: 'Adebayo Okafor',
    amount: '₦45,000',
    status: 'Pending',
    date: '2026-01-24',
  },
  {
    id: 'PNR-234567',
    booking: 'DXB → LOS',
    customer: 'Chioma Nwosu',
    amount: '₦38,500',
    status: 'Pending',
    date: '2026-01-23',
  },
  {
    id: 'PNR-345678',
    booking: 'JFK → LOS',
    customer: 'Emeka Okoro',
    amount: '₦52,000',
    status: 'Processing',
    date: '2026-01-22',
  },
];

const nigerianBanks = [
  'Access Bank',
  'First Bank of Nigeria',
  'Guaranty Trust Bank (GTB)',
  'United Bank for Africa (UBA)',
  'Zenith Bank',
  'Fidelity Bank',
  'Union Bank',
  'Stanbic IBTC Bank',
  'Ecobank Nigeria',
  'Sterling Bank',
];

export default function MerchantWalletPage() {
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payout request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPayoutForm(false);
      alert('Payout request submitted successfully! Funds will be transferred within 24-48 hours.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/merchant/dashboard"
                className="text-[#1A1830] hover:text-[#1A1830]/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-[#1A1830]">Wallet</h1>
                <p className="text-slate-600 mt-1">Manage your commissions and withdrawals</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#1A1830] to-[#2A2540] rounded-[2.5rem] shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80 mb-1">Available for Withdrawal</p>
                <p className="text-5xl font-bold text-white">₦120,000</p>
              </div>
            </div>
          </div>

          {!showPayoutForm ? (
            <button
              onClick={() => setShowPayoutForm(true)}
              className={cn(
                'w-full sm:w-auto px-8 py-4 bg-white text-[#1A1830]',
                'text-lg font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-white/90 hover:shadow-xl',
                'transform hover:scale-[1.02] active:scale-[0.98]'
              )}
            >
              Request Payout
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Bank Name
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="">Select Bank</option>
                  {nigerianBanks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="10-digit account number"
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="Account holder name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPayoutForm(false)}
                  className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'flex-1 px-6 py-3 bg-white text-[#1A1830]',
                    'rounded-xl font-semibold',
                    'hover:bg-white/90 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Pending Commissions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-[#1A1830]">Pending Commissions</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {pendingCommissions.map((commission, index) => (
              <motion.div
                key={commission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-[#1A1830] font-mono">
                        {commission.id}
                      </span>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full',
                          commission.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        )}
                      >
                        {commission.status === 'Pending' ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {commission.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{commission.booking}</p>
                    <p className="text-xs text-slate-500">{commission.customer} • {commission.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#1A1830]">{commission.amount}</p>
                    <p className="text-xs text-slate-500">Commission</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {pendingCommissions.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500">No pending commissions</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
