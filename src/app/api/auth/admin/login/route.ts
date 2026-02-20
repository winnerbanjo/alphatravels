export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { User } from '@/src/models/User';
import { success, error, handleApiError } from '@/src/lib/api-response';

function setSessionCookies(response: NextResponse, user: { id: string; email: string; role: string }) {
  const sessionToken = `admin_session_${Date.now()}_${user.id}`;
  const opts = {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  };
  response.cookies.set('admin_session', sessionToken, opts);
  response.cookies.set('admin_user_id', user.id, opts);
  response.cookies.set('admin_user_email', user.email, opts);
  response.cookies.set('admin_user_role', user.role, opts);
}

// POST - Admin login (queries Users collection in MongoDB; no hardcoded list)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) return error('Email is required', 400);
    if (!password) return error('Password is required', 401);

    await connectDb();
    const user = await User.findOne({ email: email.trim().toLowerCase(), isAdmin: true }).lean();
    if (!user) return error('Email not found or not an admin', 401);

    // In production: verify password with bcrypt.compare(password, user.passwordHash)
    if (user.passwordHash && user.passwordHash.length > 0) {
      // TODO: bcrypt.compare(password, user.passwordHash)
    }

    const userPayload = {
      id: (user as { _id: unknown })._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      isFounder: user.isFounder ?? false,
    };

    const response = success({ user: userPayload });
    setSessionCookies(response, { id: userPayload.id, email: userPayload.email, role: userPayload.role });
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}

// GET - Check admin session (validates against Users collection)
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session');
    const userId = request.cookies.get('admin_user_id');

    if (!sessionToken?.value || !userId?.value) return error('No active session', 401);

    await connectDb();
    const user = await User.findById(userId.value).lean();
    if (!user || !user.isAdmin) return error('User not found or not an admin', 401);

    return success({
      authenticated: true,
      user: {
        id: (user as { _id: unknown })._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        isFounder: user.isFounder ?? false,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
