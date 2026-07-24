import { NextResponse } from 'next/server';

type SameSite = 'lax' | 'strict';

// sameSite 는 호출부가 컨텍스트(일반 사용자 vs 어드민)에 맞게 명시적으로 넘겨야 한다.
// 과거 이 값이 로그인 라우트와 refresh 라우트에 각각 하드코딩되어 있어 어드민 로그인
// 직후 'strict'로 세팅된 쿠키가 다음 refresh 때 'lax'로 조용히 다운그레이드되는 버그가 있었다.
// (docs/admin-cookie-samesite-inconsistency.md)
export function setRefreshTokenCookie(
  response: NextResponse,
  token: string,
  sameSite: SameSite = 'lax',
): void {
  response.cookies.set('refreshToken', token, {
    httpOnly: true,
    path: '/',
    sameSite,
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function applyRefreshTokenCookie(
  response: NextResponse,
  setCookieHeader: string | null | undefined,
  sameSite: SameSite = 'lax',
): void {
  const match = setCookieHeader?.match(/refreshToken=([^;]+)/);
  const token = match?.[1];
  if (token) setRefreshTokenCookie(response, token, sameSite);
}

// 짧은 수명 accessToken 캐시 쿠키 (만료 시 다음 진입에서 재발급)
export function setAccessTokenCookie(
  response: NextResponse,
  token: string,
  expiresIn: number,
  sameSite: SameSite = 'lax',
): void {
  response.cookies.set('accessToken', token, {
    httpOnly: true,
    path: '/',
    sameSite,
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
      sameSite: 'lax',
      maxAge: 0,
    });
  }
}
