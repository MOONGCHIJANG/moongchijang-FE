import { serverFetchRaw } from '@/lib/fetcher';
import { clearAuthCookies } from '@/lib/cookie';
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

  // 프론트 인증 쿠키 삭제 (refreshToken + accessToken)
  const response = NextResponse.json({ success: true }, { status: 200 });
  clearAuthCookies(response);

  return response;
}
