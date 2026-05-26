const ACCESS_TOKEN_KEY = 'accessToken';
const EXPIRES_AT_KEY = 'accessTokenExpiresAt';

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;

    const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
      return null;
    }

    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${ACCESS_TOKEN_KEY}=`));
    return match ? match.split('=')[1] : null;
  },
  set: (token: string, expiresIn: number) => {
    const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
    document.cookie = `${ACCESS_TOKEN_KEY}=${token}; expires=${expires}; path=/; SameSite=Strict`;
    // 30초 여유 만료 시간 저장
    localStorage.setItem(
      EXPIRES_AT_KEY,
      String(Date.now() + (expiresIn - 30) * 1000),
    );
  },
  remove: () => {
    document.cookie = `${ACCESS_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem(EXPIRES_AT_KEY);
  },
  removeAll: () => {
    document.cookie.split(';').forEach((cookie) => {
      const key = cookie.split('=')[0].trim();
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    localStorage.removeItem(EXPIRES_AT_KEY);
  },
};
