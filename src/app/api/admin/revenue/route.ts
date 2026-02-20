export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Order } from '@/src/models/Order';
import { success, error } from '@/src/lib/api-response';

const ALPHA_SERVICE_FEE = 25000;
const COMMISSION_RATE = 0.05;

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    const orders = await Order.find({ status: { $nin: ['Cancelled'] } }).lean();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const totalBookings = orders.length;
    const totalServiceFees = totalBookings * ALPHA_SERVICE_FEE;
    const totalCommission = orders.reduce((sum, o) => {
      const base = (o.totalPrice || 0) - ALPHA_SERVICE_FEE;
      return sum + base * COMMISSION_RATE;
    }, 0);
    const merchantPayouts = totalRevenue - totalServiceFees - totalCommission;

    const formatCurrency = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;

    return success({
      revenue: {
        totalRevenue: formatCurrency(totalRevenue),
        totalRevenueRaw: totalRevenue,
        platformFee: formatCurrency(totalServiceFees + totalCommission),
        platformFeeRaw: totalServiceFees + totalCommission,
        serviceFees: formatCurrency(totalServiceFees),
        serviceFeesRaw: totalServiceFees,
        commission: formatCurrency(totalCommission),
        commissionRaw: totalCommission,
        merchantPayouts: formatCurrency(merchantPayouts),
        merchantPayoutsRaw: merchantPayouts,
        totalBookings,
      },
    });
  } catch (err) {
    console.error('Revenue calculation error:', err);
    return error(err instanceof Error ? err.message : 'Revenue calculation failed', 500);
  }
}
