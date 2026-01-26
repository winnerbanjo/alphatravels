export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock orders database - In production, use Prisma
// This would be shared with /api/orders/create/route.ts
let orders: any[] = [];

// PATCH - Update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = id;
    const body = await request.json();
    const { status, action } = body;

    if (!status && !action) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'status or action is required',
        },
        { status: 400 }
      );
    }

    // Determine status based on action
    let newStatus = status;
    if (action === 'confirm') {
      newStatus = 'Confirmed';
    } else if (action === 'cancel') {
      newStatus = 'Cancelled';
    } else if (action === 'paid') {
      newStatus = 'Paid';
    }

    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Paid', 'Cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        {
          error: 'Invalid status',
          message: `Status must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Find and update order
    // In production: const order = await prisma.order.findUnique({ where: { id: orderId } });
    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          error: 'Order not found',
          message: `Order with ID ${orderId} does not exist`,
        },
        { status: 404 }
      );
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    const updatedOrder = orders[orderIndex];

    // Simulate email notification to customer
    // In production: await sendEmail({
    //   to: updatedOrder.customerInfo.email,
    //   template: 'order-status-update',
    //   data: { orderId, status: newStatus, order: updatedOrder }
    // });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${newStatus}. Email notification sent.`,
    });
  } catch (error: any) {
    console.error('Order status update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update order status',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
