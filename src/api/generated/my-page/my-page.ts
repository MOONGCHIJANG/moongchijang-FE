/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseGroupBuyRequestList,
  ApiResponseInProgressParticipationPage,
  ApiResponseParticipationPage,
  ApiResponsePickupWaitingParticipationPage,
  ApiResponseTabCounts,
  GetApiV1UsersMeParticipationsInProgressParams,
  GetApiV1UsersMeParticipationsParams,
  GetApiV1UsersMeParticipationsPickupWaitingParams,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 참여 목록 조회 (참여중 · 완료 · 환불 탭)
 */
export type getApiV1UsersMeParticipationsResponse200 = {
  data: ApiResponseParticipationPage;
  status: 200;
};

export type getApiV1UsersMeParticipationsResponseSuccess =
  getApiV1UsersMeParticipationsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsResponse =
  getApiV1UsersMeParticipationsResponseSuccess;

export const getGetApiV1UsersMeParticipationsUrl = (
  params?: GetApiV1UsersMeParticipationsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/me/participations?${stringifiedParams}`
    : `/api/v1/users/me/participations`;
};

export const getApiV1UsersMeParticipations = async (
  params?: GetApiV1UsersMeParticipationsParams,
  options?: RequestInit,
): Promise<getApiV1UsersMeParticipationsResponse> => {
  return customFetch<getApiV1UsersMeParticipationsResponse>(
    getGetApiV1UsersMeParticipationsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 페이지네이션 기반으로 진행 중 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 진행 중 탭 참여 공구 목록 조회
 */
export type getApiV1UsersMeParticipationsInProgressResponse200 = {
  data: ApiResponseInProgressParticipationPage;
  status: 200;
};

export type getApiV1UsersMeParticipationsInProgressResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeParticipationsInProgressResponseSuccess =
  getApiV1UsersMeParticipationsInProgressResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsInProgressResponseError =
  getApiV1UsersMeParticipationsInProgressResponse401 & {
    headers: Headers;
  };

export type getApiV1UsersMeParticipationsInProgressResponse =
  | getApiV1UsersMeParticipationsInProgressResponseSuccess
  | getApiV1UsersMeParticipationsInProgressResponseError;

export const getGetApiV1UsersMeParticipationsInProgressUrl = (
  params?: GetApiV1UsersMeParticipationsInProgressParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/me/participations/in-progress?${stringifiedParams}`
    : `/api/v1/users/me/participations/in-progress`;
};

export const getApiV1UsersMeParticipationsInProgress = async (
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: RequestInit,
): Promise<getApiV1UsersMeParticipationsInProgressResponse> => {
  return customFetch<getApiV1UsersMeParticipationsInProgressResponse>(
    getGetApiV1UsersMeParticipationsInProgressUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 페이지네이션 기반으로 픽업 대기 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 픽업 대기 탭 참여 완료 공구 이력 조회
 */
export type getApiV1UsersMeParticipationsPickupWaitingResponse200 = {
  data: ApiResponsePickupWaitingParticipationPage;
  status: 200;
};

export type getApiV1UsersMeParticipationsPickupWaitingResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeParticipationsPickupWaitingResponseSuccess =
  getApiV1UsersMeParticipationsPickupWaitingResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsPickupWaitingResponseError =
  getApiV1UsersMeParticipationsPickupWaitingResponse401 & {
    headers: Headers;
  };

export type getApiV1UsersMeParticipationsPickupWaitingResponse =
  | getApiV1UsersMeParticipationsPickupWaitingResponseSuccess
  | getApiV1UsersMeParticipationsPickupWaitingResponseError;

export const getGetApiV1UsersMeParticipationsPickupWaitingUrl = (
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/me/participations/pickup-waiting?${stringifiedParams}`
    : `/api/v1/users/me/participations/pickup-waiting`;
};

export const getApiV1UsersMeParticipationsPickupWaiting = async (
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: RequestInit,
): Promise<getApiV1UsersMeParticipationsPickupWaitingResponse> => {
  return customFetch<getApiV1UsersMeParticipationsPickupWaitingResponse>(
    getGetApiV1UsersMeParticipationsPickupWaitingUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 내 공구 요청 목록 조회 (개설 요청 내역 탭)
 */
export type getApiV1UsersMeGroupBuyRequestsResponse200 = {
  data: ApiResponseGroupBuyRequestList;
  status: 200;
};

export type getApiV1UsersMeGroupBuyRequestsResponseSuccess =
  getApiV1UsersMeGroupBuyRequestsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeGroupBuyRequestsResponse =
  getApiV1UsersMeGroupBuyRequestsResponseSuccess;

export const getGetApiV1UsersMeGroupBuyRequestsUrl = () => {
  return `/api/v1/users/me/group-buy-requests`;
};

export const getApiV1UsersMeGroupBuyRequests = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeGroupBuyRequestsResponse> => {
  return customFetch<getApiV1UsersMeGroupBuyRequestsResponse>(
    getGetApiV1UsersMeGroupBuyRequestsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 참여중 · 완료 · 환불내역 · 개설요청 건수를 반환한다 (탭 칩 괄호 숫자용).
 * @summary 마이페이지 탭별 건수 조회
 */
export type getApiV1UsersMeTabsCountsResponse200 = {
  data: ApiResponseTabCounts;
  status: 200;
};

export type getApiV1UsersMeTabsCountsResponseSuccess =
  getApiV1UsersMeTabsCountsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeTabsCountsResponse =
  getApiV1UsersMeTabsCountsResponseSuccess;

export const getGetApiV1UsersMeTabsCountsUrl = () => {
  return `/api/v1/users/me/tabs/counts`;
};

export const getApiV1UsersMeTabsCounts = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeTabsCountsResponse> => {
  return customFetch<getApiV1UsersMeTabsCountsResponse>(
    getGetApiV1UsersMeTabsCountsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};
