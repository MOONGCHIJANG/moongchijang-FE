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
