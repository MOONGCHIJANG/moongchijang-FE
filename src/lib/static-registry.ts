/**
 * 배포 환경(`NEXT_PUBLIC_API_MODE=static`)에서 엔드포인트별로 어떻게 응답할지 선언하는 레지스트리.
 *
 * - STATIC_FALLBACK: 정적 JSON 으로 응답할 엔드포인트 (GET 전용)
 * - PENDING_ENDPOINTS: 아직 준비되지 않았음을 표시할 엔드포인트 (PendingApiError throw)
 *
 * 실서버 API 가 완성되면 여기서 해당 항목만 제거하면 자동으로 실서버로 전환됩니다.
 */

export type StaticLoader = () => Promise<unknown>;

/**
 * 정적 응답을 반환할 엔드포인트 맵 (path -> dynamic import loader)
 *
 * 대부분의 GET 엔드포인트는 index.static.ts가 자동으로 처리하므로
 * 여기에 추가하지 않아도 됩니다.
 *
 * 다음 경우에만 추가하세요:
 *   1. faker 랜덤 데이터 대신 고정된 특정 데이터를 보여줘야 할 때
 *   2. index.static.ts에 없는 엔드포인트를 수동으로 등록해야 할 때
 *
 * 사용 예시:
 *   '/api/v1/group-buys': () =>
 *     import('@/api/generated/api').then(m => m.getGetApiV1GroupBuysResponseMock()),
 *
 *   또는 직접 JSON 파일을 import:
 *   '/api/v1/group-buys': () => import('@/mocks/data/group-buys.json'),
 */
export const STATIC_FALLBACK: Record<string, StaticLoader> = {};

/**
 * "아직 개발 중입니다" 로 처리할 엔드포인트 집합
 * 등록된 엔드포인트는 503 상태와 함께 준비 중 메시지를 반환합니다.
 *
 * 사용 예시:
 *   '/api/v1/payments',
 *   '/api/v1/notifications',
 */
export const PENDING_ENDPOINTS = new Set<string>([]);

/** 아직 준비되지 않은 API 호출 시 던지는 에러 */
export class PendingApiError extends Error {
  constructor(public path: string) {
    super(`API ${path} 는 아직 준비 중입니다.`);
    this.name = 'PendingApiError';
  }
}
