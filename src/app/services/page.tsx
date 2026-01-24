'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Visa, GraduationCap, Briefcase, Truck, ChevronDown, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

type ServiceTab = 'visa' | 'education' | 'business' | 'logistics';

const services = {
  visa: {
    icon: Visa,
    title: 'Visa Services',
    description: 'Comprehensive visa assistance for UK, USA, and Canada',
    content: {
      uk: {
        title: 'United Kingdom Visa',
        description: 'Expert guidance for UK visa applications including tourist, business, student, and family visas.',
        features: [
          'Tourist Visa (Standard Visitor)',
          'Business Visa',
          'Student Visa (Tier 4)',
          'Family Visa',
          'Settlement Visa',
          'Express Processing Available',
        ],
        processingTime: '5-15 business days',
        price: 'Starting from ₦45,000',
      },
      usa: {
        title: 'United States Visa',
        description: 'Professional assistance for US visa applications with high success rates.',
        features: [
          'B1/B2 Tourist & Business Visa',
          'F1 Student Visa',
          'J1 Exchange Visitor Visa',
          'H1B Work Visa',
          'Green Card Lottery Assistance',
          'Interview Preparation',
        ],
        processingTime: '7-21 business days',
        price: 'Starting from ₦65,000',
      },
      canada: {
        title: 'Canada Visa',
        description: 'Complete support for Canadian visa applications and immigration programs.',
        features: [
          'Visitor Visa (TRV)',
          'Study Permit',
          'Work Permit',
          'Express Entry Program',
          'Provincial Nominee Program',
          'Family Sponsorship',
        ],
        processingTime: '10-30 business days',
        price: 'Starting from ₦55,000',
      },
    },
  },
  education: {
    icon: GraduationCap,
    title: 'Education Services',
    description: 'Study abroad programs and educational consulting',
    content: {
      uk: {
        title: 'UK Education Corridor',
        description: 'Comprehensive support for studying in the United Kingdom.',
        features: [
          'University Application Assistance',
          'Student Visa Processing',
          'Scholarship Guidance',
          'Accommodation Support',
          'Pre-departure Orientation',
          'Post-arrival Support',
        ],
        processingTime: '4-8 weeks',
        price: 'Starting from ₦150,000',
      },
      usa: {
        title: 'USA Education Corridor',
        description: 'Expert guidance for US education opportunities.',
        features: [
          'College & University Applications',
          'F1 Visa Processing',
          'SAT/ACT Preparation Support',
          'Financial Aid Assistance',
          'Campus Tours Arrangement',
          'Student Housing Solutions',
        ],
        processingTime: '6-12 weeks',
        price: 'Starting from ₦200,000',
      },
      canada: {
        title: 'Canada Education Corridor',
        description: 'Complete support for Canadian education programs.',
        features: [
          'Study Permit Applications',
          'University Selection Guidance',
          'IELTS/TOEFL Preparation',
          'Post-Graduation Work Permit',
          'Permanent Residence Pathways',
          'Family Accompanying Support',
        ],
        processingTime: '8-16 weeks',
        price: 'Starting from ₦180,000',
      },
    },
  },
  business: {
    icon: Briefcase,
    title: 'Business Services',
    description: 'Corporate travel and business visa solutions',
    content: {
      uk: {
        title: 'UK Business Corridor',
        description: 'Business travel and corporate solutions for the UK market.',
        features: [
          'Business Visa Processing',
          'Corporate Travel Management',
          'Meeting & Conference Arrangements',
          'Trade Mission Support',
          'UK Company Registration Assistance',
          'Investor Visa Guidance',
        ],
        processingTime: '5-10 business days',
        price: 'Starting from ₦85,000',
      },
      usa: {
        title: 'USA Business Corridor',
        description: 'Comprehensive business travel and investment solutions.',
        features: [
          'B1 Business Visa',
          'L1 Intracompany Transfer',
          'E2 Investor Visa',
          'Corporate Travel Programs',
          'US Business Setup Support',
          'Trade Show & Exhibition Services',
        ],
        processingTime: '7-14 business days',
        price: 'Starting from ₦95,000',
      },
      canada: {
        title: 'Canada Business Corridor',
        description: 'Business immigration and corporate travel services.',
        features: [
          'Business Visitor Visa',
          'Work Permit Applications',
          'Start-up Visa Program',
          'Investor Immigration',
          'Corporate Travel Management',
          'Business Networking Events',
        ],
        processingTime: '10-20 business days',
        price: 'Starting from ₦90,000',
      },
    },
  },
  logistics: {
    icon: Truck,
    title: 'Logistics Services',
    description: 'Cargo and shipping solutions',
    content: {
      uk: {
        title: 'UK Logistics Corridor',
        description: 'Efficient cargo and shipping services to the United Kingdom.',
        features: [
          'Air Freight Services',
          'Sea Freight Solutions',
          'Express Delivery',
          'Customs Clearance',
          'Warehousing & Distribution',
          'Document Handling',
        ],
        processingTime: '3-7 business days',
        price: 'Starting from ₦50,000',
      },
      usa: {
        title: 'USA Logistics Corridor',
        description: 'Reliable shipping and cargo services to the United States.',
        features: [
          'International Shipping',
          'Express Cargo Services',
          'Customs Documentation',
          'Door-to-Door Delivery',
          'Package Tracking',
          'Insurance Coverage',
        ],
        processingTime: '5-10 business days',
        price: 'Starting from ₦60,000',
      },
      canada: {
        title: 'Canada Logistics Corridor',
        description: 'Comprehensive logistics solutions for Canada.',
        features: [
          'Freight Forwarding',
          'Customs Brokerage',
          'Express Shipping',
          'E-commerce Fulfillment',
          'Supply Chain Management',
          'Real-time Tracking',
        ],
        processingTime: '7-14 business days',
        price: 'Starting from ₦55,000',
      },
    },
  },
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('visa');
  const [expandedCorridor, setExpandedCorridor] = useState<string | null>(null);

  const activeService = services[activeTab];
  const Icon = activeService.icon;

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
              Our Services
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Comprehensive travel solutions across UK, USA, and Canada corridors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {(Object.keys(services) as ServiceTab[]).map((tab) => {
              const ServiceIcon = services[tab].icon;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setExpandedCorridor(null);
                  }}
                  className={cn(
                    'flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-200',
                    activeTab === tab
                      ? 'bg-[#1A1830] text-white shadow-lg'
                      : 'bg-white text-[#1A1830] border border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <ServiceIcon className="h-5 w-5" />
                  {services[tab].title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#1A1830]/10 rounded-2xl flex items-center justify-center">
                <Icon className="h-8 w-8 text-[#1A1830]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#1A1830]">{activeService.title}</h2>
                <p className="text-slate-600">{activeService.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Corridor Accordion */}
          <div className="space-y-4">
            {(['uk', 'usa', 'canada'] as const).map((corridor) => {
              const corridorData = activeService.content[corridor];
              const isExpanded = expandedCorridor === corridor;

              return (
                <motion.div
                  key={corridor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedCorridor(isExpanded ? null : corridor)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1A1830]/10 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-[#1A1830]">
                          {corridor.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1830]">
                          {corridorData.title}
                        </h3>
                        <p className="text-sm text-slate-600">{corridorData.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 text-slate-400 transition-transform duration-200',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-200"
                    >
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-500 mb-3">
                              Features
                            </h4>
                            <ul className="space-y-2">
                              {corridorData.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-[#1A1830] mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-6">
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-500 mb-1">
                                  Processing Time
                                </p>
                                <p className="text-lg font-bold text-[#1A1830]">
                                  {corridorData.processingTime}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-500 mb-1">
                                  Starting Price
                                </p>
                                <p className="text-2xl font-bold text-[#1A1830]">
                                  {corridorData.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
