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
  ApiResponseWishlistPage,
  GetApiV1WishlistsParams,
  NotFoundResponse,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 찜 추가
 */
export type postApiV1GroupBuysGroupBuyIdWishlistResponse201 = {
  data: SuccessNoDataResponse;
  status: 201;
};

export type postApiV1GroupBuysGroupBuyIdWishlistResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuysGroupBuyIdWishlistResponseSuccess =
  postApiV1GroupBuysGroupBuyIdWishlistResponse201 & {
    headers: Headers;
  };
export type postApiV1GroupBuysGroupBuyIdWishlistResponseError =
  postApiV1GroupBuysGroupBuyIdWishlistResponse401 & {
    headers: Headers;
  };

export type postApiV1GroupBuysGroupBuyIdWishlistResponse =
  | postApiV1GroupBuysGroupBuyIdWishlistResponseSuccess
  | postApiV1GroupBuysGroupBuyIdWishlistResponseError;

export const getPostApiV1GroupBuysGroupBuyIdWishlistUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/wishlist`;
};

export const postApiV1GroupBuysGroupBuyIdWishlist = async (
  groupBuyId: number,
  options?: RequestInit,
): Promise<postApiV1GroupBuysGroupBuyIdWishlistResponse> => {
  return customFetch<postApiV1GroupBuysGroupBuyIdWishlistResponse>(
    getPostApiV1GroupBuysGroupBuyIdWishlistUrl(groupBuyId),
    {
      ...options,
      method: 'POST',
    },
  );
};

export const getPostApiV1GroupBuysGroupBuyIdWishlistMutationOptions = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>,
    TError,
    { groupBuyId: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>,
  TError,
  { groupBuyId: number },
  TContext
> => {
  const mutationKey = ['postApiV1GroupBuysGroupBuyIdWishlist'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>,
    { groupBuyId: number }
  > = (props) => {
    const { groupBuyId } = props ?? {};

    return postApiV1GroupBuysGroupBuyIdWishlist(groupBuyId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1GroupBuysGroupBuyIdWishlistMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>
>;

export type PostApiV1GroupBuysGroupBuyIdWishlistMutationError =
  UnauthorizedResponse;

/**
 * @summary 찜 추가
 */
export const usePostApiV1GroupBuysGroupBuyIdWishlist = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>,
      TError,
      { groupBuyId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdWishlist>>,
  TError,
  { groupBuyId: number },
  TContext
> => {
  return useMutation(
    getPostApiV1GroupBuysGroupBuyIdWishlistMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 찜 해제
 */
export type deleteApiV1GroupBuysGroupBuyIdWishlistResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1GroupBuysGroupBuyIdWishlistResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type deleteApiV1GroupBuysGroupBuyIdWishlistResponseSuccess =
  deleteApiV1GroupBuysGroupBuyIdWishlistResponse200 & {
    headers: Headers;
  };
export type deleteApiV1GroupBuysGroupBuyIdWishlistResponseError =
  deleteApiV1GroupBuysGroupBuyIdWishlistResponse404 & {
    headers: Headers;
  };

export type deleteApiV1GroupBuysGroupBuyIdWishlistResponse =
  | deleteApiV1GroupBuysGroupBuyIdWishlistResponseSuccess
  | deleteApiV1GroupBuysGroupBuyIdWishlistResponseError;

export const getDeleteApiV1GroupBuysGroupBuyIdWishlistUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/wishlist`;
};

export const deleteApiV1GroupBuysGroupBuyIdWishlist = async (
  groupBuyId: number,
  options?: RequestInit,
): Promise<deleteApiV1GroupBuysGroupBuyIdWishlistResponse> => {
  return customFetch<deleteApiV1GroupBuysGroupBuyIdWishlistResponse>(
    getDeleteApiV1GroupBuysGroupBuyIdWishlistUrl(groupBuyId),
    {
      ...options,
      method: 'DELETE',
    },
  );
};

export const getDeleteApiV1GroupBuysGroupBuyIdWishlistMutationOptions = <
  TError = NotFoundResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>,
    TError,
    { groupBuyId: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>,
  TError,
  { groupBuyId: number },
  TContext
> => {
  const mutationKey = ['deleteApiV1GroupBuysGroupBuyIdWishlist'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>,
    { groupBuyId: number }
  > = (props) => {
    const { groupBuyId } = props ?? {};

    return deleteApiV1GroupBuysGroupBuyIdWishlist(groupBuyId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1GroupBuysGroupBuyIdWishlistMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>
>;

export type DeleteApiV1GroupBuysGroupBuyIdWishlistMutationError =
  NotFoundResponse;

/**
 * @summary 찜 해제
 */
export const useDeleteApiV1GroupBuysGroupBuyIdWishlist = <
  TError = NotFoundResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>,
      TError,
      { groupBuyId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1GroupBuysGroupBuyIdWishlist>>,
  TError,
  { groupBuyId: number },
  TContext
> => {
  return useMutation(
    getDeleteApiV1GroupBuysGroupBuyIdWishlistMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 찜 목록 조회
 */
export type getApiV1WishlistsResponse200 = {
  data: ApiResponseWishlistPage;
  status: 200;
};

export type getApiV1WishlistsResponseSuccess = getApiV1WishlistsResponse200 & {
  headers: Headers;
};
export type getApiV1WishlistsResponse = getApiV1WishlistsResponseSuccess;

export const getGetApiV1WishlistsUrl = (params?: GetApiV1WishlistsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/wishlists?${stringifiedParams}`
    : `/api/v1/wishlists`;
};

export const getApiV1Wishlists = async (
  params?: GetApiV1WishlistsParams,
  options?: RequestInit,
): Promise<getApiV1WishlistsResponse> => {
  return customFetch<getApiV1WishlistsResponse>(
    getGetApiV1WishlistsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1WishlistsQueryKey = (
  params?: GetApiV1WishlistsParams,
) => {
  return [`/api/v1/wishlists`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1WishlistsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1Wishlists>>,
  TError = unknown,
>(
  params?: GetApiV1WishlistsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Wishlists>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1WishlistsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1Wishlists>>
  > = ({ signal }) => getApiV1Wishlists(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1Wishlists>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1WishlistsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1Wishlists>>
>;
export type GetApiV1WishlistsQueryError = unknown;

export function useGetApiV1Wishlists<
  TData = Awaited<ReturnType<typeof getApiV1Wishlists>>,
  TError = unknown,
>(
  params: undefined | GetApiV1WishlistsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Wishlists>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Wishlists>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Wishlists>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Wishlists<
  TData = Awaited<ReturnType<typeof getApiV1Wishlists>>,
  TError = unknown,
>(
  params?: GetApiV1WishlistsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Wishlists>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Wishlists>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Wishlists>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Wishlists<
  TData = Awaited<ReturnType<typeof getApiV1Wishlists>>,
  TError = unknown,
>(
  params?: GetApiV1WishlistsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Wishlists>>,
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
 * @summary 찜 목록 조회
 */

export function useGetApiV1Wishlists<
  TData = Awaited<ReturnType<typeof getApiV1Wishlists>>,
  TError = unknown,
>(
  params?: GetApiV1WishlistsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Wishlists>>,
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
  const queryOptions = getGetApiV1WishlistsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}
