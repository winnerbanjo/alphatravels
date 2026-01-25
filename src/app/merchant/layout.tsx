// Temporary Merchant Unlock for Alpha Travels Demo
// ALL AUTH GUARDS REMOVED - Force unlock for demo
export default async function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hard-code merchant access - NO CHECKS, NO BLOCKS
  return <>{children}</>;
}
