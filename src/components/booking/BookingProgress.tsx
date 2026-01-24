'use client';

import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type BookingStep = 'search' | 'select' | 'checkout' | 'confirm';

interface BookingProgressProps {
  currentStep: BookingStep;
}

const steps: { key: BookingStep; label: string }[] = [
  { key: 'search', label: 'Search' },
  { key: 'select', label: 'Select' },
  { key: 'checkout', label: 'Checkout' },
  { key: 'confirm', label: 'Confirm' },
];

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    'transition-all duration-300',
                    isCompleted &&
                      'bg-[#1A1830] text-white shadow-lg',
                    isActive &&
                      'bg-[#1A1830] text-white shadow-lg scale-110',
                    isUpcoming &&
                      'bg-slate-200 text-slate-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors',
                    isActive || isCompleted
                      ? 'text-[#1A1830]'
                      : 'text-slate-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors',
                    isCompleted ? 'bg-[#1A1830]' : 'bg-slate-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
