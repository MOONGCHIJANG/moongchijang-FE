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
  ApiResponseError,
  ApiResponseGroupBuyDetailResponse,
  ApiResponseGroupBuyFeedPageResponse,
  ApiResponseGroupBuyProgress,
  ApiResponseGroupBuyProgressList,
  ApiResponseGroupBuyViewerCount,
  ApiResponseRecentSearchList,
  ApiResponseSearchAnalysis,
  ApiResponseShareMeta,
  BadRequestResponse,
  GetApiV1GroupBuysParams,
  GetApiV1GroupBuysProgressParams,
  GroupBuyViewerHeartbeatRequest,
  NotFoundResponse,
  PostApiV1SearchBody,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * 진행 중인 공구 목록(2열 카드 피드)을 페이지네이션으로 조회한다. 비로그인 허용.
- `filter=ALL`: 전체
- `filter=CLOSING_SOON`: 마감임박 (마감일 D-3 이하)
- `filter=ALMOST_ACHIEVED`: 달성임박 (달성률 80% 이상)
- 지역 필터는 `districts`로 복수 선택(최대 10개) 가능
- 클라이언트 표시는 한글 라벨, 요청 전송값은 영문 코드(enum) 사용
- 선택 규칙:
  - 같은 시/도 내 `*_ALL`과 하위 세부지역 동시 선택 불가
  - 전체 선택 개수(지역/세부지역 통합) 최대 10개

 * @summary 공구 피드 목록 조회
 */
export type getApiV1GroupBuysResponse200 = {
  data: ApiResponseGroupBuyFeedPageResponse;
  status: 200;
};

export type getApiV1GroupBuysResponse400 = {
  data: ApiResponseError;
  status: 400;
};

export type getApiV1GroupBuysResponseSuccess = getApiV1GroupBuysResponse200 & {
  headers: Headers;
};
export type getApiV1GroupBuysResponseError = getApiV1GroupBuysResponse400 & {
  headers: Headers;
};

export type getApiV1GroupBuysResponse =
  | getApiV1GroupBuysResponseSuccess
  | getApiV1GroupBuysResponseError;

export const getGetApiV1GroupBuysUrl = (params?: GetApiV1GroupBuysParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ['districts'];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : v.toString());
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/group-buys?${stringifiedParams}`
    : `/api/v1/group-buys`;
};

export const getApiV1GroupBuys = async (
  params?: GetApiV1GroupBuysParams,
  options?: RequestInit,
): Promise<getApiV1GroupBuysResponse> => {
  return customFetch<getApiV1GroupBuysResponse>(
    getGetApiV1GroupBuysUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysQueryKey = (
  params?: GetApiV1GroupBuysParams,
) => {
  return [`/api/v1/group-buys`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1GroupBuysQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuys>>,
  TError = ApiResponseError,
>(
  params?: GetApiV1GroupBuysParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuys>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1GroupBuysQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuys>>
  > = ({ signal }) => getApiV1GroupBuys(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuys>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuys>>
>;
export type GetApiV1GroupBuysQueryError = ApiResponseError;

export function useGetApiV1GroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuys>>,
  TError = ApiResponseError,
>(
  params: undefined | GetApiV1GroupBuysParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuys>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuys>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuys>>,
  TError = ApiResponseError,
>(
  params?: GetApiV1GroupBuysParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuys>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuys>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuys>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuys>>,
  TError = ApiResponseError,
>(
  params?: GetApiV1GroupBuysParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuys>>,
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
 * @summary 공구 피드 목록 조회
 */

export function useGetApiV1GroupBuys<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuys>>,
  TError = ApiResponseError,
>(
  params?: GetApiV1GroupBuysParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuys>>,
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
  const queryOptions = getGetApiV1GroupBuysQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * 공구의 상품·매장·픽업·이미지 정보를 조회한다. 비로그인 허용.
 * @summary 공구 상세 조회
 */
export type getApiV1GroupBuysGroupBuyIdResponse200 = {
  data: ApiResponseGroupBuyDetailResponse;
  status: 200;
};

export type getApiV1GroupBuysGroupBuyIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1GroupBuysGroupBuyIdResponseSuccess =
  getApiV1GroupBuysGroupBuyIdResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuysGroupBuyIdResponseError =
  getApiV1GroupBuysGroupBuyIdResponse404 & {
    headers: Headers;
  };

export type getApiV1GroupBuysGroupBuyIdResponse =
  | getApiV1GroupBuysGroupBuyIdResponseSuccess
  | getApiV1GroupBuysGroupBuyIdResponseError;

export const getGetApiV1GroupBuysGroupBuyIdUrl = (groupBuyId: number) => {
  return `/api/v1/group-buys/${groupBuyId}`;
};

export const getApiV1GroupBuysGroupBuyId = async (
  groupBuyId: number,
  options?: RequestInit,
): Promise<getApiV1GroupBuysGroupBuyIdResponse> => {
  return customFetch<getApiV1GroupBuysGroupBuyIdResponse>(
    getGetApiV1GroupBuysGroupBuyIdUrl(groupBuyId),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysGroupBuyIdQueryKey = (groupBuyId: number) => {
  return [`/api/v1/group-buys/${groupBuyId}`] as const;
};

export const getGetApiV1GroupBuysGroupBuyIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
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
    getGetApiV1GroupBuysGroupBuyIdQueryKey(groupBuyId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>
  > = ({ signal }) =>
    getApiV1GroupBuysGroupBuyId(groupBuyId, { signal, ...requestOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!groupBuyId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysGroupBuyIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>
>;
export type GetApiV1GroupBuysGroupBuyIdQueryError = NotFoundResponse;

export function useGetApiV1GroupBuysGroupBuyId<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyId<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyId<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
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
 * @summary 공구 상세 조회
 */

export function useGetApiV1GroupBuysGroupBuyId<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyId>>,
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
  const queryOptions = getGetApiV1GroupBuysGroupBuyIdQueryOptions(
    groupBuyId,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 단일 공구 달성률 조회 (폴링용)
 */
export type getApiV1GroupBuysGroupBuyIdProgressResponse200 = {
  data: ApiResponseGroupBuyProgress;
  status: 200;
};

export type getApiV1GroupBuysGroupBuyIdProgressResponseSuccess =
  getApiV1GroupBuysGroupBuyIdProgressResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuysGroupBuyIdProgressResponse =
  getApiV1GroupBuysGroupBuyIdProgressResponseSuccess;

export const getGetApiV1GroupBuysGroupBuyIdProgressUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/progress`;
};

export const getApiV1GroupBuysGroupBuyIdProgress = async (
  groupBuyId: number,
  options?: RequestInit,
): Promise<getApiV1GroupBuysGroupBuyIdProgressResponse> => {
  return customFetch<getApiV1GroupBuysGroupBuyIdProgressResponse>(
    getGetApiV1GroupBuysGroupBuyIdProgressUrl(groupBuyId),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysGroupBuyIdProgressQueryKey = (
  groupBuyId: number,
) => {
  return [`/api/v1/group-buys/${groupBuyId}/progress`] as const;
};

export const getGetApiV1GroupBuysGroupBuyIdProgressQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
  TError = unknown,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
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
    getGetApiV1GroupBuysGroupBuyIdProgressQueryKey(groupBuyId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>
  > = ({ signal }) =>
    getApiV1GroupBuysGroupBuyIdProgress(groupBuyId, {
      signal,
      ...requestOptions,
    });

  return {
    queryKey,
    queryFn,
    enabled: !!groupBuyId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysGroupBuyIdProgressQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>
>;
export type GetApiV1GroupBuysGroupBuyIdProgressQueryError = unknown;

export function useGetApiV1GroupBuysGroupBuyIdProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
  TError = unknown,
>(
  groupBuyId: number,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
  TError = unknown,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
  TError = unknown,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
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
 * @summary 단일 공구 달성률 조회 (폴링용)
 */

export function useGetApiV1GroupBuysGroupBuyIdProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
  TError = unknown,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdProgress>>,
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
  const queryOptions = getGetApiV1GroupBuysGroupBuyIdProgressQueryOptions(
    groupBuyId,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * 공구 상세 화면 진입 시 및 체류 중 일정 주기(예: 20~30초)로 호출한다.
서버는 세션 TTL을 연장하고 최신 활성 조회자 수를 반환한다.

 * @summary 활성 조회자 heartbeat 조회/갱신
 */
export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse200 = {
  data: ApiResponseGroupBuyViewerCount;
  status: 200;
};

export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseSuccess =
  postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse200 & {
    headers: Headers;
  };
export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseError = (
  | postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse400
  | postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse404
) & {
  headers: Headers;
};

export type postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse =
  | postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseSuccess
  | postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseError;

export const getPostApiV1GroupBuysGroupBuyIdViewersHeartbeatUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/viewers/heartbeat`;
};

export const postApiV1GroupBuysGroupBuyIdViewersHeartbeat = async (
  groupBuyId: number,
  groupBuyViewerHeartbeatRequest: GroupBuyViewerHeartbeatRequest,
  options?: RequestInit,
): Promise<postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse> => {
  return customFetch<postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse>(
    getPostApiV1GroupBuysGroupBuyIdViewersHeartbeatUrl(groupBuyId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(groupBuyViewerHeartbeatRequest),
    },
  );
};

export const getPostApiV1GroupBuysGroupBuyIdViewersHeartbeatMutationOptions = <
  TError = BadRequestResponse | NotFoundResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>,
    TError,
    { groupBuyId: number; data: GroupBuyViewerHeartbeatRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>,
  TError,
  { groupBuyId: number; data: GroupBuyViewerHeartbeatRequest },
  TContext
> => {
  const mutationKey = ['postApiV1GroupBuysGroupBuyIdViewersHeartbeat'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>,
    { groupBuyId: number; data: GroupBuyViewerHeartbeatRequest }
  > = (props) => {
    const { groupBuyId, data } = props ?? {};

    return postApiV1GroupBuysGroupBuyIdViewersHeartbeat(
      groupBuyId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1GroupBuysGroupBuyIdViewersHeartbeatMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>
  >;
export type PostApiV1GroupBuysGroupBuyIdViewersHeartbeatMutationBody =
  GroupBuyViewerHeartbeatRequest;
export type PostApiV1GroupBuysGroupBuyIdViewersHeartbeatMutationError =
  | BadRequestResponse
  | NotFoundResponse;

/**
 * @summary 활성 조회자 heartbeat 조회/갱신
 */
export const usePostApiV1GroupBuysGroupBuyIdViewersHeartbeat = <
  TError = BadRequestResponse | NotFoundResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>,
      TError,
      { groupBuyId: number; data: GroupBuyViewerHeartbeatRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdViewersHeartbeat>>,
  TError,
  { groupBuyId: number; data: GroupBuyViewerHeartbeatRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1GroupBuysGroupBuyIdViewersHeartbeatMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 다건 공구 달성률 조회 (피드 갱신용)
 */
export type getApiV1GroupBuysProgressResponse200 = {
  data: ApiResponseGroupBuyProgressList;
  status: 200;
};

export type getApiV1GroupBuysProgressResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1GroupBuysProgressResponseSuccess =
  getApiV1GroupBuysProgressResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuysProgressResponseError =
  getApiV1GroupBuysProgressResponse400 & {
    headers: Headers;
  };

export type getApiV1GroupBuysProgressResponse =
  | getApiV1GroupBuysProgressResponseSuccess
  | getApiV1GroupBuysProgressResponseError;

export const getGetApiV1GroupBuysProgressUrl = (
  params: GetApiV1GroupBuysProgressParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/group-buys/progress?${stringifiedParams}`
    : `/api/v1/group-buys/progress`;
};

export const getApiV1GroupBuysProgress = async (
  params: GetApiV1GroupBuysProgressParams,
  options?: RequestInit,
): Promise<getApiV1GroupBuysProgressResponse> => {
  return customFetch<getApiV1GroupBuysProgressResponse>(
    getGetApiV1GroupBuysProgressUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysProgressQueryKey = (
  params?: GetApiV1GroupBuysProgressParams,
) => {
  return [`/api/v1/group-buys/progress`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1GroupBuysProgressQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1GroupBuysProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1GroupBuysProgressQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>
  > = ({ signal }) =>
    getApiV1GroupBuysProgress(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysProgressQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>
>;
export type GetApiV1GroupBuysProgressQueryError = BadRequestResponse;

export function useGetApiV1GroupBuysProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1GroupBuysProgressParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1GroupBuysProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1GroupBuysProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
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
 * @summary 다건 공구 달성률 조회 (피드 갱신용)
 */

export function useGetApiV1GroupBuysProgress<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1GroupBuysProgressParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysProgress>>,
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
  const queryOptions = getGetApiV1GroupBuysProgressQueryOptions(
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
 * SNS 공유용 딥링크 URL 및 카드 메타데이터를 반환한다.
 * @summary 공유 메타데이터 조회
 */
export type getApiV1GroupBuysGroupBuyIdShareResponse200 = {
  data: ApiResponseShareMeta;
  status: 200;
};

export type getApiV1GroupBuysGroupBuyIdShareResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1GroupBuysGroupBuyIdShareResponseSuccess =
  getApiV1GroupBuysGroupBuyIdShareResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuysGroupBuyIdShareResponseError =
  getApiV1GroupBuysGroupBuyIdShareResponse404 & {
    headers: Headers;
  };

export type getApiV1GroupBuysGroupBuyIdShareResponse =
  | getApiV1GroupBuysGroupBuyIdShareResponseSuccess
  | getApiV1GroupBuysGroupBuyIdShareResponseError;

export const getGetApiV1GroupBuysGroupBuyIdShareUrl = (groupBuyId: number) => {
  return `/api/v1/group-buys/${groupBuyId}/share`;
};

export const getApiV1GroupBuysGroupBuyIdShare = async (
  groupBuyId: number,
  options?: RequestInit,
): Promise<getApiV1GroupBuysGroupBuyIdShareResponse> => {
  return customFetch<getApiV1GroupBuysGroupBuyIdShareResponse>(
    getGetApiV1GroupBuysGroupBuyIdShareUrl(groupBuyId),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysGroupBuyIdShareQueryKey = (
  groupBuyId: number,
) => {
  return [`/api/v1/group-buys/${groupBuyId}/share`] as const;
};

export const getGetApiV1GroupBuysGroupBuyIdShareQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
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
    getGetApiV1GroupBuysGroupBuyIdShareQueryKey(groupBuyId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>
  > = ({ signal }) =>
    getApiV1GroupBuysGroupBuyIdShare(groupBuyId, { signal, ...requestOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!groupBuyId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysGroupBuyIdShareQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>
>;
export type GetApiV1GroupBuysGroupBuyIdShareQueryError = NotFoundResponse;

export function useGetApiV1GroupBuysGroupBuyIdShare<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdShare<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdShare<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
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
 * @summary 공유 메타데이터 조회
 */

export function useGetApiV1GroupBuysGroupBuyIdShare<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
  TError = NotFoundResponse,
>(
  groupBuyId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdShare>>,
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
  const queryOptions = getGetApiV1GroupBuysGroupBuyIdShareQueryOptions(
    groupBuyId,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * 검색어를 입력하면 동네/베이커리 키워드를 AI로 분석하고 최근 검색어로 저장한다.
분석 결과에 따라 4가지 케이스로 분기한다.
자체 검색 결과가 없을 때 제공되는 recommendedStores는 Naver Local Search 결과 중
베이커리/디저트 도메인으로 분류된 매장만 반환한다.
- case 1: 베이커리 인식, 동네 미인식
- case 2: 동네 인식, 베이커리 미인식
- case 3: 동네+베이커리 모두 인식
- case 4: 모두 인식 불가

 * @summary 검색 실행 및 AI 키워드 분석 (1.1.4-1)
 */
export type postApiV1SearchResponse200 = {
  data: ApiResponseSearchAnalysis;
  status: 200;
};

export type postApiV1SearchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1SearchResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1SearchResponseSuccess = postApiV1SearchResponse200 & {
  headers: Headers;
};
export type postApiV1SearchResponseError = (
  | postApiV1SearchResponse400
  | postApiV1SearchResponse401
) & {
  headers: Headers;
};

export type postApiV1SearchResponse =
  | postApiV1SearchResponseSuccess
  | postApiV1SearchResponseError;

export const getPostApiV1SearchUrl = () => {
  return `/api/v1/search`;
};

export const postApiV1Search = async (
  postApiV1SearchBody: PostApiV1SearchBody,
  options?: RequestInit,
): Promise<postApiV1SearchResponse> => {
  return customFetch<postApiV1SearchResponse>(getPostApiV1SearchUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(postApiV1SearchBody),
  });
};

export const getPostApiV1SearchMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1Search>>,
    TError,
    { data: PostApiV1SearchBody },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1Search>>,
  TError,
  { data: PostApiV1SearchBody },
  TContext
> => {
  const mutationKey = ['postApiV1Search'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1Search>>,
    { data: PostApiV1SearchBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1Search(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1SearchMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1Search>>
>;
export type PostApiV1SearchMutationBody = PostApiV1SearchBody;
export type PostApiV1SearchMutationError =
  | BadRequestResponse
  | UnauthorizedResponse;

/**
 * @summary 검색 실행 및 AI 키워드 분석 (1.1.4-1)
 */
export const usePostApiV1Search = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1Search>>,
      TError,
      { data: PostApiV1SearchBody },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1Search>>,
  TError,
  { data: PostApiV1SearchBody },
  TContext
> => {
  return useMutation(getPostApiV1SearchMutationOptions(options), queryClient);
};
/**
 * 검색창 탭 시 표시할 사용자의 최근 검색어를 최신순으로 반환한다. (1.1.4-10)
동일 검색어는 중복 저장하지 않고 가장 최근 검색 위치로 이동한다.
최근 검색어는 최대 10개까지 반환하며, 검색 이력이 없으면 빈 배열을 반환한다.

 * @summary 최근 검색어 목록 조회
 */
export type getApiV1SearchRecentResponse200 = {
  data: ApiResponseRecentSearchList;
  status: 200;
};

export type getApiV1SearchRecentResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1SearchRecentResponseSuccess =
  getApiV1SearchRecentResponse200 & {
    headers: Headers;
  };
export type getApiV1SearchRecentResponseError =
  getApiV1SearchRecentResponse401 & {
    headers: Headers;
  };

export type getApiV1SearchRecentResponse =
  | getApiV1SearchRecentResponseSuccess
  | getApiV1SearchRecentResponseError;

export const getGetApiV1SearchRecentUrl = () => {
  return `/api/v1/search/recent`;
};

export const getApiV1SearchRecent = async (
  options?: RequestInit,
): Promise<getApiV1SearchRecentResponse> => {
  return customFetch<getApiV1SearchRecentResponse>(
    getGetApiV1SearchRecentUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1SearchRecentQueryKey = () => {
  return [`/api/v1/search/recent`] as const;
};

export const getGetApiV1SearchRecentQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1SearchRecent>>,
  TError = UnauthorizedResponse,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1SearchRecent>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1SearchRecentQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1SearchRecent>>
  > = ({ signal }) => getApiV1SearchRecent({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1SearchRecent>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1SearchRecentQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1SearchRecent>>
>;
export type GetApiV1SearchRecentQueryError = UnauthorizedResponse;

export function useGetApiV1SearchRecent<
  TData = Awaited<ReturnType<typeof getApiV1SearchRecent>>,
  TError = UnauthorizedResponse,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1SearchRecent>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1SearchRecent>>,
          TError,
          Awaited<ReturnType<typeof getApiV1SearchRecent>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1SearchRecent<
  TData = Awaited<ReturnType<typeof getApiV1SearchRecent>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1SearchRecent>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1SearchRecent>>,
          TError,
          Awaited<ReturnType<typeof getApiV1SearchRecent>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1SearchRecent<
  TData = Awaited<ReturnType<typeof getApiV1SearchRecent>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1SearchRecent>>,
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
 * @summary 최근 검색어 목록 조회
 */

export function useGetApiV1SearchRecent<
  TData = Awaited<ReturnType<typeof getApiV1SearchRecent>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1SearchRecent>>,
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
  const queryOptions = getGetApiV1SearchRecentQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 최근 검색어 전체 삭제
 */
export type deleteApiV1SearchRecentResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1SearchRecentResponseSuccess =
  deleteApiV1SearchRecentResponse200 & {
    headers: Headers;
  };
export type deleteApiV1SearchRecentResponse =
  deleteApiV1SearchRecentResponseSuccess;

export const getDeleteApiV1SearchRecentUrl = () => {
  return `/api/v1/search/recent`;
};

export const deleteApiV1SearchRecent = async (
  options?: RequestInit,
): Promise<deleteApiV1SearchRecentResponse> => {
  return customFetch<deleteApiV1SearchRecentResponse>(
    getDeleteApiV1SearchRecentUrl(),
    {
      ...options,
      method: 'DELETE',
    },
  );
};

export const getDeleteApiV1SearchRecentMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1SearchRecent>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1SearchRecent>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['deleteApiV1SearchRecent'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1SearchRecent>>,
    void
  > = () => {
    return deleteApiV1SearchRecent(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1SearchRecentMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1SearchRecent>>
>;

export type DeleteApiV1SearchRecentMutationError = unknown;

/**
 * @summary 최근 검색어 전체 삭제
 */
export const useDeleteApiV1SearchRecent = <
  TError = unknown,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteApiV1SearchRecent>>,
      TError,
      void,
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1SearchRecent>>,
  TError,
  void,
  TContext
> => {
  return useMutation(
    getDeleteApiV1SearchRecentMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 최근 검색어 단건 삭제
 */
export type deleteApiV1SearchRecentKeywordResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1SearchRecentKeywordResponseSuccess =
  deleteApiV1SearchRecentKeywordResponse200 & {
    headers: Headers;
  };
export type deleteApiV1SearchRecentKeywordResponse =
  deleteApiV1SearchRecentKeywordResponseSuccess;

export const getDeleteApiV1SearchRecentKeywordUrl = (keyword: string) => {
  return `/api/v1/search/recent/${keyword}`;
};

export const deleteApiV1SearchRecentKeyword = async (
  keyword: string,
  options?: RequestInit,
): Promise<deleteApiV1SearchRecentKeywordResponse> => {
  return customFetch<deleteApiV1SearchRecentKeywordResponse>(
    getDeleteApiV1SearchRecentKeywordUrl(keyword),
    {
      ...options,
      method: 'DELETE',
    },
  );
};

export const getDeleteApiV1SearchRecentKeywordMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>,
    TError,
    { keyword: string },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>,
  TError,
  { keyword: string },
  TContext
> => {
  const mutationKey = ['deleteApiV1SearchRecentKeyword'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>,
    { keyword: string }
  > = (props) => {
    const { keyword } = props ?? {};

    return deleteApiV1SearchRecentKeyword(keyword, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1SearchRecentKeywordMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>
>;

export type DeleteApiV1SearchRecentKeywordMutationError = unknown;

/**
 * @summary 최근 검색어 단건 삭제
 */
export const useDeleteApiV1SearchRecentKeyword = <
  TError = unknown,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>,
      TError,
      { keyword: string },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1SearchRecentKeyword>>,
  TError,
  { keyword: string },
  TContext
> => {
  return useMutation(
    getDeleteApiV1SearchRecentKeywordMutationOptions(options),
    queryClient,
  );
};
