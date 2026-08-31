import { serverFetchRaw } from '@moongchijang/api-client/fetcher';
import { applyRefreshTokenCookie } from '@moongchijang/api-client/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await serverFetchRaw(
    '/api/v1/auth/admin/email/login',
    undefined,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );

  const response = NextResponse.json(result.data, { status: result.status });

  if (result.status === 200) {
    applyRefreshTokenCookie(response, result.headers?.get('set-cookie'));
  }

  return response;
}
