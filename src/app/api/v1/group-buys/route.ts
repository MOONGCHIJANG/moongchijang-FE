import { serverFetch } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const queryString = request.nextUrl.searchParams.toString();
  const path = `/api/v1/group-buys${queryString ? `?${queryString}` : ''}`;
  try {
    const data = await serverFetch(path);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
