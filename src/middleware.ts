import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('pendingRedirect', request.nextUrl.pathname, {
      path: '/',
      maxAge: 60 * 5,
      sameSite: 'strict',
    });
    return response;
  }
}

export const config = {
  // 비로그인 사용자 접근을 막는 경로 패턴
  matcher: ['/item/:path*/join', '/payment/:path*'],
};
