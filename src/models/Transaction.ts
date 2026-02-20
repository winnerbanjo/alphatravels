import mongoose, { Schema, Document, Model } from 'mongoose';

export type TransactionStatus = 'pending' | 'success' | 'failed';
export type TransactionGateway = 'paystack';

export interface ITransaction extends Document {
  amount: number;
  currency: string;
  status: TransactionStatus;
  reference: string;
  metadata?: Record<string, unknown>;
  gateway: TransactionGateway;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'NGN' },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'failed'],
    },
    reference: { type: String, required: true, unique: true },
    metadata: { type: Schema.Types.Mixed },
    gateway: { type: String, required: true, enum: ['paystack'] },
  },
  { timestamps: true }
);

export const Transaction: Model<ITransaction> =
  mongoose.models?.Transaction ?? mongoose.model<ITransaction>('Transaction', TransactionSchema);
