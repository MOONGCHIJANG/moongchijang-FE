import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'real';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupBuyId: string }> },
) {
  const { groupBuyId } = await params;

  // static 모드: mock 데이터 직접 반환
  if (MODE === 'static') {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        data: {
          participationId: faker.number.int({ min: 1, max: 999 }),
          orderName: `상품 ${body.quantity}개`,
          totalAmount: 18000,
          productAmount: 18000,
          feeAmount: 0,
        },
        error: null,
      },
      { status: 201 },
    );
  }

  try {
    const body = await request.json();
    const data = await serverFetch(
      `/api/v1/group-buys/${groupBuyId}/participations`,
      undefined,
      { method: 'POST', body: JSON.stringify(body) },
    );
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
