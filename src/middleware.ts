import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware - Basic routing only
// All auth guards removed for demo stability
export function middleware(request: NextRequest) {
  // Allow all requests - no blocking
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
