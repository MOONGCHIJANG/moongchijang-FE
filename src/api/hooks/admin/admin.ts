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
  AdminCsTicketUpdateRequest,
  AdminGroupBuyRequestApprove,
  AdminGroupBuyRequestReject,
  AdminManualRefund,
  AdminOwnerGroupBuyCloseRequestReject,
  AdminOwnerGroupBuyRequestReject,
  AdminRequestStatusUpdate,
  ApiResponseAdminCsTicketDetail,
  ApiResponseAdminCsTicketPage,
  ApiResponseAdminDashboardSummary,
  ApiResponseAdminDashboardUnconfirmedOrders,
  ApiResponseAdminDashboardUrgentRefunds,
  ApiResponseAdminGroupBuyRequestAction,
  ApiResponseAdminOrderDetail,
  ApiResponseAdminOrderPage,
  ApiResponseAdminOwnerGroupBuyCloseRequestAction,
  ApiResponseAdminOwnerGroupBuyRequestAction,
  ApiResponseAdminOwnerGroupBuyRequestDetail,
  ApiResponseAdminOwnerGroupBuyRequestPage,
  ApiResponseAdminRefundPage,
  ApiResponseAdminRequestDetail,
  ApiResponseAdminRequestPage,
  ApiResponseAdminSettlementDashboard,
  ApiResponseAdminSettlementDetail,
  ApiResponseAdminSettlementPage,
  ApiResponseGroupBuyRequestDetail,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1AdminCsTicketsParams,
  GetApiV1AdminDashboardUnconfirmedOrdersParams,
  GetApiV1AdminDashboardUrgentRefundsParams,
  GetApiV1AdminGroupBuyRequestsParams,
  GetApiV1AdminOrdersParams,
  GetApiV1AdminOwnerGroupBuyRequestsParams,
  GetApiV1AdminRefundsParams,
  GetApiV1AdminSettlementsDashboardParams,
  GetApiV1AdminSettlementsParams,
  NotFoundResponse,
  SuccessNoDataResponse,
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * 운영 관리 요약 영역에 노출되는 환불 금액, 개설승인 대기, 발주 미확정, 오늘 처리 완료 요약을 반환한다.
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
 * 달성됐지만 발주 확정 전인 공구와 48시간 초과 여부를 조회한다.
 * @summary 대시보드 발주 미확정 모니터링 (운영자)
 */
export type getApiV1AdminDashboardUnconfirmedOrdersResponse200 = {
  data: ApiResponseAdminDashboardUnconfirmedOrders
  status: 200
}

export type getApiV1AdminDashboardUnconfirmedOrdersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminDashboardUnconfirmedOrdersResponseSuccess = (getApiV1AdminDashboardUnconfirmedOrdersResponse200) & {
  headers: Headers;
};
export type getApiV1AdminDashboardUnconfirmedOrdersResponseError = (getApiV1AdminDashboardUnconfirmedOrdersResponse403) & {
  headers: Headers;
};

export type getApiV1AdminDashboardUnconfirmedOrdersResponse = (getApiV1AdminDashboardUnconfirmedOrdersResponseSuccess | getApiV1AdminDashboardUnconfirmedOrdersResponseError)

export const getGetApiV1AdminDashboardUnconfirmedOrdersUrl = (params?: GetApiV1AdminDashboardUnconfirmedOrdersParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/dashboard/unconfirmed-orders?${stringifiedParams}` : `/api/v1/admin/dashboard/unconfirmed-orders`
}

export const getApiV1AdminDashboardUnconfirmedOrders = async (params?: GetApiV1AdminDashboardUnconfirmedOrdersParams, options?: RequestInit): Promise<getApiV1AdminDashboardUnconfirmedOrdersResponse> => {

  return customFetch<getApiV1AdminDashboardUnconfirmedOrdersResponse>(getGetApiV1AdminDashboardUnconfirmedOrdersUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminDashboardUnconfirmedOrdersQueryKey = (params?: GetApiV1AdminDashboardUnconfirmedOrdersParams,) => {
    return [
    `/api/v1/admin/dashboard/unconfirmed-orders`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminDashboardUnconfirmedOrdersQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError = ForbiddenResponse>(params?: GetApiV1AdminDashboardUnconfirmedOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminDashboardUnconfirmedOrdersQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>> = ({ signal }) => getApiV1AdminDashboardUnconfirmedOrders(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminDashboardUnconfirmedOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>>
export type GetApiV1AdminDashboardUnconfirmedOrdersQueryError = ForbiddenResponse


export function useGetApiV1AdminDashboardUnconfirmedOrders<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminDashboardUnconfirmedOrdersParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminDashboardUnconfirmedOrders<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUnconfirmedOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminDashboardUnconfirmedOrders<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUnconfirmedOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 대시보드 발주 미확정 모니터링 (운영자)
 */

export function useGetApiV1AdminDashboardUnconfirmedOrders<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUnconfirmedOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUnconfirmedOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminDashboardUnconfirmedOrdersQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 요청 후 1시간을 초과한 REFUND_PENDING 환불 요청을 조회한다.
 * @summary 대시보드 긴급 환불 요청 조회 (운영자)
 */
export type getApiV1AdminDashboardUrgentRefundsResponse200 = {
  data: ApiResponseAdminDashboardUrgentRefunds
  status: 200
}

export type getApiV1AdminDashboardUrgentRefundsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminDashboardUrgentRefundsResponseSuccess = (getApiV1AdminDashboardUrgentRefundsResponse200) & {
  headers: Headers;
};
export type getApiV1AdminDashboardUrgentRefundsResponseError = (getApiV1AdminDashboardUrgentRefundsResponse403) & {
  headers: Headers;
};

export type getApiV1AdminDashboardUrgentRefundsResponse = (getApiV1AdminDashboardUrgentRefundsResponseSuccess | getApiV1AdminDashboardUrgentRefundsResponseError)

export const getGetApiV1AdminDashboardUrgentRefundsUrl = (params?: GetApiV1AdminDashboardUrgentRefundsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/dashboard/urgent-refunds?${stringifiedParams}` : `/api/v1/admin/dashboard/urgent-refunds`
}

export const getApiV1AdminDashboardUrgentRefunds = async (params?: GetApiV1AdminDashboardUrgentRefundsParams, options?: RequestInit): Promise<getApiV1AdminDashboardUrgentRefundsResponse> => {

  return customFetch<getApiV1AdminDashboardUrgentRefundsResponse>(getGetApiV1AdminDashboardUrgentRefundsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminDashboardUrgentRefundsQueryKey = (params?: GetApiV1AdminDashboardUrgentRefundsParams,) => {
    return [
    `/api/v1/admin/dashboard/urgent-refunds`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminDashboardUrgentRefundsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError = ForbiddenResponse>(params?: GetApiV1AdminDashboardUrgentRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminDashboardUrgentRefundsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>> = ({ signal }) => getApiV1AdminDashboardUrgentRefunds(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminDashboardUrgentRefundsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>>
export type GetApiV1AdminDashboardUrgentRefundsQueryError = ForbiddenResponse


export function useGetApiV1AdminDashboardUrgentRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminDashboardUrgentRefundsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminDashboardUrgentRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUrgentRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminDashboardUrgentRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUrgentRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 대시보드 긴급 환불 요청 조회 (운영자)
 */

export function useGetApiV1AdminDashboardUrgentRefunds<TData = Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminDashboardUrgentRefundsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminDashboardUrgentRefunds>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminDashboardUrgentRefundsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 달성된 공구의 발주 확정 대기, 48시간 초과, 확정 완료, 전체 목록을 조회한다.
 * @summary 발주 관리 목록 조회 (운영자)
 */
export type getApiV1AdminOrdersResponse200 = {
  data: ApiResponseAdminOrderPage
  status: 200
}

export type getApiV1AdminOrdersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminOrdersResponseSuccess = (getApiV1AdminOrdersResponse200) & {
  headers: Headers;
};
export type getApiV1AdminOrdersResponseError = (getApiV1AdminOrdersResponse403) & {
  headers: Headers;
};

export type getApiV1AdminOrdersResponse = (getApiV1AdminOrdersResponseSuccess | getApiV1AdminOrdersResponseError)

export const getGetApiV1AdminOrdersUrl = (params?: GetApiV1AdminOrdersParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/orders?${stringifiedParams}` : `/api/v1/admin/orders`
}

export const getApiV1AdminOrders = async (params?: GetApiV1AdminOrdersParams, options?: RequestInit): Promise<getApiV1AdminOrdersResponse> => {

  return customFetch<getApiV1AdminOrdersResponse>(getGetApiV1AdminOrdersUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminOrdersQueryKey = (params?: GetApiV1AdminOrdersParams,) => {
    return [
    `/api/v1/admin/orders`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminOrdersQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError = ForbiddenResponse>(params?: GetApiV1AdminOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminOrdersQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminOrders>>> = ({ signal }) => getApiV1AdminOrders(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminOrders>>>
export type GetApiV1AdminOrdersQueryError = ForbiddenResponse


export function useGetApiV1AdminOrders<TData = Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminOrdersParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOrders>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOrders<TData = Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOrders>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOrders<TData = Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 발주 관리 목록 조회 (운영자)
 */

export function useGetApiV1AdminOrders<TData = Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrders>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminOrdersQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 발주 관리 목록에서 선택한 달성 공구의 상세 정보와 처리 상태를 조회한다.
 * @summary 발주 관리 상세 조회 (운영자)
 */
export type getApiV1AdminOrdersOrderIdResponse200 = {
  data: ApiResponseAdminOrderDetail
  status: 200
}

export type getApiV1AdminOrdersOrderIdResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminOrdersOrderIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1AdminOrdersOrderIdResponse409 = {
  data: ConflictResponse
  status: 409
}

export type getApiV1AdminOrdersOrderIdResponseSuccess = (getApiV1AdminOrdersOrderIdResponse200) & {
  headers: Headers;
};
export type getApiV1AdminOrdersOrderIdResponseError = (getApiV1AdminOrdersOrderIdResponse403 | getApiV1AdminOrdersOrderIdResponse404 | getApiV1AdminOrdersOrderIdResponse409) & {
  headers: Headers;
};

export type getApiV1AdminOrdersOrderIdResponse = (getApiV1AdminOrdersOrderIdResponseSuccess | getApiV1AdminOrdersOrderIdResponseError)

export const getGetApiV1AdminOrdersOrderIdUrl = (orderId: number,) => {




  return `/api/v1/admin/orders/${orderId}`
}

export const getApiV1AdminOrdersOrderId = async (orderId: number, options?: RequestInit): Promise<getApiV1AdminOrdersOrderIdResponse> => {

  return customFetch<getApiV1AdminOrdersOrderIdResponse>(getGetApiV1AdminOrdersOrderIdUrl(orderId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminOrdersOrderIdQueryKey = (orderId: number,) => {
    return [
    `/api/v1/admin/orders/${orderId}`
    ] as const;
    }


export const getGetApiV1AdminOrdersOrderIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError = ForbiddenResponse | NotFoundResponse | ConflictResponse>(orderId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminOrdersOrderIdQueryKey(orderId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>> = ({ signal }) => getApiV1AdminOrdersOrderId(orderId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(orderId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminOrdersOrderIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>>
export type GetApiV1AdminOrdersOrderIdQueryError = ForbiddenResponse | NotFoundResponse | ConflictResponse


export function useGetApiV1AdminOrdersOrderId<TData = Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError = ForbiddenResponse | NotFoundResponse | ConflictResponse>(
 orderId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOrdersOrderId<TData = Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError = ForbiddenResponse | NotFoundResponse | ConflictResponse>(
 orderId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOrdersOrderId<TData = Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError = ForbiddenResponse | NotFoundResponse | ConflictResponse>(
 orderId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 발주 관리 상세 조회 (운영자)
 */

export function useGetApiV1AdminOrdersOrderId<TData = Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError = ForbiddenResponse | NotFoundResponse | ConflictResponse>(
 orderId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOrdersOrderId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminOrdersOrderIdQueryOptions(orderId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 확정 대기 발주 건에 사장님 연락 완료 시각을 기록한다.
 * @summary 발주 사장님 연락 완료 기록 (운영자)
 */
export type postApiV1AdminOrdersOrderIdOwnerContactResponse200 = {
  data: ApiResponseAdminOrderDetail
  status: 200
}

export type postApiV1AdminOrdersOrderIdOwnerContactResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AdminOrdersOrderIdOwnerContactResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOrdersOrderIdOwnerContactResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminOrdersOrderIdOwnerContactResponseSuccess = (postApiV1AdminOrdersOrderIdOwnerContactResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOrdersOrderIdOwnerContactResponseError = (postApiV1AdminOrdersOrderIdOwnerContactResponse403 | postApiV1AdminOrdersOrderIdOwnerContactResponse404 | postApiV1AdminOrdersOrderIdOwnerContactResponse409) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponse = (postApiV1AdminOrdersOrderIdOwnerContactResponseSuccess | postApiV1AdminOrdersOrderIdOwnerContactResponseError)

export const getPostApiV1AdminOrdersOrderIdOwnerContactUrl = (orderId: number,) => {




  return `/api/v1/admin/orders/${orderId}/owner-contact`
}

export const postApiV1AdminOrdersOrderIdOwnerContact = async (orderId: number, options?: RequestInit): Promise<postApiV1AdminOrdersOrderIdOwnerContactResponse> => {

  return customFetch<postApiV1AdminOrdersOrderIdOwnerContactResponse>(getPostApiV1AdminOrdersOrderIdOwnerContactUrl(orderId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminOrdersOrderIdOwnerContactMutationOptions = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>, TError,{orderId: number}, TContext> => {

const mutationKey = ['postApiV1AdminOrdersOrderIdOwnerContact'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>, {orderId: number}> = (props) => {
          const {orderId} = props ?? {};

          return  postApiV1AdminOrdersOrderIdOwnerContact(orderId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOrdersOrderIdOwnerContactMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>>

    export type PostApiV1AdminOrdersOrderIdOwnerContactMutationError = ForbiddenResponse | NotFoundResponse | ConflictResponse

    /**
 * @summary 발주 사장님 연락 완료 기록 (운영자)
 */
export const usePostApiV1AdminOrdersOrderIdOwnerContact = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdOwnerContact>>,
        TError,
        {orderId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOrdersOrderIdOwnerContactMutationOptions(options), queryClient);
    }
    /**
 * 확정 대기 발주 건을 확정 완료 상태로 변경한다.
 * @summary 발주 확정 처리 (운영자)
 */
export type postApiV1AdminOrdersOrderIdConfirmResponse200 = {
  data: ApiResponseAdminOrderDetail
  status: 200
}

export type postApiV1AdminOrdersOrderIdConfirmResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AdminOrdersOrderIdConfirmResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOrdersOrderIdConfirmResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminOrdersOrderIdConfirmResponseSuccess = (postApiV1AdminOrdersOrderIdConfirmResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOrdersOrderIdConfirmResponseError = (postApiV1AdminOrdersOrderIdConfirmResponse403 | postApiV1AdminOrdersOrderIdConfirmResponse404 | postApiV1AdminOrdersOrderIdConfirmResponse409) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdConfirmResponse = (postApiV1AdminOrdersOrderIdConfirmResponseSuccess | postApiV1AdminOrdersOrderIdConfirmResponseError)

export const getPostApiV1AdminOrdersOrderIdConfirmUrl = (orderId: number,) => {




  return `/api/v1/admin/orders/${orderId}/confirm`
}

export const postApiV1AdminOrdersOrderIdConfirm = async (orderId: number, options?: RequestInit): Promise<postApiV1AdminOrdersOrderIdConfirmResponse> => {

  return customFetch<postApiV1AdminOrdersOrderIdConfirmResponse>(getPostApiV1AdminOrdersOrderIdConfirmUrl(orderId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminOrdersOrderIdConfirmMutationOptions = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>, TError,{orderId: number}, TContext> => {

const mutationKey = ['postApiV1AdminOrdersOrderIdConfirm'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>, {orderId: number}> = (props) => {
          const {orderId} = props ?? {};

          return  postApiV1AdminOrdersOrderIdConfirm(orderId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOrdersOrderIdConfirmMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>>

    export type PostApiV1AdminOrdersOrderIdConfirmMutationError = ForbiddenResponse | NotFoundResponse | ConflictResponse

    /**
 * @summary 발주 확정 처리 (운영자)
 */
export const usePostApiV1AdminOrdersOrderIdConfirm = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdConfirm>>,
        TError,
        {orderId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOrdersOrderIdConfirmMutationOptions(options), queryClient);
    }
    /**
 * 확정 대기 발주 건을 취소 상태로 변경한다.
 * @summary 발주 취소 처리 (운영자)
 */
export type postApiV1AdminOrdersOrderIdCancelResponse200 = {
  data: ApiResponseAdminOrderDetail
  status: 200
}

export type postApiV1AdminOrdersOrderIdCancelResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AdminOrdersOrderIdCancelResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOrdersOrderIdCancelResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1AdminOrdersOrderIdCancelResponseSuccess = (postApiV1AdminOrdersOrderIdCancelResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOrdersOrderIdCancelResponseError = (postApiV1AdminOrdersOrderIdCancelResponse403 | postApiV1AdminOrdersOrderIdCancelResponse404 | postApiV1AdminOrdersOrderIdCancelResponse409) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdCancelResponse = (postApiV1AdminOrdersOrderIdCancelResponseSuccess | postApiV1AdminOrdersOrderIdCancelResponseError)

export const getPostApiV1AdminOrdersOrderIdCancelUrl = (orderId: number,) => {




  return `/api/v1/admin/orders/${orderId}/cancel`
}

export const postApiV1AdminOrdersOrderIdCancel = async (orderId: number, options?: RequestInit): Promise<postApiV1AdminOrdersOrderIdCancelResponse> => {

  return customFetch<postApiV1AdminOrdersOrderIdCancelResponse>(getPostApiV1AdminOrdersOrderIdCancelUrl(orderId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminOrdersOrderIdCancelMutationOptions = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>, TError,{orderId: number}, TContext> => {

const mutationKey = ['postApiV1AdminOrdersOrderIdCancel'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>, {orderId: number}> = (props) => {
          const {orderId} = props ?? {};

          return  postApiV1AdminOrdersOrderIdCancel(orderId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOrdersOrderIdCancelMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>>

    export type PostApiV1AdminOrdersOrderIdCancelMutationError = ForbiddenResponse | NotFoundResponse | ConflictResponse

    /**
 * @summary 발주 취소 처리 (운영자)
 */
export const usePostApiV1AdminOrdersOrderIdCancel = <TError = ForbiddenResponse | NotFoundResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>, TError,{orderId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOrdersOrderIdCancel>>,
        TError,
        {orderId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOrdersOrderIdCancelMutationOptions(options), queryClient);
    }
    /**
 * 접수, 처리중, 완료, 전체 CS 티켓을 상태와 키워드로 조회한다.
 * @summary CS 티켓 목록 조회 (운영자)
 */
export type getApiV1AdminCsTicketsResponse200 = {
  data: ApiResponseAdminCsTicketPage
  status: 200
}

export type getApiV1AdminCsTicketsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminCsTicketsResponseSuccess = (getApiV1AdminCsTicketsResponse200) & {
  headers: Headers;
};
export type getApiV1AdminCsTicketsResponseError = (getApiV1AdminCsTicketsResponse403) & {
  headers: Headers;
};

export type getApiV1AdminCsTicketsResponse = (getApiV1AdminCsTicketsResponseSuccess | getApiV1AdminCsTicketsResponseError)

export const getGetApiV1AdminCsTicketsUrl = (params?: GetApiV1AdminCsTicketsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/cs-tickets?${stringifiedParams}` : `/api/v1/admin/cs-tickets`
}

export const getApiV1AdminCsTickets = async (params?: GetApiV1AdminCsTicketsParams, options?: RequestInit): Promise<getApiV1AdminCsTicketsResponse> => {

  return customFetch<getApiV1AdminCsTicketsResponse>(getGetApiV1AdminCsTicketsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminCsTicketsQueryKey = (params?: GetApiV1AdminCsTicketsParams,) => {
    return [
    `/api/v1/admin/cs-tickets`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminCsTicketsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError = ForbiddenResponse>(params?: GetApiV1AdminCsTicketsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminCsTicketsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>> = ({ signal }) => getApiV1AdminCsTickets(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminCsTicketsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>>
export type GetApiV1AdminCsTicketsQueryError = ForbiddenResponse


export function useGetApiV1AdminCsTickets<TData = Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminCsTicketsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminCsTickets>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminCsTickets>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminCsTickets<TData = Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminCsTicketsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminCsTickets>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminCsTickets>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminCsTickets<TData = Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminCsTicketsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary CS 티켓 목록 조회 (운영자)
 */

export function useGetApiV1AdminCsTickets<TData = Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminCsTicketsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTickets>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminCsTicketsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 선택한 CS 티켓의 문제 설명, 관련 사용자/공구/환불, 처리 정보를 조회한다.
 * @summary CS 티켓 상세 조회 (운영자)
 */
export type getApiV1AdminCsTicketsTicketIdResponse200 = {
  data: ApiResponseAdminCsTicketDetail
  status: 200
}

export type getApiV1AdminCsTicketsTicketIdResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminCsTicketsTicketIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1AdminCsTicketsTicketIdResponseSuccess = (getApiV1AdminCsTicketsTicketIdResponse200) & {
  headers: Headers;
};
export type getApiV1AdminCsTicketsTicketIdResponseError = (getApiV1AdminCsTicketsTicketIdResponse403 | getApiV1AdminCsTicketsTicketIdResponse404) & {
  headers: Headers;
};

export type getApiV1AdminCsTicketsTicketIdResponse = (getApiV1AdminCsTicketsTicketIdResponseSuccess | getApiV1AdminCsTicketsTicketIdResponseError)

export const getGetApiV1AdminCsTicketsTicketIdUrl = (ticketId: number,) => {




  return `/api/v1/admin/cs-tickets/${ticketId}`
}

export const getApiV1AdminCsTicketsTicketId = async (ticketId: number, options?: RequestInit): Promise<getApiV1AdminCsTicketsTicketIdResponse> => {

  return customFetch<getApiV1AdminCsTicketsTicketIdResponse>(getGetApiV1AdminCsTicketsTicketIdUrl(ticketId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminCsTicketsTicketIdQueryKey = (ticketId: number,) => {
    return [
    `/api/v1/admin/cs-tickets/${ticketId}`
    ] as const;
    }


export const getGetApiV1AdminCsTicketsTicketIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError = ForbiddenResponse | NotFoundResponse>(ticketId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminCsTicketsTicketIdQueryKey(ticketId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>> = ({ signal }) => getApiV1AdminCsTicketsTicketId(ticketId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(ticketId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminCsTicketsTicketIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>>
export type GetApiV1AdminCsTicketsTicketIdQueryError = ForbiddenResponse | NotFoundResponse


export function useGetApiV1AdminCsTicketsTicketId<TData = Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError = ForbiddenResponse | NotFoundResponse>(
 ticketId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminCsTicketsTicketId<TData = Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError = ForbiddenResponse | NotFoundResponse>(
 ticketId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminCsTicketsTicketId<TData = Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError = ForbiddenResponse | NotFoundResponse>(
 ticketId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary CS 티켓 상세 조회 (운영자)
 */

export function useGetApiV1AdminCsTicketsTicketId<TData = Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError = ForbiddenResponse | NotFoundResponse>(
 ticketId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminCsTicketsTicketId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminCsTicketsTicketIdQueryOptions(ticketId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * CS 티켓의 상태, 담당자, 처리 메모를 변경한다.
 * @summary CS 티켓 처리 정보 변경 (운영자)
 */
export type patchApiV1AdminCsTicketsTicketIdResponse200 = {
  data: ApiResponseAdminCsTicketDetail
  status: 200
}

export type patchApiV1AdminCsTicketsTicketIdResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type patchApiV1AdminCsTicketsTicketIdResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type patchApiV1AdminCsTicketsTicketIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type patchApiV1AdminCsTicketsTicketIdResponseSuccess = (patchApiV1AdminCsTicketsTicketIdResponse200) & {
  headers: Headers;
};
export type patchApiV1AdminCsTicketsTicketIdResponseError = (patchApiV1AdminCsTicketsTicketIdResponse400 | patchApiV1AdminCsTicketsTicketIdResponse403 | patchApiV1AdminCsTicketsTicketIdResponse404) & {
  headers: Headers;
};

export type patchApiV1AdminCsTicketsTicketIdResponse = (patchApiV1AdminCsTicketsTicketIdResponseSuccess | patchApiV1AdminCsTicketsTicketIdResponseError)

export const getPatchApiV1AdminCsTicketsTicketIdUrl = (ticketId: number,) => {




  return `/api/v1/admin/cs-tickets/${ticketId}`
}

export const patchApiV1AdminCsTicketsTicketId = async (ticketId: number,
    adminCsTicketUpdateRequest: AdminCsTicketUpdateRequest, options?: RequestInit): Promise<patchApiV1AdminCsTicketsTicketIdResponse> => {

  return customFetch<patchApiV1AdminCsTicketsTicketIdResponse>(getPatchApiV1AdminCsTicketsTicketIdUrl(ticketId),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminCsTicketUpdateRequest,)
  }
);}




export const getPatchApiV1AdminCsTicketsTicketIdMutationOptions = <TError = BadRequestResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>, TError,{ticketId: number;data: AdminCsTicketUpdateRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>, TError,{ticketId: number;data: AdminCsTicketUpdateRequest}, TContext> => {

const mutationKey = ['patchApiV1AdminCsTicketsTicketId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>, {ticketId: number;data: AdminCsTicketUpdateRequest}> = (props) => {
          const {ticketId,data} = props ?? {};

          return  patchApiV1AdminCsTicketsTicketId(ticketId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PatchApiV1AdminCsTicketsTicketIdMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>>
    export type PatchApiV1AdminCsTicketsTicketIdMutationBody = AdminCsTicketUpdateRequest
    export type PatchApiV1AdminCsTicketsTicketIdMutationError = BadRequestResponse | ForbiddenResponse | NotFoundResponse

    /**
 * @summary CS 티켓 처리 정보 변경 (운영자)
 */
export const usePatchApiV1AdminCsTicketsTicketId = <TError = BadRequestResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>, TError,{ticketId: number;data: AdminCsTicketUpdateRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiV1AdminCsTicketsTicketId>>,
        TError,
        {ticketId: number;data: AdminCsTicketUpdateRequest},
        TContext
      > => {
      return useMutation(getPatchApiV1AdminCsTicketsTicketIdMutationOptions(options), queryClient);
    }
    /**
 * `OTHER` 사유로 접수된 사장님 공구 마감 요청을 승인한다.
승인 시 공구는 실제로 CLOSED 상태로 전환되고 사장님에게 승인 알림이 발송된다.

 * @summary 사장님 공구 마감 요청 승인 (운영자)
 */
export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse200 = {
  data: ApiResponseAdminOwnerGroupBuyCloseRequestAction
  status: 200
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponseSuccess = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponseError = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse400 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse401 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse403 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse404) & {
  headers: Headers;
};

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponseSuccess | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponseError)

export const getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/owner-group-buys/${groupBuyId}/close-requests/approve`
}

export const postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove = async (groupBuyId: number, options?: RequestInit): Promise<postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse> => {

  return customFetch<postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveResponse>(getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveUrl(groupBuyId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>, TError,{groupBuyId: number}, TContext> => {

const mutationKey = ['postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>, {groupBuyId: number}> = (props) => {
          const {groupBuyId} = props ?? {};

          return  postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove(groupBuyId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>>

    export type PostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveMutationError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse

    /**
 * @summary 사장님 공구 마감 요청 승인 (운영자)
 */
export const usePostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>, TError,{groupBuyId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApprove>>,
        TError,
        {groupBuyId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsApproveMutationOptions(options), queryClient);
    }
    /**
 * `OTHER` 사유로 접수된 사장님 공구 마감 요청을 반려한다.
반려 시 공구 상태는 유지되며 반려 사유가 저장되고 사장님에게 반려 알림이 발송된다.

 * @summary 사장님 공구 마감 요청 반려 (운영자)
 */
export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse200 = {
  data: ApiResponseAdminOwnerGroupBuyCloseRequestAction
  status: 200
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponseSuccess = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponseError = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse400 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse401 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse403 | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse404) & {
  headers: Headers;
};

export type postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse = (postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponseSuccess | postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponseError)

export const getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectUrl = (groupBuyId: number,) => {




  return `/api/v1/admin/owner-group-buys/${groupBuyId}/close-requests/reject`
}

export const postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject = async (groupBuyId: number,
    adminOwnerGroupBuyCloseRequestReject: AdminOwnerGroupBuyCloseRequestReject, options?: RequestInit): Promise<postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse> => {

  return customFetch<postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectResponse>(getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectUrl(groupBuyId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminOwnerGroupBuyCloseRequestReject,)
  }
);}




export const getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>, TError,{groupBuyId: number;data: AdminOwnerGroupBuyCloseRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>, TError,{groupBuyId: number;data: AdminOwnerGroupBuyCloseRequestReject}, TContext> => {

const mutationKey = ['postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>, {groupBuyId: number;data: AdminOwnerGroupBuyCloseRequestReject}> = (props) => {
          const {groupBuyId,data} = props ?? {};

          return  postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject(groupBuyId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>>
    export type PostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectMutationBody = AdminOwnerGroupBuyCloseRequestReject
    export type PostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectMutationError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse

    /**
 * @summary 사장님 공구 마감 요청 반려 (운영자)
 */
export const usePostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>, TError,{groupBuyId: number;data: AdminOwnerGroupBuyCloseRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsReject>>,
        TError,
        {groupBuyId: number;data: AdminOwnerGroupBuyCloseRequestReject},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOwnerGroupBuysGroupBuyIdCloseRequestsRejectMutationOptions(options), queryClient);
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
 * @summary 소비자 공구 개설 요청 승인 및 공구 생성
 */
export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse201 = {
  data: ApiResponseAdminGroupBuyRequestAction
  status: 201
}

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponseSuccess = (postApiV1AdminGroupBuyRequestsRequestIdApproveResponse201) & {
  headers: Headers;
};
export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponseError = (postApiV1AdminGroupBuyRequestsRequestIdApproveResponse400 | postApiV1AdminGroupBuyRequestsRequestIdApproveResponse404) & {
  headers: Headers;
};

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse = (postApiV1AdminGroupBuyRequestsRequestIdApproveResponseSuccess | postApiV1AdminGroupBuyRequestsRequestIdApproveResponseError)

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveUrl = (requestId: number,) => {




  return `/api/v1/admin/group-buy-requests/${requestId}/approve`
}

export const postApiV1AdminGroupBuyRequestsRequestIdApprove = async (requestId: number,
    adminGroupBuyRequestApprove: AdminGroupBuyRequestApprove, options?: RequestInit): Promise<postApiV1AdminGroupBuyRequestsRequestIdApproveResponse> => {

  return customFetch<postApiV1AdminGroupBuyRequestsRequestIdApproveResponse>(getPostApiV1AdminGroupBuyRequestsRequestIdApproveUrl(requestId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminGroupBuyRequestApprove,)
  }
);}




export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveMutationOptions = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number;data: AdminGroupBuyRequestApprove}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number;data: AdminGroupBuyRequestApprove}, TContext> => {

const mutationKey = ['postApiV1AdminGroupBuyRequestsRequestIdApprove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>, {requestId: number;data: AdminGroupBuyRequestApprove}> = (props) => {
          const {requestId,data} = props ?? {};

          return  postApiV1AdminGroupBuyRequestsRequestIdApprove(requestId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminGroupBuyRequestsRequestIdApproveMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>>
    export type PostApiV1AdminGroupBuyRequestsRequestIdApproveMutationBody = AdminGroupBuyRequestApprove
    export type PostApiV1AdminGroupBuyRequestsRequestIdApproveMutationError = BadRequestResponse | NotFoundResponse

    /**
 * @summary 소비자 공구 개설 요청 승인 및 공구 생성
 */
export const usePostApiV1AdminGroupBuyRequestsRequestIdApprove = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number;data: AdminGroupBuyRequestApprove}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdApprove>>,
        TError,
        {requestId: number;data: AdminGroupBuyRequestApprove},
        TContext
      > => {
      return useMutation(getPostApiV1AdminGroupBuyRequestsRequestIdApproveMutationOptions(options), queryClient);
    }
    /**
 * @summary 소비자 공구 개설 요청 반려
 */
export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse200 = {
  data: ApiResponseAdminGroupBuyRequestAction
  status: 200
}

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponseSuccess = (postApiV1AdminGroupBuyRequestsRequestIdRejectResponse200) & {
  headers: Headers;
};
export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponseError = (postApiV1AdminGroupBuyRequestsRequestIdRejectResponse400 | postApiV1AdminGroupBuyRequestsRequestIdRejectResponse404) & {
  headers: Headers;
};

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse = (postApiV1AdminGroupBuyRequestsRequestIdRejectResponseSuccess | postApiV1AdminGroupBuyRequestsRequestIdRejectResponseError)

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectUrl = (requestId: number,) => {




  return `/api/v1/admin/group-buy-requests/${requestId}/reject`
}

export const postApiV1AdminGroupBuyRequestsRequestIdReject = async (requestId: number,
    adminGroupBuyRequestReject: AdminGroupBuyRequestReject, options?: RequestInit): Promise<postApiV1AdminGroupBuyRequestsRequestIdRejectResponse> => {

  return customFetch<postApiV1AdminGroupBuyRequestsRequestIdRejectResponse>(getPostApiV1AdminGroupBuyRequestsRequestIdRejectUrl(requestId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminGroupBuyRequestReject,)
  }
);}




export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectMutationOptions = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminGroupBuyRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminGroupBuyRequestReject}, TContext> => {

const mutationKey = ['postApiV1AdminGroupBuyRequestsRequestIdReject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>, {requestId: number;data: AdminGroupBuyRequestReject}> = (props) => {
          const {requestId,data} = props ?? {};

          return  postApiV1AdminGroupBuyRequestsRequestIdReject(requestId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminGroupBuyRequestsRequestIdRejectMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>>
    export type PostApiV1AdminGroupBuyRequestsRequestIdRejectMutationBody = AdminGroupBuyRequestReject
    export type PostApiV1AdminGroupBuyRequestsRequestIdRejectMutationError = BadRequestResponse | NotFoundResponse

    /**
 * @summary 소비자 공구 개설 요청 반려
 */
export const usePostApiV1AdminGroupBuyRequestsRequestIdReject = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminGroupBuyRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminGroupBuyRequestsRequestIdReject>>,
        TError,
        {requestId: number;data: AdminGroupBuyRequestReject},
        TContext
      > => {
      return useMutation(getPostApiV1AdminGroupBuyRequestsRequestIdRejectMutationOptions(options), queryClient);
    }
    /**
 * @summary 사장님 공구 개설 요청 목록 조회
 */
export type getApiV1AdminOwnerGroupBuyRequestsResponse200 = {
  data: ApiResponseAdminOwnerGroupBuyRequestPage
  status: 200
}

export type getApiV1AdminOwnerGroupBuyRequestsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminOwnerGroupBuyRequestsResponseSuccess = (getApiV1AdminOwnerGroupBuyRequestsResponse200) & {
  headers: Headers;
};
export type getApiV1AdminOwnerGroupBuyRequestsResponseError = (getApiV1AdminOwnerGroupBuyRequestsResponse403) & {
  headers: Headers;
};

export type getApiV1AdminOwnerGroupBuyRequestsResponse = (getApiV1AdminOwnerGroupBuyRequestsResponseSuccess | getApiV1AdminOwnerGroupBuyRequestsResponseError)

export const getGetApiV1AdminOwnerGroupBuyRequestsUrl = (params?: GetApiV1AdminOwnerGroupBuyRequestsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/owner-group-buy-requests?${stringifiedParams}` : `/api/v1/admin/owner-group-buy-requests`
}

export const getApiV1AdminOwnerGroupBuyRequests = async (params?: GetApiV1AdminOwnerGroupBuyRequestsParams, options?: RequestInit): Promise<getApiV1AdminOwnerGroupBuyRequestsResponse> => {

  return customFetch<getApiV1AdminOwnerGroupBuyRequestsResponse>(getGetApiV1AdminOwnerGroupBuyRequestsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminOwnerGroupBuyRequestsQueryKey = (params?: GetApiV1AdminOwnerGroupBuyRequestsParams,) => {
    return [
    `/api/v1/admin/owner-group-buy-requests`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminOwnerGroupBuyRequestsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError = ForbiddenResponse>(params?: GetApiV1AdminOwnerGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminOwnerGroupBuyRequestsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>> = ({ signal }) => getApiV1AdminOwnerGroupBuyRequests(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminOwnerGroupBuyRequestsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>>
export type GetApiV1AdminOwnerGroupBuyRequestsQueryError = ForbiddenResponse


export function useGetApiV1AdminOwnerGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError = ForbiddenResponse>(
 params: undefined |  GetApiV1AdminOwnerGroupBuyRequestsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOwnerGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOwnerGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOwnerGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOwnerGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 사장님 공구 개설 요청 목록 조회
 */

export function useGetApiV1AdminOwnerGroupBuyRequests<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError = ForbiddenResponse>(
 params?: GetApiV1AdminOwnerGroupBuyRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequests>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminOwnerGroupBuyRequestsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 사장님 공구 개설 요청 상세 조회
 */
export type getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseAdminOwnerGroupBuyRequestDetail
  status: 200
}

export type getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1AdminOwnerGroupBuyRequestsRequestIdResponseSuccess = (getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse200) & {
  headers: Headers;
};
export type getApiV1AdminOwnerGroupBuyRequestsRequestIdResponseError = (getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse404) & {
  headers: Headers;
};

export type getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse = (getApiV1AdminOwnerGroupBuyRequestsRequestIdResponseSuccess | getApiV1AdminOwnerGroupBuyRequestsRequestIdResponseError)

export const getGetApiV1AdminOwnerGroupBuyRequestsRequestIdUrl = (requestId: number,) => {




  return `/api/v1/admin/owner-group-buy-requests/${requestId}`
}

export const getApiV1AdminOwnerGroupBuyRequestsRequestId = async (requestId: number, options?: RequestInit): Promise<getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse> => {

  return customFetch<getApiV1AdminOwnerGroupBuyRequestsRequestIdResponse>(getGetApiV1AdminOwnerGroupBuyRequestsRequestIdUrl(requestId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryKey = (requestId: number,) => {
    return [
    `/api/v1/admin/owner-group-buy-requests/${requestId}`
    ] as const;
    }


export const getGetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError = NotFoundResponse>(requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryKey(requestId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>> = ({ signal }) => getApiV1AdminOwnerGroupBuyRequestsRequestId(requestId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(requestId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>>
export type GetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryError = NotFoundResponse


export function useGetApiV1AdminOwnerGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError = NotFoundResponse>(
 requestId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOwnerGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError = NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminOwnerGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError = NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 사장님 공구 개설 요청 상세 조회
 */

export function useGetApiV1AdminOwnerGroupBuyRequestsRequestId<TData = Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError = NotFoundResponse>(
 requestId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminOwnerGroupBuyRequestsRequestId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminOwnerGroupBuyRequestsRequestIdQueryOptions(requestId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 요청에 저장된 상품/가격/모집/픽업/이미지 정보로 공구를 생성한다.
 * @summary 사장님 공구 개설 요청 승인 및 공구 생성
 */
export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse201 = {
  data: ApiResponseAdminOwnerGroupBuyRequestAction
  status: 201
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponseSuccess = (postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse201) & {
  headers: Headers;
};
export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponseError = (postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse400 | postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse404) & {
  headers: Headers;
};

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse = (postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponseSuccess | postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponseError)

export const getPostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveUrl = (requestId: number,) => {




  return `/api/v1/admin/owner-group-buy-requests/${requestId}/approve`
}

export const postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove = async (requestId: number, options?: RequestInit): Promise<postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse> => {

  return customFetch<postApiV1AdminOwnerGroupBuyRequestsRequestIdApproveResponse>(getPostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveUrl(requestId),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveMutationOptions = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number}, TContext> => {

const mutationKey = ['postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>, {requestId: number}> = (props) => {
          const {requestId} = props ?? {};

          return  postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove(requestId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>>

    export type PostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveMutationError = BadRequestResponse | NotFoundResponse

    /**
 * @summary 사장님 공구 개설 요청 승인 및 공구 생성
 */
export const usePostApiV1AdminOwnerGroupBuyRequestsRequestIdApprove = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>, TError,{requestId: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdApprove>>,
        TError,
        {requestId: number},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOwnerGroupBuyRequestsRequestIdApproveMutationOptions(options), queryClient);
    }
    /**
 * @summary 사장님 공구 개설 요청 반려
 */
export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse200 = {
  data: ApiResponseAdminOwnerGroupBuyRequestAction
  status: 200
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponseSuccess = (postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse200) & {
  headers: Headers;
};
export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponseError = (postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse400 | postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse404) & {
  headers: Headers;
};

export type postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse = (postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponseSuccess | postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponseError)

export const getPostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectUrl = (requestId: number,) => {




  return `/api/v1/admin/owner-group-buy-requests/${requestId}/reject`
}

export const postApiV1AdminOwnerGroupBuyRequestsRequestIdReject = async (requestId: number,
    adminOwnerGroupBuyRequestReject: AdminOwnerGroupBuyRequestReject, options?: RequestInit): Promise<postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse> => {

  return customFetch<postApiV1AdminOwnerGroupBuyRequestsRequestIdRejectResponse>(getPostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectUrl(requestId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      adminOwnerGroupBuyRequestReject,)
  }
);}




export const getPostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectMutationOptions = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminOwnerGroupBuyRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminOwnerGroupBuyRequestReject}, TContext> => {

const mutationKey = ['postApiV1AdminOwnerGroupBuyRequestsRequestIdReject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>, {requestId: number;data: AdminOwnerGroupBuyRequestReject}> = (props) => {
          const {requestId,data} = props ?? {};

          return  postApiV1AdminOwnerGroupBuyRequestsRequestIdReject(requestId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>>
    export type PostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectMutationBody = AdminOwnerGroupBuyRequestReject
    export type PostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectMutationError = BadRequestResponse | NotFoundResponse

    /**
 * @summary 사장님 공구 개설 요청 반려
 */
export const usePostApiV1AdminOwnerGroupBuyRequestsRequestIdReject = <TError = BadRequestResponse | NotFoundResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>, TError,{requestId: number;data: AdminOwnerGroupBuyRequestReject}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AdminOwnerGroupBuyRequestsRequestIdReject>>,
        TError,
        {requestId: number;data: AdminOwnerGroupBuyRequestReject},
        TContext
      > => {
      return useMutation(getPostApiV1AdminOwnerGroupBuyRequestsRequestIdRejectMutationOptions(options), queryClient);
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
 * 선택한 연월의 정산 완료 금액, 정산 예정 금액, 서비스 수수료, 총 거래액을 조회한다. 현재 서비스 수수료 정책은 0원이다.
 * @summary 정산 현황 대시보드 조회 (운영자)
 */
export type getApiV1AdminSettlementsDashboardResponse200 = {
  data: ApiResponseAdminSettlementDashboard
  status: 200
}

export type getApiV1AdminSettlementsDashboardResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1AdminSettlementsDashboardResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminSettlementsDashboardResponseSuccess = (getApiV1AdminSettlementsDashboardResponse200) & {
  headers: Headers;
};
export type getApiV1AdminSettlementsDashboardResponseError = (getApiV1AdminSettlementsDashboardResponse400 | getApiV1AdminSettlementsDashboardResponse403) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsDashboardResponse = (getApiV1AdminSettlementsDashboardResponseSuccess | getApiV1AdminSettlementsDashboardResponseError)

export const getGetApiV1AdminSettlementsDashboardUrl = (params: GetApiV1AdminSettlementsDashboardParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/settlements/dashboard?${stringifiedParams}` : `/api/v1/admin/settlements/dashboard`
}

export const getApiV1AdminSettlementsDashboard = async (params: GetApiV1AdminSettlementsDashboardParams, options?: RequestInit): Promise<getApiV1AdminSettlementsDashboardResponse> => {

  return customFetch<getApiV1AdminSettlementsDashboardResponse>(getGetApiV1AdminSettlementsDashboardUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminSettlementsDashboardQueryKey = (params?: GetApiV1AdminSettlementsDashboardParams,) => {
    return [
    `/api/v1/admin/settlements/dashboard`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1AdminSettlementsDashboardQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError = BadRequestResponse | ForbiddenResponse>(params: GetApiV1AdminSettlementsDashboardParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminSettlementsDashboardQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>> = ({ signal }) => getApiV1AdminSettlementsDashboard(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminSettlementsDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>>
export type GetApiV1AdminSettlementsDashboardQueryError = BadRequestResponse | ForbiddenResponse


export function useGetApiV1AdminSettlementsDashboard<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsDashboardParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlementsDashboard<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsDashboardParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlementsDashboard<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsDashboardParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 정산 현황 대시보드 조회 (운영자)
 */

export function useGetApiV1AdminSettlementsDashboard<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsDashboardParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminSettlementsDashboardQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 선택한 연월의 정산 예정, 정산 완료, 전체 목록을 조회한다. 현재 settlementId는 groupBuyId와 동일하다.
 * @summary 정산 현황 목록 조회 (운영자)
 */
export type getApiV1AdminSettlementsResponse200 = {
  data: ApiResponseAdminSettlementPage
  status: 200
}

export type getApiV1AdminSettlementsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1AdminSettlementsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminSettlementsResponseSuccess = (getApiV1AdminSettlementsResponse200) & {
  headers: Headers;
};
export type getApiV1AdminSettlementsResponseError = (getApiV1AdminSettlementsResponse400 | getApiV1AdminSettlementsResponse403) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsResponse = (getApiV1AdminSettlementsResponseSuccess | getApiV1AdminSettlementsResponseError)

export const getGetApiV1AdminSettlementsUrl = (params: GetApiV1AdminSettlementsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/admin/settlements?${stringifiedParams}` : `/api/v1/admin/settlements`
}

export const getApiV1AdminSettlements = async (params: GetApiV1AdminSettlementsParams, options?: RequestInit): Promise<getApiV1AdminSettlementsResponse> => {

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


export const getGetApiV1AdminSettlementsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = BadRequestResponse | ForbiddenResponse>(params: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminSettlementsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminSettlements>>> = ({ signal }) => getApiV1AdminSettlements(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminSettlementsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminSettlements>>>
export type GetApiV1AdminSettlementsQueryError = BadRequestResponse | ForbiddenResponse


export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlements>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 정산 현황 목록 조회 (운영자)
 */

export function useGetApiV1AdminSettlements<TData = Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError = BadRequestResponse | ForbiddenResponse>(
 params: GetApiV1AdminSettlementsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlements>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminSettlementsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 목록에서 선택한 정산 건의 상세 팝업용 정보를 조회한다. 현재 settlementId는 groupBuyId와 동일하다.
 * @summary 정산 현황 상세 조회 (운영자)
 */
export type getApiV1AdminSettlementsSettlementIdResponse200 = {
  data: ApiResponseAdminSettlementDetail
  status: 200
}

export type getApiV1AdminSettlementsSettlementIdResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1AdminSettlementsSettlementIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1AdminSettlementsSettlementIdResponseSuccess = (getApiV1AdminSettlementsSettlementIdResponse200) & {
  headers: Headers;
};
export type getApiV1AdminSettlementsSettlementIdResponseError = (getApiV1AdminSettlementsSettlementIdResponse403 | getApiV1AdminSettlementsSettlementIdResponse404) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsSettlementIdResponse = (getApiV1AdminSettlementsSettlementIdResponseSuccess | getApiV1AdminSettlementsSettlementIdResponseError)

export const getGetApiV1AdminSettlementsSettlementIdUrl = (settlementId: number,) => {




  return `/api/v1/admin/settlements/${settlementId}`
}

export const getApiV1AdminSettlementsSettlementId = async (settlementId: number, options?: RequestInit): Promise<getApiV1AdminSettlementsSettlementIdResponse> => {

  return customFetch<getApiV1AdminSettlementsSettlementIdResponse>(getGetApiV1AdminSettlementsSettlementIdUrl(settlementId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1AdminSettlementsSettlementIdQueryKey = (settlementId: number,) => {
    return [
    `/api/v1/admin/settlements/${settlementId}`
    ] as const;
    }


export const getGetApiV1AdminSettlementsSettlementIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError = ForbiddenResponse | NotFoundResponse>(settlementId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1AdminSettlementsSettlementIdQueryKey(settlementId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>> = ({ signal }) => getApiV1AdminSettlementsSettlementId(settlementId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(settlementId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1AdminSettlementsSettlementIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>>
export type GetApiV1AdminSettlementsSettlementIdQueryError = ForbiddenResponse | NotFoundResponse


export function useGetApiV1AdminSettlementsSettlementId<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError = ForbiddenResponse | NotFoundResponse>(
 settlementId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlementsSettlementId<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError = ForbiddenResponse | NotFoundResponse>(
 settlementId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1AdminSettlementsSettlementId<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError = ForbiddenResponse | NotFoundResponse>(
 settlementId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 정산 현황 상세 조회 (운영자)
 */

export function useGetApiV1AdminSettlementsSettlementId<TData = Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError = ForbiddenResponse | NotFoundResponse>(
 settlementId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1AdminSettlementsSettlementId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1AdminSettlementsSettlementIdQueryOptions(settlementId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






