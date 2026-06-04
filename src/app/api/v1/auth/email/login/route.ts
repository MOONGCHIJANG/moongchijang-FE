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
      data?: {
        accessToken: string;
        expiresIn: number;
        user?: { signupCompleted: boolean; role: string };
      };
    };

    const user = data?.data?.user;
    const signupCompleted = user?.signupCompleted ?? true;
    const role = user?.role;

    const redirectTo = !signupCompleted
      ? '/signup/email?step=profile'
      : role === 'SELLER'
        ? '/seller'
        : null;

    const response = NextResponse.json(
      {
        ...(result.data as object),
        redirectTo,
      },
      { status: 200 },
    );

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) {
      response.headers.append('set-cookie', setCookie);
    }

    return response;
  }

  return NextResponse.json(result.data, { status: result.status });
}
