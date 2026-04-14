import 'server-only';

/**
 * 서버 전용 fetch 래퍼.
 *
 * 용도:
 * - 서버 컴포넌트에서 직접 호출 (SSR)
 * - Route Handler(`app/api/proxy/**`)에서 호출 (CSR 의 프록시 진입점)
 *
 * 배포/로컬 환경을 `NEXT_PUBLIC_API_MODE` 로 분기합니다.
 * - mock   : 로컬 개발, Express 목서버로 프록시 (BASE = http://localhost:9090)
 * - static : 데모 배포, 레지스트리에 정의된 정적 JSON/준비중 응답 또는 실서버
 * - real   : 프로덕션, 모든 요청 실서버
 */

import {
  PENDING_ENDPOINTS,
  PendingApiError,
  STATIC_FALLBACK,
} from './static-registry';

type ApiMode = 'mock' | 'static' | 'real';

const MODE = (process.env.NEXT_PUBLIC_API_MODE ?? 'real') as ApiMode;
const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return headers;
}

function buildAuthHeaders(token?: string): Record<string, string> {
  if (!token) return {};
  return { Cookie: `accessToken=${token}` };
}

/**
 * static 모드 전용 분기.
 * - 레지스트리에서 해당 path 를 찾으면 정적/준비중 응답을 반환
 * - 매칭되는 엔트리가 없으면 null → 호출자는 실서버로 폴스루
 */
async function resolveStaticResponse(
  path: string,
  method: string,
): Promise<{ status: number; data: unknown } | null> {
  if (MODE !== 'static') return null;

  if (PENDING_ENDPOINTS.has(path)) {
    return {
      status: 503,
      data: { message: `API ${path} 는 아직 준비 중입니다.` },
    };
  }

  const loader = STATIC_FALLBACK[path];
  if (method === 'GET' && loader) {
    return { status: 200, data: await loader() };
  }

  // mutation 은 매핑이 없어도 성공한 척 빈 객체
  if (method !== 'GET') {
    return { status: 200, data: {} };
  }

  return null;
}

function buildFetchHeaders(
  method: string,
  init: RequestInit | undefined,
  token: string | undefined,
): Record<string, string> {
  const isFormData = init?.body instanceof FormData;
  const needsJsonHeader = !['GET', 'HEAD'].includes(method) && !isFormData;

  return {
    ...(needsJsonHeader ? { 'Content-Type': 'application/json' } : {}),
    ...normalizeHeaders(init?.headers),
    ...buildAuthHeaders(token),
  };
}

/**
 * 서버 컴포넌트·Route Handler 비즈니스 로직용 fetch.
 * 4xx/5xx 는 throw. 성공 응답은 파싱된 JSON 을 반환.
 */
export async function serverFetch<T = unknown>(
  path: string,
  token?: string,
  init?: RequestInit,
): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();

  const staticResult = await resolveStaticResponse(path, method);
  if (staticResult) {
    if (staticResult.status === 503) throw new PendingApiError(path);
    if (staticResult.status >= 400) {
      const message =
        (staticResult.data as { message?: string })?.message ??
        `HTTP ${staticResult.status}`;
      throw new Error(message);
    }
    return staticResult.data as T;
  }

  if (!BASE) {
    throw new Error('[serverFetch] NEXT_PUBLIC_API_BASE_URL is not configured');
  }

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: buildFetchHeaders(method, init, token),
  });

  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const message =
      typeof json.message === 'string' ? json.message : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return json as T;
}

/**
 * Route Handler 프록시 용 fetch.
 * 4xx/5xx 시에도 throw 없이 status·data 를 반환하여
 * 호출자(Route Handler)가 응답을 그대로 브라우저에 전달할 수 있게 합니다.
 */
export async function serverFetchRaw(
  path: string,
  token?: string,
  init?: RequestInit,
): Promise<{ status: number; data: unknown }> {
  const method = (init?.method ?? 'GET').toUpperCase();

  const staticResult = await resolveStaticResponse(path, method);
  if (staticResult) return staticResult;

  if (!BASE) {
    throw new Error(
      '[serverFetchRaw] NEXT_PUBLIC_API_BASE_URL is not configured',
    );
  }

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: buildFetchHeaders(method, init, token),
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}
