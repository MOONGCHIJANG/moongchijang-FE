const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${ACCESS_TOKEN_KEY}=`));
    return match ? match.split('=')[1] : null;
  },
  set: (token: string, expiresIn: number) => {
    const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
    document.cookie = `${ACCESS_TOKEN_KEY}=${token}; expires=${expires}; path=/; SameSite=Strict`;
  },
  remove: () => {
    document.cookie = `${ACCESS_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
