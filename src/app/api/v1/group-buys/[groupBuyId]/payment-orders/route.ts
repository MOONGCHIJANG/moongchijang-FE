import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { koFaker } from '@mocks/mock-helpers';

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'real';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupBuyId: string }> },
) {
  const { groupBuyId } = await params;

  if (MODE === 'static') {
    const body = await request.json();
    const quantity = body.quantity ?? 1;
    return NextResponse.json({
      success: true,
      data: {
        paymentId: `MOCK-${faker.string.uuid()}`,
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID ?? 'mock-store-id',
        channelKey:
          process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY ?? 'mock-channel-key',
        orderName: `${koFaker.product.name()} ${quantity}개`,
        amount: 18000 * quantity,
        customerName: null,
      },
      error: null,
    });
  }

  try {
    const body = await request.json();
    const data = await serverFetch(
      `/api/v1/group-buys/${groupBuyId}/payment-orders`,
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
