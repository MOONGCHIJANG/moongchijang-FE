/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseOwnerGroupBuyList,
  ApiResponseOwnerSummary,
  ApiResponsePickupScheduleList,
  ApiResponseReservationPage,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1OwnerReservationsParams,
  SuccessNoDataResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 픽업 대기/완료 건수, 진행 중 공구 수, 다음 픽업 시간을 반환한다.
 * @summary 사장님 홈 요약 정보
 */
export type getApiV1OwnerHomeSummaryResponse200 = {
  data: ApiResponseOwnerSummary
  status: 200
}

export type getApiV1OwnerHomeSummaryResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1OwnerHomeSummaryResponseSuccess = (getApiV1OwnerHomeSummaryResponse200) & {
  headers: Headers;
};
export type getApiV1OwnerHomeSummaryResponseError = (getApiV1OwnerHomeSummaryResponse403) & {
  headers: Headers;
};

export type getApiV1OwnerHomeSummaryResponse = (getApiV1OwnerHomeSummaryResponseSuccess | getApiV1OwnerHomeSummaryResponseError)

export const getGetApiV1OwnerHomeSummaryUrl = () => {




  return `/api/v1/owner/home/summary`
}

export const getApiV1OwnerHomeSummary = async ( options?: RequestInit): Promise<getApiV1OwnerHomeSummaryResponse> => {

  return customFetch<getApiV1OwnerHomeSummaryResponse>(getGetApiV1OwnerHomeSummaryUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 시간대별 픽업 현황 조회
 */
export type getApiV1OwnerHomePickupScheduleResponse200 = {
  data: ApiResponsePickupScheduleList
  status: 200
}

export type getApiV1OwnerHomePickupScheduleResponseSuccess = (getApiV1OwnerHomePickupScheduleResponse200) & {
  headers: Headers;
};
;

export type getApiV1OwnerHomePickupScheduleResponse = (getApiV1OwnerHomePickupScheduleResponseSuccess)

export const getGetApiV1OwnerHomePickupScheduleUrl = () => {




  return `/api/v1/owner/home/pickup-schedule`
}

export const getApiV1OwnerHomePickupSchedule = async ( options?: RequestInit): Promise<getApiV1OwnerHomePickupScheduleResponse> => {

  return customFetch<getApiV1OwnerHomePickupScheduleResponse>(getGetApiV1OwnerHomePickupScheduleUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 진행 중인 공구 목록 조회 (사장님용)
 */
export type getApiV1OwnerGroupBuysResponse200 = {
  data: ApiResponseOwnerGroupBuyList
  status: 200
}

export type getApiV1OwnerGroupBuysResponseSuccess = (getApiV1OwnerGroupBuysResponse200) & {
  headers: Headers;
};
;

export type getApiV1OwnerGroupBuysResponse = (getApiV1OwnerGroupBuysResponseSuccess)

export const getGetApiV1OwnerGroupBuysUrl = () => {




  return `/api/v1/owner/group-buys`
}

export const getApiV1OwnerGroupBuys = async ( options?: RequestInit): Promise<getApiV1OwnerGroupBuysResponse> => {

  return customFetch<getApiV1OwnerGroupBuysResponse>(getGetApiV1OwnerGroupBuysUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 픽업 예약자 목록 조회
 */
export type getApiV1OwnerReservationsResponse200 = {
  data: ApiResponseReservationPage
  status: 200
}

export type getApiV1OwnerReservationsResponseSuccess = (getApiV1OwnerReservationsResponse200) & {
  headers: Headers;
};
;

export type getApiV1OwnerReservationsResponse = (getApiV1OwnerReservationsResponseSuccess)

export const getGetApiV1OwnerReservationsUrl = (params?: GetApiV1OwnerReservationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/owner/reservations?${stringifiedParams}` : `/api/v1/owner/reservations`
}

export const getApiV1OwnerReservations = async (params?: GetApiV1OwnerReservationsParams, options?: RequestInit): Promise<getApiV1OwnerReservationsResponse> => {

  return customFetch<getApiV1OwnerReservationsResponse>(getGetApiV1OwnerReservationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * QR 없이 수동으로 수령 완료 처리한다.
 * @summary 수령 처리 (수동)
 */
export type patchApiV1OwnerReservationsParticipationIdCompleteResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type patchApiV1OwnerReservationsParticipationIdCompleteResponse409 = {
  data: ConflictResponse
  status: 409
}

export type patchApiV1OwnerReservationsParticipationIdCompleteResponseSuccess = (patchApiV1OwnerReservationsParticipationIdCompleteResponse200) & {
  headers: Headers;
};
export type patchApiV1OwnerReservationsParticipationIdCompleteResponseError = (patchApiV1OwnerReservationsParticipationIdCompleteResponse409) & {
  headers: Headers;
};

export type patchApiV1OwnerReservationsParticipationIdCompleteResponse = (patchApiV1OwnerReservationsParticipationIdCompleteResponseSuccess | patchApiV1OwnerReservationsParticipationIdCompleteResponseError)

export const getPatchApiV1OwnerReservationsParticipationIdCompleteUrl = (participationId: number,) => {




  return `/api/v1/owner/reservations/${participationId}/complete`
}

export const patchApiV1OwnerReservationsParticipationIdComplete = async (participationId: number, options?: RequestInit): Promise<patchApiV1OwnerReservationsParticipationIdCompleteResponse> => {

  return customFetch<patchApiV1OwnerReservationsParticipationIdCompleteResponse>(getPatchApiV1OwnerReservationsParticipationIdCompleteUrl(participationId),
  {
    ...options,
    method: 'PATCH'


  }
);}


