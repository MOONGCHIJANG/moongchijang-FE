/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { useMutation, useQuery } from '@tanstack/react-query';
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
  UseQueryResult,
} from '@tanstack/react-query';

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

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

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

export const getGetApiV1OwnerHomeSummaryQueryKey = () => {
  return [`/api/v1/owner/home/summary`] as const;
};

export const getGetApiV1OwnerHomeSummaryQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
  TError = ForbiddenResponse,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1OwnerHomeSummaryQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>
  > = ({ signal }) => getApiV1OwnerHomeSummary({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerHomeSummaryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>
>;
export type GetApiV1OwnerHomeSummaryQueryError = ForbiddenResponse;

export function useGetApiV1OwnerHomeSummary<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
  TError = ForbiddenResponse,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerHomeSummary<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
  TError = ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerHomeSummary<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
  TError = ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 사장님 홈 요약 정보
 */

export function useGetApiV1OwnerHomeSummary<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
  TError = ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomeSummary>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerHomeSummaryQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getGetApiV1OwnerHomePickupScheduleQueryKey = () => {
  return [`/api/v1/owner/home/pickup-schedule`] as const;
};

export const getGetApiV1OwnerHomePickupScheduleQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1OwnerHomePickupScheduleQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>
  > = ({ signal }) =>
    getApiV1OwnerHomePickupSchedule({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerHomePickupScheduleQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>
>;
export type GetApiV1OwnerHomePickupScheduleQueryError = unknown;

export function useGetApiV1OwnerHomePickupSchedule<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerHomePickupSchedule<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerHomePickupSchedule<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 시간대별 픽업 현황 조회
 */

export function useGetApiV1OwnerHomePickupSchedule<
  TData = Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerHomePickupSchedule>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerHomePickupScheduleQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getGetApiV1OwnerGroupBuysQueryKey = () => {
  return [`/api/v1/owner/group-buys`] as const;
};

export const getGetApiV1OwnerGroupBuysQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1OwnerGroupBuysQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>
  > = ({ signal }) => getApiV1OwnerGroupBuys({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerGroupBuysQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>
>;
export type GetApiV1OwnerGroupBuysQueryError =
  | UnauthorizedResponse
  | ForbiddenResponse;

export function useGetApiV1OwnerGroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 진행 중인 공구 목록 조회 (사장님용)
 */

export function useGetApiV1OwnerGroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuys>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerGroupBuysQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getGetApiV1OwnerGroupBuyRequestsQueryKey = (
  params?: GetApiV1OwnerGroupBuyRequestsParams,
) => {
  return [
    `/api/v1/owner/group-buy-requests`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1OwnerGroupBuyRequestsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  params?: GetApiV1OwnerGroupBuyRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1OwnerGroupBuyRequestsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>
  > = ({ signal }) =>
    getApiV1OwnerGroupBuyRequests(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerGroupBuyRequestsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>
>;
export type GetApiV1OwnerGroupBuyRequestsQueryError =
  | UnauthorizedResponse
  | ForbiddenResponse;

export function useGetApiV1OwnerGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  params: undefined | GetApiV1OwnerGroupBuyRequestsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  params?: GetApiV1OwnerGroupBuyRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  params?: GetApiV1OwnerGroupBuyRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 사장님 공구 개설 요청 목록 조회
 */

export function useGetApiV1OwnerGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
  TError = UnauthorizedResponse | ForbiddenResponse,
>(
  params?: GetApiV1OwnerGroupBuyRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequests>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerGroupBuyRequestsQueryOptions(
    params,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getPostApiV1OwnerGroupBuyRequestsMutationOptions = <
  TError =
    | BadRequestResponse
    | UnauthorizedResponse
    | ForbiddenResponse
    | NotFoundResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>,
    TError,
    { data: OwnerGroupBuyRequestCreate },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>,
  TError,
  { data: OwnerGroupBuyRequestCreate },
  TContext
> => {
  const mutationKey = ['postApiV1OwnerGroupBuyRequests'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>,
    { data: OwnerGroupBuyRequestCreate }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1OwnerGroupBuyRequests(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1OwnerGroupBuyRequestsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>
>;
export type PostApiV1OwnerGroupBuyRequestsMutationBody =
  OwnerGroupBuyRequestCreate;
export type PostApiV1OwnerGroupBuyRequestsMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse;

/**
 * @summary 사장님 공구 개설 요청 제출
 */
export const usePostApiV1OwnerGroupBuyRequests = <
  TError =
    | BadRequestResponse
    | UnauthorizedResponse
    | ForbiddenResponse
    | NotFoundResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>,
      TError,
      { data: OwnerGroupBuyRequestCreate },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1OwnerGroupBuyRequests>>,
  TError,
  { data: OwnerGroupBuyRequestCreate },
  TContext
> => {
  return useMutation(
    getPostApiV1OwnerGroupBuyRequestsMutationOptions(options),
    queryClient,
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

export const getGetApiV1OwnerGroupBuyRequestsRequestIdQueryKey = (
  requestId: number,
) => {
  return [`/api/v1/owner/group-buy-requests/${requestId}`] as const;
};

export const getGetApiV1OwnerGroupBuyRequestsRequestIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
>(
  requestId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetApiV1OwnerGroupBuyRequestsRequestIdQueryKey(requestId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>
  > = ({ signal }) =>
    getApiV1OwnerGroupBuyRequestsRequestId(requestId, {
      signal,
      ...requestOptions,
    });

  return {
    queryKey,
    queryFn,
    enabled: !!requestId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerGroupBuyRequestsRequestIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>
>;
export type GetApiV1OwnerGroupBuyRequestsRequestIdQueryError =
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse;

export function useGetApiV1OwnerGroupBuyRequestsRequestId<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
>(
  requestId: number,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuyRequestsRequestId<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
>(
  requestId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerGroupBuyRequestsRequestId<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
>(
  requestId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 사장님 공구 개설 요청 상세 조회
 */

export function useGetApiV1OwnerGroupBuyRequestsRequestId<
  TData = Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
>(
  requestId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerGroupBuyRequestsRequestId>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerGroupBuyRequestsRequestIdQueryOptions(
    requestId,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getGetApiV1OwnerReservationsQueryKey = (
  params?: GetApiV1OwnerReservationsParams,
) => {
  return [`/api/v1/owner/reservations`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1OwnerReservationsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
  TError = unknown,
>(
  params?: GetApiV1OwnerReservationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1OwnerReservationsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1OwnerReservations>>
  > = ({ signal }) =>
    getApiV1OwnerReservations(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1OwnerReservationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1OwnerReservations>>
>;
export type GetApiV1OwnerReservationsQueryError = unknown;

export function useGetApiV1OwnerReservations<
  TData = Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
  TError = unknown,
>(
  params: undefined | GetApiV1OwnerReservationsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerReservations>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerReservations<
  TData = Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
  TError = unknown,
>(
  params?: GetApiV1OwnerReservationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
          TError,
          Awaited<ReturnType<typeof getApiV1OwnerReservations>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1OwnerReservations<
  TData = Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
  TError = unknown,
>(
  params?: GetApiV1OwnerReservationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 픽업 예약자 목록 조회
 */

export function useGetApiV1OwnerReservations<
  TData = Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
  TError = unknown,
>(
  params?: GetApiV1OwnerReservationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1OwnerReservations>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1OwnerReservationsQueryOptions(
    params,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getPatchApiV1OwnerReservationsParticipationIdCompleteMutationOptions =
  <TError = ConflictResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
      Awaited<
        ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
      >,
      TError,
      { participationId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  }): UseMutationOptions<
    Awaited<
      ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
    >,
    TError,
    { participationId: number },
    TContext
  > => {
    const mutationKey = ['patchApiV1OwnerReservationsParticipationIdComplete'];
    const { mutation: mutationOptions, request: requestOptions } = options
      ? options.mutation &&
        'mutationKey' in options.mutation &&
        options.mutation.mutationKey
        ? options
        : { ...options, mutation: { ...options.mutation, mutationKey } }
      : { mutation: { mutationKey }, request: undefined };

    const mutationFn: MutationFunction<
      Awaited<
        ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
      >,
      { participationId: number }
    > = (props) => {
      const { participationId } = props ?? {};

      return patchApiV1OwnerReservationsParticipationIdComplete(
        participationId,
        requestOptions,
      );
    };

    return { mutationFn, ...mutationOptions };
  };

export type PatchApiV1OwnerReservationsParticipationIdCompleteMutationResult =
  NonNullable<
    Awaited<
      ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
    >
  >;

export type PatchApiV1OwnerReservationsParticipationIdCompleteMutationError =
  ConflictResponse;

/**
 * @summary 수령 처리 (수동)
 */
export const usePatchApiV1OwnerReservationsParticipationIdComplete = <
  TError = ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<
        ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
      >,
      TError,
      { participationId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<
    ReturnType<typeof patchApiV1OwnerReservationsParticipationIdComplete>
  >,
  TError,
  { participationId: number },
  TContext
> => {
  return useMutation(
    getPatchApiV1OwnerReservationsParticipationIdCompleteMutationOptions(
      options,
    ),
    queryClient,
  );
};
