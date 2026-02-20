export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Order } from '@/src/models/Order';
import { success, error } from '@/src/lib/api-response';

const VALID_STATUSES = ['Pending', 'Confirmed', 'Paid', 'Cancelled'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const body = await request.json();
    const { status, action } = body;

    let newStatus = status;
    if (action === 'confirm') newStatus = 'Confirmed';
    else if (action === 'cancel') newStatus = 'Cancelled';
    else if (action === 'paid') newStatus = 'Paid';

    if (!newStatus || !VALID_STATUSES.includes(newStatus)) {
      return error(`status or action required; status must be one of: ${VALID_STATUSES.join(', ')}`, 400);
    }

    await connectDb();
    const update: Record<string, unknown> = { status: newStatus, updatedAt: new Date() };
    if (newStatus === 'Paid') update.paymentStatus = 'paid';
    const order = await Order.findByIdAndUpdate(orderId, update, { new: true }).lean();

    if (!order) {
      return error('Order not found', 404);
    }

    return success({
      order: { ...order, id: (order as { _id: unknown })._id.toString() },
      message: `Order status updated to ${newStatus}.`,
    });
  } catch (err) {
    console.error('Order status update error:', err);
    return error(err instanceof Error ? err.message : 'Update failed', 500);
  }
}
