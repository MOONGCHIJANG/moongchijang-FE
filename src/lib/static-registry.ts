/**
 * 배포 환경(`NEXT_PUBLIC_API_MODE=static`)에서 엔드포인트별로 어떻게 응답할지 선언하는 레지스트리.
 *
 * - STATIC_FALLBACK: 정적 JSON 으로 응답할 엔드포인트 (GET 전용)
 * - PENDING_ENDPOINTS: 아직 준비되지 않았음을 표시할 엔드포인트 (PendingApiError throw)
 *
 * 실서버 API 가 완성되면 여기서 해당 항목만 제거하면 자동으로 실서버로 전환됩니다.
 */

export type StaticLoader = () => Promise<unknown>;

/** 정적 응답을 반환할 엔드포인트 맵 (path -> dynamic import loader) */
export const STATIC_FALLBACK: Record<string, StaticLoader> = {
  // 엔드포인트 준비되면 여기에 추가
  // 예: '/api/v1/group-buys': () => import('@/api/generated/group-buy/group-buy.msw').then(m => m.getGetApiV1GroupBuysResponseMock()),
};

/** "아직 개발 중입니다" 로 처리할 엔드포인트 집합 */
export const PENDING_ENDPOINTS = new Set<string>([
  // 예시: '/api/orders',
]);

/** 아직 준비되지 않은 API 호출 시 던지는 에러 */
export class PendingApiError extends Error {
  constructor(public path: string) {
    super(`API ${path} 는 아직 준비 중입니다.`);
    this.name = 'PendingApiError';
  }
}
