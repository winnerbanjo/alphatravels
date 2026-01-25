/**
 * Auth Configuration & Session Management
 * 
 * This file provides client-side session helpers and role checks.
 * In production, this would integrate with NextAuth or Supabase Auth.
 */

// Founder/Admin user configuration
export const FOUNDER_EMAIL = 'oyekunle@alpha.com';
export const FOUNDER_ID = 'founder-001';
export const ADMIN_EMAILS = ['oyekunle@alpha.com', 'admin@alpha.com'];

// Get current user from cookies (client-side)
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const email = cookies['admin_user_email'];
  const role = cookies['admin_user_role'];
  const userId = cookies['admin_user_id'];

  if (!email) return null;

  return {
    email,
    id: userId || null,
    role: role || (email === FOUNDER_EMAIL ? 'SUPER_ADMIN' : 'ADMIN'),
    isFounder: email === FOUNDER_EMAIL || userId === FOUNDER_ID,
  };
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' || user.isFounder;
}

// Check if user is founder/super admin
export function isFounder(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.isFounder || user.role === 'SUPER_ADMIN' || user.email === FOUNDER_EMAIL;
}

// Set admin session (client-side helper)
export function setAdminSession(email: string, role: string = 'SUPER_ADMIN', userId: string = 'founder-001') {
  if (typeof window === 'undefined') return;

  const timestamp = Date.now();
  document.cookie = `admin_session=session_${timestamp}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `admin_user_id=${userId}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `admin_user_email=${email}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `admin_user_role=${role}; path=/; max-age=604800; SameSite=Lax`;
}

// Clear admin session
export function clearAdminSession() {
  if (typeof window === 'undefined') return;

  const cookies = ['admin_session', 'admin_user_id', 'admin_user_email', 'admin_user_role'];
  cookies.forEach(name => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
}
