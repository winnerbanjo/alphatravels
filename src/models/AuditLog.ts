import mongoose, { Schema, Document, Model } from 'mongoose';

export type AuditProvider = 'amadeus' | 'paystack';

export interface IAuditLog extends Document {
  provider: AuditProvider;
  action: string;
  method?: string;
  url?: string;
  requestPayload?: Record<string, unknown>;
  responsePayload?: Record<string, unknown>;
  statusCode?: number;
  error?: string;
  durationMs?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    provider: { type: String, required: true, enum: ['amadeus', 'paystack'] },
    action: { type: String, required: true },
    method: String,
    url: String,
    requestPayload: { type: Schema.Types.Mixed },
    responsePayload: { type: Schema.Types.Mixed },
    statusCode: Number,
    error: String,
    durationMs: Number,
  },
  { timestamps: true }
);

AuditLogSchema.index({ provider: 1, createdAt: -1 });
AuditLogSchema.index({ createdAt: -1 });

export const AuditLog: Model<IAuditLog> =
  mongoose.models?.AuditLog ?? mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
