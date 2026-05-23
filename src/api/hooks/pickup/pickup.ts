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
  ApiResponseNearestPickupQr,
  ApiResponsePickupInfo,
  ApiResponsePickupVerify,
  ApiResponseQrCode,
  ConflictResponse,
  ForbiddenResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 픽업 안내 정보 조회
 */
export type getApiV1ParticipationsParticipationIdPickupResponse200 = {
  data: ApiResponsePickupInfo
  status: 200
}

export type getApiV1ParticipationsParticipationIdPickupResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getApiV1ParticipationsParticipationIdPickupResponse409 = {
  data: ConflictResponse
  status: 409
}

export type getApiV1ParticipationsParticipationIdPickupResponseSuccess = (getApiV1ParticipationsParticipationIdPickupResponse200) & {
  headers: Headers;
};
export type getApiV1ParticipationsParticipationIdPickupResponseError = (getApiV1ParticipationsParticipationIdPickupResponse403 | getApiV1ParticipationsParticipationIdPickupResponse409) & {
  headers: Headers;
};

export type getApiV1ParticipationsParticipationIdPickupResponse = (getApiV1ParticipationsParticipationIdPickupResponseSuccess | getApiV1ParticipationsParticipationIdPickupResponseError)

export const getGetApiV1ParticipationsParticipationIdPickupUrl = (participationId: number,) => {




  return `/api/v1/participations/${participationId}/pickup`
}

export const getApiV1ParticipationsParticipationIdPickup = async (participationId: number, options?: RequestInit): Promise<getApiV1ParticipationsParticipationIdPickupResponse> => {

  return customFetch<getApiV1ParticipationsParticipationIdPickupResponse>(getGetApiV1ParticipationsParticipationIdPickupUrl(participationId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1ParticipationsParticipationIdPickupQueryKey = (participationId: number,) => {
    return [
    `/api/v1/participations/${participationId}/pickup`
    ] as const;
    }


export const getGetApiV1ParticipationsParticipationIdPickupQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError = ForbiddenResponse | ConflictResponse>(participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1ParticipationsParticipationIdPickupQueryKey(participationId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>> = ({ signal }) => getApiV1ParticipationsParticipationIdPickup(participationId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(participationId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1ParticipationsParticipationIdPickupQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>>
export type GetApiV1ParticipationsParticipationIdPickupQueryError = ForbiddenResponse | ConflictResponse


export function useGetApiV1ParticipationsParticipationIdPickup<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError = ForbiddenResponse | ConflictResponse>(
 participationId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ParticipationsParticipationIdPickup<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError = ForbiddenResponse | ConflictResponse>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ParticipationsParticipationIdPickup<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError = ForbiddenResponse | ConflictResponse>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 픽업 안내 정보 조회
 */

export function useGetApiV1ParticipationsParticipationIdPickup<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError = ForbiddenResponse | ConflictResponse>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdPickup>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1ParticipationsParticipationIdPickupQueryOptions(participationId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * @summary QR 픽업 코드 조회
 */
export type getApiV1ParticipationsParticipationIdQrResponse200 = {
  data: ApiResponseQrCode
  status: 200
}

export type getApiV1ParticipationsParticipationIdQrResponseSuccess = (getApiV1ParticipationsParticipationIdQrResponse200) & {
  headers: Headers;
};
;

export type getApiV1ParticipationsParticipationIdQrResponse = (getApiV1ParticipationsParticipationIdQrResponseSuccess)

export const getGetApiV1ParticipationsParticipationIdQrUrl = (participationId: number,) => {




  return `/api/v1/participations/${participationId}/qr`
}

export const getApiV1ParticipationsParticipationIdQr = async (participationId: number, options?: RequestInit): Promise<getApiV1ParticipationsParticipationIdQrResponse> => {

  return customFetch<getApiV1ParticipationsParticipationIdQrResponse>(getGetApiV1ParticipationsParticipationIdQrUrl(participationId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1ParticipationsParticipationIdQrQueryKey = (participationId: number,) => {
    return [
    `/api/v1/participations/${participationId}/qr`
    ] as const;
    }


export const getGetApiV1ParticipationsParticipationIdQrQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError = unknown>(participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1ParticipationsParticipationIdQrQueryKey(participationId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>> = ({ signal }) => getApiV1ParticipationsParticipationIdQr(participationId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: !!(participationId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1ParticipationsParticipationIdQrQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>>
export type GetApiV1ParticipationsParticipationIdQrQueryError = unknown


export function useGetApiV1ParticipationsParticipationIdQr<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError = unknown>(
 participationId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ParticipationsParticipationIdQr<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError = unknown>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>,
          TError,
          Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1ParticipationsParticipationIdQr<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError = unknown>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary QR 픽업 코드 조회
 */

export function useGetApiV1ParticipationsParticipationIdQr<TData = Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError = unknown>(
 participationId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1ParticipationsParticipationIdQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1ParticipationsParticipationIdQrQueryOptions(participationId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * 피드 진입 시 사용자의 가장 가까운 픽업 QR 후보를 조회한다.
당일 픽업 예정 건이 있으면 픽업 시작 시간이 가장 빠른 건을 반환하고,
당일 건이 여러 개면 hasMultipleToday=true로 내려준다.
당일 픽업 건이 없고 향후 픽업 예정 건만 있으면 LOCKED 상태와 qrCode=null로 반환한다.

 * @summary 피드용 가장 가까운 픽업 QR 조회
 */
export type getApiV1PickupsMeNearestQrResponse200 = {
  data: ApiResponseNearestPickupQr
  status: 200
}

export type getApiV1PickupsMeNearestQrResponseSuccess = (getApiV1PickupsMeNearestQrResponse200) & {
  headers: Headers;
};
;

export type getApiV1PickupsMeNearestQrResponse = (getApiV1PickupsMeNearestQrResponseSuccess)

export const getGetApiV1PickupsMeNearestQrUrl = () => {




  return `/api/v1/pickups/me/nearest-qr`
}

export const getApiV1PickupsMeNearestQr = async ( options?: RequestInit): Promise<getApiV1PickupsMeNearestQrResponse> => {

  return customFetch<getApiV1PickupsMeNearestQrResponse>(getGetApiV1PickupsMeNearestQrUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetApiV1PickupsMeNearestQrQueryKey = () => {
    return [
    `/api/v1/pickups/me/nearest-qr`
    ] as const;
    }


export const getGetApiV1PickupsMeNearestQrQueryOptions = <TData = Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV1PickupsMeNearestQrQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>> = ({ signal }) => getApiV1PickupsMeNearestQr({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV1PickupsMeNearestQrQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>>
export type GetApiV1PickupsMeNearestQrQueryError = unknown


export function useGetApiV1PickupsMeNearestQr<TData = Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>,
          TError,
          Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1PickupsMeNearestQr<TData = Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>,
          TError,
          Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV1PickupsMeNearestQr<TData = Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 피드용 가장 가까운 픽업 QR 조회
 */

export function useGetApiV1PickupsMeNearestQr<TData = Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV1PickupsMeNearestQr>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV1PickupsMeNearestQrQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






/**
 * ADMIN 또는 SELLER 권한 사용자가 소비자 QR을 스캔하면 대기 → 완료로 자동 전환된다.
 * @summary QR 코드 스캔 검증 및 수령 처리
 */
export type postApiV1PickupsQrCodeVerifyResponse200 = {
  data: ApiResponsePickupVerify
  status: 200
}

export type postApiV1PickupsQrCodeVerifyResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1PickupsQrCodeVerifyResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1PickupsQrCodeVerifyResponseSuccess = (postApiV1PickupsQrCodeVerifyResponse200) & {
  headers: Headers;
};
export type postApiV1PickupsQrCodeVerifyResponseError = (postApiV1PickupsQrCodeVerifyResponse403 | postApiV1PickupsQrCodeVerifyResponse409) & {
  headers: Headers;
};

export type postApiV1PickupsQrCodeVerifyResponse = (postApiV1PickupsQrCodeVerifyResponseSuccess | postApiV1PickupsQrCodeVerifyResponseError)

export const getPostApiV1PickupsQrCodeVerifyUrl = (qrCode: string,) => {




  return `/api/v1/pickups/${qrCode}/verify`
}

export const postApiV1PickupsQrCodeVerify = async (qrCode: string, options?: RequestInit): Promise<postApiV1PickupsQrCodeVerifyResponse> => {

  return customFetch<postApiV1PickupsQrCodeVerifyResponse>(getPostApiV1PickupsQrCodeVerifyUrl(qrCode),
  {
    ...options,
    method: 'POST'


  }
);}




export const getPostApiV1PickupsQrCodeVerifyMutationOptions = <TError = ForbiddenResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>, TError,{qrCode: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>, TError,{qrCode: string}, TContext> => {

const mutationKey = ['postApiV1PickupsQrCodeVerify'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>, {qrCode: string}> = (props) => {
          const {qrCode} = props ?? {};

          return  postApiV1PickupsQrCodeVerify(qrCode,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1PickupsQrCodeVerifyMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>>

    export type PostApiV1PickupsQrCodeVerifyMutationError = ForbiddenResponse | ConflictResponse

    /**
 * @summary QR 코드 스캔 검증 및 수령 처리
 */
export const usePostApiV1PickupsQrCodeVerify = <TError = ForbiddenResponse | ConflictResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>, TError,{qrCode: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1PickupsQrCodeVerify>>,
        TError,
        {qrCode: string},
        TContext
      > => {
      return useMutation(getPostApiV1PickupsQrCodeVerifyMutationOptions(options), queryClient);
    }
