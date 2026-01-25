// Temporary Admin Unlock for Alpha Travels Demo
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hard-code admin access for demo purposes
  const isAdmin = true; // Force true so you can enter the dashboard
  
  if (!isAdmin) {
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
