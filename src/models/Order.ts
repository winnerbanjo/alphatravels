import mongoose, { Schema, Document, Model } from 'mongoose';

export type PaymentStatus = 'pending' | 'paid';

export interface IOrder extends Document {
  type: 'hotel' | 'car' | 'shortlet';
  orderData: Record<string, unknown>;
  customerInfo: { name: string; email: string; [k: string]: unknown };
  totalPrice: number;
  /** Alias for totalPrice; used for transactional tracking. */
  amount?: number;
  status: string;
  /** Live transactional: pending | paid. */
  paymentStatus: PaymentStatus;
  /** PNR when order is flight-related. */
  pnr?: string;
  bookingSource?: string;
  merchantId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    type: { type: String, required: true, enum: ['hotel', 'car', 'shortlet'] },
    orderData: { type: Schema.Types.Mixed, required: true },
    customerInfo: { type: Schema.Types.Mixed, required: true },
    totalPrice: { type: Number, required: true },
    amount: { type: Number },
    status: { type: String, required: true, default: 'Pending' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    pnr: { type: String },
    bookingSource: String,
    merchantId: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

OrderSchema.index({ merchantId: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });

export const Order: Model<IOrder> =
  mongoose.models?.Order ?? mongoose.model<IOrder>('Order', OrderSchema);
