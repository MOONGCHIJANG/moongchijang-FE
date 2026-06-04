import { serverFetchRaw } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  // 백엔드 로그아웃 호출
  if (refreshToken) {
    await serverFetchRaw('/api/v1/auth/logout', undefined, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }).catch(() => {});
  }

  // 프론트 refreshToken 쿠키 삭제
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'strict',
  });

  return response;
}
