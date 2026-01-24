'use client';

import { motion } from 'framer-motion';
import { Calendar, Target, Eye, Users, Award, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const timelineEvents = [
  {
    year: '1995',
    title: 'The Beginning',
    description: 'Alpha Travels was founded with a vision to connect Nigerians to the world.',
  },
  {
    year: '2000',
    title: 'First International Office',
    description: 'Expanded operations to London, establishing our first international presence.',
  },
  {
    year: '2010',
    title: 'Digital Transformation',
    description: 'Launched our online platform, revolutionizing travel booking in Nigeria.',
  },
  {
    year: '2015',
    title: 'Premium Services',
    description: 'Introduced luxury travel and concierge services for discerning clients.',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Partnered with leading airlines and hotels worldwide, expanding our network.',
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Continuing to innovate and provide exceptional travel experiences.',
  },
];

const teamMembers = [
  {
    name: 'Mr. Prince',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader with 20+ years in the travel industry.',
    image: 'prince',
  },
  {
    name: 'Mrs. Evelyn',
    role: 'Chief Operating Officer',
    bio: 'Operations expert ensuring seamless travel experiences.',
    image: 'evelyn',
  },
  {
    name: 'Mr. David',
    role: 'Head of Partnerships',
    bio: 'Building strategic relationships with global travel partners.',
    image: 'david',
  },
  {
    name: 'Ms. Sarah',
    role: 'Head of Customer Experience',
    bio: 'Dedicated to delivering exceptional service to every client.',
    image: 'sarah',
  },
];

export default function AboutPage() {
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
              Our Story
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Three decades of connecting Nigerians to the world, one journey at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Since 1995, Alpha Travels has been at the forefront of travel innovation in Nigeria. 
              What started as a small agency in Lagos has grown into a trusted partner for thousands 
              of travelers seeking premium experiences across the globe.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our commitment to excellence, personalized service, and deep understanding of the unique 
              needs of Nigerian travelers has made us the preferred choice for those who demand nothing 
              but the best. We don't just book flights—we craft journeys that transform lives.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-24"
                >
                  <div className="absolute left-6 top-2 w-4 h-4 bg-[#1A1830] rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-2">
                      <Calendar className="h-5 w-5 text-[#1A1830]" />
                      <span className="text-2xl font-bold text-[#1A1830]">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1830] mb-2">{event.title}</h3>
                    <p className="text-slate-600">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1A1830]/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#1A1830]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To empower Nigerians with seamless access to global travel opportunities, 
                providing exceptional service, competitive pricing, and personalized experiences 
                that exceed expectations. We are committed to making world-class travel accessible 
                to everyone, regardless of their destination or budget.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1A1830]/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-[#1A1830]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">Our Vision</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To become Africa's most trusted and innovative travel partner, recognized globally 
                for excellence in service delivery, technological innovation, and customer satisfaction. 
                We envision a future where every Nigerian can explore the world with confidence, 
                knowing they have a reliable partner in Alpha Travels.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1830] tracking-tight mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The passionate professionals behind Alpha Travels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-[#1A1830] to-[#2A2540] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-20 w-20 text-white/30" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1A1830] mb-1">{member.name}</h3>
                  <p className="text-sm text-[#1A1830]/60 mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
              <Calendar className="h-5 w-5" />
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
