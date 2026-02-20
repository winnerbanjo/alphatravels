export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';
import { Order } from '@/src/models/Order';
import { success, error } from '@/src/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, orderData, customerInfo, totalPrice } = body;

    if (!type || !orderData || !customerInfo || totalPrice == null) {
      return error('type, orderData, customerInfo, and totalPrice are required', 400);
    }

    const bookingSource = body.bookingSource || 'ADMIN_DIRECT';
    const merchantId = body.merchantId ?? null;

    await connectDb();
    const amount = parseFloat(String(totalPrice));
    const order = await Order.create({
      type,
      orderData,
      customerInfo,
      totalPrice: amount,
      amount,
      status: 'Pending',
      paymentStatus: 'pending',
      pnr: body.pnr ?? undefined,
      bookingSource,
      merchantId,
    });

    const doc = order.toObject();
    return success({
      order: {
        ...doc,
        id: doc._id.toString(),
      },
      message: 'Order created successfully',
    });
  } catch (err) {
    console.error('Order creation error:', err);
    return error(err instanceof Error ? err.message : 'Order creation failed', 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    await connectDb();
    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    const list = orders.map((o) => ({ ...o, id: (o as { _id: unknown })._id.toString() }));

    return success({ orders: list, total: list.length });
  } catch (err) {
    console.error('Order retrieval error:', err);
    return error(err instanceof Error ? err.message : 'Order retrieval failed', 500);
  }
}
