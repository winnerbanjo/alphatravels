import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Founder/Admin ID - In production, this would be stored in environment variables
const FOUNDER_ID = process.env.FOUNDER_ID || 'founder-001';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@alphatravels.com';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin authentication
    // In production, verify JWT token or session
    const authHeader = request.headers.get('authorization');
    const adminId = request.headers.get('x-admin-id');
    const adminEmail = request.headers.get('x-admin-email');
    const sessionToken = request.cookies.get('admin_session');

    // For demo purposes, allow access if headers are present or session token exists
    // In production, verify against database/session
    const hasAuth = adminId || adminEmail || authHeader || sessionToken;

    if (!hasAuth) {
      // Redirect to admin login or return 401
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Admin access required' },
        { status: 401 }
      );
    }

    // Verify founder ID for super admin routes
    if (pathname.startsWith('/admin/merchants') || 
        pathname.startsWith('/admin/revenue') ||
        pathname.startsWith('/admin/bookings') ||
        pathname.startsWith('/admin/dashboard')) {
      const isFounder = adminId === FOUNDER_ID || adminEmail === ADMIN_EMAIL;
      
      // For demo, allow if session token exists (would verify founder in production)
      if (!isFounder && !sessionToken) {
        return NextResponse.json(
          { error: 'Forbidden', message: 'Founder access required' },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
