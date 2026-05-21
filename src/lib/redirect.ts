const REDIRECT_KEY = 'pendingRedirect';

export const redirectStorage = {
  set: (path: string) => {
    document.cookie = `${REDIRECT_KEY}=${encodeURIComponent(path)}; path=/; max-age=${60 * 5}; SameSite=Strict`;
  },
  get: (): string | null => {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${REDIRECT_KEY}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  },
  consume: (): string | null => {
    const path = redirectStorage.get();
    document.cookie = `${REDIRECT_KEY}=; path=/; max-age=0`;
    return path;
  },
};
