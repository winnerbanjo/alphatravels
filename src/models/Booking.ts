import mongoose, { Schema, Document, Model } from 'mongoose';

export type BookingStatus = 'confirmed' | 'on-hold';

export interface IPassenger {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  passportNumber?: string;
  passportExpiry?: string;
  passportCountry?: string;
  nationality?: string;
  gender?: string;
}

export interface IBooking extends Document {
  pnr: string;
  airline?: string;
  passengers: IPassenger[];
  totalFare: number;
  currency?: string;
  bookingStatus: BookingStatus;
  merchantId?: string | null;
  bookingSource?: string;
  amadeusOrderId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const PassengerSchema = new Schema(
  {
    id: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: String,
    passportNumber: String,
    passportExpiry: String,
    passportCountry: String,
    nationality: String,
    gender: String,
  },
  { _id: false }
);

const BookingSchema = new Schema<IBooking>(
  {
    pnr: { type: String, required: true, index: true },
    airline: String,
    passengers: [PassengerSchema],
    totalFare: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    bookingStatus: {
      type: String,
      required: true,
      enum: ['confirmed', 'on-hold'],
    },
    merchantId: { type: Schema.Types.Mixed, default: null },
    bookingSource: String,
    amadeusOrderId: String,
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

BookingSchema.index({ merchantId: 1, createdAt: -1 });
BookingSchema.index({ pnr: 1 }, { unique: true });

export const Booking: Model<IBooking> =
  mongoose.models?.Booking ?? mongoose.model<IBooking>('Booking', BookingSchema);
