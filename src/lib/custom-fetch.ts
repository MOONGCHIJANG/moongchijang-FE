const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
  /\/$/,
  '',
);

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  // orval이 200/404 등 각 상태코드를 Union 타입으로 처리하므로
  // !response.ok 시 throw하지 않고 { data, status, headers } 그대로 반환
  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
};

export default customFetch;
