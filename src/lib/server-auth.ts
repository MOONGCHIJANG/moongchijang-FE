import { cache } from 'react';
import { headers, cookies } from 'next/headers';
import { serverFetch } from '@/lib/fetcher';
import { ApiResponseUserInfo, AuthUserRole } from '@/api/generated/api.schemas';

/**
 * 서버 컴포넌트용 accessToken 조회.
 *
 * refreshToken rotation 이 즉시 무효화 방식이므로, 서버 컴포넌트는 직접
 * refresh 하지 않는다(회전된 토큰을 영속화할 수 없어 세션이 깨짐).
 * 대신 proxy 가 주입한 x-access-token 헤더(갓 재발급된 값) 또는 짧은 수명
 * accessToken 쿠키에서만 토큰을 읽는다.
 */
export const getServerAccessToken = cache(
  async (): Promise<string | undefined> => {
    const headerToken = (await headers()).get('x-access-token');
    if (headerToken) return headerToken;

    const cookieToken = (await cookies()).get('accessToken')?.value;
    return cookieToken ?? undefined;
  },
);

export const getServerUserRole = cache(
  async (): Promise<AuthUserRole | null> => {
    const token = await getServerAccessToken();
    if (!token) return null;

    const res = await serverFetch<ApiResponseUserInfo>(
      '/api/v1/users/me',
      token,
    ).catch(() => null);

    return res?.data?.role ?? null;
  },
);
