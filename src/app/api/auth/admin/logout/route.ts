import { NextRequest, NextResponse } from 'next/server';

// POST - Admin logout
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear all admin session cookies
    response.cookies.delete('admin_session');
    response.cookies.delete('admin_user_id');
    response.cookies.delete('admin_user_email');
    response.cookies.delete('admin_user_role');

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        error: 'Logout failed',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
