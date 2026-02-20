export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Merchant } from '@/src/models/Merchant';
import { success, error } from '@/src/lib/api-response';

/**
 * GET - Verify merchant session and ensure merchant is Verified in DB.
 * Used by merchant layout to restrict dashboard to verified merchants only.
 */
export async function GET(request: NextRequest) {
  try {
    const merchantId = request.cookies.get('merchant_id')?.value;
    const session = request.cookies.get('merchant_session')?.value;

    if (!session || !merchantId) {
      return error('Not authenticated', 401);
    }

    await connectDb();
    const merchant = await Merchant.findById(merchantId).lean();
    if (!merchant) {
      return error('Merchant not found', 404);
    }
    if (merchant.status !== 'Verified') {
      return success({
        authenticated: true,
        verified: false,
        status: merchant.status,
        message: 'Account pending verification or suspended.',
      });
    }

    return success({
      authenticated: true,
      verified: true,
      status: merchant.status,
      merchant: {
        id: merchant._id.toString(),
        name: merchant.name,
        email: merchant.email,
        companyName: merchant.companyName,
      },
    });
  } catch (err) {
    console.error('Merchant verify error:', err);
    return error(err instanceof Error ? err.message : 'Verification failed', 500);
  }
}
