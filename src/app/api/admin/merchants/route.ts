export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// Mock database - In production, use Prisma/PostgreSQL
let merchants: any[] = [
  {
    id: 'MERCH-001',
    name: 'Oyekunle Ade',
    email: 'oyekunle@alpha.com',
    companyName: 'RELLISH TECHNOLOGIES NIGERIA LIMITED',
    status: 'Verified', // 'Verified', 'Pending', 'Suspended'
    joinDate: '2024-01-15',
    totalSales: 8450000,
    bookings: 67,
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
  },
  {
    id: 'MERCH-003',
    name: 'Emeka Okoro',
    email: 'emeka@alpha.com',
    companyName: 'Travel Solutions NG',
    status: 'Verified',
    joinDate: '2024-03-10',
    totalSales: 6800000,
    bookings: 54,
  },
  {
    id: 'MERCH-004',
    name: 'Folake Adeyemi',
    email: 'folake@alpha.com',
    companyName: 'Elite Travel Services',
    status: 'Verified',
    joinDate: '2024-02-05',
    totalSales: 9100000,
    bookings: 72,
  },
  {
    id: 'MERCH-005',
    name: 'Tunde Adebayo',
    email: 'tunde@alpha.com',
    companyName: 'Premium Travel Agency',
    status: 'Verified',
    joinDate: '2023-09-12',
    totalSales: 15600000,
    bookings: 124,
  },
  {
    id: 'PEND-001',
    name: 'Amina Bello',
    email: 'amina@alpha.com',
    companyName: 'New Travel Co',
    status: 'Pending',
    joinDate: '2026-01-20',
    totalSales: 0,
    bookings: 0,
  },
  {
    id: 'PEND-002',
    name: 'David Okonkwo',
    email: 'david@alpha.com',
    companyName: 'Global Travel Partners',
    status: 'Pending',
    joinDate: '2026-01-22',
    totalSales: 0,
    bookings: 0,
  },
  {
    id: 'MERCH-006',
    name: 'Sarah Jenkins',
    email: 'sarah@alpha.com',
    companyName: 'Travel Express',
    status: 'Suspended',
    joinDate: '2023-12-08',
    totalSales: 11300000,
    bookings: 89,
  },
];

// GET - Fetch all merchants with optional search/filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status'); // Filter by status

    let filteredMerchants = [...merchants];

    // Search by email, ID, or company name
    if (search) {
      const searchLower = search.toLowerCase();
      filteredMerchants = filteredMerchants.filter(
        (merchant) =>
          merchant.email.toLowerCase().includes(searchLower) ||
          merchant.id.toLowerCase().includes(searchLower) ||
          merchant.companyName.toLowerCase().includes(searchLower) ||
          merchant.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (status) {
      filteredMerchants = filteredMerchants.filter((merchant) => merchant.status === status);
    }

    // Format response
    const formattedMerchants = filteredMerchants.map((merchant) => ({
      ...merchant,
      totalSales: `₦${merchant.totalSales.toLocaleString('en-NG')}`,
    }));

    return NextResponse.json({
      success: true,
      merchants: formattedMerchants,
      total: formattedMerchants.length,
    });
  } catch (error: any) {
    console.error('Merchant fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch merchants',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update merchant status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, status, action } = body;

    if (!merchantId || (!status && !action)) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'merchantId and status/action are required',
        },
        { status: 400 }
      );
    }

    // Determine status based on action or direct status
    let newStatus = status;
    if (action === 'approve') {
      newStatus = 'Verified';
    } else if (action === 'reject' || action === 'suspend') {
      newStatus = 'Suspended';
    } else if (action === 'verify') {
      newStatus = 'Verified';
    }

    // Validate status
    const validStatuses = ['Verified', 'Pending', 'Suspended'];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        {
          error: 'Invalid status',
          message: `Status must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Find and update merchant
    const merchantIndex = merchants.findIndex((m) => m.id === merchantId);
    if (merchantIndex === -1) {
      return NextResponse.json(
        {
          error: 'Merchant not found',
          message: `Merchant with ID ${merchantId} does not exist`,
        },
        { status: 404 }
      );
    }

    merchants[merchantIndex] = {
      ...merchants[merchantIndex],
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      merchant: {
        ...merchants[merchantIndex],
        totalSales: `₦${merchants[merchantIndex].totalSales.toLocaleString('en-NG')}`,
      },
      message: `Merchant status updated to ${newStatus}`,
    });
  } catch (error: any) {
    console.error('Merchant update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update merchant',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
