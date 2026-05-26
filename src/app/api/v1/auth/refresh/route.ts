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
    const data = result.data as {
      data?: { accessToken: string; expiresIn: number };
    };

    const accessToken = data?.data?.accessToken ?? '';
    const expiresIn = data?.data?.expiresIn ?? 3600;

    const response = NextResponse.json(result.data, { status: 200 });
    response.cookies.set('accessToken', accessToken, {
      httpOnly: false,
      maxAge: expiresIn,
      path: '/',
      sameSite: 'strict',
    });

    // 새 refreshToken도 갱신
    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) {
      const newRefreshToken = setCookie
        .split(';')[0]
        .split('=')
        .slice(1)
        .join('=');
      if (newRefreshToken) {
        response.cookies.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 14,
        });
      }
    }

    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
