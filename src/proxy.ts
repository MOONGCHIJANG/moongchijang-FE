import { NextRequest, NextResponse } from 'next/server';

/*
 * 보호 경로 추가 방법:
 *   1. matcher 배열에 경로 패턴 추가(정확한 경로 패턴, 이 부분에서만 proxy 가 실행됨)
 *   2. protectedPaths 배열에 경로 prefix 추가(접근 제어할 경로의 공통 prefix)
 */

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 유저가 /login 접근 시 /feed로 redirect
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // 보호 경로 정보
  const protectedPaths = ['/item', '/payment', '/notifications'];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('pendingRedirect', pathname, {
      path: '/',
      maxAge: 60 * 5,
      sameSite: 'strict',
    });
    return response;
  }
}

export const config = {
  matcher: [
    '/item/:path*/join',
    '/payment/:path*',
    '/notifications',
    '/login',
    '/login/:path*',
  ],
};
