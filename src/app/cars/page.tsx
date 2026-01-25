'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, MapPin, Calendar, Clock, User, Shield, Navigation } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import CarBookingForm from '@/src/components/booking/CarBookingForm';

interface CarOption {
  id: string;
  name: string;
  category: string;
  price: string;
  features: string[];
  image: string;
  seats: number;
  transmission: string;
}

const carOptions: CarOption[] = [
  {
    id: '1',
    name: 'Mercedes-Benz E-Class',
    category: 'Premium',
    price: '₦45,000',
    features: ['GPS', 'Bluetooth', 'Leather Seats'],
    image: 'mercedes',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '2',
    name: 'BMW 5 Series',
    category: 'Premium',
    price: '₦48,000',
    features: ['GPS', 'Sunroof', 'Premium Sound'],
    image: 'bmw',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '3',
    name: 'Audi A6',
    category: 'Premium',
    price: '₦46,000',
    features: ['GPS', 'Quattro', 'Virtual Cockpit'],
    image: 'audi',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '4',
    name: 'Toyota Camry',
    category: 'Standard',
    price: '₦25,000',
    features: ['GPS', 'Bluetooth', 'Air Conditioning'],
    image: 'toyota',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '5',
    name: 'Range Rover Sport',
    category: 'Luxury SUV',
    price: '₦75,000',
    features: ['GPS', '4WD', 'Premium Interior'],
    image: 'rangerover',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: '6',
    name: 'Tesla Model 3',
    category: 'Electric',
    price: '₦55,000',
    features: ['Autopilot', 'Supercharger', 'Premium Interior'],
    image: 'tesla',
    seats: 5,
    transmission: 'Automatic',
  },
];

export default function CarsPage() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
  });
  const [chauffeurService, setChauffeurService] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Premium Car Rentals
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Drive in style with our curated selection of luxury vehicles
            </p>
          </motion.div>

          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.pickup}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        pickup: e.target.value,
                      })
                    }
                    placeholder="City or Airport"
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Drop-off Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40" />
                  <input
                    type="text"
                    value={searchParams.dropoff}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        dropoff: e.target.value,
                      })
                    }
                    placeholder="Same or Different"
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="date"
                    value={searchParams.date}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        date: e.target.value,
                      })
                    }
                    min={today}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#1A1830]/60 mb-2 uppercase tracking-wider">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A1830]/40 pointer-events-none" />
                  <input
                    type="time"
                    value={searchParams.time}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        time: e.target.value,
                      })
                    }
                    className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A1830] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Chauffeur Service Toggle */}
            <div className="mt-6 flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#1A1830]/60" />
                <div>
                  <p className="text-sm font-semibold text-[#1A1830]">
                    Chauffeur Service
                  </p>
                  <p className="text-xs text-[#1A1830]/60">
                    Professional driver included (+₦15,000/day)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChauffeurService(!chauffeurService)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  chauffeurService ? 'bg-[#3B82F6]' : 'bg-[#E2E8F0]'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    chauffeurService ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            <button
              className={cn(
                'mt-6 w-full py-4 bg-[#3B82F6] text-white',
                'text-sm font-semibold rounded-xl',
                'shadow-lg transition-all duration-200',
                'hover:bg-[#2563EB] hover:shadow-xl',
                'focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2',
                'transform hover:scale-[1.02] active:scale-[0.98]'
              )}
            >
              Search Cars
            </button>
          </motion.div>
        </div>
      </section>

      {/* Car Options */}
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
              Available Vehicles
            </h2>
            <p className="text-lg text-[#1A1830]/60">
              Choose from our premium fleet of luxury and standard vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carOptions.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={cn(
                  'group relative bg-white rounded-2xl border border-[#E2E8F0]',
                  'p-6 shadow-xl hover:shadow-2xl transition-all duration-300',
                  'cursor-pointer overflow-hidden'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1830]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Car Image */}
                  <div className="aspect-[4/5] rounded-xl mb-4 relative overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                      alt={car.name}
                      className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A1830] mb-1">
                        {car.name}
                      </h3>
                      <span className="text-xs px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg font-semibold">
                        {car.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-[#1A1830]/60">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-[#F8FAFC] text-[#1A1830]/70 rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                    <div>
                      <p className="text-xs text-[#1A1830]/60 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-[#1A1830]">
                        {car.price}
                        <span className="text-sm font-normal text-[#1A1830]/60">
                          /day
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCar(car)}
                      className={cn(
                        'px-6 py-2.5 bg-[#3B82F6] text-white',
                        'text-sm font-semibold rounded-xl',
                        'transition-all duration-200',
                        'hover:bg-[#2563EB]',
                        'transform group-hover:scale-105'
                      )}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Booking Form Modal */}
      {selectedCar && (
        <CarBookingForm
          car={{
            id: selectedCar.id,
            name: selectedCar.name,
            category: selectedCar.category,
            price: selectedCar.price,
          }}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </motion.div>
  );
}
