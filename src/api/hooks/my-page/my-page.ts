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
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 내 참여 내역 상태별 조회
 */
export type getApiV1UsersMeParticipationsResponse200 = {
  data: ApiResponseMypageParticipationList;
  status: 200;
};

export type getApiV1UsersMeParticipationsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1UsersMeParticipationsResponseSuccess =
  getApiV1UsersMeParticipationsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsResponseError =
  getApiV1UsersMeParticipationsResponse400 & {
    headers: Headers;
  };

export type getApiV1UsersMeParticipationsResponse =
  | getApiV1UsersMeParticipationsResponseSuccess
  | getApiV1UsersMeParticipationsResponseError;

export const getGetApiV1UsersMeParticipationsUrl = (
  params: GetApiV1UsersMeParticipationsParams,
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
  params: GetApiV1UsersMeParticipationsParams,
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
  TError = BadRequestResponse,
>(
  params: GetApiV1UsersMeParticipationsParams,
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
export type GetApiV1UsersMeParticipationsQueryError = BadRequestResponse;

export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1UsersMeParticipationsParams,
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
  TError = BadRequestResponse,
>(
  params: GetApiV1UsersMeParticipationsParams,
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
  TError = BadRequestResponse,
>(
  params: GetApiV1UsersMeParticipationsParams,
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
 * @summary 내 참여 내역 상태별 조회
 */

export function useGetApiV1UsersMeParticipations<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipations>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1UsersMeParticipationsParams,
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
 * 페이지네이션 기반으로 진행 중 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 진행 중 탭 참여 공구 목록 조회
 */
export type getApiV1UsersMeParticipationsInProgressResponse200 = {
  data: ApiResponseInProgressParticipationPage;
  status: 200;
};

export type getApiV1UsersMeParticipationsInProgressResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeParticipationsInProgressResponseSuccess =
  getApiV1UsersMeParticipationsInProgressResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsInProgressResponseError =
  getApiV1UsersMeParticipationsInProgressResponse401 & {
    headers: Headers;
  };

export type getApiV1UsersMeParticipationsInProgressResponse =
  | getApiV1UsersMeParticipationsInProgressResponseSuccess
  | getApiV1UsersMeParticipationsInProgressResponseError;

export const getGetApiV1UsersMeParticipationsInProgressUrl = (
  params?: GetApiV1UsersMeParticipationsInProgressParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/me/participations/in-progress?${stringifiedParams}`
    : `/api/v1/users/me/participations/in-progress`;
};

export const getApiV1UsersMeParticipationsInProgress = async (
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: RequestInit,
): Promise<getApiV1UsersMeParticipationsInProgressResponse> => {
  return customFetch<getApiV1UsersMeParticipationsInProgressResponse>(
    getGetApiV1UsersMeParticipationsInProgressUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1UsersMeParticipationsInProgressQueryKey = (
  params?: GetApiV1UsersMeParticipationsInProgressParams,
) => {
  return [
    `/api/v1/users/me/participations/in-progress`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1UsersMeParticipationsInProgressQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
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
    getGetApiV1UsersMeParticipationsInProgressQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>
  > = ({ signal }) =>
    getApiV1UsersMeParticipationsInProgress(params, {
      signal,
      ...requestOptions,
    });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeParticipationsInProgressQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>
>;
export type GetApiV1UsersMeParticipationsInProgressQueryError =
  UnauthorizedResponse;

export function useGetApiV1UsersMeParticipationsInProgress<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
  TError = UnauthorizedResponse,
>(
  params: undefined | GetApiV1UsersMeParticipationsInProgressParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipationsInProgress<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipationsInProgress<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
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
 * @summary 진행 중 탭 참여 공구 목록 조회
 */

export function useGetApiV1UsersMeParticipationsInProgress<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsInProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsInProgress>>,
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
  const queryOptions = getGetApiV1UsersMeParticipationsInProgressQueryOptions(
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
 * 페이지네이션 기반으로 픽업 대기 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 픽업 대기 탭 참여 완료 공구 이력 조회
 */
export type getApiV1UsersMeParticipationsPickupWaitingResponse200 = {
  data: ApiResponsePickupWaitingParticipationPage;
  status: 200;
};

export type getApiV1UsersMeParticipationsPickupWaitingResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeParticipationsPickupWaitingResponseSuccess =
  getApiV1UsersMeParticipationsPickupWaitingResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeParticipationsPickupWaitingResponseError =
  getApiV1UsersMeParticipationsPickupWaitingResponse401 & {
    headers: Headers;
  };

export type getApiV1UsersMeParticipationsPickupWaitingResponse =
  | getApiV1UsersMeParticipationsPickupWaitingResponseSuccess
  | getApiV1UsersMeParticipationsPickupWaitingResponseError;

export const getGetApiV1UsersMeParticipationsPickupWaitingUrl = (
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/me/participations/pickup-waiting?${stringifiedParams}`
    : `/api/v1/users/me/participations/pickup-waiting`;
};

export const getApiV1UsersMeParticipationsPickupWaiting = async (
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: RequestInit,
): Promise<getApiV1UsersMeParticipationsPickupWaitingResponse> => {
  return customFetch<getApiV1UsersMeParticipationsPickupWaitingResponse>(
    getGetApiV1UsersMeParticipationsPickupWaitingUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1UsersMeParticipationsPickupWaitingQueryKey = (
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
) => {
  return [
    `/api/v1/users/me/participations/pickup-waiting`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1UsersMeParticipationsPickupWaitingQueryOptions = <
  TData = Awaited<
    ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
  >,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
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
    getGetApiV1UsersMeParticipationsPickupWaitingQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>
  > = ({ signal }) =>
    getApiV1UsersMeParticipationsPickupWaiting(params, {
      signal,
      ...requestOptions,
    });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeParticipationsPickupWaitingQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>
>;
export type GetApiV1UsersMeParticipationsPickupWaitingQueryError =
  UnauthorizedResponse;

export function useGetApiV1UsersMeParticipationsPickupWaiting<
  TData = Awaited<
    ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
  >,
  TError = UnauthorizedResponse,
>(
  params: undefined | GetApiV1UsersMeParticipationsPickupWaitingParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
          >,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipationsPickupWaiting<
  TData = Awaited<
    ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
  >,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
          >,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeParticipationsPickupWaiting<
  TData = Awaited<
    ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
  >,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
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
 * @summary 픽업 대기 탭 참여 완료 공구 이력 조회
 */

export function useGetApiV1UsersMeParticipationsPickupWaiting<
  TData = Awaited<
    ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>
  >,
  TError = UnauthorizedResponse,
>(
  params?: GetApiV1UsersMeParticipationsPickupWaitingParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeParticipationsPickupWaiting>>,
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
  const queryOptions =
    getGetApiV1UsersMeParticipationsPickupWaitingQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 내 공구 개설 요청 내역 조회
 */
export type getApiV1UsersMeGroupBuyRequestsResponse200 = {
  data: ApiResponseMypageGroupBuyRequestList;
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
 * @summary 내 공구 개설 요청 내역 조회
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
 * 진행 중 · 픽업 대기 · 픽업 완료 · 환불/취소 · 개설요청 건수를 반환한다 (탭 칩 괄호 숫자용).
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

/**
 * 진행 중 · 픽업 대기 · 픽업 완료 · 환불/취소 · 개설요청 건수를 반환한다.
 * @summary 마이페이지 탭별 건수 조회
 */
export type getApiV1MypageSummaryResponse200 = {
  data: ApiResponseTabCounts;
  status: 200;
};

export type getApiV1MypageSummaryResponseSuccess =
  getApiV1MypageSummaryResponse200 & {
    headers: Headers;
  };
export type getApiV1MypageSummaryResponse =
  getApiV1MypageSummaryResponseSuccess;

export const getGetApiV1MypageSummaryUrl = () => {
  return `/api/v1/mypage/summary`;
};

export const getApiV1MypageSummary = async (
  options?: RequestInit,
): Promise<getApiV1MypageSummaryResponse> => {
  return customFetch<getApiV1MypageSummaryResponse>(
    getGetApiV1MypageSummaryUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1MypageSummaryQueryKey = () => {
  return [`/api/v1/mypage/summary`] as const;
};

export const getGetApiV1MypageSummaryQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1MypageSummary>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1MypageSummary>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1MypageSummaryQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1MypageSummary>>
  > = ({ signal }) => getApiV1MypageSummary({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1MypageSummary>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1MypageSummaryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1MypageSummary>>
>;
export type GetApiV1MypageSummaryQueryError = unknown;

export function useGetApiV1MypageSummary<
  TData = Awaited<ReturnType<typeof getApiV1MypageSummary>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageSummary>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageSummary>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageSummary<
  TData = Awaited<ReturnType<typeof getApiV1MypageSummary>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageSummary>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageSummary>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageSummary>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageSummary<
  TData = Awaited<ReturnType<typeof getApiV1MypageSummary>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageSummary>>,
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

export function useGetApiV1MypageSummary<
  TData = Awaited<ReturnType<typeof getApiV1MypageSummary>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageSummary>>,
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
  const queryOptions = getGetApiV1MypageSummaryQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 내 환불 내역 조회
 */
export type getApiV1MypageRefundsResponse200 = {
  data: ApiResponseRefundList;
  status: 200;
};

export type getApiV1MypageRefundsResponseSuccess =
  getApiV1MypageRefundsResponse200 & {
    headers: Headers;
  };
export type getApiV1MypageRefundsResponse =
  getApiV1MypageRefundsResponseSuccess;

export const getGetApiV1MypageRefundsUrl = () => {
  return `/api/v1/mypage/refunds`;
};

export const getApiV1MypageRefunds = async (
  options?: RequestInit,
): Promise<getApiV1MypageRefundsResponse> => {
  return customFetch<getApiV1MypageRefundsResponse>(
    getGetApiV1MypageRefundsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1MypageRefundsQueryKey = () => {
  return [`/api/v1/mypage/refunds`] as const;
};

export const getGetApiV1MypageRefundsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1MypageRefundsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1MypageRefunds>>
  > = ({ signal }) => getApiV1MypageRefunds({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1MypageRefundsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1MypageRefunds>>
>;
export type GetApiV1MypageRefundsQueryError = unknown;

export function useGetApiV1MypageRefunds<
  TData = Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageRefunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageRefunds<
  TData = Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageRefunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageRefunds<
  TData = Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
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
 * @summary 내 환불 내역 조회
 */

export function useGetApiV1MypageRefunds<
  TData = Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageRefunds>>,
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
  const queryOptions = getGetApiV1MypageRefundsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * /api/v1/mypage/refunds 와 동일한 응답을 반환한다. 신규 클라이언트는 본 경로를 사용한다.
 * @summary 내 환불 내역 조회 (마이페이지 alias)
 */
export type getApiV1UsersMeRefundsResponse200 = {
  data: ApiResponseRefundList;
  status: 200;
};

export type getApiV1UsersMeRefundsResponseSuccess =
  getApiV1UsersMeRefundsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeRefundsResponse =
  getApiV1UsersMeRefundsResponseSuccess;

export const getGetApiV1UsersMeRefundsUrl = () => {
  return `/api/v1/users/me/refunds`;
};

export const getApiV1UsersMeRefunds = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeRefundsResponse> => {
  return customFetch<getApiV1UsersMeRefundsResponse>(
    getGetApiV1UsersMeRefundsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1UsersMeRefundsQueryKey = () => {
  return [`/api/v1/users/me/refunds`] as const;
};

export const getGetApiV1UsersMeRefundsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1UsersMeRefundsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>
  > = ({ signal }) => getApiV1UsersMeRefunds({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeRefundsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>
>;
export type GetApiV1UsersMeRefundsQueryError = unknown;

export function useGetApiV1UsersMeRefunds<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeRefunds<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeRefunds<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
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
 * @summary 내 환불 내역 조회 (마이페이지 alias)
 */

export function useGetApiV1UsersMeRefunds<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRefunds>>,
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
  const queryOptions = getGetApiV1UsersMeRefundsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 내 공구 개설 요청 내역 조회
 */
export type getApiV1MypageGroupBuyRequestsResponse200 = {
  data: ApiResponseMypageGroupBuyRequestList;
  status: 200;
};

export type getApiV1MypageGroupBuyRequestsResponseSuccess =
  getApiV1MypageGroupBuyRequestsResponse200 & {
    headers: Headers;
  };
export type getApiV1MypageGroupBuyRequestsResponse =
  getApiV1MypageGroupBuyRequestsResponseSuccess;

export const getGetApiV1MypageGroupBuyRequestsUrl = () => {
  return `/api/v1/mypage/group-buy-requests`;
};

export const getApiV1MypageGroupBuyRequests = async (
  options?: RequestInit,
): Promise<getApiV1MypageGroupBuyRequestsResponse> => {
  return customFetch<getApiV1MypageGroupBuyRequestsResponse>(
    getGetApiV1MypageGroupBuyRequestsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1MypageGroupBuyRequestsQueryKey = () => {
  return [`/api/v1/mypage/group-buy-requests`] as const;
};

export const getGetApiV1MypageGroupBuyRequestsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1MypageGroupBuyRequestsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>
  > = ({ signal }) =>
    getApiV1MypageGroupBuyRequests({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1MypageGroupBuyRequestsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>
>;
export type GetApiV1MypageGroupBuyRequestsQueryError = unknown;

export function useGetApiV1MypageGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1MypageGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
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
 * @summary 내 공구 개설 요청 내역 조회
 */

export function useGetApiV1MypageGroupBuyRequests<
  TData = Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1MypageGroupBuyRequests>>,
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
  const queryOptions = getGetApiV1MypageGroupBuyRequestsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}
