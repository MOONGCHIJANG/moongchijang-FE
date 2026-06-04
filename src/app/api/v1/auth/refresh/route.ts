import { serverFetchRaw } from '@/lib/fetcher';
import {
  applyRefreshTokenCookie,
  setAccessTokenCookie,
  clearAuthCookies,
} from '@/lib/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    const noToken = NextResponse.json({ success: false }, { status: 401 });
    clearAuthCookies(noToken);
    return noToken;
  }

  const result = await serverFetchRaw('/api/v1/auth/refresh', undefined, {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (result.status === 200) {
    const response = NextResponse.json(result.data, { status: 200 });

    applyRefreshTokenCookie(response, result.headers?.get('set-cookie'));

    // 역할 전환 등으로 accessToken 이 바뀌면 SSR 가드가 옛 토큰을 쓰지 않도록
    // accessToken 캐시 쿠키도 새 값으로 갱신한다.
    const payload = (
      result.data as {
        data?: { accessToken?: string; expiresIn?: number };
      }
    )?.data;
    if (payload?.accessToken && payload?.expiresIn) {
      setAccessTokenCookie(response, payload.accessToken, payload.expiresIn);
    }

    return response;
  }

  // 재발급 실패 시 옛 토큰을 남기면 SSR 가드가 stale 토큰을 신뢰하므로 제거한다.
  const failure = NextResponse.json(result.data, { status: result.status });
  clearAuthCookies(failure);
  return failure;
}
