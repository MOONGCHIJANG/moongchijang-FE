/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseCancelParticipation,
  ApiResponseCheckoutInfo,
  ApiResponsePaymentConfirmed,
  ApiResponsePaymentOrderCreated,
  ApiResponsePortOneWebhook,
  BadRequestResponse,
  CancelParticipationRequest,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1GroupBuysGroupBuyIdCheckoutParams,
  PaymentConfirm,
  PaymentOrderCreate,
  PortOneWebhook,
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 참여하기 화면 결제 정보 조회
 */
export type getApiV1GroupBuysGroupBuyIdCheckoutResponse200 = {
  data: ApiResponseCheckoutInfo
  status: 200
}

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse409 = {
  data: ConflictResponse
  status: 409
}

export type getApiV1GroupBuysGroupBuyIdCheckoutResponseSuccess = (getApiV1GroupBuysGroupBuyIdCheckoutResponse200) & {
  headers: Headers;
};
export type getApiV1GroupBuysGroupBuyIdCheckoutResponseError = (getApiV1GroupBuysGroupBuyIdCheckoutResponse400 | getApiV1GroupBuysGroupBuyIdCheckoutResponse409) & {
  headers: Headers;
};

export type getApiV1GroupBuysGroupBuyIdCheckoutResponse = (getApiV1GroupBuysGroupBuyIdCheckoutResponseSuccess | getApiV1GroupBuysGroupBuyIdCheckoutResponseError)

export const getGetApiV1GroupBuysGroupBuyIdCheckoutUrl = (groupBuyId: number,
    params: GetApiV1GroupBuysGroupBuyIdCheckoutParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/group-buys/${groupBuyId}/checkout?${stringifiedParams}` : `/api/v1/group-buys/${groupBuyId}/checkout`
}

export const getApiV1GroupBuysGroupBuyIdCheckout = async (groupBuyId: number,
    params: GetApiV1GroupBuysGroupBuyIdCheckoutParams, options?: RequestInit): Promise<getApiV1GroupBuysGroupBuyIdCheckoutResponse> => {

  return customFetch<getApiV1GroupBuysGroupBuyIdCheckoutResponse>(getGetApiV1GroupBuysGroupBuyIdCheckoutUrl(groupBuyId,params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary PortOne 결제 주문 생성
 */
export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse200 = {
  data: ApiResponsePaymentOrderCreated
  status: 200
}

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseSuccess = (postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse200) & {
  headers: Headers;
};
export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseError = (postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse400 | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse401 | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse409) & {
  headers: Headers;
};

export type postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse = (postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseSuccess | postApiV1GroupBuysGroupBuyIdPaymentOrdersResponseError)

export const getPostApiV1GroupBuysGroupBuyIdPaymentOrdersUrl = (groupBuyId: number,) => {




  return `/api/v1/group-buys/${groupBuyId}/payment-orders`
}

export const postApiV1GroupBuysGroupBuyIdPaymentOrders = async (groupBuyId: number,
    paymentOrderCreate: PaymentOrderCreate, options?: RequestInit): Promise<postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse> => {

  return customFetch<postApiV1GroupBuysGroupBuyIdPaymentOrdersResponse>(getPostApiV1GroupBuysGroupBuyIdPaymentOrdersUrl(groupBuyId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      paymentOrderCreate,)
  }
);}


/**
 * @summary PortOne 결제 완료 서버 검증
 */
export type postApiV1PaymentsPortoneCompleteResponse200 = {
  data: ApiResponsePaymentConfirmed
  status: 200
}

export type postApiV1PaymentsPortoneCompleteResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1PaymentsPortoneCompleteResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1PaymentsPortoneCompleteResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1PaymentsPortoneCompleteResponseSuccess = (postApiV1PaymentsPortoneCompleteResponse200) & {
  headers: Headers;
};
export type postApiV1PaymentsPortoneCompleteResponseError = (postApiV1PaymentsPortoneCompleteResponse400 | postApiV1PaymentsPortoneCompleteResponse401 | postApiV1PaymentsPortoneCompleteResponse409) & {
  headers: Headers;
};

export type postApiV1PaymentsPortoneCompleteResponse = (postApiV1PaymentsPortoneCompleteResponseSuccess | postApiV1PaymentsPortoneCompleteResponseError)

export const getPostApiV1PaymentsPortoneCompleteUrl = () => {




  return `/api/v1/payments/portone/complete`
}

export const postApiV1PaymentsPortoneComplete = async (paymentConfirm: PaymentConfirm, options?: RequestInit): Promise<postApiV1PaymentsPortoneCompleteResponse> => {

  return customFetch<postApiV1PaymentsPortoneCompleteResponse>(getPostApiV1PaymentsPortoneCompleteUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      paymentConfirm,)
  }
);}


/**
 * 웹훅 본문만 신뢰하지 않고 서버에서 PortOne 결제 단건 조회 후 상태를 동기화한다.
 * @summary PortOne 결제 웹훅 수신
 */
export type postApiV1PaymentsPortoneWebhookResponse200 = {
  data: ApiResponsePortOneWebhook
  status: 200
}

export type postApiV1PaymentsPortoneWebhookResponseSuccess = (postApiV1PaymentsPortoneWebhookResponse200) & {
  headers: Headers;
};
;

export type postApiV1PaymentsPortoneWebhookResponse = (postApiV1PaymentsPortoneWebhookResponseSuccess)

export const getPostApiV1PaymentsPortoneWebhookUrl = () => {




  return `/api/v1/payments/portone/webhook`
}

export const postApiV1PaymentsPortoneWebhook = async (portOneWebhook: PortOneWebhook, options?: RequestInit): Promise<postApiV1PaymentsPortoneWebhookResponse> => {

  return customFetch<postApiV1PaymentsPortoneWebhookResponse>(getPostApiV1PaymentsPortoneWebhookUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      portOneWebhook,)
  }
);}


/**
 * 공구 달성 전에만 취소 가능하며 결제 금액이 자동 환불된다.
 * @summary 참여 취소 (달성 전 이탈)
 */
export type postApiV1ParticipationsParticipationIdCancelResponse200 = {
  data: ApiResponseCancelParticipation
  status: 200
}

export type postApiV1ParticipationsParticipationIdCancelResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1ParticipationsParticipationIdCancelResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1ParticipationsParticipationIdCancelResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1ParticipationsParticipationIdCancelResponseSuccess = (postApiV1ParticipationsParticipationIdCancelResponse200) & {
  headers: Headers;
};
export type postApiV1ParticipationsParticipationIdCancelResponseError = (postApiV1ParticipationsParticipationIdCancelResponse401 | postApiV1ParticipationsParticipationIdCancelResponse403 | postApiV1ParticipationsParticipationIdCancelResponse409) & {
  headers: Headers;
};

export type postApiV1ParticipationsParticipationIdCancelResponse = (postApiV1ParticipationsParticipationIdCancelResponseSuccess | postApiV1ParticipationsParticipationIdCancelResponseError)

export const getPostApiV1ParticipationsParticipationIdCancelUrl = (participationId: number,) => {




  return `/api/v1/participations/${participationId}/cancel`
}

export const postApiV1ParticipationsParticipationIdCancel = async (participationId: number,
    cancelParticipationRequest: CancelParticipationRequest, options?: RequestInit): Promise<postApiV1ParticipationsParticipationIdCancelResponse> => {

  return customFetch<postApiV1ParticipationsParticipationIdCancelResponse>(getPostApiV1ParticipationsParticipationIdCancelUrl(participationId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      cancelParticipationRequest,)
  }
);}


