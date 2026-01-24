'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, BookOpen, Globe, CheckCircle2, ArrowRight, Mail, Phone } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const examTypes = [
  {
    id: 'ielts',
    name: 'IELTS',
    description: 'International English Language Testing System',
    duration: '2 hours 45 minutes',
    price: '₦85,000',
  },
  {
    id: 'toefl',
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language',
    duration: '3 hours',
    price: '₦95,000',
  },
  {
    id: 'gre',
    name: 'GRE',
    description: 'Graduate Record Examination',
    duration: '3 hours 45 minutes',
    price: '₦120,000',
  },
  {
    id: 'sat',
    name: 'SAT',
    description: 'Scholastic Assessment Test',
    duration: '3 hours',
    price: '₦110,000',
  },
];

const services = [
  {
    icon: BookOpen,
    title: 'Exam Preparation',
    description: 'Comprehensive test prep courses with expert tutors',
    features: ['Mock Tests', 'Personalized Study Plans', 'Score Improvement Guarantee'],
  },
  {
    icon: Globe,
    title: 'University Applications',
    description: 'End-to-end support for international admissions',
    features: ['Application Review', 'Essay Writing Support', 'Scholarship Guidance'],
  },
  {
    icon: GraduationCap,
    title: 'Visa Processing',
    description: 'Student visa assistance for your chosen destination',
    features: ['Document Preparation', 'Interview Coaching', 'Fast-track Processing'],
  },
];

export default function EducationServicesPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    examType: '',
    destination: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowForm(false);
      // Route to merchant panel (for agent handling)
      router.push('/merchant/dashboard?service=education');
      alert('Request submitted! An agent will contact you within 24 hours.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1830] to-[#2A2540]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Global Study Pathways
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Unlock your academic potential with expert guidance for international education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exam Prep Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1830] mb-4">
              Exam Preparation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Master standardized tests with our comprehensive prep programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examTypes.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#1A1830]/10 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-[#1A1830]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1830] mb-2">{exam.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{exam.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-slate-500">Duration: {exam.duration}</p>
                  <p className="text-lg font-bold text-[#1A1830]">{exam.price}</p>
                </div>
                <button
                  onClick={() => {
                    setFormData({ ...formData, examType: exam.id });
                    setShowForm(true);
                  }}
                  className={cn(
                    'w-full py-2 px-4 bg-[#1A1830] text-white',
                    'text-sm font-semibold rounded-xl',
                    'hover:bg-[#1A1830]/90 transition-colors'
                  )}
                >
                  Enroll Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1830] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              End-to-end support for your international education journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#1A1830]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#1A1830]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1830] mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#1A1830] flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-4xl">
          {!showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Request admission support and let our expert agents guide you through the process
              </p>
              <button
                onClick={() => setShowForm(true)}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-8 py-4 bg-white text-[#1A1830]',
                  'text-lg font-semibold rounded-xl',
                  'shadow-lg transition-all duration-200',
                  'hover:bg-white/90 hover:shadow-xl',
                  'transform hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                Request Admission Support
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Request Admission Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Exam Type</label>
                  <select
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select Exam</option>
                    {examTypes.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Destination Country</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select Destination</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-[#1A1830] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Tell us about your academic goals..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'flex items-center justify-center gap-2'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#1A1830]/30 border-t-[#1A1830] rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
