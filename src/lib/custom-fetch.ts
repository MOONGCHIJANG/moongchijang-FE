import { tokenStorage } from '@/lib/token';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
  /\/$/,
  '',
);

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};

// 인증 불필요한 URL 목록
const PUBLIC_URLS = [
  '/auth/refresh',
  '/auth/email/login',
  '/auth/email/signup',
  '/auth/email/availability',
  '/auth/email/verification-codes',
  '/auth/kakao',
];

const isPublicUrl = (url: string) =>
  PUBLIC_URLS.some((publicUrl) => url.includes(publicUrl));

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  try {
    const isFormData = options.body instanceof FormData;
    const token = tokenStorage.get();

    const fetchWithToken = async (accessToken: string | null) => {
      return fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...options.headers,
        },
      });
    };

    // accessToken 없고 refresh/login URL 아니면 바로 refresh 시도
    if (!token && !isPublicUrl(url)) {
      if (isRefreshing) {
        // 이미 갱신 중이면 큐에서 대기
        const newToken = await new Promise<string | null>((resolve) => {
          refreshQueue.push(resolve);
        });
        if (!newToken) throw new Error('Unauthorized');
        return fetchWithToken(newToken).then(async (res) => {
          const data = await res.json();
          return { data, status: res.status, headers: res.headers } as T;
        });
      }

      isRefreshing = true;
      try {
        const refreshResponse = await fetch('/api/v1/auth/refresh', {
          method: 'POST',
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newToken = refreshData.data.accessToken;
          tokenStorage.set(newToken, refreshData.data.expiresIn);
          processQueue(newToken);
          useAuthStore.getState().setIsLoggedIn(true);
          const retryResponse = await fetchWithToken(newToken);
          const data = await retryResponse.json();
          return {
            data,
            status: retryResponse.status,
            headers: retryResponse.headers,
          } as T;
        } else {
          processQueue(null);
          useAuthStore.getState().setIsLoggedIn(false);
          tokenStorage.remove();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          throw new Error('Unauthorized');
        }
      } finally {
        isRefreshing = false;
      }
    }

    let response = await fetchWithToken(token);

    if (response.status === 401 && !isPublicUrl(url)) {
      if (isRefreshing) {
        const newToken = await new Promise<string | null>((resolve) => {
          refreshQueue.push(resolve);
        });
        response = await fetchWithToken(newToken);
      } else {
        isRefreshing = true;
        try {
          const refreshResponse = await fetch('/api/v1/auth/refresh', {
            method: 'POST',
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();

            const newToken = refreshData.data.accessToken;
            tokenStorage.set(newToken, refreshData.data.expiresIn);
            processQueue(newToken);
            useAuthStore.getState().setIsLoggedIn(true);
            response = await fetchWithToken(newToken);
          } else {
            processQueue(null);
            tokenStorage.remove();
            useAuthStore.getState().setIsLoggedIn(false);
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        } finally {
          isRefreshing = false;
        }
      }
    }

    const data = await response.json();

    // orval이 200/404 등 각 상태코드를 Union 타입으로 처리하므로
    // !response.ok 시 throw하지 않고 { data, status, headers } 그대로 반환

    return {
      data,
      status: response.status,
      headers: response.headers,
    } as T;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') {
      throw e;
    }
    throw e;
  }
};

export default customFetch;
