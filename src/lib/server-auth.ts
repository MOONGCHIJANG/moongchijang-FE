import { cache } from 'react';
import { cookies } from 'next/headers';
import { serverFetch } from '@/lib/fetcher';
import { ApiResponseUserInfo, AuthUserRole } from '@/api/generated/api.schemas';

export const getServerAccessToken = cache(
  async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (!refreshToken) return undefined;

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`,
      {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken}` },
      },
    ).catch(() => null);

    if (!refreshRes?.ok) return undefined;

    const refreshData = await refreshRes.json();
    return refreshData?.data?.accessToken;
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
