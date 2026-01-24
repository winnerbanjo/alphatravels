'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Schedule a consultation or reach out to our team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 md:p-12 mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#1A1830]/10 rounded-2xl flex items-center justify-center">
                <Calendar className="h-8 w-8 text-[#1A1830]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#1A1830]">
                  Schedule a Quick 15-Min Consultation
                </h2>
                <p className="text-slate-600 mt-1">
                  Let's discuss your travel needs and find the perfect solution
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1830] mb-4">
                  Consultation Request Submitted!
                </h3>
                <p className="text-slate-600 mb-8">
                  Our team will contact you within 24 hours to confirm your consultation time.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors"
                >
                  Schedule Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => handleChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Preferred Time *
                  </label>
                  <select
                    required
                    value={formData.preferredTime}
                    onChange={(e) => handleChange('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                    placeholder="Tell us about your travel needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full py-4 bg-[#1A1830] text-white rounded-xl font-semibold',
                    'hover:bg-[#1A1830]/90 transition-colors shadow-lg hover:shadow-xl',
                    'transform hover:scale-[1.02] active:scale-[0.98]',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                    'flex items-center justify-center gap-2'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5" />
                      Schedule Consultation
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Office Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lagos Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-[#1A1830]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1830]">Lagos Office</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Address</p>
                    <p className="text-slate-600">
                      123 Victoria Island,<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Phone</p>
                    <p className="text-slate-600">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Email</p>
                    <p className="text-slate-600">lagos@alphatravels.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Hours</p>
                    <p className="text-slate-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* London Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-[#1A1830]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1830]">London Office</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Address</p>
                    <p className="text-slate-600">
                      456 Mayfair,<br />
                      London, United Kingdom
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Phone</p>
                    <p className="text-slate-600">+44 20 0000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Email</p>
                    <p className="text-slate-600">london@alphatravels.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-700 font-medium">Hours</p>
                    <p className="text-slate-600">Mon - Fri: 9:00 AM - 5:00 PM GMT</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#1A1830]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Book a consultation with our travel experts today
            </p>
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Calendar className="h-5 w-5" />
              Book a Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
