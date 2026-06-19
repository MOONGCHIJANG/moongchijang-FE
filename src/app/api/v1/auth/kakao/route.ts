import { serverFetchRaw } from '@/lib/fetcher';
import { applyRefreshTokenCookie } from '@/lib/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await serverFetchRaw('/api/v1/auth/kakao', undefined, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (result.status === 200) {
    const response = NextResponse.json(result.data, { status: 200 });

    applyRefreshTokenCookie(response, result.headers?.get('set-cookie'));

    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
