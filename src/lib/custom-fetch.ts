const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
  /\/$/,
  '',
);

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // 응답 데이터뿐만 아니라 헤더 정보를 포함하여 반환할 수도 있으나,
  // Orval이 기대하는 리턴 타입(Promise<T>)에 맞춰 json()을 기본으로 반환합니다.
  const data = await response.json();

  // Orval의 checkResponseSuccess 타입 구조에 맞게 데이터를 가공하여 반환해야 할 수 있습니다.
  // 현재 생성된 코드는 Promise<checkResponse>를 기대하므로 { data, status, headers } 구조를 원할 수 있습니다.
  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
};

export default customFetch;
