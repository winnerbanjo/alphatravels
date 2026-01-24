'use client';

import { motion } from 'framer-motion';
import { FileText, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const visaServices = [
  {
    id: '1',
    title: 'Tourist Visa',
    description: 'Short-term travel for leisure and tourism',
    processingTime: '5-7 business days',
    price: 'Starting from ₦45,000',
    icon: FileText,
  },
  {
    id: '2',
    title: 'Business Visa',
    description: 'For business meetings, conferences, and work-related travel',
    processingTime: '7-10 business days',
    price: 'Starting from ₦65,000',
    icon: Shield,
  },
  {
    id: '3',
    title: 'Transit Visa',
    description: 'For travelers passing through a country',
    processingTime: '3-5 business days',
    price: 'Starting from ₦25,000',
    icon: Clock,
  },
  {
    id: '4',
    title: 'Student Visa',
    description: 'For educational purposes and study programs',
    processingTime: '10-15 business days',
    price: 'Starting from ₦85,000',
    icon: CheckCircle,
  },
];

export default function VisaPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop"
            alt="Visa Assistance"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1830]/80 via-[#1A1830]/60 to-[#1A1830]/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Visa Assistance
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Expert guidance for seamless visa applications worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Services */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-4">
              Our Visa Services
            </h2>
            <p className="text-lg text-[#1A1830]/60">
              Professional visa processing for destinations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={cn(
                    'group relative bg-white rounded-2xl border border-[#E2E8F0]',
                    'p-6 shadow-xl hover:shadow-2xl transition-all duration-300',
                    'cursor-pointer overflow-hidden aspect-[4/5] flex flex-col'
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A1830]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3B82F6]/20 transition-colors">
                      <Icon className="h-6 w-6 text-[#3B82F6]" />
                    </div>

                    <h3 className="text-xl font-bold text-[#1A1830] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#1A1830]/60 mb-4">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-[#1A1830]/60">
                        <Clock className="h-4 w-4" />
                        <span>{service.processingTime}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1A1830]">
                        {service.price}
                      </p>
                    </div>

                    <button
                      className={cn(
                        'w-full flex items-center justify-center gap-2',
                        'px-4 py-2.5 bg-[#3B82F6] text-white',
                        'text-sm font-semibold rounded-xl',
                        'transition-all duration-200',
                        'hover:bg-[#2563EB]',
                        'transform group-hover:scale-105'
                      )}
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
