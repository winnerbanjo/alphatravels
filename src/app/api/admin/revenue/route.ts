import { NextRequest, NextResponse } from 'next/server';

// GET - Calculate revenue statistics
export async function GET(request: NextRequest) {
  try {
    // In production: const orders = await prisma.order.findMany({ where: { status: { not: 'Cancelled' } } });
    // For demo purposes, we'll calculate from orders stored in the orders API
    // Note: In production, both APIs would query the same database
    let orders: any[] = [];
    
    // In a real application, both /api/orders/create and /api/admin/revenue would query the same database
    // For now, we'll use an empty array and calculate from mock structure
    // The revenue calculation logic below will work once orders are populated from the database

    // Calculate total revenue from all orders
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    // Alpha Service Fee per booking (₦25,000)
    const ALPHA_SERVICE_FEE = 25000;
    const totalBookings = orders.length;
    const totalServiceFees = totalBookings * ALPHA_SERVICE_FEE;

    // Commission calculation (5% of base price, excluding service fees)
    const COMMISSION_RATE = 0.05;
    const totalCommission = orders.reduce((sum, order) => {
      const basePrice = order.totalPrice - ALPHA_SERVICE_FEE;
      return sum + basePrice * COMMISSION_RATE;
    }, 0);

    // Merchant payouts (total revenue minus service fees and commission)
    const merchantPayouts = totalRevenue - totalServiceFees - totalCommission;

    // Format currency
    const formatCurrency = (amount: number) => {
      return `₦${amount.toLocaleString('en-NG')}`;
    };

    return NextResponse.json({
      success: true,
      revenue: {
        totalRevenue: formatCurrency(totalRevenue),
        totalRevenueRaw: totalRevenue,
        platformFee: formatCurrency(totalServiceFees + totalCommission),
        platformFeeRaw: totalServiceFees + totalCommission,
        serviceFees: formatCurrency(totalServiceFees),
        serviceFeesRaw: totalServiceFees,
        commission: formatCurrency(totalCommission),
        commissionRaw: totalCommission,
        merchantPayouts: formatCurrency(merchantPayouts),
        merchantPayoutsRaw: merchantPayouts,
        totalBookings,
      },
    });
  } catch (error: any) {
    console.error('Revenue calculation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate revenue',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
