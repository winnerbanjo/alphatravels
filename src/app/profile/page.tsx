'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Calendar, MapPin, Plane, Award, User, FileText, Trophy, TrendingUp, X, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Active trip
const activeTrip = {
  id: 'TRIP-ACTIVE',
  route: 'Lagos to London',
  origin: 'LOS',
  destination: 'LHR',
  date: 'Feb 15, 2026',
  status: 'Upcoming',
  pnr: 'PNR-789456',
  passengers: 2,
  flightNumber: 'BA 75',
  departureTime: '10:30 AM',
  arrivalTime: '4:45 PM',
};

// Recent history
const recentHistory = [
  {
    id: 'HIST-001',
    route: 'Dubai to Lagos',
    date: 'Dec 22, 2025',
    status: 'Completed',
  },
  {
    id: 'HIST-002',
    route: 'Lagos to New York',
    date: 'Nov 8, 2025',
    status: 'Completed',
  },
  {
    id: 'HIST-003',
    route: 'Lagos to Accra',
    date: 'Sep 14, 2025',
    status: 'Completed',
  },
];

// Initial saved travelers (Passport Manager)
const initialTravelers = [
  {
    id: 'TRAV-001',
    name: 'Adebayo Adeyemi',
    passport: 'A12345678',
    nationality: 'Nigerian',
    expiryDate: '2030-12-31',
  },
  {
    id: 'TRAV-002',
    name: 'Chioma Adeyemi',
    passport: 'B87654321',
    nationality: 'Nigerian',
    expiryDate: '2031-06-15',
  },
];

// Travel stats
const TOTAL_KILOMETERS = '45,000km';
const ALPHA_CLUB_TIER = 'Platinum';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [travelers, setTravelers] = useState(initialTravelers);
  const [showAddTravelerModal, setShowAddTravelerModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showTripSummary, setShowTripSummary] = useState<string | null>(null);
  const [newTraveler, setNewTraveler] = useState({
    name: '',
    passport: '',
    nationality: 'Nigerian',
    expiryDate: '',
  });

  const handleAddTraveler = () => {
    if (newTraveler.name && newTraveler.passport && newTraveler.expiryDate) {
      const traveler = {
        id: `TRAV-${Date.now()}`,
        name: newTraveler.name,
        passport: newTraveler.passport,
        nationality: newTraveler.nationality,
        expiryDate: newTraveler.expiryDate,
      };
      setTravelers([...travelers, traveler]);
      setNewTraveler({ name: '', passport: '', nationality: 'Nigerian', expiryDate: '' });
      setShowAddTravelerModal(false);
    }
  };

  const handleViewTicket = () => {
    setShowTicketModal(true);
  };

  const handleTripClick = (tripId: string) => {
    setShowTripSummary(tripId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A1830] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-2xl font-serif font-bold text-white">A</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium text-[#1A1830] tracking-tight">My Trips</h1>
                <p className="text-slate-600 mt-2 tracking-tight">Welcome back, VIP Traveler</p>
              </div>
            </div>
            <Link
              href="/"
              className={cn(
                'inline-flex items-center gap-2',
                'px-6 py-3 text-white tracking-tight',
                'text-sm font-medium rounded-full',
                'bg-gradient-to-r from-[#1A1830] to-[#2A2540]',
                'transition-all duration-200',
                'hover:opacity-90'
              )}
            >
              <Plane className="w-4 h-4" />
              Book New Trip
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Travel Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Total Kilometers */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1A1830]" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Total Kilometers</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{TOTAL_KILOMETERS}</p>
            <p className="text-xs text-slate-500 mt-2 tracking-tight">Lifetime travel distance</p>
          </motion.div>

          {/* Alpha Club Tier */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#1A1830]" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Alpha Club Tier</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">{ALPHA_CLUB_TIER}</p>
            <p className="text-xs text-slate-500 mt-2 tracking-tight">Elite status unlocked</p>
          </motion.div>

          {/* Alpha Miles */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#1A1830]/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-[#1A1830]" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-2 tracking-tight">Alpha Miles</p>
            <p className="text-4xl font-medium text-[#1A1830] tracking-tight">12,450</p>
            <p className="text-xs text-slate-500 mt-2 tracking-tight">Available for redemption</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Trips & Recent History */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Trip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Active Trip</h2>
              </div>
              <div className="p-8">
                <div className="p-6 rounded-[2rem] border-2 border-[#1A1830]/20 bg-gradient-to-br from-[#1A1830]/5 to-white/50">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-6 h-6 text-[#1A1830]" />
                        <h3 className="text-2xl font-semibold text-[#1A1830] tracking-tight">{activeTrip.route}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1 tracking-tight">Departure</p>
                          <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.departureTime}</p>
                          <p className="text-xs text-slate-600 tracking-tight">{activeTrip.origin}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1 tracking-tight">Arrival</p>
                          <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.arrivalTime}</p>
                          <p className="text-xs text-slate-600 tracking-tight">{activeTrip.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{activeTrip.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Plane className="w-4 h-4" />
                          <span>{activeTrip.flightNumber}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-mono tracking-tight mb-4">PNR: {activeTrip.pnr}</p>
                      <button
                        onClick={handleViewTicket}
                        className={cn(
                          'inline-flex items-center gap-2',
                          'px-6 py-3 bg-[#1A1830] text-white',
                          'rounded-xl font-medium text-sm tracking-tight',
                          'hover:bg-[#1A1830]/90 transition-all duration-200',
                          'shadow-lg cursor-pointer'
                        )}
                      >
                        <FileText className="w-4 h-4" />
                        View Ticket
                      </button>
                    </div>
                    <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full tracking-tight">
                      {activeTrip.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl md:text-3xl font-medium text-[#1A1830] tracking-tight">Recent History</h2>
              </div>
              <div className="p-8 space-y-4">
                {recentHistory.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleTripClick(trip.id)}
                    className={cn(
                      'p-5 rounded-xl border border-white/20',
                      'bg-white/50 backdrop-blur-sm',
                      'hover:bg-white/70 transition-all duration-200',
                      'cursor-pointer'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <MapPin className="w-5 h-5 text-[#1A1830]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#1A1830] tracking-tight">{trip.route}</h3>
                          <p className="text-sm text-slate-600 tracking-tight">{trip.date}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full tracking-tight">
                        {trip.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Passport Manager Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Passport Manager</h2>
              </div>
              <div className="p-6 space-y-4">
                {travelers.map((traveler) => (
                  <div
                    key={traveler.id}
                    className="p-4 rounded-xl bg-white/50 border border-white/20"
                  >
                    <h3 className="text-sm font-semibold text-[#1A1830] mb-3 tracking-tight">{traveler.name}</h3>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="tracking-tight">Passport:</span>
                        <span className="font-mono tracking-tight">{traveler.passport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="tracking-tight">Nationality:</span>
                        <span className="tracking-tight">{traveler.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="tracking-tight">Expires:</span>
                        <span className="tracking-tight">{traveler.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowAddTravelerModal(true)}
                  className={cn(
                    'w-full mt-4 py-3 px-4',
                    'bg-white/50 border-2 border-dashed border-slate-300',
                    'rounded-xl text-sm font-medium text-slate-600',
                    'hover:bg-white/70 hover:border-[#1A1830] hover:text-[#1A1830]',
                    'transition-all duration-200 tracking-tight',
                    'cursor-pointer'
                  )}
                >
                  + Add Traveler
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Traveler Modal */}
      <AnimatePresence>
        {showAddTravelerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddTravelerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Add Traveler</h2>
                <button
                  onClick={() => setShowAddTravelerModal(false)}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 tracking-tight">Full Name</label>
                  <input
                    type="text"
                    value={newTraveler.name}
                    onChange={(e) => setNewTraveler({ ...newTraveler, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1A1830]/20"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 tracking-tight">Passport Number</label>
                  <input
                    type="text"
                    value={newTraveler.passport}
                    onChange={(e) => setNewTraveler({ ...newTraveler, passport: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl text-sm tracking-tight font-mono focus:outline-none focus:ring-2 focus:ring-[#1A1830]/20"
                    placeholder="A12345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 tracking-tight">Nationality</label>
                  <select
                    value={newTraveler.nationality}
                    onChange={(e) => setNewTraveler({ ...newTraveler, nationality: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1A1830]/20"
                  >
                    <option>Nigerian</option>
                    <option>Ghanaian</option>
                    <option>British</option>
                    <option>American</option>
                    <option>Canadian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 tracking-tight">Expiry Date</label>
                  <input
                    type="date"
                    value={newTraveler.expiryDate}
                    onChange={(e) => setNewTraveler({ ...newTraveler, expiryDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1A1830]/20"
                  />
                </div>
                <button
                  onClick={handleAddTraveler}
                  className={cn(
                    'w-full px-6 py-3 bg-gradient-to-r from-[#1A1830] to-[#2A2540] text-white',
                    'rounded-xl font-medium text-sm tracking-tight',
                    'hover:opacity-90 transition-all duration-200',
                    'shadow-lg cursor-pointer'
                  )}
                >
                  Save Traveler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* E-Ticket Modal */}
      <AnimatePresence>
        {showTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTicketModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">E-Ticket</h2>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border-2 border-[#1A1830]/20 bg-gradient-to-br from-[#1A1830]/5 to-white/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 tracking-tight">Booking Reference</p>
                      <p className="text-2xl font-bold text-[#1A1830] font-mono tracking-tight">{activeTrip.pnr}</p>
                    </div>
                    <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full tracking-tight">
                      {activeTrip.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Route</p>
                      <p className="text-lg font-semibold text-[#1A1830] tracking-tight">{activeTrip.route}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Flight Number</p>
                      <p className="text-lg font-semibold text-[#1A1830] tracking-tight">{activeTrip.flightNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Departure</p>
                      <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.departureTime}</p>
                      <p className="text-xs text-slate-600 tracking-tight">{activeTrip.origin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Arrival</p>
                      <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.arrivalTime}</p>
                      <p className="text-xs text-slate-600 tracking-tight">{activeTrip.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Date</p>
                      <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2 tracking-tight">Passengers</p>
                      <p className="text-sm font-medium text-[#1A1830] tracking-tight">{activeTrip.passengers}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className={cn(
                    'w-full px-6 py-3 bg-gradient-to-r from-[#1A1830] to-[#2A2540] text-white',
                    'rounded-xl font-medium text-sm tracking-tight',
                    'hover:opacity-90 transition-all duration-200',
                    'shadow-lg cursor-pointer'
                  )}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trip Summary Modal */}
      <AnimatePresence>
        {showTripSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTripSummary(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-[#1A1830] tracking-tight">Trip Summary</h2>
                <button
                  onClick={() => setShowTripSummary(null)}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              {recentHistory
                .filter((trip) => trip.id === showTripSummary)
                .map((trip) => (
                  <div key={trip.id} className="space-y-4">
                    <div className="p-6 rounded-2xl border-2 border-[#1A1830]/20 bg-gradient-to-br from-[#1A1830]/5 to-white/50">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-[#1A1830]" />
                        <h3 className="text-xl font-semibold text-[#1A1830] tracking-tight">{trip.route}</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 tracking-tight">Date</span>
                          <span className="text-sm font-medium text-[#1A1830] tracking-tight">{trip.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 tracking-tight">Status</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full tracking-tight">
                            {trip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTripSummary(null)}
                      className={cn(
                        'w-full px-6 py-3 bg-gradient-to-r from-[#1A1830] to-[#2A2540] text-white',
                        'rounded-xl font-medium text-sm tracking-tight',
                        'hover:opacity-90 transition-all duration-200',
                        'shadow-lg cursor-pointer'
                      )}
                    >
                      Close
                    </button>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
