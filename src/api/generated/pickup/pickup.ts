/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseNearestPickupQr,
  ApiResponsePickupInfo,
  ApiResponsePickupVerify,
  ApiResponseQrCode,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * @summary 픽업 안내 정보 조회
 */
export type getApiV1ParticipationsParticipationIdPickupResponse200 = {
  data: ApiResponsePickupInfo;
  status: 200;
};

export type getApiV1ParticipationsParticipationIdPickupResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1ParticipationsParticipationIdPickupResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type getApiV1ParticipationsParticipationIdPickupResponseSuccess =
  getApiV1ParticipationsParticipationIdPickupResponse200 & {
    headers: Headers;
  };
export type getApiV1ParticipationsParticipationIdPickupResponseError = (
  | getApiV1ParticipationsParticipationIdPickupResponse403
  | getApiV1ParticipationsParticipationIdPickupResponse409
) & {
  headers: Headers;
};

export type getApiV1ParticipationsParticipationIdPickupResponse =
  | getApiV1ParticipationsParticipationIdPickupResponseSuccess
  | getApiV1ParticipationsParticipationIdPickupResponseError;

export const getGetApiV1ParticipationsParticipationIdPickupUrl = (
  participationId: number,
) => {
  return `/api/v1/participations/${participationId}/pickup`;
};

export const getApiV1ParticipationsParticipationIdPickup = async (
  participationId: number,
  options?: RequestInit,
): Promise<getApiV1ParticipationsParticipationIdPickupResponse> => {
  return customFetch<getApiV1ParticipationsParticipationIdPickupResponse>(
    getGetApiV1ParticipationsParticipationIdPickupUrl(participationId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary QR 픽업 코드 조회
 */
export type getApiV1ParticipationsParticipationIdQrResponse200 = {
  data: ApiResponseQrCode;
  status: 200;
};

export type getApiV1ParticipationsParticipationIdQrResponseSuccess =
  getApiV1ParticipationsParticipationIdQrResponse200 & {
    headers: Headers;
  };
export type getApiV1ParticipationsParticipationIdQrResponse =
  getApiV1ParticipationsParticipationIdQrResponseSuccess;

export const getGetApiV1ParticipationsParticipationIdQrUrl = (
  participationId: number,
) => {
  return `/api/v1/participations/${participationId}/qr`;
};

export const getApiV1ParticipationsParticipationIdQr = async (
  participationId: number,
  options?: RequestInit,
): Promise<getApiV1ParticipationsParticipationIdQrResponse> => {
  return customFetch<getApiV1ParticipationsParticipationIdQrResponse>(
    getGetApiV1ParticipationsParticipationIdQrUrl(participationId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 피드 진입 시 사용자의 가장 가까운 픽업 QR 후보를 조회한다.
당일 픽업 예정 건이 있으면 픽업 시작 시간이 가장 빠른 건을 반환하고,
당일 건이 여러 개면 hasMultipleToday=true로 내려준다.
당일 픽업 건이 없고 향후 픽업 예정 건만 있으면 LOCKED 상태와 qrCode=null로 반환한다.

 * @summary 피드용 가장 가까운 픽업 QR 조회
 */
export type getApiV1PickupsMeNearestQrResponse200 = {
  data: ApiResponseNearestPickupQr;
  status: 200;
};

export type getApiV1PickupsMeNearestQrResponseSuccess =
  getApiV1PickupsMeNearestQrResponse200 & {
    headers: Headers;
  };
export type getApiV1PickupsMeNearestQrResponse =
  getApiV1PickupsMeNearestQrResponseSuccess;

export const getGetApiV1PickupsMeNearestQrUrl = () => {
  return `/api/v1/pickups/me/nearest-qr`;
};

export const getApiV1PickupsMeNearestQr = async (
  options?: RequestInit,
): Promise<getApiV1PickupsMeNearestQrResponse> => {
  return customFetch<getApiV1PickupsMeNearestQrResponse>(
    getGetApiV1PickupsMeNearestQrUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 현재 활성 역할이 SELLER 또는 ADMIN일 때만 호출할 수 있다.
SELLER 역할 사용자가 본인 매장 공구의 소비자 QR을 스캔하면 READY → PICKED_UP으로 자동 전환한다.
ADMIN 역할 사용자는 운영 대리 처리 용도로 매장 소속 검증 없이 처리할 수 있다.
응답에는 사장님 스캔 결과 화면에 필요한 유저이름, 상품명, 수량, 픽업 상태를 포함한다.

 * @summary QR 코드 스캔 검증 및 수령 처리
 */
export type postApiV1PickupsQrCodeVerifyResponse200 = {
  data: ApiResponsePickupVerify;
  status: 200;
};

export type postApiV1PickupsQrCodeVerifyResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1PickupsQrCodeVerifyResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1PickupsQrCodeVerifyResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1PickupsQrCodeVerifyResponseSuccess =
  postApiV1PickupsQrCodeVerifyResponse200 & {
    headers: Headers;
  };
export type postApiV1PickupsQrCodeVerifyResponseError = (
  | postApiV1PickupsQrCodeVerifyResponse400
  | postApiV1PickupsQrCodeVerifyResponse403
  | postApiV1PickupsQrCodeVerifyResponse409
) & {
  headers: Headers;
};

export type postApiV1PickupsQrCodeVerifyResponse =
  | postApiV1PickupsQrCodeVerifyResponseSuccess
  | postApiV1PickupsQrCodeVerifyResponseError;

export const getPostApiV1PickupsQrCodeVerifyUrl = (qrCode: string) => {
  return `/api/v1/pickups/${qrCode}/verify`;
};

export const postApiV1PickupsQrCodeVerify = async (
  qrCode: string,
  options?: RequestInit,
): Promise<postApiV1PickupsQrCodeVerifyResponse> => {
  return customFetch<postApiV1PickupsQrCodeVerifyResponse>(
    getPostApiV1PickupsQrCodeVerifyUrl(qrCode),
    {
      ...options,
      method: 'POST',
    },
  );
};
