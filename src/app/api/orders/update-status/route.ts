export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock database - In production, this would connect to a real database
// Note: In a real application, this would use a proper database connection
// For now, we'll use a shared in-memory array (in production, use Prisma)
// This is a simplified approach for demo purposes
let orders: any[] = [];

// In production, you would fetch from database:
// const order = await prisma.order.findUnique({ where: { id: orderId } });
// await prisma.order.update({ where: { id: orderId }, data: { status, updatedAt: new Date() } });

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    // Validate required parameters
    if (!orderId || !status) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'orderId and status are required',
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Paid', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Invalid status',
          message: `Status must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Find and update order
    // In production: const order = await prisma.order.update({ where: { id: orderId }, data: { status, updatedAt: new Date() } });
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
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
      message: 'Order status updated successfully',
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
