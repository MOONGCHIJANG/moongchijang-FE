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
  ApiResponseParticipationCreated,
  ApiResponseRefundList,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  ParticipationCreate,
  PaymentConfirm,
  PaymentFail,
  SuccessNoDataResponse,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 공구 참여 (결제 요청 생성)
 */
export type postApiV1GroupBuysGroupBuyIdParticipationsResponse201 = {
  data: ApiResponseParticipationCreated;
  status: 201;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponseSuccess =
  postApiV1GroupBuysGroupBuyIdParticipationsResponse201 & {
    headers: Headers;
  };
export type postApiV1GroupBuysGroupBuyIdParticipationsResponseError = (
  | postApiV1GroupBuysGroupBuyIdParticipationsResponse400
  | postApiV1GroupBuysGroupBuyIdParticipationsResponse401
  | postApiV1GroupBuysGroupBuyIdParticipationsResponse409
) & {
  headers: Headers;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse =
  | postApiV1GroupBuysGroupBuyIdParticipationsResponseSuccess
  | postApiV1GroupBuysGroupBuyIdParticipationsResponseError;

export const getPostApiV1GroupBuysGroupBuyIdParticipationsUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/participations`;
};

export const postApiV1GroupBuysGroupBuyIdParticipations = async (
  groupBuyId: number,
  participationCreate: ParticipationCreate,
  options?: RequestInit,
): Promise<postApiV1GroupBuysGroupBuyIdParticipationsResponse> => {
  return customFetch<postApiV1GroupBuysGroupBuyIdParticipationsResponse>(
    getPostApiV1GroupBuysGroupBuyIdParticipationsUrl(groupBuyId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(participationCreate),
    },
  );
};

export const getPostApiV1GroupBuysGroupBuyIdParticipationsMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>,
    TError,
    { groupBuyId: number; data: ParticipationCreate },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>,
  TError,
  { groupBuyId: number; data: ParticipationCreate },
  TContext
> => {
  const mutationKey = ['postApiV1GroupBuysGroupBuyIdParticipations'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>,
    { groupBuyId: number; data: ParticipationCreate }
  > = (props) => {
    const { groupBuyId, data } = props ?? {};

    return postApiV1GroupBuysGroupBuyIdParticipations(
      groupBuyId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1GroupBuysGroupBuyIdParticipationsMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>
  >;
export type PostApiV1GroupBuysGroupBuyIdParticipationsMutationBody =
  ParticipationCreate;
export type PostApiV1GroupBuysGroupBuyIdParticipationsMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary 공구 참여 (결제 요청 생성)
 */
export const usePostApiV1GroupBuysGroupBuyIdParticipations = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>,
      TError,
      { groupBuyId: number; data: ParticipationCreate },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdParticipations>>,
  TError,
  { groupBuyId: number; data: ParticipationCreate },
  TContext
> => {
  return useMutation(
    getPostApiV1GroupBuysGroupBuyIdParticipationsMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary PG 결제 성공 콜백 처리
 */
export type postApiV1PaymentsConfirmResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1PaymentsConfirmResponseSuccess =
  postApiV1PaymentsConfirmResponse200 & {
    headers: Headers;
  };
export type postApiV1PaymentsConfirmResponse =
  postApiV1PaymentsConfirmResponseSuccess;

export const getPostApiV1PaymentsConfirmUrl = () => {
  return `/api/v1/payments/confirm`;
};

export const postApiV1PaymentsConfirm = async (
  paymentConfirm: PaymentConfirm,
  options?: RequestInit,
): Promise<postApiV1PaymentsConfirmResponse> => {
  return customFetch<postApiV1PaymentsConfirmResponse>(
    getPostApiV1PaymentsConfirmUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(paymentConfirm),
    },
  );
};

export const getPostApiV1PaymentsConfirmMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>,
    TError,
    { data: PaymentConfirm },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>,
  TError,
  { data: PaymentConfirm },
  TContext
> => {
  const mutationKey = ['postApiV1PaymentsConfirm'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>,
    { data: PaymentConfirm }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1PaymentsConfirm(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1PaymentsConfirmMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>
>;
export type PostApiV1PaymentsConfirmMutationBody = PaymentConfirm;
export type PostApiV1PaymentsConfirmMutationError = unknown;

/**
 * @summary PG 결제 성공 콜백 처리
 */
export const usePostApiV1PaymentsConfirm = <
  TError = unknown,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>,
      TError,
      { data: PaymentConfirm },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1PaymentsConfirm>>,
  TError,
  { data: PaymentConfirm },
  TContext
> => {
  return useMutation(
    getPostApiV1PaymentsConfirmMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary PG 결제 실패 콜백 처리
 */
export type postApiV1PaymentsFailResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1PaymentsFailResponseSuccess =
  postApiV1PaymentsFailResponse200 & {
    headers: Headers;
  };
export type postApiV1PaymentsFailResponse =
  postApiV1PaymentsFailResponseSuccess;

export const getPostApiV1PaymentsFailUrl = () => {
  return `/api/v1/payments/fail`;
};

export const postApiV1PaymentsFail = async (
  paymentFail: PaymentFail,
  options?: RequestInit,
): Promise<postApiV1PaymentsFailResponse> => {
  return customFetch<postApiV1PaymentsFailResponse>(
    getPostApiV1PaymentsFailUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(paymentFail),
    },
  );
};

export const getPostApiV1PaymentsFailMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1PaymentsFail>>,
    TError,
    { data: PaymentFail },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1PaymentsFail>>,
  TError,
  { data: PaymentFail },
  TContext
> => {
  const mutationKey = ['postApiV1PaymentsFail'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1PaymentsFail>>,
    { data: PaymentFail }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1PaymentsFail(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1PaymentsFailMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1PaymentsFail>>
>;
export type PostApiV1PaymentsFailMutationBody = PaymentFail;
export type PostApiV1PaymentsFailMutationError = unknown;

/**
 * @summary PG 결제 실패 콜백 처리
 */
export const usePostApiV1PaymentsFail = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1PaymentsFail>>,
      TError,
      { data: PaymentFail },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1PaymentsFail>>,
  TError,
  { data: PaymentFail },
  TContext
> => {
  return useMutation(
    getPostApiV1PaymentsFailMutationOptions(options),
    queryClient,
  );
};
/**
 * 공구 달성 전에만 취소 가능하며 결제 금액이 자동 환불된다.
 * @summary 참여 취소 (달성 전 이탈)
 */
export type postApiV1ParticipationsParticipationIdCancelResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1ParticipationsParticipationIdCancelResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1ParticipationsParticipationIdCancelResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1ParticipationsParticipationIdCancelResponseSuccess =
  postApiV1ParticipationsParticipationIdCancelResponse200 & {
    headers: Headers;
  };
export type postApiV1ParticipationsParticipationIdCancelResponseError = (
  | postApiV1ParticipationsParticipationIdCancelResponse403
  | postApiV1ParticipationsParticipationIdCancelResponse409
) & {
  headers: Headers;
};

export type postApiV1ParticipationsParticipationIdCancelResponse =
  | postApiV1ParticipationsParticipationIdCancelResponseSuccess
  | postApiV1ParticipationsParticipationIdCancelResponseError;

export const getPostApiV1ParticipationsParticipationIdCancelUrl = (
  participationId: number,
) => {
  return `/api/v1/participations/${participationId}/cancel`;
};

export const postApiV1ParticipationsParticipationIdCancel = async (
  participationId: number,
  options?: RequestInit,
): Promise<postApiV1ParticipationsParticipationIdCancelResponse> => {
  return customFetch<postApiV1ParticipationsParticipationIdCancelResponse>(
    getPostApiV1ParticipationsParticipationIdCancelUrl(participationId),
    {
      ...options,
      method: 'POST',
    },
  );
};

export const getPostApiV1ParticipationsParticipationIdCancelMutationOptions = <
  TError = ForbiddenResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
    TError,
    { participationId: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
  TError,
  { participationId: number },
  TContext
> => {
  const mutationKey = ['postApiV1ParticipationsParticipationIdCancel'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
    { participationId: number }
  > = (props) => {
    const { participationId } = props ?? {};

    return postApiV1ParticipationsParticipationIdCancel(
      participationId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1ParticipationsParticipationIdCancelMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>
  >;

export type PostApiV1ParticipationsParticipationIdCancelMutationError =
  | ForbiddenResponse
  | ConflictResponse;

/**
 * @summary 참여 취소 (달성 전 이탈)
 */
export const usePostApiV1ParticipationsParticipationIdCancel = <
  TError = ForbiddenResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
      TError,
      { participationId: number },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
  TError,
  { participationId: number },
  TContext
> => {
  return useMutation(
    getPostApiV1ParticipationsParticipationIdCancelMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary 내 환불 내역 조회
 */
export type getApiV1RefundsResponse200 = {
  data: ApiResponseRefundList;
  status: 200;
};

export type getApiV1RefundsResponseSuccess = getApiV1RefundsResponse200 & {
  headers: Headers;
};
export type getApiV1RefundsResponse = getApiV1RefundsResponseSuccess;

export const getGetApiV1RefundsUrl = () => {
  return `/api/v1/refunds`;
};

export const getApiV1Refunds = async (
  options?: RequestInit,
): Promise<getApiV1RefundsResponse> => {
  return customFetch<getApiV1RefundsResponse>(getGetApiV1RefundsUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getGetApiV1RefundsQueryKey = () => {
  return [`/api/v1/refunds`] as const;
};

export const getGetApiV1RefundsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1Refunds>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiV1Refunds>>, TError, TData>
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1RefundsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1Refunds>>> = ({
    signal,
  }) => getApiV1Refunds({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1Refunds>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1RefundsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1Refunds>>
>;
export type GetApiV1RefundsQueryError = unknown;

export function useGetApiV1Refunds<
  TData = Awaited<ReturnType<typeof getApiV1Refunds>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Refunds>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Refunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Refunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Refunds<
  TData = Awaited<ReturnType<typeof getApiV1Refunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Refunds>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Refunds>>,
          TError,
          Awaited<ReturnType<typeof getApiV1Refunds>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1Refunds<
  TData = Awaited<ReturnType<typeof getApiV1Refunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Refunds>>,
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

export function useGetApiV1Refunds<
  TData = Awaited<ReturnType<typeof getApiV1Refunds>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Refunds>>,
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
  const queryOptions = getGetApiV1RefundsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}
