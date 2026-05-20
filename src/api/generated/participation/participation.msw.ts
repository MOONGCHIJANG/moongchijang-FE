/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseCheckoutInfo,
  ApiResponsePaymentConfirmed,
  ApiResponsePaymentOrderCreated,
  ApiResponsePortOneWebhook,
  ApiResponseRefundList,
  SuccessNoDataResponse,
} from '../api.schemas';

export const getGetApiV1GroupBuysGroupBuyIdCheckoutResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseCheckoutInfo, object>> = {},
): ApiResponseCheckoutInfo => ({
  success: faker.datatype.boolean(),
  data: {
    groupBuyId: faker.number.int(),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    thumbnailUrl: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    unitPrice: faker.number.int(),
    quantity: faker.number.int(),
    productAmount: faker.number.int(),
    feeAmount: faker.number.int(),
    totalAmount: faker.number.int(),
    remainingQuantity: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1GroupBuysGroupBuyIdPaymentOrdersResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponsePaymentOrderCreated, object>
  > = {},
): ApiResponsePaymentOrderCreated => ({
  success: faker.datatype.boolean(),
  data: {
    paymentId: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeId: faker.string.alpha({ length: { min: 10, max: 20 } }),
    channelKey: faker.string.alpha({ length: { min: 10, max: 20 } }),
    orderName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    amount: faker.number.int(),
    customerName: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1PaymentsPortoneCompleteResponseMock = (
  overrideResponse: Partial<Extract<ApiResponsePaymentConfirmed, object>> = {},
): ApiResponsePaymentConfirmed => ({
  success: faker.datatype.boolean(),
  data: {
    paymentId: faker.string.alpha({ length: { min: 10, max: 20 } }),
    participationId: faker.number.int(),
    participationStatus: faker.helpers.arrayElement([
      'PAID_WAITING_GOAL',
      'CONFIRMED',
    ] as const),
    displayStatus: faker.string.alpha({ length: { min: 10, max: 20 } }),
    amount: faker.number.int(),
    method: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    approvedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1PaymentsPortoneWebhookResponseMock = (
  overrideResponse: Partial<Extract<ApiResponsePortOneWebhook, object>> = {},
): ApiResponsePortOneWebhook => ({
  success: faker.datatype.boolean(),
  data: { received: faker.datatype.boolean() },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1ParticipationsParticipationIdCancelResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getGetApiV1RefundsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseRefundList, object>> = {},
): ApiResponseRefundList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    participationId: faker.number.int(),
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
      'NOT_ACHIEVED',
      'EARLY_EXIT',
      'PAYMENT_ERROR',
      'OTHER',
    ] as const),
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1GroupBuysGroupBuyIdCheckoutMockHandler = (
  overrideResponse?:
    | ApiResponseCheckoutInfo
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseCheckoutInfo> | ApiResponseCheckoutInfo),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/group-buys/:groupBuyId/checkout',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1GroupBuysGroupBuyIdCheckoutResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1GroupBuysGroupBuyIdPaymentOrdersMockHandler = (
  overrideResponse?:
    | ApiResponsePaymentOrderCreated
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) =>
        | Promise<ApiResponsePaymentOrderCreated>
        | ApiResponsePaymentOrderCreated),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/group-buys/:groupBuyId/payment-orders',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1GroupBuysGroupBuyIdPaymentOrdersResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1PaymentsPortoneCompleteMockHandler = (
  overrideResponse?:
    | ApiResponsePaymentConfirmed
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponsePaymentConfirmed> | ApiResponsePaymentConfirmed),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/payments/portone/complete',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1PaymentsPortoneCompleteResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1PaymentsPortoneWebhookMockHandler = (
  overrideResponse?:
    | ApiResponsePortOneWebhook
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponsePortOneWebhook> | ApiResponsePortOneWebhook),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/payments/portone/webhook',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1PaymentsPortoneWebhookResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1ParticipationsParticipationIdCancelMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/participations/:participationId/cancel',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1ParticipationsParticipationIdCancelResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1RefundsMockHandler = (
  overrideResponse?:
    | ApiResponseRefundList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseRefundList> | ApiResponseRefundList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/refunds',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1RefundsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getParticipationMock = () => [
  getGetApiV1GroupBuysGroupBuyIdCheckoutMockHandler(),
  getPostApiV1GroupBuysGroupBuyIdPaymentOrdersMockHandler(),
  getPostApiV1PaymentsPortoneCompleteMockHandler(),
  getPostApiV1PaymentsPortoneWebhookMockHandler(),
  getPostApiV1ParticipationsParticipationIdCancelMockHandler(),
  getGetApiV1RefundsMockHandler(),
];
