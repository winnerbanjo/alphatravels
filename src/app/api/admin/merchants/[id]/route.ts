export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Merchant } from '@/src/models/Merchant';
import { success, error } from '@/src/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: merchantId } = await params;

    await connectDb();
    const merchant = await Merchant.findById(merchantId).lean();
    if (!merchant) {
      return error('Merchant not found', 404);
    }

    const doc = merchant as { _id: unknown; avatar_url?: string };
    return success({
      merchant: {
        ...merchant,
        id: doc._id.toString(),
        totalSales: `₦${Number(merchant.totalSales || 0).toLocaleString('en-NG')}`,
        avatar_url: doc.avatar_url ?? undefined,
      },
    });
  } catch (err) {
    console.error('Merchant fetch error:', err);
    return error(err instanceof Error ? err.message : 'Failed to fetch merchant', 500);
  }
}
