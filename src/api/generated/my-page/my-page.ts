/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseInProgressParticipationPage,
  ApiResponseMypageGroupBuyRequestList,
  ApiResponseMypageParticipationList,
  ApiResponsePickupWaitingParticipationPage,
  ApiResponseRefundList,
  ApiResponseTabCounts,
  BadRequestResponse,
  GetApiV1UsersMeParticipationsInProgressParams,
  GetApiV1UsersMeParticipationsParams,
  GetApiV1UsersMeParticipationsPickupWaitingParams,
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 내 참여 내역 상태별 조회
 */
export type getApiV1UsersMeParticipationsResponse200 = {
  data: ApiResponseMypageParticipationList
  status: 200
}

export type getApiV1UsersMeParticipationsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1UsersMeParticipationsResponseSuccess = (getApiV1UsersMeParticipationsResponse200) & {
  headers: Headers;
};
export type getApiV1UsersMeParticipationsResponseError = (getApiV1UsersMeParticipationsResponse400) & {
  headers: Headers;
};

export type getApiV1UsersMeParticipationsResponse = (getApiV1UsersMeParticipationsResponseSuccess | getApiV1UsersMeParticipationsResponseError)

export const getGetApiV1UsersMeParticipationsUrl = (params: GetApiV1UsersMeParticipationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/users/me/participations?${stringifiedParams}` : `/api/v1/users/me/participations`
}

export const getApiV1UsersMeParticipations = async (params: GetApiV1UsersMeParticipationsParams, options?: RequestInit): Promise<getApiV1UsersMeParticipationsResponse> => {

  return customFetch<getApiV1UsersMeParticipationsResponse>(getGetApiV1UsersMeParticipationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * 페이지네이션 기반으로 진행 중 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 진행 중 탭 참여 공구 목록 조회
 */
export type getApiV1UsersMeParticipationsInProgressResponse200 = {
  data: ApiResponseInProgressParticipationPage
  status: 200
}

export type getApiV1UsersMeParticipationsInProgressResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getApiV1UsersMeParticipationsInProgressResponseSuccess = (getApiV1UsersMeParticipationsInProgressResponse200) & {
  headers: Headers;
};
export type getApiV1UsersMeParticipationsInProgressResponseError = (getApiV1UsersMeParticipationsInProgressResponse401) & {
  headers: Headers;
};

export type getApiV1UsersMeParticipationsInProgressResponse = (getApiV1UsersMeParticipationsInProgressResponseSuccess | getApiV1UsersMeParticipationsInProgressResponseError)

export const getGetApiV1UsersMeParticipationsInProgressUrl = (params?: GetApiV1UsersMeParticipationsInProgressParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/users/me/participations/in-progress?${stringifiedParams}` : `/api/v1/users/me/participations/in-progress`
}

export const getApiV1UsersMeParticipationsInProgress = async (params?: GetApiV1UsersMeParticipationsInProgressParams, options?: RequestInit): Promise<getApiV1UsersMeParticipationsInProgressResponse> => {

  return customFetch<getApiV1UsersMeParticipationsInProgressResponse>(getGetApiV1UsersMeParticipationsInProgressUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * 페이지네이션 기반으로 픽업 대기 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 픽업 대기 탭 참여 완료 공구 이력 조회
 */
export type getApiV1UsersMeParticipationsPickupWaitingResponse200 = {
  data: ApiResponsePickupWaitingParticipationPage
  status: 200
}

export type getApiV1UsersMeParticipationsPickupWaitingResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getApiV1UsersMeParticipationsPickupWaitingResponseSuccess = (getApiV1UsersMeParticipationsPickupWaitingResponse200) & {
  headers: Headers;
};
export type getApiV1UsersMeParticipationsPickupWaitingResponseError = (getApiV1UsersMeParticipationsPickupWaitingResponse401) & {
  headers: Headers;
};

export type getApiV1UsersMeParticipationsPickupWaitingResponse = (getApiV1UsersMeParticipationsPickupWaitingResponseSuccess | getApiV1UsersMeParticipationsPickupWaitingResponseError)

export const getGetApiV1UsersMeParticipationsPickupWaitingUrl = (params?: GetApiV1UsersMeParticipationsPickupWaitingParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/users/me/participations/pickup-waiting?${stringifiedParams}` : `/api/v1/users/me/participations/pickup-waiting`
}

export const getApiV1UsersMeParticipationsPickupWaiting = async (params?: GetApiV1UsersMeParticipationsPickupWaitingParams, options?: RequestInit): Promise<getApiV1UsersMeParticipationsPickupWaitingResponse> => {

  return customFetch<getApiV1UsersMeParticipationsPickupWaitingResponse>(getGetApiV1UsersMeParticipationsPickupWaitingUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 내 공구 개설 요청 내역 조회
 */
export type getApiV1UsersMeGroupBuyRequestsResponse200 = {
  data: ApiResponseMypageGroupBuyRequestList
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
 * 진행 중 · 픽업 대기 · 픽업 완료 · 환불/취소 · 개설요청 건수를 반환한다 (탭 칩 괄호 숫자용).
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


/**
 * 진행 중 · 픽업 대기 · 픽업 완료 · 환불/취소 · 개설요청 건수를 반환한다.
 * @summary 마이페이지 탭별 건수 조회
 */
export type getApiV1MypageSummaryResponse200 = {
  data: ApiResponseTabCounts
  status: 200
}

export type getApiV1MypageSummaryResponseSuccess = (getApiV1MypageSummaryResponse200) & {
  headers: Headers;
};
;

export type getApiV1MypageSummaryResponse = (getApiV1MypageSummaryResponseSuccess)

export const getGetApiV1MypageSummaryUrl = () => {




  return `/api/v1/mypage/summary`
}

export const getApiV1MypageSummary = async ( options?: RequestInit): Promise<getApiV1MypageSummaryResponse> => {

  return customFetch<getApiV1MypageSummaryResponse>(getGetApiV1MypageSummaryUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 내 환불 내역 조회
 */
export type getApiV1MypageRefundsResponse200 = {
  data: ApiResponseRefundList
  status: 200
}

export type getApiV1MypageRefundsResponseSuccess = (getApiV1MypageRefundsResponse200) & {
  headers: Headers;
};
;

export type getApiV1MypageRefundsResponse = (getApiV1MypageRefundsResponseSuccess)

export const getGetApiV1MypageRefundsUrl = () => {




  return `/api/v1/mypage/refunds`
}

export const getApiV1MypageRefunds = async ( options?: RequestInit): Promise<getApiV1MypageRefundsResponse> => {

  return customFetch<getApiV1MypageRefundsResponse>(getGetApiV1MypageRefundsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * /api/v1/mypage/refunds 와 동일한 응답을 반환한다. 신규 클라이언트는 본 경로를 사용한다.
 * @summary 내 환불 내역 조회 (마이페이지 alias)
 */
export type getApiV1UsersMeRefundsResponse200 = {
  data: ApiResponseRefundList
  status: 200
}

export type getApiV1UsersMeRefundsResponseSuccess = (getApiV1UsersMeRefundsResponse200) & {
  headers: Headers;
};
;

export type getApiV1UsersMeRefundsResponse = (getApiV1UsersMeRefundsResponseSuccess)

export const getGetApiV1UsersMeRefundsUrl = () => {




  return `/api/v1/users/me/refunds`
}

export const getApiV1UsersMeRefunds = async ( options?: RequestInit): Promise<getApiV1UsersMeRefundsResponse> => {

  return customFetch<getApiV1UsersMeRefundsResponse>(getGetApiV1UsersMeRefundsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 내 공구 개설 요청 내역 조회
 */
export type getApiV1MypageGroupBuyRequestsResponse200 = {
  data: ApiResponseMypageGroupBuyRequestList
  status: 200
}

export type getApiV1MypageGroupBuyRequestsResponseSuccess = (getApiV1MypageGroupBuyRequestsResponse200) & {
  headers: Headers;
};
;

export type getApiV1MypageGroupBuyRequestsResponse = (getApiV1MypageGroupBuyRequestsResponseSuccess)

export const getGetApiV1MypageGroupBuyRequestsUrl = () => {




  return `/api/v1/mypage/group-buy-requests`
}

export const getApiV1MypageGroupBuyRequests = async ( options?: RequestInit): Promise<getApiV1MypageGroupBuyRequestsResponse> => {

  return customFetch<getApiV1MypageGroupBuyRequestsResponse>(getGetApiV1MypageGroupBuyRequestsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


