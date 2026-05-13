const REDIRECT_KEY = 'pendingRedirect';

export const redirectStorage = {
  set: (path: string) => localStorage.setItem(REDIRECT_KEY, path),
  get: () => localStorage.getItem(REDIRECT_KEY),
  consume: () => {
    const path = localStorage.getItem(REDIRECT_KEY);
    localStorage.removeItem(REDIRECT_KEY);
    return path;
  },
};
