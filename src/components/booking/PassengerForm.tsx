'use client';

import { useState } from 'react';
import { User, Mail, Phone, Calendar, FileText, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PassengerData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: 'MALE' | 'FEMALE';
  passportNumber?: string;
  passportExpiry?: string;
  passportCountry?: string;
  nationality?: string;
}

interface ContactData {
  emailAddress: string;
  phoneNumber: string;
  countryCallingCode: string;
  firstName: string;
  lastName: string;
}

interface PassengerFormProps {
  passengerCount?: number;
  onSubmit: (passengers: PassengerData[], contacts: ContactData) => void;
  onCancel: () => void;
}

export default function PassengerForm({
  passengerCount = 1,
  onSubmit,
  onCancel,
}: PassengerFormProps) {
  const [passengers, setPassengers] = useState<PassengerData[]>(
    Array(passengerCount).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'MALE' as const,
      passportNumber: '',
      passportExpiry: '',
      passportCountry: 'NG',
      nationality: 'NG',
    }))
  );

  const [contacts, setContacts] = useState<ContactData>({
    emailAddress: '',
    phoneNumber: '',
    countryCallingCode: '234', // Default +234 for Nigeria
    firstName: '',
    lastName: '',
  });

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerData,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleContactChange = (field: keyof ContactData, value: string) => {
    setContacts({ ...contacts, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers, contacts);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 px-4 md:px-0">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl font-bold text-[#1A1830] mb-6">Contact Information</h3>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1830] mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                value={contacts.firstName}
                onChange={(e) => handleContactChange('firstName', e.target.value)}
                className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1830] mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                value={contacts.lastName}
                onChange={(e) => handleContactChange('lastName', e.target.value)}
                className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1830] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                value={contacts.emailAddress}
                onChange={(e) => handleContactChange('emailAddress', e.target.value)}
                className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1830] mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={contacts.countryCallingCode}
                onChange={(e) => handleContactChange('countryCallingCode', e.target.value)}
                className="w-24 h-12 md:h-14 px-3 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent bg-white"
              >
                <option value="234">+234</option>
                <option value="1">+1</option>
                <option value="44">+44</option>
                <option value="971">+971</option>
                <option value="33">+33</option>
              </select>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={contacts.phoneNumber}
                  onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6">
          <h3 className="text-xl font-bold text-[#1A1830] mb-6">
            Passenger {index + 1} Details
          </h3>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={passenger.firstName}
                  onChange={(e) =>
                    handlePassengerChange(index, 'firstName', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={passenger.lastName}
                  onChange={(e) =>
                    handlePassengerChange(index, 'lastName', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={passenger.dateOfBirth}
                  onChange={(e) =>
                    handlePassengerChange(index, 'dateOfBirth', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Gender
              </label>
              <select
                value={passenger.gender || 'MALE'}
                onChange={(e) =>
                  handlePassengerChange(index, 'gender', e.target.value as 'MALE' | 'FEMALE')
                }
                className="w-full h-12 md:h-14 px-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Nationality
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <select
                  value={passenger.nationality}
                  onChange={(e) =>
                    handlePassengerChange(index, 'nationality', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                >
                  <option value="NG">Nigeria</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Passport Number
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={passenger.passportNumber}
                  onChange={(e) =>
                    handlePassengerChange(index, 'passportNumber', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1830] mb-2">
                Passport Expiry
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  value={passenger.passportExpiry}
                  onChange={(e) =>
                    handlePassengerChange(index, 'passportExpiry', e.target.value)
                  }
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-[#1A1830] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-slate-200 rounded-xl font-semibold text-[#1A1830] hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full px-8 py-4 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg"
          >
            Confirm Booking (Pay Later)
          </button>
          <p className="text-xs text-slate-500 text-center">
            Your booking will be confirmed. Payment will be processed by our travel agent.
          </p>
        </div>
      </div>
    </form>
  );
}
