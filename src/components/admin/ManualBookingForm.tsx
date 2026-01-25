'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plane, Building2, Car, Home, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ManualBookingFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ManualBookingForm({ onClose, onSuccess }: ManualBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'flight',
    airline: '',
    pnr: '',
    price: '',
    customerName: '',
    customerEmail: '',
    customerId: '',
    merchantId: '',
    route: '',
    flightNumber: '',
    departureDate: '',
    arrivalDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/bookings/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Manual booking created successfully!');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert(data.message || 'Failed to create manual booking');
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-[#1A1830]">Quick Manual Book</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Booking Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Booking Type *</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'flight', label: 'Flight', icon: Plane },
                { value: 'hotel', label: 'Hotel', icon: Building2 },
                { value: 'car', label: 'Car', icon: Car },
                { value: 'shortlet', label: 'Shortlet', icon: Home },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: value })}
                  className={cn(
                    'flex flex-col items-center gap-2 px-4 py-3 border-2 rounded-lg transition-all',
                    formData.type === value
                      ? 'border-[#1A1830] bg-[#1A1830]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <Icon className="h-5 w-5 text-[#1A1830]" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Flight-specific fields */}
          {formData.type === 'flight' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Airline *</label>
                  <input
                    type="text"
                    required
                    value={formData.airline}
                    onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                    placeholder="e.g., Emirates, British Airways"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">PNR *</label>
                  <input
                    type="text"
                    required
                    value={formData.pnr}
                    onChange={(e) => setFormData({ ...formData, pnr: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent font-mono"
                    placeholder="ABC123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Route</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                    placeholder="LOS → LHR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Flight Number</label>
                  <input
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                    placeholder="BA 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Departure Date</label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Arrival Date</label>
                  <input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A1830] mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Customer Email *</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Customer ID (Optional)</label>
                <input
                  type="text"
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  placeholder="CUST-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assign to Merchant (Optional)</label>
                <input
                  type="text"
                  value={formData.merchantId}
                  onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  placeholder="MERCH-001"
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Total Price (₦) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              placeholder="1000000"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'flex-1 px-6 py-3 bg-[#1A1830] text-white rounded-lg',
                'hover:bg-[#1A1830]/90 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'font-semibold flex items-center justify-center gap-2'
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Manual Booking'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
