import mongoose, { Schema, Document, Model } from 'mongoose';

export type MerchantStatus = 'Verified' | 'Pending' | 'Suspended';

export interface IMerchant extends Document {
  name: string;
  email: string;
  companyName?: string;
  status: MerchantStatus;
  joinDate?: string;
  totalSales: number;
  bookings: number;
  /** Cloudinary URL from greenlife-uploads folder (cloud: do4mbqgjn). */
  avatar_url?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MerchantSchema = new Schema<IMerchant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    companyName: String,
    status: {
      type: String,
      required: true,
      enum: ['Verified', 'Pending', 'Suspended'],
      default: 'Pending',
    },
    joinDate: String,
    totalSales: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    avatar_url: { type: String, default: null },
    phone: String,
    address: String,
  },
  { timestamps: true }
);

MerchantSchema.index({ status: 1 });

export const Merchant: Model<IMerchant> =
  mongoose.models?.Merchant ?? mongoose.model<IMerchant>('Merchant', MerchantSchema);
