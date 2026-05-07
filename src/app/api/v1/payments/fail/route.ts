import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'real';

export async function POST(request: NextRequest) {
  if (MODE === 'static') {
    return NextResponse.json({ success: true, data: {}, error: null });
  }

  try {
    const body = await request.json();
    const data = await serverFetch('/api/v1/payments/fail', undefined, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
