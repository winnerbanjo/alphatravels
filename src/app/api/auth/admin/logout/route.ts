export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { success, error } from '@/src/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const response = success({ message: 'Logged out successfully' });
    response.cookies.delete('admin_session');
    response.cookies.delete('admin_user_id');
    response.cookies.delete('admin_user_email');
    response.cookies.delete('admin_user_role');
    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return error(err instanceof Error ? err.message : 'Logout failed', 500);
  }
}
