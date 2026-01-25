// Temporary Merchant Unlock for Alpha Travels Demo
export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hard-code merchant access for demo purposes
  const isMerchant = true; // Force true so you can enter the dashboard
  
  if (!isMerchant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Unauthorized</h1>
          <p className="text-slate-600">You do not have access to this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
