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
    if (
      !token &&
      !url.includes('/auth/refresh') &&
      !url.includes('/auth/email/login')
    ) {
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
        console.log(
          '[customFetch] refresh 응답 status:',
          refreshResponse.status,
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newToken = refreshData.data.accessToken;
          console.log('[customFetch] refresh 성공');
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
          console.log('[customFetch] refresh 실패, 로그아웃');
          processQueue(null);
          useAuthStore.getState().setIsLoggedIn(false);
          tokenStorage.remove();
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
      } finally {
        isRefreshing = false;
      }
    }

    let response = await fetchWithToken(token);

    if (
      response.status === 401 &&
      !url.includes('/auth/refresh') &&
      !url.includes('/auth/email/login')
    ) {
      console.log('[customFetch] 401 감지, url:', url);

      if (isRefreshing) {
        console.log('[customFetch] 갱신 중, 큐에 대기');
        const newToken = await new Promise<string | null>((resolve) => {
          refreshQueue.push(resolve);
        });
        console.log(
          '[customFetch] 큐 해제, newToken:',
          newToken ? '있음' : '없음',
        );
        response = await fetchWithToken(newToken);
      } else {
        isRefreshing = true;
        console.log('[customFetch] refresh 시도');

        try {
          const refreshResponse = await fetch('/api/v1/auth/refresh', {
            method: 'POST',
          });
          console.log(
            '[customFetch] refresh 응답 status:',
            refreshResponse.status,
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            console.log(
              '[customFetch] refresh 성공, 새 토큰:',
              refreshData.data.accessToken ? '있음' : '없음',
            );
            const newToken = refreshData.data.accessToken;
            tokenStorage.set(newToken, refreshData.data.expiresIn);
            processQueue(newToken);
            useAuthStore.getState().setIsLoggedIn(true);
            response = await fetchWithToken(newToken);
            console.log('[customFetch] 재시도 응답 status:', response.status);
          } else {
            console.log('[customFetch] refresh 실패, 로그아웃 처리');
            processQueue(null);
            tokenStorage.remove();
            useAuthStore.getState().setIsLoggedIn(false);
            window.location.href = '/login';
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
