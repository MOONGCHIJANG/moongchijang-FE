let inMemoryToken: string | null = null;
let tokenExpiresAt: number | null = null;

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    if (!inMemoryToken || !tokenExpiresAt) return null;
    if (Date.now() > tokenExpiresAt) {
      inMemoryToken = null;
      tokenExpiresAt = null;
      return null;
    }
    return inMemoryToken;
  },
  set: (token: string, expiresIn: number) => {
    if (typeof window === 'undefined') return;
    inMemoryToken = token;
    // 30초 여유 만료 시간 저장
    tokenExpiresAt = Date.now() + (expiresIn - 30) * 1000;
  },
  remove: () => {
    if (typeof window === 'undefined') return;
    inMemoryToken = null;
    tokenExpiresAt = null;
  },
  removeAll: () => {
    if (typeof window === 'undefined') return;
    inMemoryToken = null;
    tokenExpiresAt = null;
  },
  setExpiration: (expiresIn: number) => {
    if (typeof window === 'undefined') return;
    tokenExpiresAt = Date.now() + (expiresIn - 30) * 1000;
  },
};

/**
 * refresh Route Handler 를 호출해 accessToken 을 재발급하고 메모리에 저장한다.
 * 역할 전환처럼 현재 토큰이 옛 상태가 되는 시점에, 빈 토큰 윈도우 없이
 * 즉시 새 토큰으로 교체하기 위해 사용한다.
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  const res = await fetch('/api/v1/auth/refresh', { method: 'POST' }).catch(
    () => null,
  );
  if (!res?.ok) return false;

  const data = await res.json().catch(() => null);
  const accessToken = data?.data?.accessToken;
  const expiresIn = data?.data?.expiresIn;
  if (!accessToken || !expiresIn) return false;

  tokenStorage.set(accessToken, expiresIn);
  return true;
};
