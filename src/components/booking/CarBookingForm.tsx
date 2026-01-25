'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, Calendar, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CarBookingFormProps {
  car: {
    id: string;
    name: string;
    category: string;
    price: string;
  };
  onClose: () => void;
}

export default function CarBookingForm({ car, onClose }: CarBookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    driverName: '',
    driverEmail: '',
    driverPhone: '',
    driverLicense: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    chauffeurService: false,
    specialRequests: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total price
      const pricePerDay = parseInt(car.price.replace(/[₦,]/g, ''), 10);
      const pickupDate = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
      const chauffeurFee = formData.chauffeurService ? 15000 * days : 0;
      const totalPrice = (pricePerDay * days) + chauffeurFee;

      // Create order
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'car',
          orderData: {
            carName: car.name,
            category: car.category,
            pickupLocation: formData.pickupLocation,
            dropoffLocation: formData.dropoffLocation,
            pickupDate: formData.pickupDate,
            pickupTime: formData.pickupTime,
            returnDate: formData.returnDate,
            returnTime: formData.returnTime,
            chauffeurService: formData.chauffeurService,
            days,
            specialRequests: formData.specialRequests,
          },
          customerInfo: {
            name: formData.driverName,
            email: formData.driverEmail,
            phone: formData.driverPhone,
            licenseNumber: formData.driverLicense,
          },
          totalPrice,
        }),
      });

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        // Store order ID in sessionStorage for checkout
        sessionStorage.setItem('carOrderId', orderResult.order.id);
        sessionStorage.setItem('carOrderData', JSON.stringify(orderResult.order));

        // Redirect to checkout
        router.push(`/checkout?type=car&name=${encodeURIComponent(car.name)}&price=${totalPrice}&category=${encodeURIComponent(car.category)}&orderId=${orderResult.order.id}`);
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
          <h2 className="text-2xl font-bold text-[#1A1830]">Book {car.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Driver Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A1830] mb-4">Driver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.driverEmail}
                  onChange={(e) => setFormData({ ...formData, driverEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.driverPhone}
                  onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Driver's License Number *</label>
                <input
                  type="text"
                  required
                  value={formData.driverLicense}
                  onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="ABC123456789"
                />
              </div>
            </div>
          </div>

          {/* Pickup & Drop-off */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A1830] mb-4">Pickup & Drop-off Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="City or Airport"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Drop-off Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="Same or Different"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="time"
                    required
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Return Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={formData.pickupDate || today}
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Return Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="time"
                    required
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chauffeur Service */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm font-semibold text-[#1A1830]">Chauffeur Service</p>
                <p className="text-xs text-slate-600">Professional driver included (+₦15,000/day)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, chauffeurService: !formData.chauffeurService })}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                formData.chauffeurService ? 'bg-[#3B82F6]' : 'bg-slate-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  formData.chauffeurService ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="Any special requests or preferences..."
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
