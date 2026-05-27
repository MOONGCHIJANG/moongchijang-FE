import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'real';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupBuyId: string }> },
) {
  const { groupBuyId } = await params;
  const url = new URL(request.url);
  const quantity = parseInt(url.searchParams.get('quantity') ?? '1', 10);
  const unitPrice = 18000;
  const productAmount = unitPrice * quantity;

  if (MODE === 'static') {
    return NextResponse.json({
      success: true,
      data: {
        groupBuyId: Number(groupBuyId),
        storeName: '테스트베이커리',
        productName: '테스트상품',
        thumbnailUrl: '/images/img1.jpg',
        pickupDate: '2026-05-30',
        pickupTimeStart: '14:00',
        pickupTimeEnd: '18:00',
        unitPrice,
        quantity,
        productAmount,
        feeAmount: 0,
        totalAmount: productAmount,
        remainingQuantity: 10,
      },
      error: null,
    });
  }

  try {
    const data = await serverFetch(
      `/api/v1/group-buys/${groupBuyId}/checkout?quantity=${quantity}`,
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
