export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Booking } from '@/src/models/Booking';
import { Order } from '@/src/models/Order';
import { success, error } from '@/src/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const merchantId = request.cookies.get('merchant_id')?.value;
    if (!merchantId) {
      return error('Not authenticated', 401);
    }

    await connectDb();

    const [bookings, orders] = await Promise.all([
      Booking.find({ merchantId }).sort({ createdAt: -1 }).limit(50).lean(),
      Order.find({ merchantId }).lean(),
    ]);

    const totalBookings = bookings.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
    const ALPHA_SERVICE_FEE = 25000;
    const COMMISSION_RATE = 0.05;
    const totalCommission = orders.reduce((s, o) => {
      const base = (o.totalPrice || 0) - ALPHA_SERVICE_FEE;
      return s + base * COMMISSION_RATE;
    }, 0);
    const walletBalance = 120000;

    const stats = {
      totalBookings,
      totalRevenue: `₦${totalRevenue.toLocaleString('en-NG')}`,
      commissionEarned: `₦${Math.round(totalCommission).toLocaleString('en-NG')}`,
      walletBalance: `₦${walletBalance.toLocaleString('en-NG')}`,
    };

    const recentBookings = bookings.map((b) => ({
      id: (b as { pnr: string }).pnr,
      flight: (b as { airline?: string }).airline ? `${(b as { airline: string }).airline} flight` : 'Flight',
      customer: (b as { passengers?: Array<{ firstName?: string; lastName?: string }> }).passengers?.[0]
        ? `${(b as { passengers: Array<{ firstName?: string; lastName?: string }> }).passengers[0].firstName} ${(b as { passengers: Array<{ firstName?: string; lastName?: string }> }).passengers[0].lastName}`
        : '—',
      status: (b as { bookingStatus?: string }).bookingStatus === 'confirmed' ? 'Confirmed' : 'On-hold',
      commission: `₦${Math.round(((b as { totalFare?: number }).totalFare || 0) * COMMISSION_RATE).toLocaleString('en-NG')}`,
      date: (b as { createdAt?: Date }).createdAt ? new Date((b as { createdAt: Date }).createdAt).toISOString().slice(0, 10) : '—',
      revenue: `₦${Number((b as { totalFare?: number }).totalFare || 0).toLocaleString('en-NG')}`,
    }));

    return success({ stats, recentBookings });
  } catch (err) {
    console.error('Merchant dashboard error:', err);
    return error(err instanceof Error ? err.message : 'Dashboard fetch failed', 500);
  }
}
