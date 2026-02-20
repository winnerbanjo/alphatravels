export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { User } from '@/src/models/User';
import { success, error } from '@/src/lib/api-response';

/**
 * One-time seed: ensure at least one admin user exists in Users collection.
 * POST with { "email": "admin@example.com", "name": "Admin", "role": "SUPER_ADMIN" }.
 * In production, protect this route or remove after first deploy.
 */
export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const body = await request.json().catch(() => ({}));
    const email = (body.email || process.env.SEED_ADMIN_EMAIL || 'oyekunle@alpha.com').toString().trim().toLowerCase();
    const name = (body.name || 'Super Admin').toString().trim();
    const role = body.role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'ADMIN';

    const existing = await User.findOne({ email, isAdmin: true }).lean();
    if (existing) {
      return success({
        message: 'Admin user already exists',
        userId: (existing as { _id: unknown })._id.toString(),
        email: existing.email,
      });
    }

    const user = await User.create({
      email,
      name,
      role,
      isAdmin: true,
      isFounder: role === 'SUPER_ADMIN',
    });

    return success({
      message: 'Admin user created',
      userId: user._id.toString(),
      email: user.email,
    });
  } catch (err) {
    console.error('Seed admin error:', err);
    return error(err instanceof Error ? err.message : 'Seed failed', 500);
  }
}
