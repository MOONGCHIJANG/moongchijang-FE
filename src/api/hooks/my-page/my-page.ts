/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { useQuery } from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import type {
  ApiResponseGroupBuyRequestList,
  ApiResponseParticipationPage,
  ApiResponseTabCounts,
  GetApiV1UsersMeParticipationsParams,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

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

export const getGetApiV1UsersMeParticipationsQueryKey = (
  params?: GetApiV1UsersMeParticipationsParams,
) => {
  return [
    `/api/v1/users/me/participations`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1UsersMeParticipationsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = unknown,
>(
  params?: GetApiV1UsersMeParticipationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1UsersMeParticipationsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>
  > = ({ signal }) =>
    getApiV1UsersMeParticipations(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeParticipationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>
>;
export type GetApiV1UsersMeParticipationsQueryError = unknown;

export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = unknown,
>(
  params: undefined | GetApiV1UsersMeParticipationsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = unknown,
>(
  params?: GetApiV1UsersMeParticipationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = unknown,
>(
  params?: GetApiV1UsersMeParticipationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
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
 * @summary 참여 목록 조회 (참여중 · 완료 · 환불 탭)
 */

export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = unknown,
>(
  params?: GetApiV1UsersMeParticipationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
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
  const queryOptions = getGetApiV1UsersMeParticipationsQueryOptions(
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

export const getGetApiV1UsersMeGroupBuyRequestsQueryKey = () => {
  return [`/api/v1/users/me/group-buy-requests`] as const;
};

export const getGetApiV1UsersMeGroupBuyRequestsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1UsersMeGroupBuyRequestsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>
  > = ({ signal }) =>
    getApiV1UsersMeGroupBuyRequests({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeGroupBuyRequestsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>
>;
export type GetApiV1UsersMeGroupBuyRequestsQueryError = unknown;

export function useGetApiV1UsersMeGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
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
 * @summary 내 공구 요청 목록 조회 (개설 요청 내역 탭)
 */

export function useGetApiV1UsersMeGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeGroupBuyRequests>>,
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
  const queryOptions = getGetApiV1UsersMeGroupBuyRequestsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getGetApiV1UsersMeTabsCountsQueryKey = () => {
  return [`/api/v1/users/me/tabs/counts`] as const;
};

export const getGetApiV1UsersMeTabsCountsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1UsersMeTabsCountsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>
  > = ({ signal }) => getApiV1UsersMeTabsCounts({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeTabsCountsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>
>;
export type GetApiV1UsersMeTabsCountsQueryError = unknown;

export function useGetApiV1UsersMeTabsCounts<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeTabsCounts<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeTabsCounts<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
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
 * @summary 마이페이지 탭별 건수 조회
 */

export function useGetApiV1UsersMeTabsCounts<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeTabsCounts>>,
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
  const queryOptions = getGetApiV1UsersMeTabsCountsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}
