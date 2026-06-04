import { NextResponse } from 'next/server';

export function setRefreshTokenCookie(
  response: NextResponse,
  token: string,
): void {
  response.cookies.set('refreshToken', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function applyRefreshTokenCookie(
  response: NextResponse,
  setCookieHeader: string | null | undefined,
): void {
  const match = setCookieHeader?.match(/refreshToken=([^;]+)/);
  const token = match?.[1];
  if (token) setRefreshTokenCookie(response, token);
}

// 짧은 수명 accessToken 캐시 쿠키 (만료 시 다음 진입에서 재발급)
export function setAccessTokenCookie(
  response: NextResponse,
  token: string,
  expiresIn: number,
): void {
  response.cookies.set('accessToken', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: Math.max(0, expiresIn - 30),
    secure: process.env.NODE_ENV === 'production',
  });
}

// 로그아웃 시 SSR 가드가 옛 토큰을 읽지 않도록 인증 쿠키를 모두 제거한다.
export function clearAuthCookies(response: NextResponse): void {
  for (const name of ['refreshToken', 'accessToken']) {
    response.cookies.set(name, '', {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0,
    });
  }
}
