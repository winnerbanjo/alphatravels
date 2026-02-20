export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Merchant } from '@/src/models/Merchant';
import { success, error } from '@/src/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');

    await connectDb();
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    let list = await Merchant.find(filter).lean();
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.email.toLowerCase().includes(s) ||
          m.name.toLowerCase().includes(s) ||
          (m.companyName && m.companyName.toLowerCase().includes(s))
      );
    }

    const merchants = list.map((m) => {
      const doc = m as { _id: unknown; avatar_url?: string };
      return {
        ...m,
        id: doc._id.toString(),
        totalSales: `₦${Number(m.totalSales || 0).toLocaleString('en-NG')}`,
        avatar_url: doc.avatar_url ?? undefined,
      };
    });

    return success({ merchants, total: merchants.length });
  } catch (err) {
    console.error('Merchant fetch error:', err);
    return error(err instanceof Error ? err.message : 'Failed to fetch merchants', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, status, action } = body;

    if (!merchantId) {
      return error('merchantId is required', 400);
    }

    let newStatus = status;
    if (action === 'approve' || action === 'verify') newStatus = 'Verified';
    else if (action === 'reject' || action === 'suspend') newStatus = 'Suspended';

    if (!newStatus || !['Verified', 'Pending', 'Suspended'].includes(newStatus)) {
      return error('status must be one of: Verified, Pending, Suspended', 400);
    }

    await connectDb();
    const merchant = await Merchant.findByIdAndUpdate(
      merchantId,
      { status: newStatus, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!merchant) {
      return error('Merchant not found', 404);
    }

    return success({
      merchant: {
        ...merchant,
        id: (merchant as { _id: unknown })._id.toString(),
        totalSales: `₦${Number(merchant.totalSales || 0).toLocaleString('en-NG')}`,
      },
      message: `Merchant status updated to ${newStatus}`,
    });
  } catch (err) {
    console.error('Merchant update error:', err);
    return error(err instanceof Error ? err.message : 'Update failed', 500);
  }
}
