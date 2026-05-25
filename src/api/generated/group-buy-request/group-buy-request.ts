/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseGroupBuyRequestDetail,
  ApiResponseGroupBuyRequestList,
  ApiResponseRequestId,
  ApiResponseStoreRecommendation,
  ApiResponseStoreSearchList,
  BadRequestResponse,
  ForbiddenResponse,
  GetApiV1StoresSearchParams,
  GroupBuyRequestCreate,
  NotFoundResponse,
  PostApiV1GroupBuyOpenRequestsBody,
  StoreRecommendationRequest,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 매장명 또는 주소 입력 시 외부 지도/장소 API 기반 매장 후보 목록을 반환한다.
각 항목은 매장명과 주소를 함께 포함한다. 예: 모모양과 / 서울 성북구 화랑로11길 23

 * @summary 매장 검색 자동완성 (2.1.1-1)
 */
export type getApiV1StoresSearchResponse200 = {
  data: ApiResponseStoreSearchList;
  status: 200;
};

export type getApiV1StoresSearchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1StoresSearchResponseSuccess =
  getApiV1StoresSearchResponse200 & {
    headers: Headers;
  };
export type getApiV1StoresSearchResponseError =
  getApiV1StoresSearchResponse400 & {
    headers: Headers;
  };

export type getApiV1StoresSearchResponse =
  | getApiV1StoresSearchResponseSuccess
  | getApiV1StoresSearchResponseError;

export const getGetApiV1StoresSearchUrl = (
  params: GetApiV1StoresSearchParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/stores/search?${stringifiedParams}`
    : `/api/v1/stores/search`;
};

export const getApiV1StoresSearch = async (
  params: GetApiV1StoresSearchParams,
  options?: RequestInit,
): Promise<getApiV1StoresSearchResponse> => {
  return customFetch<getApiV1StoresSearchResponse>(
    getGetApiV1StoresSearchUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 공구 개설 요청 제출
 */
export type postApiV1GroupBuyRequestsResponse201 = {
  data: ApiResponseRequestId;
  status: 201;
};

export type postApiV1GroupBuyRequestsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuyRequestsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuyRequestsResponseSuccess =
  postApiV1GroupBuyRequestsResponse201 & {
    headers: Headers;
  };
export type postApiV1GroupBuyRequestsResponseError = (
  | postApiV1GroupBuyRequestsResponse400
  | postApiV1GroupBuyRequestsResponse401
) & {
  headers: Headers;
};

export type postApiV1GroupBuyRequestsResponse =
  | postApiV1GroupBuyRequestsResponseSuccess
  | postApiV1GroupBuyRequestsResponseError;

export const getPostApiV1GroupBuyRequestsUrl = () => {
  return `/api/v1/group-buy-requests`;
};

export const postApiV1GroupBuyRequests = async (
  groupBuyRequestCreate: GroupBuyRequestCreate,
  options?: RequestInit,
): Promise<postApiV1GroupBuyRequestsResponse> => {
  return customFetch<postApiV1GroupBuyRequestsResponse>(
    getPostApiV1GroupBuyRequestsUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(groupBuyRequestCreate),
    },
  );
};

/**
 * @summary 내 공구 요청 목록 조회
 */
export type getApiV1GroupBuyRequestsResponse200 = {
  data: ApiResponseGroupBuyRequestList;
  status: 200;
};

export type getApiV1GroupBuyRequestsResponseSuccess =
  getApiV1GroupBuyRequestsResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuyRequestsResponse =
  getApiV1GroupBuyRequestsResponseSuccess;

export const getGetApiV1GroupBuyRequestsUrl = () => {
  return `/api/v1/group-buy-requests`;
};

export const getApiV1GroupBuyRequests = async (
  options?: RequestInit,
): Promise<getApiV1GroupBuyRequestsResponse> => {
  return customFetch<getApiV1GroupBuyRequestsResponse>(
    getGetApiV1GroupBuyRequestsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 공구 요청 상세 조회
 */
export type getApiV1GroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseGroupBuyRequestDetail;
  status: 200;
};

export type getApiV1GroupBuyRequestsRequestIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1GroupBuyRequestsRequestIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1GroupBuyRequestsRequestIdResponseSuccess =
  getApiV1GroupBuyRequestsRequestIdResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuyRequestsRequestIdResponseError = (
  | getApiV1GroupBuyRequestsRequestIdResponse403
  | getApiV1GroupBuyRequestsRequestIdResponse404
) & {
  headers: Headers;
};

export type getApiV1GroupBuyRequestsRequestIdResponse =
  | getApiV1GroupBuyRequestsRequestIdResponseSuccess
  | getApiV1GroupBuyRequestsRequestIdResponseError;

export const getGetApiV1GroupBuyRequestsRequestIdUrl = (requestId: number) => {
  return `/api/v1/group-buy-requests/${requestId}`;
};

export const getApiV1GroupBuyRequestsRequestId = async (
  requestId: number,
  options?: RequestInit,
): Promise<getApiV1GroupBuyRequestsRequestIdResponse> => {
  return customFetch<getApiV1GroupBuyRequestsRequestIdResponse>(
    getGetApiV1GroupBuyRequestsRequestIdUrl(requestId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 특정 지역/상품 조합으로 공구가 개설되면 알림을 받기 위해 등록한다.
검색 결과가 비어 있을 때(EMPTY_CAN_REQUEST 상태) 진입 가능한 진입점이다.

 * @summary 공구 개설 알림 신청
 */
export type postApiV1GroupBuyOpenRequestsResponse201 = {
  data: SuccessNoDataResponse;
  status: 201;
};

export type postApiV1GroupBuyOpenRequestsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuyOpenRequestsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuyOpenRequestsResponseSuccess =
  postApiV1GroupBuyOpenRequestsResponse201 & {
    headers: Headers;
  };
export type postApiV1GroupBuyOpenRequestsResponseError = (
  | postApiV1GroupBuyOpenRequestsResponse400
  | postApiV1GroupBuyOpenRequestsResponse401
) & {
  headers: Headers;
};

export type postApiV1GroupBuyOpenRequestsResponse =
  | postApiV1GroupBuyOpenRequestsResponseSuccess
  | postApiV1GroupBuyOpenRequestsResponseError;

export const getPostApiV1GroupBuyOpenRequestsUrl = () => {
  return `/api/v1/group-buy-open-requests`;
};

export const postApiV1GroupBuyOpenRequests = async (
  postApiV1GroupBuyOpenRequestsBody: PostApiV1GroupBuyOpenRequestsBody,
  options?: RequestInit,
): Promise<postApiV1GroupBuyOpenRequestsResponse> => {
  return customFetch<postApiV1GroupBuyOpenRequestsResponse>(
    getPostApiV1GroupBuyOpenRequestsUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(postApiV1GroupBuyOpenRequestsBody),
    },
  );
};

/**
 * 1.1.4-9 매장 추천 바텀시트용 API.

Case 1~4의 바텀시트에서 동네·상품 조건이 모두 확정된 후 CTA 버튼을 탭하면,
백엔드는 네이버 Local Search API를 조회하여 해당 조건에 맞는 매장 후보를 검색한다.

매장 후보는 최대 10개까지 반환하며, 추천 매장 후보는 다음 기준을 반영해 정렬한다.

- 네이버 Local Search API의 기본 관련도 순서
- 매장 주소가 선택한 동네와 일치하거나 포함되는지 여부
- 매장 카테고리가 상품 조건과 관련 있는지 여부
- 자사 DB에 등록된 매장인지 여부
- 해당 매장의 과거 공구 이력이 있는지 여부

네이버 결과가 0건이거나 네이버 API 호출 실패/timeout이 발생하면 `stores=[]`를 반환하며,
프론트는 기존 공구 개설 요청 플로우로 fallback한다.

중복 매장은 하나로 합쳐 반환하고, 매장명에 포함된 HTML 태그는 제거해서 반환한다.

 * @summary 매장 추천 바텀시트용 네이버 Local Search 매장 후보 조회
 */
export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse200 = {
  data: ApiResponseStoreRecommendation;
  status: 200;
};

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseSuccess =
  postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse200 & {
    headers: Headers;
  };
export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseError = (
  | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse400
  | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse401
) & {
  headers: Headers;
};

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse =
  | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseSuccess
  | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseError;

export const getPostApiV1GroupBuyOpenRequestsStoreRecommendationsUrl = () => {
  return `/api/v1/group-buy-open-requests/store-recommendations`;
};

export const postApiV1GroupBuyOpenRequestsStoreRecommendations = async (
  storeRecommendationRequest: StoreRecommendationRequest,
  options?: RequestInit,
): Promise<postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse> => {
  return customFetch<postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse>(
    getPostApiV1GroupBuyOpenRequestsStoreRecommendationsUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(storeRecommendationRequest),
    },
  );
};
