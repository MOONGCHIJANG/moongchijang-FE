import { serverFetchRaw } from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await serverFetchRaw('/api/v1/auth/email/login', undefined, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (result.status === 200) {
    const data = result.data as {
      data?: { accessToken: string; expiresIn: number };
    };

    const accessToken = data?.data?.accessToken ?? 'demo-token';
    const expiresIn = data?.data?.expiresIn ?? 3600;

    const response = NextResponse.json(result.data, { status: 200 });
    response.cookies.set('accessToken', accessToken, {
      httpOnly: false,
      maxAge: expiresIn,
      path: '/',
      sameSite: 'strict',
    });
    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
