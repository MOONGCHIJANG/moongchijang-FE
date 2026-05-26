import { serverFetchRaw } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await serverFetchRaw('/api/v1/auth/kakao', undefined, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (result.status === 200) {
    const data = result.data as {
      data?: {
        accessToken: string;
        expiresIn: number;
        isNewUser: boolean;
        user?: { signupCompleted: boolean };
      };
    };

    const accessToken = data?.data?.accessToken ?? '';
    const expiresIn = data?.data?.expiresIn ?? 3600;

    const response = NextResponse.json(result.data, { status: 200 });
    response.cookies.set('accessToken', accessToken, {
      httpOnly: false, // TODO: customFetch 구조 변경 후 httpOnly: true로 전환 필요
      maxAge: expiresIn,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) {
      response.headers.append('set-cookie', setCookie);
    }

    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
