import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'real';

export async function POST(request: NextRequest) {
  if (MODE === 'static') {
    return NextResponse.json({
      success: true,
      data: {
        paymentId: `MOCK-${faker.string.uuid()}`,
        participationId: faker.number.int({ min: 1, max: 999 }),
        participationStatus: 'PAID_WAITING_GOAL',
        displayStatus: '참여중',
        amount: 18000,
        method: 'card',
        approvedAt: new Date().toISOString(),
      },
      error: null,
    });
  }

  try {
    const body = await request.json();
    const data = await serverFetch(
      `/api/v1/payments/portone/complete`,
      undefined,
      { method: 'POST', body: JSON.stringify(body) },
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
