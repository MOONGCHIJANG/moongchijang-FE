import { serverFetchRaw } from '@moongchijang/api-client/fetcher';
import { clearAuthCookies } from '@moongchijang/api-client/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (refreshToken) {
    await serverFetchRaw('/api/v1/auth/logout', undefined, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }).catch(() => {});
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  clearAuthCookies(response);

  return response;
}
