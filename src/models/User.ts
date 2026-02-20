import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN';

export interface IUser extends Document {
  email: string;
  /** Hashed in production. */
  passwordHash?: string;
  name: string;
  role: UserRole;
  isFounder?: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: String,
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['SUPER_ADMIN', 'ADMIN'], default: 'ADMIN' },
    isFounder: { type: Boolean, default: false },
    isAdmin: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export const User: Model<IUser> =
  mongoose.models?.User ?? mongoose.model<IUser>('User', UserSchema);
