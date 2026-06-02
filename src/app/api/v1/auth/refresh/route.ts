import { serverFetchRaw } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const result = await serverFetchRaw('/api/v1/auth/refresh', undefined, {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (result.status === 200) {
    const response = NextResponse.json(result.data, { status: 200 });

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) {
      const match = setCookie.match(/refreshToken=([^;]+)/);
      const newRefreshToken = match ? match[1] : null;
      if (newRefreshToken) {
        response.cookies.set('refreshToken', newRefreshToken, {
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
