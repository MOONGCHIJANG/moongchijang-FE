let inMemoryToken: string | null = null;
let tokenExpiresAt: number | null = null;

export const tokenStorage = {
  get: (): string | null => {
    if (!inMemoryToken || !tokenExpiresAt) return null;
    if (Date.now() > tokenExpiresAt) {
      inMemoryToken = null;
      tokenExpiresAt = null;
      return null;
    }
    return inMemoryToken;
  },
  set: (token: string, expiresIn: number) => {
    inMemoryToken = token;
    // 30초 여유 만료 시간 저장
    tokenExpiresAt = Date.now() + (expiresIn - 30) * 1000;
  },
  remove: () => {
    inMemoryToken = null;
    tokenExpiresAt = null;
  },
  removeAll: () => {
    inMemoryToken = null;
    tokenExpiresAt = null;
  },
  setExpiration: (expiresIn: number) => {
    tokenExpiresAt = Date.now() + (expiresIn - 30) * 1000;
  },
};
