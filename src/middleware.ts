import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Production gatekeeping: unauthenticated users are redirected away from
 * /admin and /merchant. Session cookies are set only after MongoDB Users
 * collection verification (see /api/auth/admin/login and /api/auth/merchant/*).
 */
const ADMIN_PREFIX = '/admin';
const MERCHANT_PREFIX = '/merchant';
const LOGIN_PAGE = '/login';
const MERCHANT_LOGIN_PAGE = '/merchant/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ADMIN_PREFIX)) {
    const session = request.cookies.get('admin_session');
    const userId = request.cookies.get('admin_user_id');
    if (!session?.value || !userId?.value) {
      const loginUrl = new URL(LOGIN_PAGE, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(MERCHANT_PREFIX)) {
    const allowedWithoutAuth = [
      '/merchant/login',
      '/merchant/register',
      '/merchant/onboarding',
      '/merchant/paywall',
    ];
    if (allowedWithoutAuth.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
      return NextResponse.next();
    }
    const session = request.cookies.get('merchant_session');
    const merchantId = request.cookies.get('merchant_id');
    if (!session?.value || !merchantId?.value) {
      const loginUrl = new URL(MERCHANT_LOGIN_PAGE, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/merchant/:path*'],
};
