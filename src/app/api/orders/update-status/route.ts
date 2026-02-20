export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Order } from '@/src/models/Order';
import { success, error } from '@/src/lib/api-response';

const VALID_STATUSES = ['Pending', 'Confirmed', 'Paid', 'Cancelled'];

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return error('orderId and status are required', 400);
    }
    if (!VALID_STATUSES.includes(status)) {
      return error(`Status must be one of: ${VALID_STATUSES.join(', ')}`, 400);
    }

    await connectDb();
    const update: Record<string, unknown> = { status, updatedAt: new Date() };
    if (status === 'Paid') update.paymentStatus = 'paid';
    const order = await Order.findByIdAndUpdate(orderId, update, { new: true }).lean();

    if (!order) {
      return error('Order not found', 404);
    }

    return success({
      order: { ...order, id: (order as { _id: unknown })._id.toString() },
      message: 'Order status updated successfully',
    });
  } catch (err) {
    console.error('Order status update error:', err);
    return error(err instanceof Error ? err.message : 'Update failed', 500);
  }
}
