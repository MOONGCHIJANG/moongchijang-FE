/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
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

/**
 * 현재 로그인 사용자의 활성 역할 기준으로 알림 목록을 조회한다.
- 소비자 역할(BUYER): 소비자 알림만 조회
- 사장님 역할(SELLER): 사장님 알림만 조회
- 역할에 맞지 않는 `category`를 요청하면 400 오류를 반환한다.

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

/**
 * 현재 로그인 사용자의 활성 역할 기준 scope에 해당하는 미읽음 알림 개수를 조회한다.
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

/**
 * 현재 로그인 사용자의 활성 역할 기준 scope에 해당하는 알림만 전체 읽음 처리한다.
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
