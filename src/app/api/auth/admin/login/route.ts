import { NextRequest, NextResponse } from 'next/server';

// Admin users database - In production, use Prisma
const ADMIN_USERS = [
  {
    email: 'oyekunle@alpha.com',
    id: 'founder-001',
    name: 'Oyekunle Ade',
    role: 'SUPER_ADMIN',
    isFounder: true,
  },
  {
    email: 'admin@alpha.com',
    id: 'admin-001',
    name: 'Admin User',
    role: 'ADMIN',
    isFounder: false,
  },
];

// POST - Admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find admin user
    const adminUser = ADMIN_USERS.find((user) => user.email === email);

    if (!adminUser) {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
          message: 'Email not found in admin database',
        },
        { status: 401 }
      );
    }

    // In production, verify password hash
    // For demo, accept any password for admin users
    if (!password) {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
          message: 'Password is required',
        },
        { status: 401 }
      );
    }

    // Create session token (in production, use JWT)
    const sessionToken = `admin_session_${Date.now()}_${adminUser.id}`;

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        isFounder: adminUser.isFounder,
      },
    });

    // Set HTTP-only cookie for security
    // Note: httpOnly cookies can't be read by JavaScript, but middleware can read them
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: false, // Set to false for demo to allow client-side access; set to true in production
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Also set user info in cookie for middleware access
    response.cookies.set('admin_user_id', adminUser.id, {
      httpOnly: false, // Set to false for demo
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('admin_user_email', adminUser.email, {
      httpOnly: false, // Set to false for demo
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('admin_user_role', adminUser.role, {
      httpOnly: false, // Set to false for demo
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      {
        error: 'Login failed',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// GET - Check admin session
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session');
    const userId = request.cookies.get('admin_user_id');
    const userEmail = request.cookies.get('admin_user_email');
    const userRole = request.cookies.get('admin_user_role');

    if (!sessionToken || !userId) {
      return NextResponse.json(
        {
          authenticated: false,
          message: 'No active session',
        },
        { status: 401 }
      );
    }

    // Find user
    const adminUser = ADMIN_USERS.find((user) => user.id === userId.value);

    if (!adminUser) {
      return NextResponse.json(
        {
          authenticated: false,
          message: 'User not found',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        isFounder: adminUser.isFounder,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        authenticated: false,
        message: error.message || 'Session check failed',
      },
      { status: 500 }
    );
  }
}
