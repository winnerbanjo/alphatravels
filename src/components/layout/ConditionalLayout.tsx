'use client';

import { usePathname } from 'next/navigation';
import MobileHeader from '@/src/components/shared/MobileHeader';
import Footer from '@/src/components/shared/Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminOrMerchant = pathname?.startsWith('/admin') || pathname?.startsWith('/merchant');
  const isNileBooking = pathname?.startsWith('/nile-booking');

  if (isAdminOrMerchant || isNileBooking) {
    // Admin/Merchant/Nile Booking pages use their own navigation (no header/footer)
    return <>{children}</>;
  }

  // Regular pages with MobileHeader and Footer
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MobileHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
