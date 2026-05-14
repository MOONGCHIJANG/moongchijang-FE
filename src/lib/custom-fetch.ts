import { tokenStorage } from '@/lib/token';

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

    let response = await fetchWithToken(token);

    if (
      response.status === 401 &&
      !url.includes('/auth/refresh') &&
      !url.includes('/auth/email/login')
    ) {
      if (isRefreshing) {
        // 갱신 중이면 큐에 대기
        const newToken = await new Promise<string | null>((resolve) => {
          refreshQueue.push(resolve);
        });
        response = await fetchWithToken(newToken);
      } else {
        isRefreshing = true;

        try {
          const refreshResponse = await fetch(
            `${BASE_URL}/api/v1/auth/refresh`,
            {
              method: 'POST',
              credentials: 'include',
            },
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            const newToken = refreshData.data.accessToken;
            tokenStorage.set(newToken, refreshData.data.expiresIn);
            processQueue(newToken);
            response = await fetchWithToken(newToken);
          } else {
            processQueue(null);
            tokenStorage.remove();
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
