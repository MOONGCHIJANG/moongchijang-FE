import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 유저가 /login 접근 시 /feed로 redirect
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

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
