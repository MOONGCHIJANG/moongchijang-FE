/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseAdminCsTicketDetail,
  ApiResponseAdminCsTicketPage,
  ApiResponseAdminDashboardSummary,
  ApiResponseAdminDashboardUnconfirmedOrders,
  ApiResponseAdminGroupBuyRequestAction,
  ApiResponseAdminOrderDetail,
  ApiResponseAdminOrderPage,
  ApiResponseAdminRefundPage,
  ApiResponseAdminRequestDetail,
  ApiResponseAdminRequestPage,
  ApiResponseAdminSettlementDashboard,
  ApiResponseAdminSettlementDetail,
  ApiResponseAdminSettlementPage,
  ApiResponseGroupBuyRequestDetail,
  SuccessNoDataResponse,
} from '../api.schemas';

export const getGetApiV1AdminSummaryResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminDashboardSummary, object>
  > = {},
): ApiResponseAdminDashboardSummary => ({
  success: faker.datatype.boolean(),
  data: {
    pendingRefundAmount: faker.number.int(),
    pendingRefundAmountChangeRate: faker.number.float({ fractionDigits: 2 }),
    pendingApprovalCount: faker.number.int(),
    averageReviewMinutes: faker.number.int(),
    pendingApprovalChangeRate: faker.number.float({ fractionDigits: 2 }),
    unconfirmedOrderCount: faker.number.int(),
    unconfirmedOrderOver48hCount: faker.number.int(),
    todayCompletedRefundCount: faker.number.int(),
    todayCompletedApprovalCount: faker.number.int(),
    hasOrderOver48h: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminDashboardUnconfirmedOrdersResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminDashboardUnconfirmedOrders, object>
  > = {},
): ApiResponseAdminDashboardUnconfirmedOrders => ({
  success: faker.datatype.boolean(),
  data: {
    totalUnconfirmedCount: faker.number.int(),
    overdueCount: faker.number.int(),
    hasOverdue: faker.datatype.boolean(),
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      orderId: faker.number.int(),
      groupBuyId: faker.number.int(),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      achievedAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
      finalQuantity: faker.number.int(),
      pendingRefundCount: faker.number.int(),
      pickupDate: faker.date.past().toISOString().slice(0, 10),
      elapsedHours: faker.number.int(),
      overdue: faker.datatype.boolean(),
      progressRate: faker.number.int(),
      ownerContacted: faker.datatype.boolean(),
      ownerContactedAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminOrdersResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminOrderPage, object>> = {},
): ApiResponseAdminOrderPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      orderId: faker.number.int(),
      groupBuyId: faker.number.int(),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      achievedAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
      finalQuantity: faker.number.int(),
      pendingRefundCount: faker.number.int(),
      pickupDate: faker.date.past().toISOString().slice(0, 10),
      elapsedHours: faker.number.int(),
      progressRate: faker.number.int(),
      orderStatus: faker.helpers.arrayElement([
        'PENDING',
        'CONFIRMED',
        'CANCELLED',
      ] as const),
      ownerContactedAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
      orderConfirmedAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
      actionable: faker.datatype.boolean(),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminOrdersOrderIdResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminOrderDetail, object>> = {},
): ApiResponseAdminOrderDetail => ({
  success: faker.datatype.boolean(),
  data: {
    orderId: faker.number.int(),
    groupBuyId: faker.number.int(),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    productDescription: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storePhoneNumber: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    achievedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    finalQuantity: faker.number.int(),
    targetQuantity: faker.number.int(),
    pendingRefundCount: faker.number.int(),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupContact: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    elapsedHours: faker.number.int(),
    progressRate: faker.number.int(),
    orderStatus: faker.helpers.arrayElement([
      'PENDING',
      'CONFIRMED',
      'CANCELLED',
    ] as const),
    ownerContactedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderConfirmedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderCancelledAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminOrdersOrderIdOwnerContactResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminOrderDetail, object>> = {},
): ApiResponseAdminOrderDetail => ({
  success: faker.datatype.boolean(),
  data: {
    orderId: faker.number.int(),
    groupBuyId: faker.number.int(),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    productDescription: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storePhoneNumber: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    achievedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    finalQuantity: faker.number.int(),
    targetQuantity: faker.number.int(),
    pendingRefundCount: faker.number.int(),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupContact: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    elapsedHours: faker.number.int(),
    progressRate: faker.number.int(),
    orderStatus: faker.helpers.arrayElement([
      'PENDING',
      'CONFIRMED',
      'CANCELLED',
    ] as const),
    ownerContactedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderConfirmedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderCancelledAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminOrdersOrderIdConfirmResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminOrderDetail, object>> = {},
): ApiResponseAdminOrderDetail => ({
  success: faker.datatype.boolean(),
  data: {
    orderId: faker.number.int(),
    groupBuyId: faker.number.int(),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    productDescription: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storePhoneNumber: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    achievedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    finalQuantity: faker.number.int(),
    targetQuantity: faker.number.int(),
    pendingRefundCount: faker.number.int(),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupContact: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    elapsedHours: faker.number.int(),
    progressRate: faker.number.int(),
    orderStatus: faker.helpers.arrayElement([
      'PENDING',
      'CONFIRMED',
      'CANCELLED',
    ] as const),
    ownerContactedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderConfirmedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderCancelledAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminOrdersOrderIdCancelResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminOrderDetail, object>> = {},
): ApiResponseAdminOrderDetail => ({
  success: faker.datatype.boolean(),
  data: {
    orderId: faker.number.int(),
    groupBuyId: faker.number.int(),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    productDescription: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storePhoneNumber: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    achievedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    finalQuantity: faker.number.int(),
    targetQuantity: faker.number.int(),
    pendingRefundCount: faker.number.int(),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupContact: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    elapsedHours: faker.number.int(),
    progressRate: faker.number.int(),
    orderStatus: faker.helpers.arrayElement([
      'PENDING',
      'CONFIRMED',
      'CANCELLED',
    ] as const),
    ownerContactedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderConfirmedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    orderCancelledAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminCsTicketsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminCsTicketPage, object>> = {},
): ApiResponseAdminCsTicketPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      ticketId: faker.number.int(),
      type: faker.helpers.arrayElement([
        'REFUND',
        'ORDER',
        'PICKUP',
        'ACCOUNT',
        'ETC',
      ] as const),
      title: faker.string.alpha({ length: { min: 10, max: 20 } }),
      consumerId: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      consumerName: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      groupBuyId: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      groupBuyName: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      priority: faker.helpers.arrayElement([
        'LOW',
        'MEDIUM',
        'HIGH',
        'URGENT',
      ] as const),
      assigneeName: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      createdAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        undefined,
      ]),
      slaHours: faker.number.int(),
      status: faker.helpers.arrayElement([
        'RECEIVED',
        'IN_PROGRESS',
        'COMPLETED',
      ] as const),
      actionable: faker.datatype.boolean(),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminCsTicketsTicketIdResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminCsTicketDetail, object>
  > = {},
): ApiResponseAdminCsTicketDetail => ({
  success: faker.datatype.boolean(),
  data: {
    ticketId: faker.number.int(),
    type: faker.helpers.arrayElement([
      'REFUND',
      'ORDER',
      'PICKUP',
      'ACCOUNT',
      'ETC',
    ] as const),
    title: faker.string.alpha({ length: { min: 10, max: 20 } }),
    description: faker.string.alpha({ length: { min: 10, max: 20 } }),
    priority: faker.helpers.arrayElement([
      'LOW',
      'MEDIUM',
      'HIGH',
      'URGENT',
    ] as const),
    status: faker.helpers.arrayElement([
      'RECEIVED',
      'IN_PROGRESS',
      'COMPLETED',
    ] as const),
    createdAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    updatedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    slaHours: faker.number.int(),
    consumer: faker.helpers.arrayElement([
      {
        ...{
          userId: faker.helpers.arrayElement([
            faker.helpers.arrayElement([faker.number.int(), null]),
            undefined,
          ]),
          nickname: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          email: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          phoneNumber: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
        },
      },
      null,
    ]),
    owner: faker.helpers.arrayElement([
      {
        ...{
          storeId: faker.number.int(),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storePhoneNumber: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
        },
      },
      null,
    ]),
    groupBuy: faker.helpers.arrayElement([
      {
        ...{
          groupBuyId: faker.number.int(),
          productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
        },
      },
      null,
    ]),
    refundParticipationId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
    assigneeName: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    processingMemo: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    resolvedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getPatchApiV1AdminCsTicketsTicketIdResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminCsTicketDetail, object>
  > = {},
): ApiResponseAdminCsTicketDetail => ({
  success: faker.datatype.boolean(),
  data: {
    ticketId: faker.number.int(),
    type: faker.helpers.arrayElement([
      'REFUND',
      'ORDER',
      'PICKUP',
      'ACCOUNT',
      'ETC',
    ] as const),
    title: faker.string.alpha({ length: { min: 10, max: 20 } }),
    description: faker.string.alpha({ length: { min: 10, max: 20 } }),
    priority: faker.helpers.arrayElement([
      'LOW',
      'MEDIUM',
      'HIGH',
      'URGENT',
    ] as const),
    status: faker.helpers.arrayElement([
      'RECEIVED',
      'IN_PROGRESS',
      'COMPLETED',
    ] as const),
    createdAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    updatedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    slaHours: faker.number.int(),
    consumer: faker.helpers.arrayElement([
      {
        ...{
          userId: faker.helpers.arrayElement([
            faker.helpers.arrayElement([faker.number.int(), null]),
            undefined,
          ]),
          nickname: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          email: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          phoneNumber: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
        },
      },
      null,
    ]),
    owner: faker.helpers.arrayElement([
      {
        ...{
          storeId: faker.number.int(),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storePhoneNumber: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
        },
      },
      null,
    ]),
    groupBuy: faker.helpers.arrayElement([
      {
        ...{
          groupBuyId: faker.number.int(),
          productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
        },
      },
      null,
    ]),
    refundParticipationId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
    assigneeName: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    processingMemo: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    resolvedAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
    actionable: faker.datatype.boolean(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminGroupBuyRequestsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminRequestPage, object>> = {},
): ApiResponseAdminRequestPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      requestId: faker.number.int(),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      desiredQuantity: faker.number.int(),
      desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
      status: faker.helpers.arrayElement([
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ] as const),
      requesterId: faker.number.int(),
      requesterName: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      originalPrice: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      price: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      reviewElapsedMinutes: faker.helpers.arrayElement([
        faker.helpers.arrayElement([faker.number.int(), null]),
        undefined,
      ]),
      actionable: faker.datatype.boolean(),
      createdAt: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.date.past().toISOString().slice(0, 19) + 'Z',
          null,
        ]),
        null,
      ]),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminGroupBuyRequestsRequestIdResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminRequestDetail, object>
  > = {},
): ApiResponseAdminRequestDetail => ({
  success: faker.datatype.boolean(),
  data: {
    requestId: faker.number.int(),
    requester: {
      userId: faker.number.int(),
      nickname: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      phoneNumber: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      email: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        undefined,
      ]),
      provider: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.helpers.arrayElement(['KAKAO', 'EMAIL'] as const),
          null,
        ]),
        undefined,
      ]),
    },
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    placeId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    roadAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    lotAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    latitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    longitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredQuantity: faker.number.int(),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    additionalNote: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    status: faker.helpers.arrayElement([
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    rejectionReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    openedGroupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
    statusHistory: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      status: faker.helpers.arrayElement([
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ] as const),
      changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    createdAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      null,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseGroupBuyRequestDetail, object>
  > = {},
): ApiResponseGroupBuyRequestDetail => ({
  success: faker.datatype.boolean(),
  data: {
    requestId: faker.number.int(),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    placeId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    roadAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    lotAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    latitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    longitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredQuantity: faker.number.int(),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    additionalNote: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    status: faker.helpers.arrayElement([
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    rejectionReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    openedGroupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      null,
    ]),
    statusHistory: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      status: faker.helpers.arrayElement([
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ] as const),
      changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminGroupBuyRequestAction, object>
  > = {},
): ApiResponseAdminGroupBuyRequestAction => ({
  success: faker.datatype.boolean(),
  data: {
    requestId: faker.number.int(),
    status: faker.helpers.arrayElement(['OPENED', 'REJECTED'] as const),
    groupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminGroupBuyRequestAction, object>
  > = {},
): ApiResponseAdminGroupBuyRequestAction => ({
  success: faker.datatype.boolean(),
  data: {
    requestId: faker.number.int(),
    status: faker.helpers.arrayElement(['OPENED', 'REJECTED'] as const),
    groupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminRefundsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseAdminRefundPage, object>> = {},
): ApiResponseAdminRefundPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      participationId: faker.number.int(),
      userName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      paymentAmount: faker.number.int(),
      refundStatus: faker.helpers.arrayElement([
        'WAITING',
        'COMPLETED',
      ] as const),
      refundReason: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        null,
      ]),
      createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1AdminRefundsParticipationIdManualResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminSettlementsDashboardResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminSettlementDashboard, object>
  > = {},
): ApiResponseAdminSettlementDashboard => ({
  success: faker.datatype.boolean(),
  data: {
    year: faker.number.int(),
    month: faker.number.int(),
    completedSettlementAmount: faker.number.int(),
    scheduledSettlementAmount: faker.number.int(),
    platformFeeAmount: faker.number.int(),
    totalTransactionAmount: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminSettlementsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminSettlementPage, object>
  > = {},
): ApiResponseAdminSettlementPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      settlementId: faker.number.int(),
      groupBuyId: faker.number.int(),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      pickupCompletedDate: faker.date.past().toISOString().slice(0, 10),
      participantCount: faker.number.int(),
      totalPaymentAmount: faker.number.int(),
      refundDeductionAmount: faker.number.int(),
      platformFeeAmount: faker.number.int(),
      settlementAmount: faker.number.int(),
      scheduledSettlementDate: faker.date.past().toISOString().slice(0, 10),
      status: faker.helpers.arrayElement(['SCHEDULED', 'COMPLETED'] as const),
      actionable: faker.datatype.boolean(),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminSettlementsSettlementIdResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseAdminSettlementDetail, object>
  > = {},
): ApiResponseAdminSettlementDetail => ({
  success: faker.datatype.boolean(),
  data: {
    ...{
      settlementId: faker.number.int(),
      groupBuyId: faker.number.int(),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      pickupCompletedDate: faker.date.past().toISOString().slice(0, 10),
      participantCount: faker.number.int(),
      totalPaymentAmount: faker.number.int(),
      refundDeductionAmount: faker.number.int(),
      platformFeeAmount: faker.number.int(),
      settlementAmount: faker.number.int(),
      scheduledSettlementDate: faker.date.past().toISOString().slice(0, 10),
      status: faker.helpers.arrayElement(['SCHEDULED', 'COMPLETED'] as const),
      actionable: faker.datatype.boolean(),
    },
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1AdminSummaryMockHandler = (
  overrideResponse?:
    | ApiResponseAdminDashboardSummary
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminDashboardSummary>
        | ApiResponseAdminDashboardSummary),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/summary',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminSummaryResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminDashboardUnconfirmedOrdersMockHandler = (
  overrideResponse?:
    | ApiResponseAdminDashboardUnconfirmedOrders
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminDashboardUnconfirmedOrders>
        | ApiResponseAdminDashboardUnconfirmedOrders),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/dashboard/unconfirmed-orders',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminDashboardUnconfirmedOrdersResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminOrdersMockHandler = (
  overrideResponse?:
    | ApiResponseAdminOrderPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseAdminOrderPage> | ApiResponseAdminOrderPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/orders',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminOrdersResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminOrdersOrderIdMockHandler = (
  overrideResponse?:
    | ApiResponseAdminOrderDetail
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseAdminOrderDetail> | ApiResponseAdminOrderDetail),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/orders/:orderId',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminOrdersOrderIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminOrdersOrderIdOwnerContactMockHandler = (
  overrideResponse?:
    | ApiResponseAdminOrderDetail
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponseAdminOrderDetail> | ApiResponseAdminOrderDetail),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/orders/:orderId/owner-contact',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminOrdersOrderIdOwnerContactResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminOrdersOrderIdConfirmMockHandler = (
  overrideResponse?:
    | ApiResponseAdminOrderDetail
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponseAdminOrderDetail> | ApiResponseAdminOrderDetail),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/orders/:orderId/confirm',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminOrdersOrderIdConfirmResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminOrdersOrderIdCancelMockHandler = (
  overrideResponse?:
    | ApiResponseAdminOrderDetail
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponseAdminOrderDetail> | ApiResponseAdminOrderDetail),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/orders/:orderId/cancel',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminOrdersOrderIdCancelResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminCsTicketsMockHandler = (
  overrideResponse?:
    | ApiResponseAdminCsTicketPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminCsTicketPage>
        | ApiResponseAdminCsTicketPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/cs-tickets',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminCsTicketsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminCsTicketsTicketIdMockHandler = (
  overrideResponse?:
    | ApiResponseAdminCsTicketDetail
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminCsTicketDetail>
        | ApiResponseAdminCsTicketDetail),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/cs-tickets/:ticketId',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminCsTicketsTicketIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPatchApiV1AdminCsTicketsTicketIdMockHandler = (
  overrideResponse?:
    | ApiResponseAdminCsTicketDetail
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminCsTicketDetail>
        | ApiResponseAdminCsTicketDetail),
  options?: RequestHandlerOptions,
) => {
  return http.patch(
    '*/api/v1/admin/cs-tickets/:ticketId',
    async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPatchApiV1AdminCsTicketsTicketIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminGroupBuyRequestsMockHandler = (
  overrideResponse?:
    | ApiResponseAdminRequestPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseAdminRequestPage> | ApiResponseAdminRequestPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/group-buy-requests',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminGroupBuyRequestsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminGroupBuyRequestsRequestIdMockHandler = (
  overrideResponse?:
    | ApiResponseAdminRequestDetail
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminRequestDetail>
        | ApiResponseAdminRequestDetail),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/group-buy-requests/:requestId',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminGroupBuyRequestsRequestIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMockHandler = (
  overrideResponse?:
    | ApiResponseGroupBuyRequestDetail
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) =>
        | Promise<ApiResponseGroupBuyRequestDetail>
        | ApiResponseGroupBuyRequestDetail),
  options?: RequestHandlerOptions,
) => {
  return http.patch(
    '*/api/v1/admin/group-buy-requests/:requestId/status',
    async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPatchApiV1AdminGroupBuyRequestsRequestIdStatusResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveMockHandler = (
  overrideResponse?:
    | ApiResponseAdminGroupBuyRequestAction
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminGroupBuyRequestAction>
        | ApiResponseAdminGroupBuyRequestAction),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/group-buy-requests/:requestId/approve',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminGroupBuyRequestsRequestIdApproveResponseMock(),
        { status: 201 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectMockHandler = (
  overrideResponse?:
    | ApiResponseAdminGroupBuyRequestAction
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminGroupBuyRequestAction>
        | ApiResponseAdminGroupBuyRequestAction),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/group-buy-requests/:requestId/reject',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminGroupBuyRequestsRequestIdRejectResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminRefundsMockHandler = (
  overrideResponse?:
    | ApiResponseAdminRefundPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseAdminRefundPage> | ApiResponseAdminRefundPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/refunds',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminRefundsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1AdminRefundsParticipationIdManualMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/admin/refunds/:participationId/manual',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1AdminRefundsParticipationIdManualResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminSettlementsDashboardMockHandler = (
  overrideResponse?:
    | ApiResponseAdminSettlementDashboard
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminSettlementDashboard>
        | ApiResponseAdminSettlementDashboard),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/settlements/dashboard',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminSettlementsDashboardResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminSettlementsMockHandler = (
  overrideResponse?:
    | ApiResponseAdminSettlementPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminSettlementPage>
        | ApiResponseAdminSettlementPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/settlements',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminSettlementsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1AdminSettlementsSettlementIdMockHandler = (
  overrideResponse?:
    | ApiResponseAdminSettlementDetail
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseAdminSettlementDetail>
        | ApiResponseAdminSettlementDetail),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/admin/settlements/:settlementId',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1AdminSettlementsSettlementIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getAdminMock = () => [
  getGetApiV1AdminSummaryMockHandler(),
  getGetApiV1AdminDashboardUnconfirmedOrdersMockHandler(),
  getGetApiV1AdminOrdersMockHandler(),
  getGetApiV1AdminOrdersOrderIdMockHandler(),
  getPostApiV1AdminOrdersOrderIdOwnerContactMockHandler(),
  getPostApiV1AdminOrdersOrderIdConfirmMockHandler(),
  getPostApiV1AdminOrdersOrderIdCancelMockHandler(),
  getGetApiV1AdminCsTicketsMockHandler(),
  getGetApiV1AdminCsTicketsTicketIdMockHandler(),
  getPatchApiV1AdminCsTicketsTicketIdMockHandler(),
  getGetApiV1AdminGroupBuyRequestsMockHandler(),
  getGetApiV1AdminGroupBuyRequestsRequestIdMockHandler(),
  getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMockHandler(),
  getPostApiV1AdminGroupBuyRequestsRequestIdApproveMockHandler(),
  getPostApiV1AdminGroupBuyRequestsRequestIdRejectMockHandler(),
  getGetApiV1AdminRefundsMockHandler(),
  getPostApiV1AdminRefundsParticipationIdManualMockHandler(),
  getGetApiV1AdminSettlementsDashboardMockHandler(),
  getGetApiV1AdminSettlementsMockHandler(),
  getGetApiV1AdminSettlementsSettlementIdMockHandler(),
];
