export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDb } from '@/src/lib/db';
import { Transaction } from '@/src/models/Transaction';
import { AuditLog } from '@/src/models/AuditLog';
import { success, error } from '@/src/lib/api-response';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

function verifyPaystackSignature(payload: string, signature: string): boolean {
  if (!PAYSTACK_SECRET) return false;
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET).update(payload).digest('hex');
  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature') || '';

    if (!verifyPaystackSignature(rawBody, signature)) {
      await logAudit('paystack', 'webhook_verify_failed', { error: 'Invalid signature' });
      return error('Invalid signature', 401);
    }

    const body = JSON.parse(rawBody) as { event?: string; data?: { reference?: string; status?: string } };
    const event = body.event;
    const data = body.data;

    await connectDb();

    await logAudit('paystack', event || 'unknown', { requestPayload: body });

    if (event === 'charge.success' && data?.reference) {
      const ref = data.reference;
      const status = data.status === 'success' ? 'success' : 'failed';
      await Transaction.findOneAndUpdate(
        { reference: ref, gateway: 'paystack' },
        { status, updatedAt: new Date() },
        { new: true }
      );
    }

    if (event === 'charge.failed' && data?.reference) {
      await Transaction.findOneAndUpdate(
        { reference: data.reference, gateway: 'paystack' },
        { status: 'failed', updatedAt: new Date() },
        { new: true }
      );
    }

    return success({ received: true });
  } catch (err) {
    console.error('Paystack webhook error:', err);
    return error(err instanceof Error ? err.message : 'Webhook processing failed', 500);
  }
}

async function logAudit(provider: 'paystack', action: string, payload: Record<string, unknown>) {
  try {
    await connectDb();
    await AuditLog.create({
      provider,
      action,
      requestPayload: payload,
    });
  } catch (e) {
    console.error('Audit log write failed:', e);
  }
}
