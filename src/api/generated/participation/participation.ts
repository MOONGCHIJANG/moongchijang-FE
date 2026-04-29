/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
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
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 공구 참여 (결제 요청 생성)
 */
export type postApiV1GroupBuysGroupBuyIdParticipationsResponse201 = {
  data: ApiResponseParticipationCreated
  status: 201
}

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse409 = {
  data: ConflictResponse
  status: 409
}

export type postApiV1GroupBuysGroupBuyIdParticipationsResponseSuccess = (postApiV1GroupBuysGroupBuyIdParticipationsResponse201) & {
  headers: Headers;
};
export type postApiV1GroupBuysGroupBuyIdParticipationsResponseError = (postApiV1GroupBuysGroupBuyIdParticipationsResponse400 | postApiV1GroupBuysGroupBuyIdParticipationsResponse401 | postApiV1GroupBuysGroupBuyIdParticipationsResponse409) & {
  headers: Headers;
};

export type postApiV1GroupBuysGroupBuyIdParticipationsResponse = (postApiV1GroupBuysGroupBuyIdParticipationsResponseSuccess | postApiV1GroupBuysGroupBuyIdParticipationsResponseError)

export const getPostApiV1GroupBuysGroupBuyIdParticipationsUrl = (groupBuyId: number,) => {




  return `/api/v1/group-buys/${groupBuyId}/participations`
}

export const postApiV1GroupBuysGroupBuyIdParticipations = async (groupBuyId: number,
    participationCreate: ParticipationCreate, options?: RequestInit): Promise<postApiV1GroupBuysGroupBuyIdParticipationsResponse> => {

  return customFetch<postApiV1GroupBuysGroupBuyIdParticipationsResponse>(getPostApiV1GroupBuysGroupBuyIdParticipationsUrl(groupBuyId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      participationCreate,)
  }
);}


/**
 * @summary PG 결제 성공 콜백 처리
 */
export type postApiV1PaymentsConfirmResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1PaymentsConfirmResponseSuccess = (postApiV1PaymentsConfirmResponse200) & {
  headers: Headers;
};
;

export type postApiV1PaymentsConfirmResponse = (postApiV1PaymentsConfirmResponseSuccess)

export const getPostApiV1PaymentsConfirmUrl = () => {




  return `/api/v1/payments/confirm`
}

export const postApiV1PaymentsConfirm = async (paymentConfirm: PaymentConfirm, options?: RequestInit): Promise<postApiV1PaymentsConfirmResponse> => {

  return customFetch<postApiV1PaymentsConfirmResponse>(getPostApiV1PaymentsConfirmUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      paymentConfirm,)
  }
);}


/**
 * @summary PG 결제 실패 콜백 처리
 */
export type postApiV1PaymentsFailResponse200 = {
  data: SuccessNoDataResponse
  status: 200
}

export type postApiV1PaymentsFailResponseSuccess = (postApiV1PaymentsFailResponse200) & {
  headers: Headers;
};
;

export type postApiV1PaymentsFailResponse = (postApiV1PaymentsFailResponseSuccess)

export const getPostApiV1PaymentsFailUrl = () => {




  return `/api/v1/payments/fail`
}

export const postApiV1PaymentsFail = async (paymentFail: PaymentFail, options?: RequestInit): Promise<postApiV1PaymentsFailResponse> => {

  return customFetch<postApiV1PaymentsFailResponse>(getPostApiV1PaymentsFailUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      paymentFail,)
  }
);}


/**
 * 공구 달성 전에만 취소 가능하며 결제 금액이 자동 환불된다.
 * @summary 참여 취소 (달성 전 이탈)
 */
export type postApiV1ParticipationsParticipationIdCancelResponse200 = {
  data: SuccessNoDataResponse
  status: 200
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
export type postApiV1ParticipationsParticipationIdCancelResponseError = (postApiV1ParticipationsParticipationIdCancelResponse403 | postApiV1ParticipationsParticipationIdCancelResponse409) & {
  headers: Headers;
};

export type postApiV1ParticipationsParticipationIdCancelResponse = (postApiV1ParticipationsParticipationIdCancelResponseSuccess | postApiV1ParticipationsParticipationIdCancelResponseError)

export const getPostApiV1ParticipationsParticipationIdCancelUrl = (participationId: number,) => {




  return `/api/v1/participations/${participationId}/cancel`
}

export const postApiV1ParticipationsParticipationIdCancel = async (participationId: number, options?: RequestInit): Promise<postApiV1ParticipationsParticipationIdCancelResponse> => {

  return customFetch<postApiV1ParticipationsParticipationIdCancelResponse>(getPostApiV1ParticipationsParticipationIdCancelUrl(participationId),
  {
    ...options,
    method: 'POST'


  }
);}


/**
 * @summary 내 환불 내역 조회
 */
export type getApiV1RefundsResponse200 = {
  data: ApiResponseRefundList
  status: 200
}

export type getApiV1RefundsResponseSuccess = (getApiV1RefundsResponse200) & {
  headers: Headers;
};
;

export type getApiV1RefundsResponse = (getApiV1RefundsResponseSuccess)

export const getGetApiV1RefundsUrl = () => {




  return `/api/v1/refunds`
}

export const getApiV1Refunds = async ( options?: RequestInit): Promise<getApiV1RefundsResponse> => {

  return customFetch<getApiV1RefundsResponse>(getGetApiV1RefundsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


