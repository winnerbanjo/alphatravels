export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Merchant } from '@/src/models/Merchant';
import { Booking } from '@/src/models/Booking';
import { Order } from '@/src/models/Order';
import { getCloudinaryImageUrl } from '@/src/lib/cloudinary';
import { success, error } from '@/src/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const [merchants, recentBookings, orders] = await Promise.all([
      Merchant.find({}).lean(),
      Booking.find({}).sort({ createdAt: -1 }).limit(20).lean(),
      Order.find({ status: { $nin: ['Cancelled'] } }).lean(),
    ]);

    const totalRevenueRaw = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
    const activeMerchants = merchants.filter((m) => m.status === 'Verified').length;
    const pendingApprovals = merchants.filter((m) => m.status === 'Pending').length;

    const stats = {
      networkVolume: `₦${totalRevenueRaw.toLocaleString('en-NG')}`,
      activeMerchants,
      pendingApprovals,
    };

    const merchantList = merchants.map((m) => {
      const doc = m as { _id: unknown; avatar_url?: string };
      return {
        id: doc._id.toString(),
        name: m.name,
        email: m.email,
        totalSales: `₦${Number(m.totalSales || 0).toLocaleString('en-NG')}`,
        bookings: m.bookings || 0,
        status: m.status,
        joinDate: m.joinDate || '',
        avatar: doc.avatar_url || getCloudinaryImageUrl('placeholder', { folder: 'greenlife-uploads' }),
      };
    });

    const pendingList = merchants
      .filter((m) => m.status === 'Pending')
      .map((m) => ({
        id: (m as { _id: unknown })._id.toString(),
        name: m.name,
        email: m.email,
        submittedDate: m.joinDate || new Date().toISOString().slice(0, 10),
      }));

    const recentBookingsList = recentBookings.slice(0, 10).map((b) => ({
      id: (b as { _id: unknown })._id.toString(),
      merchant: (b as { merchantId?: string }).merchantId || '—',
      booking: (b as { pnr: string }).pnr,
      amount: `₦${Number((b as { totalFare?: number }).totalFare || 0).toLocaleString('en-NG')}`,
      time: formatTimeAgo((b as { createdAt?: Date }).createdAt),
    }));

    const topPerformers = merchantList
      .filter((m) => m.status === 'Verified')
      .sort((a, b) => Number(b.totalSales.replace(/[^0-9]/g, '')) - Number(a.totalSales.replace(/[^0-9]/g, '')))
      .slice(0, 5)
      .map((m) => ({
        name: m.name,
        sales: m.totalSales,
        bookings: m.bookings,
        avatar: m.avatar,
      }));

    const revenueByMonth = getRevenueDataByMonth(orders);
    const revenueData = revenueByMonth.map((r) => ({ month: r.month, revenue: r.revenue }));

    return success({
      stats,
      merchants: merchantList,
      pendingApprovals: pendingList,
      recentBookings: recentBookingsList,
      topPerformers,
      revenueData,
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    return error(err instanceof Error ? err.message : 'Dashboard fetch failed', 500);
  }
}

function formatTimeAgo(d: Date | undefined): string {
  if (!d) return '—';
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

function getRevenueDataByMonth(orders: Array<{ totalPrice?: number; createdAt?: Date }>): Array<{ month: string; revenue: number }> {
  const months: Record<string, number> = {};
  const now = new Date();
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months[d.toLocaleString('en-US', { month: 'short' })] = 0;
  }
  for (const o of orders) {
    const created = o.createdAt ? new Date(o.createdAt) : new Date();
    const key = created.toLocaleString('en-US', { month: 'short' });
    if (months[key] != null) months[key] += o.totalPrice || 0;
  }
  return Object.entries(months).map(([month, revenue]) => ({ month, revenue: Math.round(revenue / 1_000_000) }));
}
