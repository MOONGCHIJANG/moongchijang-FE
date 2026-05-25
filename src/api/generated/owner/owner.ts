/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseOwnerGroupBuyList,
  ApiResponseOwnerGroupBuyRequestCreated,
  ApiResponseOwnerGroupBuyRequestDetail,
  ApiResponseOwnerGroupBuyRequestList,
  ApiResponseOwnerSummary,
  ApiResponsePickupScheduleList,
  ApiResponseReservationPage,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1OwnerGroupBuyRequestsParams,
  GetApiV1OwnerReservationsParams,
  NotFoundResponse,
  OwnerGroupBuyRequestCreate,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 픽업 대기/완료 건수, 진행 중 공구 수, 다음 픽업 시간을 반환한다.
 * @summary 사장님 홈 요약 정보
 */
export type getApiV1OwnerHomeSummaryResponse200 = {
  data: ApiResponseOwnerSummary;
  status: 200;
};

export type getApiV1OwnerHomeSummaryResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1OwnerHomeSummaryResponseSuccess =
  getApiV1OwnerHomeSummaryResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerHomeSummaryResponseError =
  getApiV1OwnerHomeSummaryResponse403 & {
    headers: Headers;
  };

export type getApiV1OwnerHomeSummaryResponse =
  | getApiV1OwnerHomeSummaryResponseSuccess
  | getApiV1OwnerHomeSummaryResponseError;

export const getGetApiV1OwnerHomeSummaryUrl = () => {
  return `/api/v1/owner/home/summary`;
};

export const getApiV1OwnerHomeSummary = async (
  options?: RequestInit,
): Promise<getApiV1OwnerHomeSummaryResponse> => {
  return customFetch<getApiV1OwnerHomeSummaryResponse>(
    getGetApiV1OwnerHomeSummaryUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 시간대별 픽업 현황 조회
 */
export type getApiV1OwnerHomePickupScheduleResponse200 = {
  data: ApiResponsePickupScheduleList;
  status: 200;
};

export type getApiV1OwnerHomePickupScheduleResponseSuccess =
  getApiV1OwnerHomePickupScheduleResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerHomePickupScheduleResponse =
  getApiV1OwnerHomePickupScheduleResponseSuccess;

export const getGetApiV1OwnerHomePickupScheduleUrl = () => {
  return `/api/v1/owner/home/pickup-schedule`;
};

export const getApiV1OwnerHomePickupSchedule = async (
  options?: RequestInit,
): Promise<getApiV1OwnerHomePickupScheduleResponse> => {
  return customFetch<getApiV1OwnerHomePickupScheduleResponse>(
    getGetApiV1OwnerHomePickupScheduleUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 사장님이 소속된 매장의 공구를 조회한다.
공구 상태는 진행 중(IN_PROGRESS), 달성(ACHIEVED), 미달(FAILED) 기준으로 반환한다.

 * @summary 진행 중인 공구 목록 조회 (사장님용)
 */
export type getApiV1OwnerGroupBuysResponse200 = {
  data: ApiResponseOwnerGroupBuyList;
  status: 200;
};

export type getApiV1OwnerGroupBuysResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1OwnerGroupBuysResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1OwnerGroupBuysResponseSuccess =
  getApiV1OwnerGroupBuysResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerGroupBuysResponseError = (
  | getApiV1OwnerGroupBuysResponse401
  | getApiV1OwnerGroupBuysResponse403
) & {
  headers: Headers;
};

export type getApiV1OwnerGroupBuysResponse =
  | getApiV1OwnerGroupBuysResponseSuccess
  | getApiV1OwnerGroupBuysResponseError;

export const getGetApiV1OwnerGroupBuysUrl = () => {
  return `/api/v1/owner/group-buys`;
};

export const getApiV1OwnerGroupBuys = async (
  options?: RequestInit,
): Promise<getApiV1OwnerGroupBuysResponse> => {
  return customFetch<getApiV1OwnerGroupBuysResponse>(
    getGetApiV1OwnerGroupBuysUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 사장님이 본인 매장 기준으로 제출한 공구 개설 요청 목록을 조회한다.
 * @summary 사장님 공구 개설 요청 목록 조회
 */
export type getApiV1OwnerGroupBuyRequestsResponse200 = {
  data: ApiResponseOwnerGroupBuyRequestList;
  status: 200;
};

export type getApiV1OwnerGroupBuyRequestsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1OwnerGroupBuyRequestsResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1OwnerGroupBuyRequestsResponseSuccess =
  getApiV1OwnerGroupBuyRequestsResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerGroupBuyRequestsResponseError = (
  | getApiV1OwnerGroupBuyRequestsResponse401
  | getApiV1OwnerGroupBuyRequestsResponse403
) & {
  headers: Headers;
};

export type getApiV1OwnerGroupBuyRequestsResponse =
  | getApiV1OwnerGroupBuyRequestsResponseSuccess
  | getApiV1OwnerGroupBuyRequestsResponseError;

export const getGetApiV1OwnerGroupBuyRequestsUrl = (
  params?: GetApiV1OwnerGroupBuyRequestsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/owner/group-buy-requests?${stringifiedParams}`
    : `/api/v1/owner/group-buy-requests`;
};

export const getApiV1OwnerGroupBuyRequests = async (
  params?: GetApiV1OwnerGroupBuyRequestsParams,
  options?: RequestInit,
): Promise<getApiV1OwnerGroupBuyRequestsResponse> => {
  return customFetch<getApiV1OwnerGroupBuyRequestsResponse>(
    getGetApiV1OwnerGroupBuyRequestsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 사장님이 본인 매장에 대한 공구 개설 요청을 제출한다.
- SELLER 권한만 요청할 수 있다.
- storeId는 요청자에게 연결된 매장이어야 한다.
- imageUrls의 첫 번째 이미지를 대표 이미지(thumbnailUrl)로 저장한다.
- 희망 공구 기간은 현재 시각 기준 최소 7일 이상이어야 한다.

 * @summary 사장님 공구 개설 요청 제출
 */
export type postApiV1OwnerGroupBuyRequestsResponse201 = {
  data: ApiResponseOwnerGroupBuyRequestCreated;
  status: 201;
};

export type postApiV1OwnerGroupBuyRequestsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1OwnerGroupBuyRequestsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1OwnerGroupBuyRequestsResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1OwnerGroupBuyRequestsResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1OwnerGroupBuyRequestsResponseSuccess =
  postApiV1OwnerGroupBuyRequestsResponse201 & {
    headers: Headers;
  };
export type postApiV1OwnerGroupBuyRequestsResponseError = (
  | postApiV1OwnerGroupBuyRequestsResponse400
  | postApiV1OwnerGroupBuyRequestsResponse401
  | postApiV1OwnerGroupBuyRequestsResponse403
  | postApiV1OwnerGroupBuyRequestsResponse404
) & {
  headers: Headers;
};

export type postApiV1OwnerGroupBuyRequestsResponse =
  | postApiV1OwnerGroupBuyRequestsResponseSuccess
  | postApiV1OwnerGroupBuyRequestsResponseError;

export const getPostApiV1OwnerGroupBuyRequestsUrl = () => {
  return `/api/v1/owner/group-buy-requests`;
};

export const postApiV1OwnerGroupBuyRequests = async (
  ownerGroupBuyRequestCreate: OwnerGroupBuyRequestCreate,
  options?: RequestInit,
): Promise<postApiV1OwnerGroupBuyRequestsResponse> => {
  return customFetch<postApiV1OwnerGroupBuyRequestsResponse>(
    getPostApiV1OwnerGroupBuyRequestsUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(ownerGroupBuyRequestCreate),
    },
  );
};

/**
 * 사장님이 본인 매장 기준으로 제출한 공구 개설 요청 상세와 승인/반려 상태를 조회한다.
 * @summary 사장님 공구 개설 요청 상세 조회
 */
export type getApiV1OwnerGroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseOwnerGroupBuyRequestDetail;
  status: 200;
};

export type getApiV1OwnerGroupBuyRequestsRequestIdResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1OwnerGroupBuyRequestsRequestIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1OwnerGroupBuyRequestsRequestIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1OwnerGroupBuyRequestsRequestIdResponseSuccess =
  getApiV1OwnerGroupBuyRequestsRequestIdResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerGroupBuyRequestsRequestIdResponseError = (
  | getApiV1OwnerGroupBuyRequestsRequestIdResponse401
  | getApiV1OwnerGroupBuyRequestsRequestIdResponse403
  | getApiV1OwnerGroupBuyRequestsRequestIdResponse404
) & {
  headers: Headers;
};

export type getApiV1OwnerGroupBuyRequestsRequestIdResponse =
  | getApiV1OwnerGroupBuyRequestsRequestIdResponseSuccess
  | getApiV1OwnerGroupBuyRequestsRequestIdResponseError;

export const getGetApiV1OwnerGroupBuyRequestsRequestIdUrl = (
  requestId: number,
) => {
  return `/api/v1/owner/group-buy-requests/${requestId}`;
};

export const getApiV1OwnerGroupBuyRequestsRequestId = async (
  requestId: number,
  options?: RequestInit,
): Promise<getApiV1OwnerGroupBuyRequestsRequestIdResponse> => {
  return customFetch<getApiV1OwnerGroupBuyRequestsRequestIdResponse>(
    getGetApiV1OwnerGroupBuyRequestsRequestIdUrl(requestId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 픽업 예약자 목록 조회
 */
export type getApiV1OwnerReservationsResponse200 = {
  data: ApiResponseReservationPage;
  status: 200;
};

export type getApiV1OwnerReservationsResponseSuccess =
  getApiV1OwnerReservationsResponse200 & {
    headers: Headers;
  };
export type getApiV1OwnerReservationsResponse =
  getApiV1OwnerReservationsResponseSuccess;

export const getGetApiV1OwnerReservationsUrl = (
  params?: GetApiV1OwnerReservationsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/owner/reservations?${stringifiedParams}`
    : `/api/v1/owner/reservations`;
};

export const getApiV1OwnerReservations = async (
  params?: GetApiV1OwnerReservationsParams,
  options?: RequestInit,
): Promise<getApiV1OwnerReservationsResponse> => {
  return customFetch<getApiV1OwnerReservationsResponse>(
    getGetApiV1OwnerReservationsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * QR 없이 수동으로 수령 완료 처리한다.
 * @summary 수령 처리 (수동)
 */
export type patchApiV1OwnerReservationsParticipationIdCompleteResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type patchApiV1OwnerReservationsParticipationIdCompleteResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type patchApiV1OwnerReservationsParticipationIdCompleteResponseSuccess =
  patchApiV1OwnerReservationsParticipationIdCompleteResponse200 & {
    headers: Headers;
  };
export type patchApiV1OwnerReservationsParticipationIdCompleteResponseError =
  patchApiV1OwnerReservationsParticipationIdCompleteResponse409 & {
    headers: Headers;
  };

export type patchApiV1OwnerReservationsParticipationIdCompleteResponse =
  | patchApiV1OwnerReservationsParticipationIdCompleteResponseSuccess
  | patchApiV1OwnerReservationsParticipationIdCompleteResponseError;

export const getPatchApiV1OwnerReservationsParticipationIdCompleteUrl = (
  participationId: number,
) => {
  return `/api/v1/owner/reservations/${participationId}/complete`;
};

export const patchApiV1OwnerReservationsParticipationIdComplete = async (
  participationId: number,
  options?: RequestInit,
): Promise<patchApiV1OwnerReservationsParticipationIdCompleteResponse> => {
  return customFetch<patchApiV1OwnerReservationsParticipationIdCompleteResponse>(
    getPatchApiV1OwnerReservationsParticipationIdCompleteUrl(participationId),
    {
      ...options,
      method: 'PATCH',
    },
  );
};
