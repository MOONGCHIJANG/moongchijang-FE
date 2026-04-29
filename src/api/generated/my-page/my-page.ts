/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseGroupBuyRequestList,
  ApiResponseParticipationPage,
  ApiResponseTabCounts,
  GetApiV1UsersMeParticipationsParams
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 참여 목록 조회 (참여중 · 완료 · 환불 탭)
 */
export type getApiV1UsersMeParticipationsResponse200 = {
  data: ApiResponseParticipationPage
  status: 200
}

export type getApiV1UsersMeParticipationsResponseSuccess = (getApiV1UsersMeParticipationsResponse200) & {
  headers: Headers;
};
;

export type getApiV1UsersMeParticipationsResponse = (getApiV1UsersMeParticipationsResponseSuccess)

export const getGetApiV1UsersMeParticipationsUrl = (params?: GetApiV1UsersMeParticipationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/users/me/participations?${stringifiedParams}` : `/api/v1/users/me/participations`
}

export const getApiV1UsersMeParticipations = async (params?: GetApiV1UsersMeParticipationsParams, options?: RequestInit): Promise<getApiV1UsersMeParticipationsResponse> => {

  return customFetch<getApiV1UsersMeParticipationsResponse>(getGetApiV1UsersMeParticipationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 내 공구 요청 목록 조회 (개설 요청 내역 탭)
 */
export type getApiV1UsersMeGroupBuyRequestsResponse200 = {
  data: ApiResponseGroupBuyRequestList
  status: 200
}

export type getApiV1UsersMeGroupBuyRequestsResponseSuccess = (getApiV1UsersMeGroupBuyRequestsResponse200) & {
  headers: Headers;
};
;

export type getApiV1UsersMeGroupBuyRequestsResponse = (getApiV1UsersMeGroupBuyRequestsResponseSuccess)

export const getGetApiV1UsersMeGroupBuyRequestsUrl = () => {




  return `/api/v1/users/me/group-buy-requests`
}

export const getApiV1UsersMeGroupBuyRequests = async ( options?: RequestInit): Promise<getApiV1UsersMeGroupBuyRequestsResponse> => {

  return customFetch<getApiV1UsersMeGroupBuyRequestsResponse>(getGetApiV1UsersMeGroupBuyRequestsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * 참여중 · 완료 · 환불내역 · 개설요청 건수를 반환한다 (탭 칩 괄호 숫자용).
 * @summary 마이페이지 탭별 건수 조회
 */
export type getApiV1UsersMeTabsCountsResponse200 = {
  data: ApiResponseTabCounts
  status: 200
}

export type getApiV1UsersMeTabsCountsResponseSuccess = (getApiV1UsersMeTabsCountsResponse200) & {
  headers: Headers;
};
;

export type getApiV1UsersMeTabsCountsResponse = (getApiV1UsersMeTabsCountsResponseSuccess)

export const getGetApiV1UsersMeTabsCountsUrl = () => {




  return `/api/v1/users/me/tabs/counts`
}

export const getApiV1UsersMeTabsCounts = async ( options?: RequestInit): Promise<getApiV1UsersMeTabsCountsResponse> => {

  return customFetch<getApiV1UsersMeTabsCountsResponse>(getGetApiV1UsersMeTabsCountsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


