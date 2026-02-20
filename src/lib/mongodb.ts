/**
 * MongoDB singleton connection for nile_booking_2026 (production).
 * Prevents Vercel from opening multiple connections under load.
 */
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://nileagencyafrica_db_user:jf2y0dLmetfak6GI@cluster0.fl2ppdk.mongodb.net/nile_booking_2026';

const DB_NAME = 'nile_booking_2026';

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDb(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (cached.promise) return cached.promise;
  cached.promise = mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
  });
  try {
    cached.conn = await cached.promise;
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB Connected');
    }
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export function getDb(): mongoose.mongo.Db | undefined {
  return mongoose.connection?.db;
}

export { MONGODB_URI, DB_NAME };
