import { NextRequest, NextResponse } from 'next/server';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/lib/cookie';

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

type Rotated = {
  accessToken: string;
  expiresIn: number;
  newRefreshToken: string | null;
} | null;

async function refreshTokens(refreshToken: string): Promise<Rotated> {
  const res = await fetch(`${BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  }).catch(() => null);

  if (!res?.ok) return null;

  const json = await res.json().catch(() => null);
  const accessToken = json?.data?.accessToken;
  const expiresIn = json?.data?.expiresIn;
  if (!accessToken || !expiresIn) return null;

  const match = res.headers.get('set-cookie')?.match(/refreshToken=([^;]+)/);
  return { accessToken, expiresIn, newRefreshToken: match ? match[1] : null };
}

async function resolveAccessToken(
  request: NextRequest,
  refreshToken: string,
): Promise<{ accessToken: string | null; rotated: Rotated }> {
  const accessToken = request.cookies.get('accessToken')?.value ?? null;
  if (accessToken) return { accessToken, rotated: null };

  const rotated = await refreshTokens(refreshToken);
  return { accessToken: rotated?.accessToken ?? null, rotated };
}

function applyRotation(response: NextResponse, rotated: Rotated): void {
  if (!rotated) return;
  setAccessTokenCookie(response, rotated.accessToken, rotated.expiresIn);
  if (rotated.newRefreshToken)
    setRefreshTokenCookie(response, rotated.newRefreshToken);
}

async function getUserRole(accessToken: string): Promise<string | null> {
  const res = await fetch(`${BASE}/api/v1/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).catch(() => null);

  if (!res?.ok) return null;
  const json = await res.json().catch(() => null);
  return json?.data?.role ?? null;
}

function roleHomePath(role: string | null): string {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'SELLER') return '/seller';
  return '/feed';
}

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 유저가 /login 또는 /admin/login 접근 시 역할에 따라 redirect
  if (
    (pathname.startsWith('/login') || pathname === '/admin/login') &&
    refreshToken
  ) {
    const { accessToken, rotated } = await resolveAccessToken(
      request,
      refreshToken,
    );
    if (accessToken) {
      const role = await getUserRole(accessToken);
      const response = NextResponse.redirect(
        new URL(roleHomePath(role), request.url),
      );
      applyRotation(response, rotated);
      return response;
    }
    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/feed', request.url));
    }
  }

  // /admin 보호 경로 (admin/login 제외)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    const { accessToken, rotated } = await resolveAccessToken(
      request,
      refreshToken,
    );
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    const role = await getUserRole(accessToken);
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL(roleHomePath(role), request.url));
    }
    if (rotated) {
      const response = NextResponse.next();
      applyRotation(response, rotated);
      return response;
    }
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

    let rotated: Rotated = null;
    if (refreshToken) {
      // 유효한 accessToken 쿠키가 있으면 재발급 없이 사용 (rotation 빈도 최소화)
      const resolved = await resolveAccessToken(request, refreshToken);
      rotated = resolved.rotated;
      if (resolved.accessToken)
        requestHeaders.set('x-access-token', resolved.accessToken);
    }

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    applyRotation(response, rotated);
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
    '/admin/login',
    '/admin/:path*',
  ],
};
