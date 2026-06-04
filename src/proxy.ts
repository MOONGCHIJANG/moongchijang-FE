import { NextRequest, NextResponse } from 'next/server';

/*
 * 보호 경로 추가 방법:
 *   1. matcher 배열에 경로 패턴 추가(정확한 경로 패턴, 이 부분에서만 proxy 가 실행됨)
 *   2. isLoginRequired / SSR_AUTH_PREFIXES 에 경로 prefix 추가
 *
 * 인증 토큰 전략 (refreshToken 즉시 무효화 rotation 대응):
 *   - refreshToken rotation 은 즉시 옛 토큰을 무효화하므로, refresh 는 쿠키를
 *     영속화할 수 있는 proxy(또는 Route Handler)에서만 수행해야 한다.
 *   - 서버 컴포넌트는 직접 refresh 하지 않고, proxy 가 주입한 x-access-token
 *     헤더(또는 짧은 수명 accessToken 쿠키)로만 accessToken 을 얻는다.
 *   - proxy 는 회전된 refreshToken 을 응답 쿠키로 다시 저장한다.
 */

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

// Server Component 에서 accessToken 이 필요한 경로 prefix
const SSR_AUTH_PREFIXES = ['/item', '/seller', '/notifications'];

// 미로그인 시 /login 으로 redirect 할 경로
function isLoginRequired(pathname: string): boolean {
  if (pathname.startsWith('/payment')) return true;
  if (pathname.startsWith('/notifications')) return true;
  if (pathname.startsWith('/seller')) return true;
  if (pathname.startsWith('/item') && pathname.endsWith('/join')) return true;
  return false;
}

async function refreshTokens(refreshToken: string): Promise<{
  accessToken: string;
  expiresIn: number;
  newRefreshToken: string | null;
} | null> {
  const res = await fetch(`${BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  }).catch(() => null);

  if (!res?.ok) return null;

  const json = await res.json().catch(() => null);
  const accessToken = json?.data?.accessToken;
  const expiresIn = json?.data?.expiresIn;
  if (!accessToken || !expiresIn) return null;

  const setCookie = res.headers.get('set-cookie');
  const match = setCookie?.match(/refreshToken=([^;]+)/);

  return { accessToken, expiresIn, newRefreshToken: match ? match[1] : null };
}

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 유저가 /login 접근 시 /feed로 redirect
  if (pathname.startsWith('/login') && refreshToken) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // 토큰 없이 /signup/email?step=profile 접근 시 /login으로
  if (pathname === '/signup/email' && !refreshToken) {
    const step = request.nextUrl.searchParams.get('step');
    if (step === 'profile') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 보호 경로: 미로그인 시 /login
  if (isLoginRequired(pathname) && !refreshToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('pendingRedirect', pathname, {
      path: '/',
      maxAge: 60 * 5,
      sameSite: 'lax',
    });
    return response;
  }

  // SSR accessToken 주입
  const needsSsrToken = SSR_AUTH_PREFIXES.some((p) => pathname.startsWith(p));
  if (needsSsrToken) {
    const requestHeaders = new Headers(request.headers);
    // 클라이언트가 임의로 보낸 x-access-token 을 신뢰하지 않도록 제거
    requestHeaders.delete('x-access-token');

    let rotated: Awaited<ReturnType<typeof refreshTokens>> = null;

    if (refreshToken) {
      // 유효한 accessToken 쿠키가 있으면 재발급 없이 사용 (rotation 빈도 최소화)
      let accessToken = request.cookies.get('accessToken')?.value;
      if (!accessToken) {
        rotated = await refreshTokens(refreshToken);
        accessToken = rotated?.accessToken;
      }
      if (accessToken) requestHeaders.set('x-access-token', accessToken);
    }

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    if (rotated) {
      // 짧은 수명 accessToken 캐시 쿠키 (만료 시 다음 진입에서 재발급)
      response.cookies.set('accessToken', rotated.accessToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: Math.max(0, rotated.expiresIn - 30),
        secure: process.env.NODE_ENV === 'production',
      });
      if (rotated.newRefreshToken) {
        response.cookies.set('refreshToken', rotated.newRefreshToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 14,
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return response;
  }
}

export const config = {
  matcher: [
    '/item/:path*',
    '/payment/complete',
    '/payment/fail',
    '/notifications',
    '/notifications/:path*',
    '/seller',
    '/seller/:path*',
    '/login',
    '/login/:path*',
    '/signup/email',
  ],
};
