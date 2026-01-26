export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock database - In production, this would connect to a real database
// For now, we'll use in-memory storage (would be replaced with Prisma/PostgreSQL)
// Note: In a real application, this would be a shared database module
let orders: any[] = [];

// Export orders array for use in update-status route
// In production, use a proper database connection
export { orders };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, orderData, customerInfo, totalPrice } = body;

    // Validate required parameters
    if (!type || !orderData || !customerInfo || !totalPrice) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'type, orderData, customerInfo, and totalPrice are required',
        },
        { status: 400 }
      );
    }

    // Extract booking source and merchant_id from request
    const bookingSource = body.bookingSource || 'ADMIN_DIRECT'; // 'ADMIN_DIRECT' or 'MERCHANT_MANUAL'
    const merchantId = body.merchantId || null;

    // Create order record
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type, // 'hotel', 'car', 'shortlet'
      orderData,
      customerInfo,
      totalPrice: parseFloat(totalPrice),
      status: 'Pending', // 'Pending', 'Confirmed', 'Paid'
      bookingSource, // 'ADMIN_DIRECT' or 'MERCHANT_MANUAL'
      merchantId, // Merchant ID if booking came from merchant
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In production, save to database
    // await prisma.order.create({ data: order });
    orders.push(order);

    return NextResponse.json({
      success: true,
      order,
      message: 'Order created successfully',
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create order',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve orders (for merchant dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // Filter by type: 'hotel', 'car', 'shortlet'
    const status = searchParams.get('status'); // Filter by status

    let filteredOrders = [...orders];

    if (type) {
      filteredOrders = filteredOrders.filter((order) => order.type === type);
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    // Sort by createdAt (newest first)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      orders: filteredOrders,
      total: filteredOrders.length,
    });
  } catch (error: any) {
    console.error('Order retrieval error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve orders',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
