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
  AdminGroupBuyCreate,
  AdminGroupBuyUpdate,
  AdminManualRefund,
  AdminRequestStatusUpdate,
  AdminSettlementCreate,
  ApiResponseAdminDashboardSummary,
  ApiResponseAdminGroupBuyDetail,
  ApiResponseAdminGroupBuyList,
  ApiResponseAdminRefundPage,
  ApiResponseAdminRequestDetail,
  ApiResponseAdminRequestPage,
  ApiResponseGroupBuyId,
  ApiResponseGroupBuyRequestDetail,
  ApiResponseSettlementId,
  ApiResponseSettlementPage,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1AdminGroupBuyRequestsParams,
  GetApiV1AdminGroupBuysParams,
  GetApiV1AdminRefundsParams,
  GetApiV1AdminSettlementsParams,
  SuccessNoDataResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * 헤더에 항상 노출되는 대기중 요청 / 진행 중 공구 / 달성률 / 대기 환불 요약을 반환한다.
 * @summary 운영자 대시보드 요약 정보
 */
export type getApiV1AdminSummaryResponse200 = {
  data: ApiResponseAdminDashboardSummary
  status: 200
}

export type getApiV1AdminSummaryResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminSummaryResponseSuccess = (getApiV1AdminSummaryResponse200) & {
  headers: Headers;
};
export type getApiV1AdminSummaryResponseError = (getApiV1AdminSummaryResponse403) & {
  headers: Headers;
};

export type getApiV1AdminSummaryResponse = (getApiV1AdminSummaryResponseSuccess | getApiV1AdminSummaryResponseError)

export const getGetApiV1AdminSummaryUrl = () => {




  return `/api/v1/admin/summary`
}

export const getApiV1AdminSummary = async ( options?: RequestInit): Promise<getApiV1AdminSummaryResponse> => {

  return customFetch<getApiV1AdminSummaryResponse>(getGetApiV1AdminSummaryUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminSummaryQueryKey = () => {
    return [
    `/api/v1/admin/summary`
    ] as const;
    }


export const getGetApiV1AdminSummaryQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError = ForbiddenResponse>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminSummaryQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminSummary>>> = ({ signal }) => getApiV1AdminSummary({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminSummary>>>
export type GetApiV1AdminSummaryQueryError = ForbiddenResponse


export function useGetApiV1AdminSummary<TData = Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError = ForbiddenResponse>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSummary>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSummary<TData = Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError = ForbiddenResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSummary>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSummary<TData = Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError = ForbiddenResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 운영자 대시보드 요약 정보
 */

export function useGetApiV1AdminSummary<TData = Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError = ForbiddenResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSummary>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminSummaryQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 요청 목록 조회 (운영자)
 */
export type getApiV1AdminGroupBuyRequestsResponse200 = {
  data: ApiResponseAdminRequestPage
  status: 200
}

export type getApiV1AdminGroupBuyRequestsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminGroupBuyRequestsResponseSuccess = (getApiV1AdminGroupBuyRequestsResponse200) & {
  headers: Headers;
};
export type getApiV1AdminGroupBuyRequestsResponseError = (getApiV1AdminGroupBuyRequestsResponse403) & {
  headers: Headers;
};

export type getApiV1AdminGroupBuyRequestsResponse = (getApiV1AdminGroupBuyRequestsResponseSuccess | getApiV1AdminGroupBuyRequestsResponseError)

export const getGetApiV1AdminGroupBuyRequestsUrl = (params?: GetApiV1AdminGroupBuyRequestsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/group-buy-requests?${stringifiedParams}` : `/api/v1/admin/group-buy-requests`
}

export const getApiV1AdminGroupBuyRequests = async (params?: GetApiV1AdminGroupBuyRequestsParams, options?: RequestInit): Promise<getApiV1AdminGroupBuyRequestsResponse> => {

  return customFetch<getApiV1AdminGroupBuyRequestsResponse>(getGetApiV1AdminGroupBuyRequestsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminGroupBuyRequestsQueryKey = (params?: GetApiV1AdminGroupBuyRequestsParams,) => {
    return [
    `/api/v1/admin/group-buy-requests`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminGroupBuyRequestsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError = ForbiddenResponse>(params?: GetApiV1AdminGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminGroupBuyRequestsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>> = ({ signal }) => getApiV1AdminGroupBuyRequests(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminGroupBuyRequestsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>>
export type GetApiV1AdminGroupBuyRequestsQueryError = ForbiddenResponse


export function useGetApiV1AdminGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminGroupBuyRequestsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 공구 요청 목록 조회 (운영자)
 */

export function useGetApiV1AdminGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminGroupBuyRequestsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 요청 상세 조회 (운영자)
 */
export type getApiV1AdminGroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseAdminRequestDetail
  status: 200
}

export type getApiV1AdminGroupBuyRequestsRequestIdResponseSuccess = (getApiV1AdminGroupBuyRequestsRequestIdResponse200) & {
  headers: Headers;
};
;

export type getApiV1AdminGroupBuyRequestsRequestIdResponse = (getApiV1AdminGroupBuyRequestsRequestIdResponseSuccess)

export const getGetApiV1AdminGroupBuyRequestsRequestIdUrl = (requestId: number,) => {




  return `/api/v1/admin/group-buy-requests/${requestId}`
}

export const getApiV1AdminGroupBuyRequestsRequestId = async (requestId: number, options?: RequestInit): Promise<getApiV1AdminGroupBuyRequestsRequestIdResponse> => {

  return customFetch<getApiV1AdminGroupBuyRequestsRequestIdResponse>(getGetApiV1AdminGroupBuyRequestsRequestIdUrl(requestId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminGroupBuyRequestsRequestIdQueryKey = (requestId: number,) => {
    return [
    `/api/v1/admin/group-buy-requests/${requestId}`
    ] as const;
    }


export const getGetApiV1AdminGroupBuyRequestsRequestIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError = unknown>(requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminGroupBuyRequestsRequestIdQueryKey(requestId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>> = ({ signal }) => getApiV1AdminGroupBuyRequestsRequestId(requestId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(requestId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminGroupBuyRequestsRequestIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>>
export type GetApiV1AdminGroupBuyRequestsRequestIdQueryError = unknown


export function useGetApiV1AdminGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError = unknown>(
 requestId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError = unknown>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError = unknown>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 공구 요청 상세 조회 (운영자)
 */

export function useGetApiV1AdminGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError = unknown>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminGroupBuyRequestsRequestIdQueryOptions(requestId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 요청 상태 변경
 */
export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse200 = {
  data: ApiResponseGroupBuyRequestDetail
  status: 200
}

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseSuccess = (patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse200) & {
  headers: Headers;
};
export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseError = (patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse400) & {
  headers: Headers;
};

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse = (patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseSuccess | patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseError)

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusUrl = (requestId: number,) => {




  return `/api/v1/admin/group-buy-requests/${requestId}/status`
}

export const patchApiV1AdminGroupBuyRequestsRequestIdStatus = async (requestId: number,
    adminRequestStatusUpdate: AdminRequestStatusUpdate, options?: RequestInit): Promise<patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse> => {

  return customFetch<patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse>(getPatchApiV1AdminGroupBuyRequestsRequestIdStatusUrl(requestId),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminRequestStatusUpdate,)
  }
);}




export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMutationOptions = <TError = BadRequestResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>, TError,{requestId: number;data: AdminRequestStatusUpdate}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>, TError,{requestId: number;data: AdminRequestStatusUpdate}, TContext> => {

const mutationKey = ['patchApiV1AdminGroupBuyRequestsRequestIdStatus'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>, {requestId: number;data: AdminRequestStatusUpdate}> = (props) => {
          const {requestId,data} = props ?? {};

          return  patchApiV1AdminGroupBuyRequestsRequestIdStatus(requestId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PatchApiV1AdminGroupBuyRequestsRequestIdStatusMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>>
    export type PatchApiV1AdminGroupBuyRequestsRequestIdStatusMutationBody = AdminRequestStatusUpdate
    export type PatchApiV1AdminGroupBuyRequestsRequestIdStatusMutationError = BadRequestResponse

    /**
 * @summary 공구 요청 상태 변경
 */
export const usePatchApiV1AdminGroupBuyRequestsRequestIdStatus = <TError = BadRequestResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>, TError,{requestId: number;data: AdminRequestStatusUpdate}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiV1AdminGroupBuyRequestsRequestIdStatus>>,
        TError,
        {requestId: number;data: AdminRequestStatusUpdate},
        TContext
      > => {
      return useMutation(getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMutationOptions(options), queryClient);
    }
    /**
 * @summary 진행 중인 공구 현황 목록 (운영자)
 */
export type getApiV1AdminGroupBuysResponse200 = {
  data: ApiResponseAdminGroupBuyList
  status: 200
}

export type getApiV1AdminGroupBuysResponseSuccess = (getApiV1AdminGroupBuysResponse200) & {
  headers: Headers;
};
;

export type getApiV1AdminGroupBuysResponse = (getApiV1AdminGroupBuysResponseSuccess)

export const getGetApiV1AdminGroupBuysUrl = (params?: GetApiV1AdminGroupBuysParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/group-buys?${stringifiedParams}` : `/api/v1/admin/group-buys`
}

export const getApiV1AdminGroupBuys = async (params?: GetApiV1AdminGroupBuysParams, options?: RequestInit): Promise<getApiV1AdminGroupBuysResponse> => {

  return customFetch<getApiV1AdminGroupBuysResponse>(getGetApiV1AdminGroupBuysUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminGroupBuysQueryKey = (params?: GetApiV1AdminGroupBuysParams,) => {
    return [
    `/api/v1/admin/group-buys`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminGroupBuysQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError = unknown>(params?: GetApiV1AdminGroupBuysParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminGroupBuysQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>> = ({ signal }) => getApiV1AdminGroupBuys(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminGroupBuysQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>>
export type GetApiV1AdminGroupBuysQueryError = unknown


export function useGetApiV1AdminGroupBuys<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError = unknown>(
 params: undefined |  GetApiV1AdminGroupBuysParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuys<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError = unknown>(
 params?: GetApiV1AdminGroupBuysParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuys<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError = unknown>(
 params?: GetApiV1AdminGroupBuysParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 진행 중인 공구 현황 목록 (운영자)
 */

export function useGetApiV1AdminGroupBuys<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError = unknown>(
 params?: GetApiV1AdminGroupBuysParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuys>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminGroupBuysQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 개설 (운영자)
 */
export type postApiV1AdminGroupBuysResponse201 = {
  data: ApiResponseGroupBuyId
  status: 201
}

export type postApiV1AdminGroupBuysResponseSuccess = (postApiV1AdminGroupBuysResponse201) & {
  headers: Headers;
};
;

export type postApiV1AdminGroupBuysResponse = (postApiV1AdminGroupBuysResponseSuccess)

export const getPostApiV1AdminGroupBuysUrl = () => {




  return `/api/v1/admin/group-buys`
}

export const postApiV1AdminGroupBuys = async (adminGroupBuyCreate: AdminGroupBuyCreate, options?: RequestInit): Promise<postApiV1AdminGroupBuysResponse> => {

  return customFetch<postApiV1AdminGroupBuysResponse>(getPostApiV1AdminGroupBuysUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminGroupBuyCreate,)
  }
);}




export const getPostApiV1AdminGroupBuysMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>, TError,{data: AdminGroupBuyCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>, TError,{data: AdminGroupBuyCreate}, TContext> => {

const mutationKey = ['postApiV1AdminGroupBuys'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>, {data: AdminGroupBuyCreate}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1AdminGroupBuys(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminGroupBuysMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>>
    export type PostApiV1AdminGroupBuysMutationBody = AdminGroupBuyCreate
    export type PostApiV1AdminGroupBuysMutationError = unknown

    /**
 * @summary 공구 개설 (운영자)
 */
export const usePostApiV1AdminGroupBuys = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>, TError,{data: AdminGroupBuyCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminGroupBuys>>,
        TError,
        {data: AdminGroupBuyCreate},
        TContext
      > => {
      return useMutation(getPostApiV1AdminGroupBuysMutationOptions(options), queryClient);
    }
    /**
 * @summary 공구 상세 조회 (운영자)
 */
export type getApiV1AdminGroupBuysGroupBuyIdResponse200 = {
  data: ApiResponseAdminGroupBuyDetail
  status: 200
}

export type getApiV1AdminGroupBuysGroupBuyIdResponseSuccess = (getApiV1AdminGroupBuysGroupBuyIdResponse200) & {
  headers: Headers;
};
;

export type getApiV1AdminGroupBuysGroupBuyIdResponse = (getApiV1AdminGroupBuysGroupBuyIdResponseSuccess)

export const getGetApiV1AdminGroupBuysGroupBuyIdUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/group-buys/${groupBuyId}`
}

export const getApiV1AdminGroupBuysGroupBuyId = async (groupBuyId: number, options?: RequestInit): Promise<getApiV1AdminGroupBuysGroupBuyIdResponse> => {

  return customFetch<getApiV1AdminGroupBuysGroupBuyIdResponse>(getGetApiV1AdminGroupBuysGroupBuyIdUrl(groupBuyId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminGroupBuysGroupBuyIdQueryKey = (groupBuyId: number,) => {
    return [
    `/api/v1/admin/group-buys/${groupBuyId}`
    ] as const;
    }


export const getGetApiV1AdminGroupBuysGroupBuyIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError = unknown>(groupBuyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminGroupBuysGroupBuyIdQueryKey(groupBuyId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>> = ({ signal }) => getApiV1AdminGroupBuysGroupBuyId(groupBuyId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(groupBuyId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminGroupBuysGroupBuyIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>>
export type GetApiV1AdminGroupBuysGroupBuyIdQueryError = unknown


export function useGetApiV1AdminGroupBuysGroupBuyId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError = unknown>(
 groupBuyId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuysGroupBuyId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError = unknown>(
 groupBuyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminGroupBuysGroupBuyId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError = unknown>(
 groupBuyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 공구 상세 조회 (운영자)
 */

export function useGetApiV1AdminGroupBuysGroupBuyId<TData = Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError = unknown>(
 groupBuyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminGroupBuysGroupBuyId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminGroupBuysGroupBuyIdQueryOptions(groupBuyId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 공구 정보 수정 (운영자)
 */
export type patchApiV1AdminGroupBuysGroupBuyIdResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type patchApiV1AdminGroupBuysGroupBuyIdResponseSuccess = (patchApiV1AdminGroupBuysGroupBuyIdResponse200) & {
  headers: Headers;
};
;

export type patchApiV1AdminGroupBuysGroupBuyIdResponse = (patchApiV1AdminGroupBuysGroupBuyIdResponseSuccess)

export const getPatchApiV1AdminGroupBuysGroupBuyIdUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/group-buys/${groupBuyId}`
}

export const patchApiV1AdminGroupBuysGroupBuyId = async (groupBuyId: number,
    adminGroupBuyUpdate: AdminGroupBuyUpdate, options?: RequestInit): Promise<patchApiV1AdminGroupBuysGroupBuyIdResponse> => {

  return customFetch<patchApiV1AdminGroupBuysGroupBuyIdResponse>(getPatchApiV1AdminGroupBuysGroupBuyIdUrl(groupBuyId),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminGroupBuyUpdate,)
  }
);}




export const getPatchApiV1AdminGroupBuysGroupBuyIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>, TError,{groupBuyId: number;data: AdminGroupBuyUpdate}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>, TError,{groupBuyId: number;data: AdminGroupBuyUpdate}, TContext> => {

const mutationKey = ['patchApiV1AdminGroupBuysGroupBuyId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>, {groupBuyId: number;data: AdminGroupBuyUpdate}> = (props) => {
          const {groupBuyId,data} = props ?? {};

          return  patchApiV1AdminGroupBuysGroupBuyId(groupBuyId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PatchApiV1AdminGroupBuysGroupBuyIdMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>>
    export type PatchApiV1AdminGroupBuysGroupBuyIdMutationBody = AdminGroupBuyUpdate
    export type PatchApiV1AdminGroupBuysGroupBuyIdMutationError = unknown

    /**
 * @summary 공구 정보 수정 (운영자)
 */
export const usePatchApiV1AdminGroupBuysGroupBuyId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>, TError,{groupBuyId: number;data: AdminGroupBuyUpdate}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiV1AdminGroupBuysGroupBuyId>>,
        TError,
        {groupBuyId: number;data: AdminGroupBuyUpdate},
        TContext
      > => {
      return useMutation(getPatchApiV1AdminGroupBuysGroupBuyIdMutationOptions(options), queryClient);
    }
    /**
 * ACHIEVED 상태 공구에 대해 발주를 확정한다.
 * @summary 발주 확정 처리
 */
export type postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseSuccess = (postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse200) & {
  headers: Headers;
};
export type postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseError = (postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse409) & {
  headers: Headers;
};

export type postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse = (postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseSuccess | postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseError)

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/group-buys/${groupBuyId}/order-confirm`
}

export const postApiV1AdminGroupBuysGroupBuyIdOrderConfirm = async (groupBuyId: number, options?: RequestInit): Promise<postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse> => {

  return customFetch<postApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse>(getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmUrl(groupBuyId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMutationOptions = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>, TError,{groupBuyId: number}, TContext> => {

const mutationKey = ['postApiV1AdminGroupBuysGroupBuyIdOrderConfirm'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>, {groupBuyId: number}> = (props) => {
          const {groupBuyId} = props ?? {};

          return  postApiV1AdminGroupBuysGroupBuyIdOrderConfirm(groupBuyId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>>

    export type PostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMutationError = ConflictResponse

    /**
 * @summary 발주 확정 처리
 */
export const usePostApiV1AdminGroupBuysGroupBuyIdOrderConfirm = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderConfirm>>,
        TError,
        {groupBuyId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMutationOptions(options), queryClient);
    }
    /**
 * @summary 발주서 발송
 */
export type postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponseSuccess = (postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse200) & {
  headers: Headers;
};
;

export type postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse = (postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponseSuccess)

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/group-buys/${groupBuyId}/order-sheet`
}

export const postApiV1AdminGroupBuysGroupBuyIdOrderSheet = async (groupBuyId: number, options?: RequestInit): Promise<postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse> => {

  return customFetch<postApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse>(getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetUrl(groupBuyId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>, TError,{groupBuyId: number}, TContext> => {

const mutationKey = ['postApiV1AdminGroupBuysGroupBuyIdOrderSheet'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>, {groupBuyId: number}> = (props) => {
          const {groupBuyId} = props ?? {};

          return  postApiV1AdminGroupBuysGroupBuyIdOrderSheet(groupBuyId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminGroupBuysGroupBuyIdOrderSheetMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>>

    export type PostApiV1AdminGroupBuysGroupBuyIdOrderSheetMutationError = unknown

    /**
 * @summary 발주서 발송
 */
export const usePostApiV1AdminGroupBuysGroupBuyIdOrderSheet = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminGroupBuysGroupBuyIdOrderSheet>>,
        TError,
        {groupBuyId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetMutationOptions(options), queryClient);
    }
    /**
 * @summary 환불 처리 현황 목록 (운영자)
 */
export type getApiV1AdminRefundsResponse200 = {
  data: ApiResponseAdminRefundPage
  status: 200
}

export type getApiV1AdminRefundsResponseSuccess = (getApiV1AdminRefundsResponse200) & {
  headers: Headers;
};
;

export type getApiV1AdminRefundsResponse = (getApiV1AdminRefundsResponseSuccess)

export const getGetApiV1AdminRefundsUrl = (params?: GetApiV1AdminRefundsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/refunds?${stringifiedParams}` : `/api/v1/admin/refunds`
}

export const getApiV1AdminRefunds = async (params?: GetApiV1AdminRefundsParams, options?: RequestInit): Promise<getApiV1AdminRefundsResponse> => {

  return customFetch<getApiV1AdminRefundsResponse>(getGetApiV1AdminRefundsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminRefundsQueryKey = (params?: GetApiV1AdminRefundsParams,) => {
    return [
    `/api/v1/admin/refunds`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminRefundsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError = unknown>(params?: GetApiV1AdminRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminRefundsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminRefunds>>> = ({ signal }) => getApiV1AdminRefunds(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminRefundsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminRefunds>>>
export type GetApiV1AdminRefundsQueryError = unknown


export function useGetApiV1AdminRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError = unknown>(
 params: undefined |  GetApiV1AdminRefundsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminRefunds>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError = unknown>(
 params?: GetApiV1AdminRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminRefunds>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError = unknown>(
 params?: GetApiV1AdminRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 환불 처리 현황 목록 (운영자)
 */

export function useGetApiV1AdminRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError = unknown>(
 params?: GetApiV1AdminRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminRefundsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 수동 환불 처리
 */
export type postApiV1AdminRefundsParticipationIdManualResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1AdminRefundsParticipationIdManualResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminRefundsParticipationIdManualResponseSuccess = (postApiV1AdminRefundsParticipationIdManualResponse200) & {
  headers: Headers;
};
export type postApiV1AdminRefundsParticipationIdManualResponseError = (postApiV1AdminRefundsParticipationIdManualResponse409) & {
  headers: Headers;
};

export type postApiV1AdminRefundsParticipationIdManualResponse = (postApiV1AdminRefundsParticipationIdManualResponseSuccess | postApiV1AdminRefundsParticipationIdManualResponseError)

export const getPostApiV1AdminRefundsParticipationIdManualUrl = (participationId: number,) => {




  return `/api/v1/admin/refunds/${participationId}/manual`
}

export const postApiV1AdminRefundsParticipationIdManual = async (participationId: number,
    adminManualRefund: AdminManualRefund, options?: RequestInit): Promise<postApiV1AdminRefundsParticipationIdManualResponse> => {

  return customFetch<postApiV1AdminRefundsParticipationIdManualResponse>(getPostApiV1AdminRefundsParticipationIdManualUrl(participationId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminManualRefund,)
  }
);}




export const getPostApiV1AdminRefundsParticipationIdManualMutationOptions = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>, TError,{participationId: number;data: AdminManualRefund}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>, TError,{participationId: number;data: AdminManualRefund}, TContext> => {

const mutationKey = ['postApiV1AdminRefundsParticipationIdManual'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>, {participationId: number;data: AdminManualRefund}> = (props) => {
          const {participationId,data} = props ?? {};

          return  postApiV1AdminRefundsParticipationIdManual(participationId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminRefundsParticipationIdManualMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>>
    export type PostApiV1AdminRefundsParticipationIdManualMutationBody = AdminManualRefund
    export type PostApiV1AdminRefundsParticipationIdManualMutationError = ConflictResponse

    /**
 * @summary 수동 환불 처리
 */
export const usePostApiV1AdminRefundsParticipationIdManual = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>, TError,{participationId: number;data: AdminManualRefund}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminRefundsParticipationIdManual>>,
        TError,
        {participationId: number;data: AdminManualRefund},
        TContext
      > => {
      return useMutation(getPostApiV1AdminRefundsParticipationIdManualMutationOptions(options), queryClient);
    }
    /**
 * @summary 정산 내역 목록 (운영자)
 */
export type getApiV1AdminSettlementsResponse200 = {
  data: ApiResponseSettlementPage
  status: 200
}

export type getApiV1AdminSettlementsResponseSuccess = (getApiV1AdminSettlementsResponse200) & {
  headers: Headers;
};
;

export type getApiV1AdminSettlementsResponse = (getApiV1AdminSettlementsResponseSuccess)

export const getGetApiV1AdminSettlementsUrl = (params?: GetApiV1AdminSettlementsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/settlements?${stringifiedParams}` : `/api/v1/admin/settlements`
}

export const getApiV1AdminSettlements = async (params?: GetApiV1AdminSettlementsParams, options?: RequestInit): Promise<getApiV1AdminSettlementsResponse> => {

  return customFetch<getApiV1AdminSettlementsResponse>(getGetApiV1AdminSettlementsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminSettlementsQueryKey = (params?: GetApiV1AdminSettlementsParams,) => {
    return [
    `/api/v1/admin/settlements`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminSettlementsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = unknown>(params?: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminSettlementsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminSettlements>>> = ({ signal }) => getApiV1AdminSettlements(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminSettlementsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminSettlements>>>
export type GetApiV1AdminSettlementsQueryError = unknown


export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = unknown>(
 params: undefined |  GetApiV1AdminSettlementsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = unknown>(
 params?: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = unknown>(
 params?: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 정산 내역 목록 (운영자)
 */

export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = unknown>(
 params?: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminSettlementsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 정산 생성 및 처리
 */
export type postApiV1AdminSettlementsResponse201 = {
  data: ApiResponseSettlementId
  status: 201
}

export type postApiV1AdminSettlementsResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminSettlementsResponseSuccess = (postApiV1AdminSettlementsResponse201) & {
  headers: Headers;
};
export type postApiV1AdminSettlementsResponseError = (postApiV1AdminSettlementsResponse409) & {
  headers: Headers;
};

export type postApiV1AdminSettlementsResponse = (postApiV1AdminSettlementsResponseSuccess | postApiV1AdminSettlementsResponseError)

export const getPostApiV1AdminSettlementsUrl = () => {




  return `/api/v1/admin/settlements`
}

export const postApiV1AdminSettlements = async (adminSettlementCreate: AdminSettlementCreate, options?: RequestInit): Promise<postApiV1AdminSettlementsResponse> => {

  return customFetch<postApiV1AdminSettlementsResponse>(getPostApiV1AdminSettlementsUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminSettlementCreate,)
  }
);}




export const getPostApiV1AdminSettlementsMutationOptions = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlements>>, TError,{data: AdminSettlementCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlements>>, TError,{data: AdminSettlementCreate}, TContext> => {

const mutationKey = ['postApiV1AdminSettlements'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminSettlements>>, {data: AdminSettlementCreate}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1AdminSettlements(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminSettlementsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminSettlements>>>
    export type PostApiV1AdminSettlementsMutationBody = AdminSettlementCreate
    export type PostApiV1AdminSettlementsMutationError = ConflictResponse

    /**
 * @summary 정산 생성 및 처리
 */
export const usePostApiV1AdminSettlements = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlements>>, TError,{data: AdminSettlementCreate}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminSettlements>>,
        TError,
        {data: AdminSettlementCreate},
        TContext
      > => {
      return useMutation(getPostApiV1AdminSettlementsMutationOptions(options), queryClient);
    }
    /**
 * @summary 에스크로 해제
 */
export type postApiV1AdminSettlementsSettlementIdReleaseResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1AdminSettlementsSettlementIdReleaseResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminSettlementsSettlementIdReleaseResponseSuccess = (postApiV1AdminSettlementsSettlementIdReleaseResponse200) & {
  headers: Headers;
};
export type postApiV1AdminSettlementsSettlementIdReleaseResponseError = (postApiV1AdminSettlementsSettlementIdReleaseResponse409) & {
  headers: Headers;
};

export type postApiV1AdminSettlementsSettlementIdReleaseResponse = (postApiV1AdminSettlementsSettlementIdReleaseResponseSuccess | postApiV1AdminSettlementsSettlementIdReleaseResponseError)

export const getPostApiV1AdminSettlementsSettlementIdReleaseUrl = (settlementId: number,) => {




  return `/api/v1/admin/settlements/${settlementId}/release`
}

export const postApiV1AdminSettlementsSettlementIdRelease = async (settlementId: number, options?: RequestInit): Promise<postApiV1AdminSettlementsSettlementIdReleaseResponse> => {

  return customFetch<postApiV1AdminSettlementsSettlementIdReleaseResponse>(getPostApiV1AdminSettlementsSettlementIdReleaseUrl(settlementId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminSettlementsSettlementIdReleaseMutationOptions = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>, TError,{settlementId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>, TError,{settlementId: number}, TContext> => {

const mutationKey = ['postApiV1AdminSettlementsSettlementIdRelease'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>, {settlementId: number}> = (props) => {
          const {settlementId} = props ?? {};

          return  postApiV1AdminSettlementsSettlementIdRelease(settlementId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminSettlementsSettlementIdReleaseMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>>

    export type PostApiV1AdminSettlementsSettlementIdReleaseMutationError = ConflictResponse

    /**
 * @summary 에스크로 해제
 */
export const usePostApiV1AdminSettlementsSettlementIdRelease = <TError = ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>, TError,{settlementId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminSettlementsSettlementIdRelease>>,
        TError,
        {settlementId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminSettlementsSettlementIdReleaseMutationOptions(options), queryClient);
    }
