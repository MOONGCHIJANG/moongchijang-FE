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
  ApiResponseHomeTogetherStatus
} from '../api.schemas';

import { customFetch } from '../../custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 홈 함께 사기 현황 조회
 */
export type getApiV1HomeTogetherResponse200 = {
  data: ApiResponseHomeTogetherStatus
  status: 200
}

export type getApiV1HomeTogetherResponseSuccess = (getApiV1HomeTogetherResponse200) & {
  headers: Headers;
};
;

export type getApiV1HomeTogetherResponse = (getApiV1HomeTogetherResponseSuccess)

export const getGetApiV1HomeTogetherUrl = () => {




  return `/api/v1/home/together`
}

export const getApiV1HomeTogether = async ( options?: RequestInit): Promise<getApiV1HomeTogetherResponse> => {

  return customFetch<getApiV1HomeTogetherResponse>(getGetApiV1HomeTogetherUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1HomeTogetherQueryKey = () => {
    return [
    `/api/v1/home/together`
    ] as const;
    }


export const getGetApiV1HomeTogetherQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1HomeTogetherQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1HomeTogether>>> = ({ signal }) => getApiV1HomeTogether({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1HomeTogetherQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1HomeTogether>>>
export type GetApiV1HomeTogetherQueryError = unknown


export function useGetApiV1HomeTogether<TData = Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1HomeTogether>>,
          TError,
          Awaited<ReturnType<typeof getApiV1HomeTogether>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1HomeTogether<TData = Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1HomeTogether>>,
          TError,
          Awaited<ReturnType<typeof getApiV1HomeTogether>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1HomeTogether<TData = Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 홈 함께 사기 현황 조회
 */

export function useGetApiV1HomeTogether<TData = Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1HomeTogether>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1HomeTogetherQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






