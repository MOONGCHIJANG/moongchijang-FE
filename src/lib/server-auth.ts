import { cookies } from 'next/headers';

export const getServerAccessToken = async (): Promise<string | undefined> => {
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
};
