'use client';

import { Award, Globe, HeadphonesIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const features = [
  {
    icon: Award,
    title: '30 Years Experience',
    description:
      'Three decades of excellence in travel services, trusted by millions worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description:
      'Connect to destinations across 190+ countries with our extensive network.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description:
      'Round-the-clock assistance whenever you need it, wherever you are.',
  },
];

export default function WhyAlphaTravels() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1830] tracking-tight mb-4">
            Why Alpha Travels
          </h2>
          <p className="text-lg text-[#1A1830]/60 max-w-2xl mx-auto">
            Experience the difference that comes with premium service and
            unmatched expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn(
                  'group relative p-8 rounded-2xl',
                  'bg-white border border-[#E2E8F0]',
                  'transition-all duration-300',
                  'hover:shadow-xl hover:-translate-y-1'
                )}
              >
                <div
                  className={cn(
                    'inline-flex items-center justify-center',
                    'w-16 h-16 rounded-xl',
                    'bg-[#1A1830] text-white mb-6',
                    'transition-transform duration-300',
                    'group-hover:scale-110 group-hover:rotate-3'
                  )}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1830] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#1A1830]/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
