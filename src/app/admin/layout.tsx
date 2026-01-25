// Temporary Admin Unlock for Alpha Travels Demo
// ALL AUTH GUARDS REMOVED - Force unlock for demo
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hard-code admin access - NO CHECKS, NO BLOCKS
  return <>{children}</>;
}
