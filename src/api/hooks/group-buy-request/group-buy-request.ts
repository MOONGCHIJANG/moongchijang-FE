/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

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
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * 매장명 또는 주소 입력 시 외부 지도/장소 API 기반 매장 후보 목록을 반환한다.
각 항목은 매장명과 주소를 함께 포함한다. 예: 모모양과 / 서울 성북구 화랑로11길 23

 * @summary 매장 검색 자동완성 (2.1.1-1)
 */
export type getApiV1StoresSearchResponse200 = {
  data: ApiResponseStoreSearchList
  status: 200
}

export type getApiV1StoresSearchResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1StoresSearchResponseSuccess = (getApiV1StoresSearchResponse200) & {
  headers: Headers;
};
export type getApiV1StoresSearchResponseError = (getApiV1StoresSearchResponse400) & {
  headers: Headers;
};

export type getApiV1StoresSearchResponse = (getApiV1StoresSearchResponseSuccess | getApiV1StoresSearchResponseError)

export const getGetApiV1StoresSearchUrl = (params: GetApiV1StoresSearchParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/stores/search?${stringifiedParams}` : `/api/v1/stores/search`
}

export const getApiV1StoresSearch = async (params: GetApiV1StoresSearchParams, options?: RequestInit): Promise<getApiV1StoresSearchResponse> => {

  return customFetch<getApiV1StoresSearchResponse>(getGetApiV1StoresSearchUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1StoresSearchQueryKey = (params?: GetApiV1StoresSearchParams,) => {
    return [
    `/api/v1/stores/search`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1StoresSearchQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError = BadRequestResponse>(params: GetApiV1StoresSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1StoresSearchQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1StoresSearch>>> = ({ signal }) => getApiV1StoresSearch(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1StoresSearchQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1StoresSearch>>>
export type GetApiV1StoresSearchQueryError = BadRequestResponse


export function useGetApiV1StoresSearch<TData = Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError = BadRequestResponse>(
 params: GetApiV1StoresSearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1StoresSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiV1StoresSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1StoresSearch<TData = Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError = BadRequestResponse>(
 params: GetApiV1StoresSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1StoresSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiV1StoresSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1StoresSearch<TData = Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError = BadRequestResponse>(
 params: GetApiV1StoresSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 매장 검색 자동완성 (2.1.1-1)
 */

export function useGetApiV1StoresSearch<TData = Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError = BadRequestResponse>(
 params: GetApiV1StoresSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1StoresSearch>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1StoresSearchQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 개설 요청 제출
 */
export type postApiV1GroupBuyRequestsResponse201 = {
  data: ApiResponseRequestId
  status: 201
}

export type postApiV1GroupBuyRequestsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1GroupBuyRequestsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1GroupBuyRequestsResponseSuccess = (postApiV1GroupBuyRequestsResponse201) & {
  headers: Headers;
};
export type postApiV1GroupBuyRequestsResponseError = (postApiV1GroupBuyRequestsResponse400 | postApiV1GroupBuyRequestsResponse401) & {
  headers: Headers;
};

export type postApiV1GroupBuyRequestsResponse = (postApiV1GroupBuyRequestsResponseSuccess | postApiV1GroupBuyRequestsResponseError)

export const getPostApiV1GroupBuyRequestsUrl = () => {




  return `/api/v1/group-buy-requests`
}

export const postApiV1GroupBuyRequests = async (groupBuyRequestCreate: GroupBuyRequestCreate, options?: RequestInit): Promise<postApiV1GroupBuyRequestsResponse> => {

  return customFetch<postApiV1GroupBuyRequestsResponse>(getPostApiV1GroupBuyRequestsUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      groupBuyRequestCreate,)
  }
);}




export const getPostApiV1GroupBuyRequestsMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>, TError,{data: GroupBuyRequestCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>, TError,{data: GroupBuyRequestCreate}, TContext> => {

const mutationKey = ['postApiV1GroupBuyRequests'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>, {data: GroupBuyRequestCreate}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1GroupBuyRequests(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1GroupBuyRequestsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>>
    export type PostApiV1GroupBuyRequestsMutationBody = GroupBuyRequestCreate
    export type PostApiV1GroupBuyRequestsMutationError = BadRequestResponse | UnauthorizedResponse

    /**
 * @summary 공구 개설 요청 제출
 */
export const usePostApiV1GroupBuyRequests = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>, TError,{data: GroupBuyRequestCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1GroupBuyRequests>>,
        TError,
        {data: GroupBuyRequestCreate},
        TContext
      > => {
      return useMutation(getPostApiV1GroupBuyRequestsMutationOptions(options), queryClient);
    }
    /**
 * @summary 내 공구 요청 목록 조회
 */
export type getApiV1GroupBuyRequestsResponse200 = {
  data: ApiResponseGroupBuyRequestList
  status: 200
}

export type getApiV1GroupBuyRequestsResponseSuccess = (getApiV1GroupBuyRequestsResponse200) & {
  headers: Headers;
};
;

export type getApiV1GroupBuyRequestsResponse = (getApiV1GroupBuyRequestsResponseSuccess)

export const getGetApiV1GroupBuyRequestsUrl = () => {




  return `/api/v1/group-buy-requests`
}

export const getApiV1GroupBuyRequests = async ( options?: RequestInit): Promise<getApiV1GroupBuyRequestsResponse> => {

  return customFetch<getApiV1GroupBuyRequestsResponse>(getGetApiV1GroupBuyRequestsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1GroupBuyRequestsQueryKey = () => {
    return [
    `/api/v1/group-buy-requests`
    ] as const;
    }


export const getGetApiV1GroupBuyRequestsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1GroupBuyRequestsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>> = ({ signal }) => getApiV1GroupBuyRequests({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1GroupBuyRequestsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>>
export type GetApiV1GroupBuyRequestsQueryError = unknown


export function useGetApiV1GroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1GroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1GroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 내 공구 요청 목록 조회
 */

export function useGetApiV1GroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1GroupBuyRequestsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 요청 상세 조회
 */
export type getApiV1GroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseGroupBuyRequestDetail
  status: 200
}

export type getApiV1GroupBuyRequestsRequestIdResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1GroupBuyRequestsRequestIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1GroupBuyRequestsRequestIdResponseSuccess = (getApiV1GroupBuyRequestsRequestIdResponse200) & {
  headers: Headers;
};
export type getApiV1GroupBuyRequestsRequestIdResponseError = (getApiV1GroupBuyRequestsRequestIdResponse403 | getApiV1GroupBuyRequestsRequestIdResponse404) & {
  headers: Headers;
};

export type getApiV1GroupBuyRequestsRequestIdResponse = (getApiV1GroupBuyRequestsRequestIdResponseSuccess | getApiV1GroupBuyRequestsRequestIdResponseError)

export const getGetApiV1GroupBuyRequestsRequestIdUrl = (requestId: number,) => {




  return `/api/v1/group-buy-requests/${requestId}`
}

export const getApiV1GroupBuyRequestsRequestId = async (requestId: number, options?: RequestInit): Promise<getApiV1GroupBuyRequestsRequestIdResponse> => {

  return customFetch<getApiV1GroupBuyRequestsRequestIdResponse>(getGetApiV1GroupBuyRequestsRequestIdUrl(requestId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1GroupBuyRequestsRequestIdQueryKey = (requestId: number,) => {
    return [
    `/api/v1/group-buy-requests/${requestId}`
    ] as const;
    }


export const getGetApiV1GroupBuyRequestsRequestIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError = ForbiddenResponse | NotFoundResponse>(requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1GroupBuyRequestsRequestIdQueryKey(requestId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>> = ({ signal }) => getApiV1GroupBuyRequestsRequestId(requestId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(requestId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1GroupBuyRequestsRequestIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>>
export type GetApiV1GroupBuyRequestsRequestIdQueryError = ForbiddenResponse | NotFoundResponse


export function useGetApiV1GroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError = ForbiddenResponse | NotFoundResponse>(
 requestId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1GroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError = ForbiddenResponse | NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1GroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError = ForbiddenResponse | NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 공구 요청 상세 조회
 */

export function useGetApiV1GroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError = ForbiddenResponse | NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1GroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1GroupBuyRequestsRequestIdQueryOptions(requestId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 특정 지역/상품 조합으로 공구가 개설되면 알림을 받기 위해 등록한다.
검색 결과가 비어 있을 때(EMPTY_CAN_REQUEST 상태) 진입 가능한 진입점이다.

 * @summary 공구 개설 알림 신청
 */
export type postApiV1GroupBuyOpenRequestsResponse201 = {
  data: SuccessNoDataResponse
  status: 201
}

export type postApiV1GroupBuyOpenRequestsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1GroupBuyOpenRequestsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1GroupBuyOpenRequestsResponseSuccess = (postApiV1GroupBuyOpenRequestsResponse201) & {
  headers: Headers;
};
export type postApiV1GroupBuyOpenRequestsResponseError = (postApiV1GroupBuyOpenRequestsResponse400 | postApiV1GroupBuyOpenRequestsResponse401) & {
  headers: Headers;
};

export type postApiV1GroupBuyOpenRequestsResponse = (postApiV1GroupBuyOpenRequestsResponseSuccess | postApiV1GroupBuyOpenRequestsResponseError)

export const getPostApiV1GroupBuyOpenRequestsUrl = () => {




  return `/api/v1/group-buy-open-requests`
}

export const postApiV1GroupBuyOpenRequests = async (postApiV1GroupBuyOpenRequestsBody: PostApiV1GroupBuyOpenRequestsBody, options?: RequestInit): Promise<postApiV1GroupBuyOpenRequestsResponse> => {

  return customFetch<postApiV1GroupBuyOpenRequestsResponse>(getPostApiV1GroupBuyOpenRequestsUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postApiV1GroupBuyOpenRequestsBody,)
  }
);}




export const getPostApiV1GroupBuyOpenRequestsMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>, TError,{data: PostApiV1GroupBuyOpenRequestsBody}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>, TError,{data: PostApiV1GroupBuyOpenRequestsBody}, TContext> => {

const mutationKey = ['postApiV1GroupBuyOpenRequests'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>, {data: PostApiV1GroupBuyOpenRequestsBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1GroupBuyOpenRequests(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1GroupBuyOpenRequestsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>>
    export type PostApiV1GroupBuyOpenRequestsMutationBody = PostApiV1GroupBuyOpenRequestsBody
    export type PostApiV1GroupBuyOpenRequestsMutationError = BadRequestResponse | UnauthorizedResponse

    /**
 * @summary 공구 개설 알림 신청
 */
export const usePostApiV1GroupBuyOpenRequests = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>, TError,{data: PostApiV1GroupBuyOpenRequestsBody}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequests>>,
        TError,
        {data: PostApiV1GroupBuyOpenRequestsBody},
        TContext
      > => {
      return useMutation(getPostApiV1GroupBuyOpenRequestsMutationOptions(options), queryClient);
    }
    /**
 * 동네와 상품 조건이 확정된 뒤 네이버 Local Search API와 자사 공구 이력을 기반으로
최대 10개의 매장 후보를 추천한다.

네이버 결과가 0건이거나 네이버 API 호출 실패/timeout이 발생하면 `stores=[]`를 반환하며,
프론트는 기존 공구 개설 요청 플로우로 fallback한다.

 * @summary AI 매장 추천 바텀시트용 매장 후보 조회
 */
export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse200 = {
  data: ApiResponseStoreRecommendation
  status: 200
}

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseSuccess = (postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse200) & {
  headers: Headers;
};
export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseError = (postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse400 | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse401) & {
  headers: Headers;
};

export type postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse = (postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseSuccess | postApiV1GroupBuyOpenRequestsStoreRecommendationsResponseError)

export const getPostApiV1GroupBuyOpenRequestsStoreRecommendationsUrl = () => {




  return `/api/v1/group-buy-open-requests/store-recommendations`
}

export const postApiV1GroupBuyOpenRequestsStoreRecommendations = async (storeRecommendationRequest: StoreRecommendationRequest, options?: RequestInit): Promise<postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse> => {

  return customFetch<postApiV1GroupBuyOpenRequestsStoreRecommendationsResponse>(getPostApiV1GroupBuyOpenRequestsStoreRecommendationsUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      storeRecommendationRequest,)
  }
);}




export const getPostApiV1GroupBuyOpenRequestsStoreRecommendationsMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>, TError,{data: StoreRecommendationRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>, TError,{data: StoreRecommendationRequest}, TContext> => {

const mutationKey = ['postApiV1GroupBuyOpenRequestsStoreRecommendations'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>, {data: StoreRecommendationRequest}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1GroupBuyOpenRequestsStoreRecommendations(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1GroupBuyOpenRequestsStoreRecommendationsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>>
    export type PostApiV1GroupBuyOpenRequestsStoreRecommendationsMutationBody = StoreRecommendationRequest
    export type PostApiV1GroupBuyOpenRequestsStoreRecommendationsMutationError = BadRequestResponse | UnauthorizedResponse

    /**
 * @summary AI 매장 추천 바텀시트용 매장 후보 조회
 */
export const usePostApiV1GroupBuyOpenRequestsStoreRecommendations = <TError = BadRequestResponse | UnauthorizedResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>, TError,{data: StoreRecommendationRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1GroupBuyOpenRequestsStoreRecommendations>>,
        TError,
        {data: StoreRecommendationRequest},
        TContext
      > => {
      return useMutation(getPostApiV1GroupBuyOpenRequestsStoreRecommendationsMutationOptions(options), queryClient);
    }
