export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock database - Import from shared merchants array
// In production, use Prisma: const merchant = await prisma.merchant.findUnique({ where: { id } });
let merchants: any[] = [
  {
    id: 'MERCH-001',
    name: 'Oyekunle Ade',
    email: 'oyekunle@alpha.com',
    companyName: 'RELLISH TECHNOLOGIES NIGERIA LIMITED',
    status: 'Verified',
    joinDate: '2024-01-15',
    totalSales: 8450000,
    bookings: 67,
    phone: '+234 800 000 0001',
    address: 'Lagos, Nigeria',
  },
  {
    id: 'MERCH-002',
    name: 'Chioma Nwosu',
    email: 'chioma@alpha.com',
    companyName: 'Alpha Travels Agent',
    status: 'Verified',
    joinDate: '2023-11-20',
    totalSales: 12200000,
    bookings: 98,
    phone: '+234 800 000 0002',
    address: 'Abuja, Nigeria',
  },
];

// GET - Fetch single merchant by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const merchantId = id;

    const merchant = merchants.find((m) => m.id === merchantId);

    if (!merchant) {
      return NextResponse.json(
        {
          error: 'Merchant not found',
          message: `Merchant with ID ${merchantId} does not exist`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      merchant: {
        ...merchant,
        totalSales: `₦${merchant.totalSales.toLocaleString('en-NG')}`,
      },
    });
  } catch (error: any) {
    console.error('Merchant fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch merchant',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
