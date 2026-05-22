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
  ApiResponseCancelParticipation,
  ApiResponseCheckoutInfo,
  ApiResponsePaymentConfirmed,
  ApiResponsePaymentOrderCreated,
  ApiResponsePortOneWebhook,
  ApiResponseRefundList,
  BadRequestResponse,
  CancelParticipationRequest,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  PaymentConfirm,
  PaymentOrderCreate,
  PortOneWebhook,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 참여하기 화면 결제 정보 조회
 */
export type getApiV1GroupBuysGroupBuyIdCheckoutResponse200 = {
  data: ApiResponseCheckoutInfo;
  status: 200;
};

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type getApiV1GroupBuysGroupBuyIdCheckoutResponseSuccess =
  getApiV1GroupBuysGroupBuyIdCheckoutResponse200 & {
    headers: Headers;
  };
export type getApiV1GroupBuysGroupBuyIdCheckoutResponseError = (
  | getApiV1GroupBuysGroupBuyIdCheckoutResponse400
  | getApiV1GroupBuysGroupBuyIdCheckoutResponse409
) & {
  headers: Headers;
};

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse =
  | getApiV1GroupBuysGroupBuyIdCheckoutResponseSuccess
  | getApiV1GroupBuysGroupBuyIdCheckoutResponseError;

export const getGetApiV1GroupBuysGroupBuyIdCheckoutUrl = (
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/group-buys/${groupBuyId}/checkout?${stringifiedParams}`
    : `/api/v1/group-buys/${groupBuyId}/checkout`;
};

export const getApiV1GroupBuysGroupBuyIdCheckout = async (
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options?: RequestInit,
): Promise<getApiV1GroupBuysGroupBuyIdCheckoutResponse> => {
  return customFetch<getApiV1GroupBuysGroupBuyIdCheckoutResponse>(
    getGetApiV1GroupBuysGroupBuyIdCheckoutUrl(groupBuyId, params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export const getGetApiV1GroupBuysGroupBuyIdCheckoutQueryKey = (
  groupBuyId: number,
  params?: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
) => {
  return [
    `/api/v1/group-buys/${groupBuyId}/checkout`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1GroupBuysGroupBuyIdCheckoutQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
  TError = BadRequestResponse | ConflictResponse,
>(
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
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
    getGetApiV1GroupBuysGroupBuyIdCheckoutQueryKey(groupBuyId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>
  > = ({ signal }) =>
    getApiV1GroupBuysGroupBuyIdCheckout(groupBuyId, params, {
      signal,
      ...requestOptions,
    });

  return {
    queryKey,
    queryFn,
    enabled: !!groupBuyId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1GroupBuysGroupBuyIdCheckoutQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>
>;
export type GetApiV1GroupBuysGroupBuyIdCheckoutQueryError =
  | BadRequestResponse
  | ConflictResponse;

export function useGetApiV1GroupBuysGroupBuyIdCheckout<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
  TError = BadRequestResponse | ConflictResponse,
>(
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdCheckout<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
  TError = BadRequestResponse | ConflictResponse,
>(
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
          TError,
          Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1GroupBuysGroupBuyIdCheckout<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
  TError = BadRequestResponse | ConflictResponse,
>(
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
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
 * @summary 참여하기 화면 결제 정보 조회
 */

export function useGetApiV1GroupBuysGroupBuyIdCheckout<
  TData = Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
  TError = BadRequestResponse | ConflictResponse,
>(
  groupBuyId: number,
  params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1GroupBuysGroupBuyIdCheckout>>,
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
  const queryOptions = getGetApiV1GroupBuysGroupBuyIdCheckoutQueryOptions(
    groupBuyId,
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
 * @summary PortOne 결제 주문 생성
 */
export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse200 = {
  data: ApiResponsePaymentOrderCreated;
  status: 200;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseSuccess =
  postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse200 & {
    headers: Headers;
  };
export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseError = (
  | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse400
  | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse401
  | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse409
) & {
  headers: Headers;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse =
  | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseSuccess
  | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseError;

export const getPostApiV1GroupBuysGroupBuyIdPaymentOrdersUrl = (
  groupBuyId: number,
) => {
  return `/api/v1/group-buys/${groupBuyId}/payment-orders`;
};

export const postApiV1GroupBuysGroupBuyIdPaymentOrders = async (
  groupBuyId: number,
  paymentOrderCreate: PaymentOrderCreate,
  options?: RequestInit,
): Promise<postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse> => {
  return customFetch<postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse>(
    getPostApiV1GroupBuysGroupBuyIdPaymentOrdersUrl(groupBuyId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(paymentOrderCreate),
    },
  );
};

export const getPostApiV1GroupBuysGroupBuyIdPaymentOrdersMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>,
    TError,
    { groupBuyId: number; data: PaymentOrderCreate },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>,
  TError,
  { groupBuyId: number; data: PaymentOrderCreate },
  TContext
> => {
  const mutationKey = ['postApiV1GroupBuysGroupBuyIdPaymentOrders'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>,
    { groupBuyId: number; data: PaymentOrderCreate }
  > = (props) => {
    const { groupBuyId, data } = props ?? {};

    return postApiV1GroupBuysGroupBuyIdPaymentOrders(
      groupBuyId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1GroupBuysGroupBuyIdPaymentOrdersMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>
  >;
export type PostApiV1GroupBuysGroupBuyIdPaymentOrdersMutationBody =
  PaymentOrderCreate;
export type PostApiV1GroupBuysGroupBuyIdPaymentOrdersMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary PortOne 결제 주문 생성
 */
export const usePostApiV1GroupBuysGroupBuyIdPaymentOrders = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>,
      TError,
      { groupBuyId: number; data: PaymentOrderCreate },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1GroupBuysGroupBuyIdPaymentOrders>>,
  TError,
  { groupBuyId: number; data: PaymentOrderCreate },
  TContext
> => {
  return useMutation(
    getPostApiV1GroupBuysGroupBuyIdPaymentOrdersMutationOptions(options),
    queryClient,
  );
};
/**
 * @summary PortOne 결제 완료 서버 검증
 */
export type postApiV1PaymentsPortoneCompleteResponse200 = {
  data: ApiResponsePaymentConfirmed;
  status: 200;
};

export type postApiV1PaymentsPortoneCompleteResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1PaymentsPortoneCompleteResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1PaymentsPortoneCompleteResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1PaymentsPortoneCompleteResponseSuccess =
  postApiV1PaymentsPortoneCompleteResponse200 & {
    headers: Headers;
  };
export type postApiV1PaymentsPortoneCompleteResponseError = (
  | postApiV1PaymentsPortoneCompleteResponse400
  | postApiV1PaymentsPortoneCompleteResponse401
  | postApiV1PaymentsPortoneCompleteResponse409
) & {
  headers: Headers;
};

export type postApiV1PaymentsPortoneCompleteResponse =
  | postApiV1PaymentsPortoneCompleteResponseSuccess
  | postApiV1PaymentsPortoneCompleteResponseError;

export const getPostApiV1PaymentsPortoneCompleteUrl = () => {
  return `/api/v1/payments/portone/complete`;
};

export const postApiV1PaymentsPortoneComplete = async (
  paymentConfirm: PaymentConfirm,
  options?: RequestInit,
): Promise<postApiV1PaymentsPortoneCompleteResponse> => {
  return customFetch<postApiV1PaymentsPortoneCompleteResponse>(
    getPostApiV1PaymentsPortoneCompleteUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(paymentConfirm),
    },
  );
};

export const getPostApiV1PaymentsPortoneCompleteMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>,
    TError,
    { data: PaymentConfirm },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>,
  TError,
  { data: PaymentConfirm },
  TContext
> => {
  const mutationKey = ['postApiV1PaymentsPortoneComplete'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>,
    { data: PaymentConfirm }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1PaymentsPortoneComplete(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1PaymentsPortoneCompleteMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>
>;
export type PostApiV1PaymentsPortoneCompleteMutationBody = PaymentConfirm;
export type PostApiV1PaymentsPortoneCompleteMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary PortOne 결제 완료 서버 검증
 */
export const usePostApiV1PaymentsPortoneComplete = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>,
      TError,
      { data: PaymentConfirm },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneComplete>>,
  TError,
  { data: PaymentConfirm },
  TContext
> => {
  return useMutation(
    getPostApiV1PaymentsPortoneCompleteMutationOptions(options),
    queryClient,
  );
};
/**
 * 웹훅 본문만 신뢰하지 않고 서버에서 PortOne 결제 단건 조회 후 상태를 동기화한다.
 * @summary PortOne 결제 웹훅 수신
 */
export type postApiV1PaymentsPortoneWebhookResponse200 = {
  data: ApiResponsePortOneWebhook;
  status: 200;
};

export type postApiV1PaymentsPortoneWebhookResponseSuccess =
  postApiV1PaymentsPortoneWebhookResponse200 & {
    headers: Headers;
  };
export type postApiV1PaymentsPortoneWebhookResponse =
  postApiV1PaymentsPortoneWebhookResponseSuccess;

export const getPostApiV1PaymentsPortoneWebhookUrl = () => {
  return `/api/v1/payments/portone/webhook`;
};

export const postApiV1PaymentsPortoneWebhook = async (
  portOneWebhook: PortOneWebhook,
  options?: RequestInit,
): Promise<postApiV1PaymentsPortoneWebhookResponse> => {
  return customFetch<postApiV1PaymentsPortoneWebhookResponse>(
    getPostApiV1PaymentsPortoneWebhookUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(portOneWebhook),
    },
  );
};

export const getPostApiV1PaymentsPortoneWebhookMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>,
    TError,
    { data: PortOneWebhook },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>,
  TError,
  { data: PortOneWebhook },
  TContext
> => {
  const mutationKey = ['postApiV1PaymentsPortoneWebhook'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>,
    { data: PortOneWebhook }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1PaymentsPortoneWebhook(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1PaymentsPortoneWebhookMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>
>;
export type PostApiV1PaymentsPortoneWebhookMutationBody = PortOneWebhook;
export type PostApiV1PaymentsPortoneWebhookMutationError = unknown;

/**
 * @summary PortOne 결제 웹훅 수신
 */
export const usePostApiV1PaymentsPortoneWebhook = <
  TError = unknown,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>,
      TError,
      { data: PortOneWebhook },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1PaymentsPortoneWebhook>>,
  TError,
  { data: PortOneWebhook },
  TContext
> => {
  return useMutation(
    getPostApiV1PaymentsPortoneWebhookMutationOptions(options),
    queryClient,
  );
};
/**
 * 공구 달성 전에만 취소 가능하며 결제 금액이 자동 환불된다.
 * @summary 참여 취소 (달성 전 이탈)
 */
export type postApiV1ParticipationsParticipationIdCancelResponse200 = {
  data: ApiResponseCancelParticipation;
  status: 200;
};

export type postApiV1ParticipationsParticipationIdCancelResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
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
  | postApiV1ParticipationsParticipationIdCancelResponse401
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
  cancelParticipationRequest: CancelParticipationRequest,
  options?: RequestInit,
): Promise<postApiV1ParticipationsParticipationIdCancelResponse> => {
  return customFetch<postApiV1ParticipationsParticipationIdCancelResponse>(
    getPostApiV1ParticipationsParticipationIdCancelUrl(participationId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(cancelParticipationRequest),
    },
  );
};

export const getPostApiV1ParticipationsParticipationIdCancelMutationOptions = <
  TError = UnauthorizedResponse | ForbiddenResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
    TError,
    { participationId: number; data: CancelParticipationRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
  TError,
  { participationId: number; data: CancelParticipationRequest },
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
    { participationId: number; data: CancelParticipationRequest }
  > = (props) => {
    const { participationId, data } = props ?? {};

    return postApiV1ParticipationsParticipationIdCancel(
      participationId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1ParticipationsParticipationIdCancelMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>
  >;
export type PostApiV1ParticipationsParticipationIdCancelMutationBody =
  CancelParticipationRequest;
export type PostApiV1ParticipationsParticipationIdCancelMutationError =
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse;

/**
 * @summary 참여 취소 (달성 전 이탈)
 */
export const usePostApiV1ParticipationsParticipationIdCancel = <
  TError = UnauthorizedResponse | ForbiddenResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
      TError,
      { participationId: number; data: CancelParticipationRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1ParticipationsParticipationIdCancel>>,
  TError,
  { participationId: number; data: CancelParticipationRequest },
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
