'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, Calendar, Users, Home } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ShortletBookingFormProps {
  shortlet: {
    id: string;
    name: string;
    location: string;
    price: string;
  };
  onClose: () => void;
}

export default function ShortletBookingForm({ shortlet, onClose }: ShortletBookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    occupants: '2',
    specialRequests: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total price
      const pricePerNight = parseInt(shortlet.price.replace(/[₦,]/g, ''), 10);
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = pricePerNight * nights;

      // Create order
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'shortlet',
          orderData: {
            shortletName: shortlet.name,
            location: shortlet.location,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            occupants: parseInt(formData.occupants, 10),
            nights,
            specialRequests: formData.specialRequests,
          },
          customerInfo: {
            name: formData.guestName,
            email: formData.guestEmail,
            phone: formData.guestPhone,
          },
          totalPrice,
        }),
      });

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        // Store order ID in sessionStorage for checkout
        sessionStorage.setItem('shortletOrderId', orderResult.order.id);
        sessionStorage.setItem('shortletOrderData', JSON.stringify(orderResult.order));

        // Redirect to checkout
        router.push(`/checkout?type=shortlet&name=${encodeURIComponent(shortlet.name)}&price=${totalPrice}&location=${encodeURIComponent(shortlet.location)}&orderId=${orderResult.order.id}`);
      } else {
        alert('Failed to create booking. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-[#1A1830]">Book {shortlet.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Guest Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A1830] mb-4">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.guestPhone}
                  onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A1830] mb-4">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={formData.checkIn || today}
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Occupants *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.occupants}
                    onChange={(e) => setFormData({ ...formData, occupants: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="Any special requests, preferences, or additional information..."
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
                'flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-lg',
                'hover:bg-[#2563EB] transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'font-semibold'
              )}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
