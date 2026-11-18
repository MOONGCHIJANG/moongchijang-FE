/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import {
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ApiResponseProductDetail,
  ApiResponseProductFeed,
  ApiResponseProductShare,
  BadRequestResponse,
  GetApiV1ProductsParams,
  NotFoundResponse
} from '../api.schemas';

import { customFetch } from '../../custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 홈 피드 상품 목록 조회
 */
export type getApiV1ProductsResponse200 = {
  data: ApiResponseProductFeed
  status: 200
}

export type getApiV1ProductsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1ProductsResponseSuccess = (getApiV1ProductsResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsResponseError = (getApiV1ProductsResponse400) & {
  headers: Headers;
};

export type getApiV1ProductsResponse = (getApiV1ProductsResponseSuccess | getApiV1ProductsResponseError)

export const getGetApiV1ProductsUrl = (params?: GetApiV1ProductsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["categoryCodes","districts"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : v.toString());
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/products?${stringifiedParams}` : `/api/v1/products`
}

export const getApiV1Products = async (params?: GetApiV1ProductsParams, options?: RequestInit): Promise<getApiV1ProductsResponse> => {

  return customFetch<getApiV1ProductsResponse>(getGetApiV1ProductsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1ProductsQueryKey = (params?: GetApiV1ProductsParams,) => {
    return [
    `/api/v1/products`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetApiV1ProductsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1Products>>, TError = BadRequestResponse>(params?: GetApiV1ProductsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1ProductsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1Products>>> = ({ signal }) => getApiV1Products(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1ProductsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1Products>>>
export type GetApiV1ProductsQueryError = BadRequestResponse


export function useGetApiV1Products<TData = Awaited<ReturnType<typeof getApiV1Products>>, TError = BadRequestResponse>(
 params: undefined |  GetApiV1ProductsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Products>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Products>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1Products<TData = Awaited<ReturnType<typeof getApiV1Products>>, TError = BadRequestResponse>(
 params?: GetApiV1ProductsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Products>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Products>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1Products<TData = Awaited<ReturnType<typeof getApiV1Products>>, TError = BadRequestResponse>(
 params?: GetApiV1ProductsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 홈 피드 상품 목록 조회
 */

export function useGetApiV1Products<TData = Awaited<ReturnType<typeof getApiV1Products>>, TError = BadRequestResponse>(
 params?: GetApiV1ProductsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1Products>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1ProductsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 상품 상세 조회
 */
export type getApiV1ProductsProductIdResponse200 = {
  data: ApiResponseProductDetail
  status: 200
}

export type getApiV1ProductsProductIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1ProductsProductIdResponseSuccess = (getApiV1ProductsProductIdResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsProductIdResponseError = (getApiV1ProductsProductIdResponse404) & {
  headers: Headers;
};

export type getApiV1ProductsProductIdResponse = (getApiV1ProductsProductIdResponseSuccess | getApiV1ProductsProductIdResponseError)

export const getGetApiV1ProductsProductIdUrl = (productId: number,) => {




  return `/api/v1/products/${productId}`
}

export const getApiV1ProductsProductId = async (productId: number, options?: RequestInit): Promise<getApiV1ProductsProductIdResponse> => {

  return customFetch<getApiV1ProductsProductIdResponse>(getGetApiV1ProductsProductIdUrl(productId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1ProductsProductIdQueryKey = (productId: number,) => {
    return [
    `/api/v1/products/${productId}`
    ] as const;
    }


export const getGetApiV1ProductsProductIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError = NotFoundResponse>(productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1ProductsProductIdQueryKey(productId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1ProductsProductId>>> = ({ signal }) => getApiV1ProductsProductId(productId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(productId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1ProductsProductIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1ProductsProductId>>>
export type GetApiV1ProductsProductIdQueryError = NotFoundResponse


export function useGetApiV1ProductsProductId<TData = Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError = NotFoundResponse>(
 productId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ProductsProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ProductsProductId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ProductsProductId<TData = Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ProductsProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ProductsProductId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ProductsProductId<TData = Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 상품 상세 조회
 */

export function useGetApiV1ProductsProductId<TData = Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductId>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1ProductsProductIdQueryOptions(productId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary 상품 공유 메타데이터 조회
 */
export type getApiV1ProductsProductIdShareResponse200 = {
  data: ApiResponseProductShare
  status: 200
}

export type getApiV1ProductsProductIdShareResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1ProductsProductIdShareResponseSuccess = (getApiV1ProductsProductIdShareResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsProductIdShareResponseError = (getApiV1ProductsProductIdShareResponse404) & {
  headers: Headers;
};

export type getApiV1ProductsProductIdShareResponse = (getApiV1ProductsProductIdShareResponseSuccess | getApiV1ProductsProductIdShareResponseError)

export const getGetApiV1ProductsProductIdShareUrl = (productId: number,) => {




  return `/api/v1/products/${productId}/share`
}

export const getApiV1ProductsProductIdShare = async (productId: number, options?: RequestInit): Promise<getApiV1ProductsProductIdShareResponse> => {

  return customFetch<getApiV1ProductsProductIdShareResponse>(getGetApiV1ProductsProductIdShareUrl(productId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1ProductsProductIdShareQueryKey = (productId: number,) => {
    return [
    `/api/v1/products/${productId}/share`
    ] as const;
    }


export const getGetApiV1ProductsProductIdShareQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError = NotFoundResponse>(productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1ProductsProductIdShareQueryKey(productId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>> = ({ signal }) => getApiV1ProductsProductIdShare(productId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(productId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1ProductsProductIdShareQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>>
export type GetApiV1ProductsProductIdShareQueryError = NotFoundResponse


export function useGetApiV1ProductsProductIdShare<TData = Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError = NotFoundResponse>(
 productId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ProductsProductIdShare<TData = Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ProductsProductIdShare<TData = Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 상품 공유 메타데이터 조회
 */

export function useGetApiV1ProductsProductIdShare<TData = Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError = NotFoundResponse>(
 productId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ProductsProductIdShare>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1ProductsProductIdShareQueryOptions(productId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






