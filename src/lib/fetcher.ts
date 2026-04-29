import 'server-only';

/**
 * 서버 전용 fetch 래퍼.
 *
 * 용도:
 * - 서버 컴포넌트에서 직접 호출 (SSR)
 * - Route Handler(`src/app/api/v1/**`)에서 호출 (CSR 의 프록시 진입점)
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
 * URL 패턴에 경로 파라미터(:param)가 포함된 경우를 포함해 매칭 여부를 반환합니다.
 * 예: '/api/v1/group-buys/:groupBuyId' 는 '/api/v1/group-buys/123' 에 매칭됩니다.
 */
function matchesUrlPattern(urlPattern: string, requestPath: string): boolean {
  const regexSource = urlPattern
    .replace(/:[^/]+/g, '[^/]+') // :param → 임의 세그먼트
    .replace(/\//g, '\\/'); // 슬래시 이스케이프
  return new RegExp(`^${regexSource}$`).test(requestPath);
}

/**
 * static 모드 전용 분기.
 * 1. PENDING_ENDPOINTS: 준비 중 응답 반환
 * 2. STATIC_FALLBACK: 수동 등록 엔드포인트 (우선순위 높음)
 * 3. generatedStaticMockEntries: Orval 자동 생성 엔드포인트 (패턴 매칭 포함)
 * 4. mutation: 매핑 없어도 성공 응답 반환
 * 5. null → 호출자가 실서버로 폴스루
 */
async function resolveStaticResponse(
  path: string,
  method: string,
): Promise<{ status: number; data: unknown } | null> {
  if (MODE !== 'static') return null;

  const pathWithoutQuery = path.split('?')[0];

  if (PENDING_ENDPOINTS.has(pathWithoutQuery)) {
    return {
      status: 503,
      data: { message: `API ${pathWithoutQuery} 는 아직 준비 중입니다.` },
    };
  }

  // 1. 수동 등록 엔드포인트 (STATIC_FALLBACK) - 정확한 경로 매칭
  const manualLoader = STATIC_FALLBACK[pathWithoutQuery];
  if (method === 'GET' && manualLoader) {
    return { status: 200, data: await manualLoader() };
  }

  // 2. Orval 자동 생성 엔드포인트 - URL 패턴 매칭 (경로 파라미터 지원)
  if (method === 'GET') {
    try {
      const { generatedStaticMockEntries } =
        await import('@/api/generated/index.static');
      const matchingEntry = generatedStaticMockEntries.find((entry) =>
        matchesUrlPattern(entry.urlPattern, pathWithoutQuery),
      );
      if (matchingEntry) {
        return { status: 200, data: matchingEntry.getResponseData() };
      }
    } catch {
      // index.static.ts 미생성 시 (npm run generate 미실행) 무시하고 실서버로 폴스루
    }
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
