/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import {
  NotificationDeeplinkType,
  NotificationSection,
  NotificationTriggerType,
  NotificationType,
} from '../api.schemas';
import type {
  ApiResponseNotificationListResponse,
  ApiResponseNotificationUnreadCountResponse,
  SuccessNoDataResponse,
} from '../api.schemas';

export const getGetApiV1NotificationsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseNotificationListResponse, object>
  > = {},
): ApiResponseNotificationListResponse => ({
  success: faker.datatype.boolean(),
  data: {
    items: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      id: faker.number.int(),
      type: faker.helpers.arrayElement(Object.values(NotificationType)),
      title: faker.string.alpha({ length: { min: 10, max: 20 } }),
      body: faker.string.alpha({ length: { min: 10, max: 20 } }),
      isRead: faker.datatype.boolean(),
      occurredAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
      targetId: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      deeplinkType: faker.helpers.arrayElement(
        Object.values(NotificationDeeplinkType),
      ),
      triggerType: faker.helpers.arrayElement([
        faker.helpers.arrayElement(Object.values(NotificationTriggerType)),
        null,
      ]),
      deeplinkParams: {
        [faker.string.alphanumeric(5)]: faker.string.alpha({
          length: { min: 10, max: 20 },
        }),
      },
      section: faker.helpers.arrayElement(Object.values(NotificationSection)),
    })),
    nextCursor: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    hasNext: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1NotificationsUnreadCountResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseNotificationUnreadCountResponse, object>
  > = {},
): ApiResponseNotificationUnreadCountResponse => ({
  success: faker.datatype.boolean(),
  data: { count: faker.number.int() },
  error: {},
  ...overrideResponse,
});

export const getPatchApiV1NotificationsReadAllResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getPatchApiV1NotificationsNotificationIdReadResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getGetApiV1NotificationsMockHandler = (
  overrideResponse?:
    | ApiResponseNotificationListResponse
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseNotificationListResponse>
        | ApiResponseNotificationListResponse),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/notifications',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1NotificationsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1NotificationsUnreadCountMockHandler = (
  overrideResponse?:
    | ApiResponseNotificationUnreadCountResponse
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseNotificationUnreadCountResponse>
        | ApiResponseNotificationUnreadCountResponse),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/notifications/unread-count',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1NotificationsUnreadCountResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPatchApiV1NotificationsReadAllMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.patch(
    '*/api/v1/notifications/read-all',
    async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPatchApiV1NotificationsReadAllResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPatchApiV1NotificationsNotificationIdReadMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.patch(
    '*/api/v1/notifications/:notificationId/read',
    async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPatchApiV1NotificationsNotificationIdReadResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getNotificationMock = () => [
  getGetApiV1NotificationsMockHandler(),
  getGetApiV1NotificationsUnreadCountMockHandler(),
  getPatchApiV1NotificationsReadAllMockHandler(),
  getPatchApiV1NotificationsNotificationIdReadMockHandler(),
];
