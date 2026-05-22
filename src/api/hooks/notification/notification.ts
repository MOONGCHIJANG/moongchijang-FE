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
  ApiResponseNotificationListResponse,
  ApiResponseNotificationUnreadCountResponse,
  BadRequestResponse,
  ForbiddenResponse,
  GetApiV1NotificationsParams,
  NotFoundResponse,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 알림 목록 조회 (폴링용)
 */
export type getApiV1NotificationsResponse200 = {
  data: ApiResponseNotificationListResponse;
  status: 200;
};

export type getApiV1NotificationsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1NotificationsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1NotificationsResponseSuccess =
  getApiV1NotificationsResponse200 & {
    headers: Headers;
  };
export type getApiV1NotificationsResponseError = (
  | getApiV1NotificationsResponse400
  | getApiV1NotificationsResponse401
) & {
  headers: Headers;
};

export type getApiV1NotificationsResponse =
  | getApiV1NotificationsResponseSuccess
  | getApiV1NotificationsResponseError;

export const getGetApiV1NotificationsUrl = (
  params?: GetApiV1NotificationsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/notifications?${stringifiedParams}`
    : `/api/v1/notifications`;
};

export const getApiV1Notifications = async (
  params?: GetApiV1NotificationsParams,
  options?: RequestInit,
): Promise<getApiV1NotificationsResponse> => {
  return customFetch<getApiV1NotificationsResponse>(
    getGetApiV1NotificationsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1NotificationsQueryKey = (
  params?: GetApiV1NotificationsParams,
) => {
  return [`/api/v1/notifications`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1NotificationsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1Notifications>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params?: GetApiV1NotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Notifications>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1NotificationsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1Notifications>>
  > = ({ signal }) =>
    getApiV1Notifications(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1Notifications>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1NotificationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1Notifications>>
>;
export type GetApiV1NotificationsQueryError =
  | BadRequestResponse
  | UnauthorizedResponse;

export function useGetApiV1Notifications<
  TData = Awaited<ReturnType<typeof getApiV1Notifications>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: undefined | GetApiV1NotificationsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Notifications>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Notifications>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Notifications>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Notifications<
  TData = Awaited<ReturnType<typeof getApiV1Notifications>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params?: GetApiV1NotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Notifications>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Notifications>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Notifications>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Notifications<
  TData = Awaited<ReturnType<typeof getApiV1Notifications>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params?: GetApiV1NotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Notifications>>,
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
 * @summary 알림 목록 조회 (폴링용)
 */

export function useGetApiV1Notifications<
  TData = Awaited<ReturnType<typeof getApiV1Notifications>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params?: GetApiV1NotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Notifications>>,
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
  const queryOptions = getGetApiV1NotificationsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 미읽음 알림 개수 조회
 */
export type getApiV1NotificationsUnreadCountResponse200 = {
  data: ApiResponseNotificationUnreadCountResponse;
  status: 200;
};

export type getApiV1NotificationsUnreadCountResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1NotificationsUnreadCountResponseSuccess =
  getApiV1NotificationsUnreadCountResponse200 & {
    headers: Headers;
  };
export type getApiV1NotificationsUnreadCountResponseError =
  getApiV1NotificationsUnreadCountResponse401 & {
    headers: Headers;
  };

export type getApiV1NotificationsUnreadCountResponse =
  | getApiV1NotificationsUnreadCountResponseSuccess
  | getApiV1NotificationsUnreadCountResponseError;

export const getGetApiV1NotificationsUnreadCountUrl = () => {
  return `/api/v1/notifications/unread-count`;
};

export const getApiV1NotificationsUnreadCount = async (
  options?: RequestInit,
): Promise<getApiV1NotificationsUnreadCountResponse> => {
  return customFetch<getApiV1NotificationsUnreadCountResponse>(
    getGetApiV1NotificationsUnreadCountUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1NotificationsUnreadCountQueryKey = () => {
  return [`/api/v1/notifications/unread-count`] as const;
};

export const getGetApiV1NotificationsUnreadCountQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
  TError = UnauthorizedResponse,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1NotificationsUnreadCountQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>
  > = ({ signal }) =>
    getApiV1NotificationsUnreadCount({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1NotificationsUnreadCountQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>
>;
export type GetApiV1NotificationsUnreadCountQueryError = UnauthorizedResponse;

export function useGetApiV1NotificationsUnreadCount<
  TData = Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
  TError = UnauthorizedResponse,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1NotificationsUnreadCount<
  TData = Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1NotificationsUnreadCount<
  TData = Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
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
 * @summary 미읽음 알림 개수 조회
 */

export function useGetApiV1NotificationsUnreadCount<
  TData = Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1NotificationsUnreadCount>>,
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
  const queryOptions = getGetApiV1NotificationsUnreadCountQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * @summary 전체 알림 읽음 처리
 */
export type patchApiV1NotificationsReadAllResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type patchApiV1NotificationsReadAllResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1NotificationsReadAllResponseSuccess =
  patchApiV1NotificationsReadAllResponse200 & {
    headers: Headers;
  };
export type patchApiV1NotificationsReadAllResponseError =
  patchApiV1NotificationsReadAllResponse401 & {
    headers: Headers;
  };

export type patchApiV1NotificationsReadAllResponse =
  | patchApiV1NotificationsReadAllResponseSuccess
  | patchApiV1NotificationsReadAllResponseError;

export const getPatchApiV1NotificationsReadAllUrl = () => {
  return `/api/v1/notifications/read-all`;
};

export const patchApiV1NotificationsReadAll = async (
  options?: RequestInit,
): Promise<patchApiV1NotificationsReadAllResponse> => {
  return customFetch<patchApiV1NotificationsReadAllResponse>(
    getPatchApiV1NotificationsReadAllUrl(),
    {
      ...options,
      method: 'PATCH',
    },
  );
};

export const getPatchApiV1NotificationsReadAllMutationOptions = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['patchApiV1NotificationsReadAll'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>,
    void
  > = () => {
    return patchApiV1NotificationsReadAll(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiV1NotificationsReadAllMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>
>;

export type PatchApiV1NotificationsReadAllMutationError = UnauthorizedResponse;

/**
 * @summary 전체 알림 읽음 처리
 */
export const usePatchApiV1NotificationsReadAll = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>,
      TError,
      void,
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchApiV1NotificationsReadAll>>,
  TError,
  void,
  TContext
> => {
  return useMutation(
    getPatchApiV1NotificationsReadAllMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 알림 단건 읽음 처리
 */
export type patchApiV1NotificationsNotificationIdReadResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type patchApiV1NotificationsNotificationIdReadResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1NotificationsNotificationIdReadResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1NotificationsNotificationIdReadResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type patchApiV1NotificationsNotificationIdReadResponseSuccess =
  patchApiV1NotificationsNotificationIdReadResponse200 & {
    headers: Headers;
  };
export type patchApiV1NotificationsNotificationIdReadResponseError = (
  | patchApiV1NotificationsNotificationIdReadResponse401
  | patchApiV1NotificationsNotificationIdReadResponse403
  | patchApiV1NotificationsNotificationIdReadResponse404
) & {
  headers: Headers;
};

export type patchApiV1NotificationsNotificationIdReadResponse =
  | patchApiV1NotificationsNotificationIdReadResponseSuccess
  | patchApiV1NotificationsNotificationIdReadResponseError;

export const getPatchApiV1NotificationsNotificationIdReadUrl = (
  notificationId: number,
) => {
  return `/api/v1/notifications/${notificationId}/read`;
};

export const patchApiV1NotificationsNotificationIdRead = async (
  notificationId: number,
  options?: RequestInit,
): Promise<patchApiV1NotificationsNotificationIdReadResponse> => {
  return customFetch<patchApiV1NotificationsNotificationIdReadResponse>(
    getPatchApiV1NotificationsNotificationIdReadUrl(notificationId),
    {
      ...options,
      method: 'PATCH',
    },
  );
};

export const getPatchApiV1NotificationsNotificationIdReadMutationOptions = <
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>,
    TError,
    { notificationId: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>,
  TError,
  { notificationId: number },
  TContext
> => {
  const mutationKey = ['patchApiV1NotificationsNotificationIdRead'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>,
    { notificationId: number }
  > = (props) => {
    const { notificationId } = props ?? {};

    return patchApiV1NotificationsNotificationIdRead(
      notificationId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiV1NotificationsNotificationIdReadMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>
  >;

export type PatchApiV1NotificationsNotificationIdReadMutationError =
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse;

/**
 * @summary 알림 단건 읽음 처리
 */
export const usePatchApiV1NotificationsNotificationIdRead = <
  TError = UnauthorizedResponse | ForbiddenResponse | NotFoundResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>,
      TError,
      { notificationId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchApiV1NotificationsNotificationIdRead>>,
  TError,
  { notificationId: number },
  TContext
> => {
  return useMutation(
    getPatchApiV1NotificationsNotificationIdReadMutationOptions(options),
    queryClient,
  );
};
