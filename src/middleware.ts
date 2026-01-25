import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Founder/Admin credentials - In production, stored in environment variables
const FOUNDER_EMAILS = [
  'oyekunle@alpha.com',
  process.env.FOUNDER_EMAIL || 'oyekunle@alpha.com',
];
const FOUNDER_IDS = [
  'founder-001',
  process.env.FOUNDER_ID || 'founder-001',
];
const ADMIN_EMAILS = [
  'admin@alpha.com',
  'oyekunle@alpha.com',
  ...FOUNDER_EMAILS,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // EMERGENCY BYPASS: Hardcode founder email check (HIGHEST PRIORITY)
  // This ensures oyekunle@alpha.com NEVER gets blocked
  const sessionToken = request.cookies.get('admin_session');
  const userEmail = request.cookies.get('admin_user_email');
  const adminEmail = request.headers.get('x-admin-email');
  const emailFromCookie = userEmail?.value || '';
  const emailFromHeader = adminEmail || '';

  // CRITICAL: If founder email is detected anywhere, allow access immediately
  // This is the HIGHEST PRIORITY check - founder NEVER gets blocked
  const isFounderEmailDetected = emailFromCookie === 'oyekunle@alpha.com' || 
                                  emailFromHeader === 'oyekunle@alpha.com';
  
  if (isFounderEmailDetected && pathname.startsWith('/admin')) {
    // Founder bypass - allow all admin routes immediately
      // Set founder cookies if not already set
      const response = NextResponse.next();
      if (!sessionToken) {
        response.cookies.set('admin_session', `founder_session_${Date.now()}`, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        response.cookies.set('admin_user_id', 'founder-001', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        response.cookies.set('admin_user_email', 'oyekunle@alpha.com', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        response.cookies.set('admin_user_role', 'SUPER_ADMIN', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
      }
      return response;
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin authentication via cookies
    const userId = request.cookies.get('admin_user_id');
    const userRole = request.cookies.get('admin_user_role');

    // Check headers (for API calls or direct access)
    const authHeader = request.headers.get('authorization');
    const adminId = request.headers.get('x-admin-id');

    // Check referer - if coming from login page, allow (for demo)
    const referer = request.headers.get('referer') || '';
    const fromLogin = referer.includes('/login');

    // Determine if user is authenticated
    const hasSession = sessionToken && userId && userEmail;
    const hasHeaders = adminId || adminEmail || authHeader;

    // Check if user is founder/admin (already extracted above, but keep for consistency)
    const idFromCookie = userId?.value || '';
    const idFromHeader = adminId || '';

    const isFounderEmail = FOUNDER_EMAILS.includes(emailFromCookie) || 
                          FOUNDER_EMAILS.includes(emailFromHeader) ||
                          emailFromCookie === 'oyekunle@alpha.com' ||
                          emailFromHeader === 'oyekunle@alpha.com' ||
                          emailFromCookie === 'admin@alpha.com' ||
                          emailFromHeader === 'admin@alpha.com';
    
    const isFounderId = FOUNDER_IDS.includes(idFromCookie) || 
                       FOUNDER_IDS.includes(idFromHeader) ||
                       idFromCookie === 'founder-001' ||
                       idFromHeader === 'founder-001';

    const isAdminEmail = ADMIN_EMAILS.includes(emailFromCookie) || 
                        ADMIN_EMAILS.includes(emailFromHeader) ||
                        emailFromCookie === 'admin@alpha.com' ||
                        emailFromHeader === 'admin@alpha.com';
    
    const isAdminRole = userRole?.value === 'SUPER_ADMIN' || 
                       userRole?.value === 'ADMIN';

    // Allow access if:
    // 1. Has valid session with admin role, OR
    // 2. Has founder credentials in headers/cookies, OR
    // 3. Has admin email in headers/cookies, OR
    // 4. Coming from login page (for demo purposes), OR
    // 5. Has any session token (for demo - in production, verify token validity)
    const hasAuth = (hasSession && (isAdminRole || isAdminEmail || userId)) || 
                   (hasHeaders && (isFounderEmail || isFounderId || isAdminEmail)) ||
                   isFounderEmail || 
                   isFounderId ||
                   (hasSession && isAdminEmail) ||
                   (fromLogin && pathname === '/admin/dashboard') || // Allow direct access to dashboard from login
                   sessionToken; // For demo: if session token exists, allow (in production, verify token)

    if (!hasAuth) {
      // Redirect to login page instead of JSON error
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'admin_access_required');
      return NextResponse.redirect(loginUrl);
    }

    // Verify founder access for super admin routes
    if (pathname.startsWith('/admin/merchants') || 
        pathname.startsWith('/admin/revenue') ||
        pathname.startsWith('/admin/bookings') ||
        pathname.startsWith('/admin/dashboard')) {
      
      const hasFounderAccess = isFounderEmail || 
                               isFounderId || 
                               (hasSession && userRole?.value === 'SUPER_ADMIN') ||
                               (hasHeaders && (isFounderEmail || isFounderId)) ||
                               (fromLogin && (isFounderEmail || isFounderId || isAdminEmail)) || // Allow from login
                               (hasSession && isAdminEmail) || // If has admin session, allow
                               sessionToken; // For demo: if session token exists, allow founder routes

      if (!hasFounderAccess) {
        // Redirect to login with founder access message
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('reason', 'founder_access_required');
        return NextResponse.redirect(loginUrl);
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
