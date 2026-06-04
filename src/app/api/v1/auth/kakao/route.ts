import { serverFetchRaw } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await serverFetchRaw('/api/v1/auth/kakao', undefined, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (result.status === 200) {
    const response = NextResponse.json(result.data, { status: 200 });

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) {
      const match = setCookie.match(/refreshToken=([^;]+)/);
      const refreshToken = match ? match[1] : null;
      if (refreshToken) {
        response.cookies.set('refreshToken', refreshToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 14,
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
