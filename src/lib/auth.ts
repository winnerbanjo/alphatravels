/**
 * Auth Configuration & Session Management (client-side).
 * Role verification is done server-side via MongoDB Users collection at login.
 */

// Get current user from cookies (client-side). Role comes from server-verified session.
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
    role: role || 'ADMIN',
    isFounder: role === 'SUPER_ADMIN',
  };
}

// Check if user is admin (from session cookie set after MongoDB verification).
export function isAdmin(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === 'SUPER_ADMIN' || user.role === 'ADMIN';
}

// Check if user is founder/super admin (from session cookie).
export function isFounder(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === 'SUPER_ADMIN';
}

// Set admin session (client-side helper; server sets these after MongoDB verification).
export function setAdminSession(email: string, role: string, userId: string) {
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
