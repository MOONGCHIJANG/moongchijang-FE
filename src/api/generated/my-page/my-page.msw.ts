/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseInProgressParticipationPage,
  ApiResponseMypageGroupBuyRequestList,
  ApiResponseMypageParticipationList,
  ApiResponsePickupWaitingParticipationPage,
  ApiResponseRefundList,
  ApiResponseTabCounts,
} from '../api.schemas';

export const getGetApiV1UsersMeParticipationsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseMypageParticipationList, object>
  > = {},
): ApiResponseMypageParticipationList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    participationId: faker.number.int(),
    groupBuyId: faker.number.int(),
    thumbnailUrl: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    participationStatus: faker.helpers.arrayElement([
      'PENDING',
      'PAID_WAITING_GOAL',
      'CONFIRMED',
      'CANCELLED',
      'REFUND_PENDING',
      'REFUNDED',
    ] as const),
    achievementRate: faker.number.int({ min: 0, max: 100 }),
    achievementStatus: faker.helpers.arrayElement([
      'BEFORE_ACHIEVED',
      'ACHIEVED',
    ] as const),
    displayStatus: faker.helpers.arrayElement([
      'PICKED_UP',
      'PAID_WAITING_GOAL',
      'CONFIRMED',
      'REFUND_PENDING',
      'REFUNDED',
      'PENDING',
      'CANCELLED',
    ] as const),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    paymentAmount: faker.number.int(),
    paidAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      null,
    ]),
    paymentMethod: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    quantity: faker.number.int(),
    pickupStatus: faker.helpers.arrayElement([
      'NOT_READY',
      'READY',
      'PICKED_UP',
      'NO_SHOW',
    ] as const),
    dDay: faker.number.int(),
    canCancel: faker.datatype.boolean(),
    canViewPickup: faker.datatype.boolean(),
    canViewQr: faker.datatype.boolean(),
    qrAvailability: faker.helpers.arrayElement([
      'UNAVAILABLE',
      'LOCKED',
      'AVAILABLE',
      'PICKED_UP',
    ] as const),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeParticipationsInProgressResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseInProgressParticipationPage, object>
  > = {},
): ApiResponseInProgressParticipationPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      participationId: faker.number.int(),
      groupBuyId: faker.number.int(),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      pickupAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
      paidAmount: faker.number.int(),
      quantity: faker.number.int(),
      achievementRate: faker.number.int(),
      dDay: faker.number.int(),
      participatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeParticipationsPickupWaitingResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponsePickupWaitingParticipationPage, object>
  > = {},
): ApiResponsePickupWaitingParticipationPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      participationId: faker.number.int(),
      groupBuyId: faker.number.int(),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      pickupAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
      paidAmount: faker.number.int(),
      quantity: faker.number.int(),
      isClosed: faker.datatype.boolean(),
      participatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeGroupBuyRequestsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseMypageGroupBuyRequestList, object>
  > = {},
): ApiResponseMypageGroupBuyRequestList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    status: faker.helpers.arrayElement([
      'SUBMITTED',
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    desiredQuantity: faker.number.int(),
    requestId: faker.number.int(),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeTabsCountsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseTabCounts, object>> = {},
): ApiResponseTabCounts => ({
  success: faker.datatype.boolean(),
  data: {
    inProgressCount: faker.number.int(),
    pickupWaitingCount: faker.number.int(),
    pickupCompletedCount: faker.number.int(),
    cancelledOrRefundedCount: faker.number.int(),
    requestCount: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1MypageSummaryResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseTabCounts, object>> = {},
): ApiResponseTabCounts => ({
  success: faker.datatype.boolean(),
  data: {
    inProgressCount: faker.number.int(),
    pickupWaitingCount: faker.number.int(),
    pickupCompletedCount: faker.number.int(),
    cancelledOrRefundedCount: faker.number.int(),
    requestCount: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1MypageRefundsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseRefundList, object>> = {},
): ApiResponseRefundList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    participationId: faker.number.int(),
    thumbnailUrl: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupDate: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 10),
        null,
      ]),
      null,
    ]),
    pickupTimeStart: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    pickupTimeEnd: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    paymentAmount: faker.number.int(),
    quantity: faker.number.int(),
    refundStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED'] as const),
    cancelReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          'TIME_UNAVAILABLE',
          'NO_LONGER_WANTED',
          'PREFER_DIRECT_VISIT',
          'BOUGHT_ELSEWHERE',
          'OTHER',
        ] as const),
        null,
      ]),
      null,
    ]),
    cancelReasonDetail: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    paymentMethod: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    refundedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeRefundsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseRefundList, object>> = {},
): ApiResponseRefundList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    participationId: faker.number.int(),
    thumbnailUrl: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupDate: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 10),
        null,
      ]),
      null,
    ]),
    pickupTimeStart: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    pickupTimeEnd: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    paymentAmount: faker.number.int(),
    quantity: faker.number.int(),
    refundStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED'] as const),
    cancelReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          'TIME_UNAVAILABLE',
          'NO_LONGER_WANTED',
          'PREFER_DIRECT_VISIT',
          'BOUGHT_ELSEWHERE',
          'OTHER',
        ] as const),
        null,
      ]),
      null,
    ]),
    cancelReasonDetail: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    paymentMethod: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    refundedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1MypageGroupBuyRequestsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseMypageGroupBuyRequestList, object>
  > = {},
): ApiResponseMypageGroupBuyRequestList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    status: faker.helpers.arrayElement([
      'SUBMITTED',
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    desiredQuantity: faker.number.int(),
    requestId: faker.number.int(),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1UsersMeParticipationsMockHandler = (
  overrideResponse?:
    | ApiResponseMypageParticipationList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseMypageParticipationList>
        | ApiResponseMypageParticipationList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/participations',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeParticipationsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1UsersMeParticipationsInProgressMockHandler = (
  overrideResponse?:
    | ApiResponseInProgressParticipationPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseInProgressParticipationPage>
        | ApiResponseInProgressParticipationPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/participations/in-progress',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeParticipationsInProgressResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1UsersMeParticipationsPickupWaitingMockHandler = (
  overrideResponse?:
    | ApiResponsePickupWaitingParticipationPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponsePickupWaitingParticipationPage>
        | ApiResponsePickupWaitingParticipationPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/participations/pickup-waiting',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeParticipationsPickupWaitingResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1UsersMeGroupBuyRequestsMockHandler = (
  overrideResponse?:
    | ApiResponseMypageGroupBuyRequestList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseMypageGroupBuyRequestList>
        | ApiResponseMypageGroupBuyRequestList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/group-buy-requests',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeGroupBuyRequestsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1UsersMeTabsCountsMockHandler = (
  overrideResponse?:
    | ApiResponseTabCounts
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseTabCounts> | ApiResponseTabCounts),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/tabs/counts',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeTabsCountsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1MypageSummaryMockHandler = (
  overrideResponse?:
    | ApiResponseTabCounts
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseTabCounts> | ApiResponseTabCounts),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/mypage/summary',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1MypageSummaryResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1MypageRefundsMockHandler = (
  overrideResponse?:
    | ApiResponseRefundList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseRefundList> | ApiResponseRefundList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/mypage/refunds',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1MypageRefundsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1UsersMeRefundsMockHandler = (
  overrideResponse?:
    | ApiResponseRefundList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseRefundList> | ApiResponseRefundList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/users/me/refunds',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1UsersMeRefundsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1MypageGroupBuyRequestsMockHandler = (
  overrideResponse?:
    | ApiResponseMypageGroupBuyRequestList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseMypageGroupBuyRequestList>
        | ApiResponseMypageGroupBuyRequestList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/mypage/group-buy-requests',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1MypageGroupBuyRequestsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getMyPageMock = () => [
  getGetApiV1UsersMeParticipationsMockHandler(),
  getGetApiV1UsersMeParticipationsInProgressMockHandler(),
  getGetApiV1UsersMeParticipationsPickupWaitingMockHandler(),
  getGetApiV1UsersMeGroupBuyRequestsMockHandler(),
  getGetApiV1UsersMeTabsCountsMockHandler(),
  getGetApiV1MypageSummaryMockHandler(),
  getGetApiV1MypageRefundsMockHandler(),
  getGetApiV1UsersMeRefundsMockHandler(),
  getGetApiV1MypageGroupBuyRequestsMockHandler(),
];
