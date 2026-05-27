/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import {
  faker
} from '@faker-js/faker';

import {
  HttpResponse,
  http
} from 'msw';
import type {
  RequestHandlerOptions
} from 'msw';

import type {
  ApiResponseAdminDashboardSummary,
  ApiResponseAdminGroupBuyDetail,
  ApiResponseAdminGroupBuyList,
  ApiResponseAdminGroupBuyRequestAction,
  ApiResponseAdminOrderPage,
  ApiResponseAdminRefundPage,
  ApiResponseAdminRequestDetail,
  ApiResponseAdminRequestPage,
  ApiResponseGroupBuyId,
  ApiResponseGroupBuyRequestDetail,
  ApiResponseSettlementId,
  ApiResponseSettlementPage,
  SuccessNoDataResponse
} from '../api.schemas';


export const getGetApiV1AdminSummaryResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminDashboardSummary, object>> = {}): ApiResponseAdminDashboardSummary => ({success: faker.datatype.boolean(), data: {pendingRefundAmount: faker.number.int(), pendingRefundAmountChangeRate: faker.number.float({fractionDigits: 2}), pendingApprovalCount: faker.number.int(), averageReviewMinutes: faker.number.int(), pendingApprovalChangeRate: faker.number.float({fractionDigits: 2}), unconfirmedOrderCount: faker.number.int(), unconfirmedOrderOver48hCount: faker.number.int(), todayCompletedRefundCount: faker.number.int(), todayCompletedApprovalCount: faker.number.int(), hasOrderOver48h: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1AdminOrdersResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminOrderPage, object>> = {}): ApiResponseAdminOrderPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({orderId: faker.number.int(), groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), achievedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), finalQuantity: faker.number.int(), pendingRefundCount: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), elapsedHours: faker.number.int(), progressRate: faker.number.int(), orderStatus: faker.helpers.arrayElement(['PENDING','CONFIRMED','CANCELLED'] as const), ownerContactedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), orderConfirmedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), actionable: faker.datatype.boolean()})), totalElements: faker.number.int(), totalPages: faker.number.int(), number: faker.number.int(), size: faker.number.int()}, error: {}, ...overrideResponse})

export const getGetApiV1AdminGroupBuyRequestsResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminRequestPage, object>> = {}): ApiResponseAdminRequestPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({requestId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), desiredQuantity: faker.number.int(), desiredPickupDate: faker.date.past().toISOString().slice(0, 10), status: faker.helpers.arrayElement(['IN_REVIEW','IN_CONTACT','OPENED','REJECTED'] as const), requesterId: faker.number.int(), requesterName: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), originalPrice: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), price: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), reviewElapsedMinutes: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), actionable: faker.datatype.boolean(), createdAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), null])})), totalElements: faker.number.int(), totalPages: faker.number.int(), number: faker.number.int(), size: faker.number.int()}, error: {}, ...overrideResponse})

export const getGetApiV1AdminGroupBuyRequestsRequestIdResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminRequestDetail, object>> = {}): ApiResponseAdminRequestDetail => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), requester: {userId: faker.number.int(), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), provider: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), null]), undefined])}, storeName: faker.string.alpha({length: {min: 10, max: 20}}), storeAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), placeId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), roadAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), lotAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), latitude: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.float({fractionDigits: 2}), null]), undefined]), longitude: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.float({fractionDigits: 2}), null]), undefined]), productName: faker.string.alpha({length: {min: 10, max: 20}}), desiredQuantity: faker.number.int(), desiredPickupDate: faker.date.past().toISOString().slice(0, 10), additionalNote: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), status: faker.helpers.arrayElement(['IN_REVIEW','IN_CONTACT','OPENED','REJECTED'] as const), rejectionReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), openedGroupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), statusHistory: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({status: faker.helpers.arrayElement(['IN_REVIEW','IN_CONTACT','OPENED','REJECTED'] as const), changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'})), createdAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), null])}, error: {}, ...overrideResponse})

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusResponseMock = (overrideResponse: Partial<Extract<ApiResponseGroupBuyRequestDetail, object>> = {}): ApiResponseGroupBuyRequestDetail => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), storeAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), placeId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), roadAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), lotAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), latitude: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.float({fractionDigits: 2}), null]), undefined]), longitude: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.float({fractionDigits: 2}), null]), undefined]), productName: faker.string.alpha({length: {min: 10, max: 20}}), desiredQuantity: faker.number.int(), desiredPickupDate: faker.date.past().toISOString().slice(0, 10), additionalNote: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), status: faker.helpers.arrayElement(['IN_REVIEW','IN_CONTACT','OPENED','REJECTED'] as const), rejectionReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), openedGroupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), null]), statusHistory: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({status: faker.helpers.arrayElement(['IN_REVIEW','IN_CONTACT','OPENED','REJECTED'] as const), changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'})), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}, error: {}, ...overrideResponse})

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminGroupBuyRequestAction, object>> = {}): ApiResponseAdminGroupBuyRequestAction => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), status: faker.helpers.arrayElement(['OPENED','REJECTED'] as const), groupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined])}, error: {}, ...overrideResponse})

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminGroupBuyRequestAction, object>> = {}): ApiResponseAdminGroupBuyRequestAction => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), status: faker.helpers.arrayElement(['OPENED','REJECTED'] as const), groupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined])}, error: {}, ...overrideResponse})

export const getGetApiV1AdminGroupBuysResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminGroupBuyList, object>> = {}): ApiResponseAdminGroupBuyList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({groupBuyId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(['IN_PROGRESS','ACHIEVED'] as const), deadline: faker.date.past().toISOString().slice(0, 10), achievementRate: faker.number.int(), currentQuantity: faker.number.int(), targetQuantity: faker.number.int(), remainingQuantity: faker.number.int(), isOrderConfirmed: faker.datatype.boolean(), isOrderSheetSent: faker.datatype.boolean()})), error: {}, ...overrideResponse})

export const getPostApiV1AdminGroupBuysResponseMock = (overrideResponse: Partial<Extract<ApiResponseGroupBuyId, object>> = {}): ApiResponseGroupBuyId => ({success: faker.datatype.boolean(), data: {groupBuyId: faker.number.int()}, error: {}, ...overrideResponse})

export const getGetApiV1AdminGroupBuysGroupBuyIdResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminGroupBuyDetail, object>> = {}): ApiResponseAdminGroupBuyDetail => ({success: faker.datatype.boolean(), data: {groupBuyId: faker.number.int(), requestId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), null]), storeId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), productDescription: faker.string.alpha({length: {min: 10, max: 20}}), price: faker.number.int(), targetQuantity: faker.number.int(), maxQuantity: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), null]), currentQuantity: faker.number.int(), remainingQuantity: faker.number.int(), achievementRate: faker.number.int(), notice: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), status: faker.helpers.arrayElement(['IN_PROGRESS','ACHIEVED','FAILED'] as const), deadline: faker.date.past().toISOString().slice(0, 19) + 'Z', pickupDate: faker.date.past().toISOString().slice(0, 10), pickupTimeStart: faker.string.alpha({length: {min: 10, max: 20}}), pickupTimeEnd: faker.string.alpha({length: {min: 10, max: 20}}), pickupLocation: faker.string.alpha({length: {min: 10, max: 20}}), isOrderConfirmed: faker.datatype.boolean(), isOrderSheetSent: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPatchApiV1AdminGroupBuysGroupBuyIdResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1AdminRefundsResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdminRefundPage, object>> = {}): ApiResponseAdminRefundPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({participationId: faker.number.int(), userName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), paymentAmount: faker.number.int(), refundStatus: faker.helpers.arrayElement(['WAITING','COMPLETED'] as const), refundReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z'})), totalElements: faker.number.int(), totalPages: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AdminRefundsParticipationIdManualResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1AdminSettlementsResponseMock = (overrideResponse: Partial<Extract<ApiResponseSettlementPage, object>> = {}): ApiResponseSettlementPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({settlementId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), totalAmount: faker.number.int(), escrowStatus: faker.helpers.arrayElement(['HOLDING','RELEASED'] as const), scheduledPaymentDate: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 10), null]), null]), settlementMethod: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), memo: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z'})), totalElements: faker.number.int(), totalPages: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AdminSettlementsResponseMock = (overrideResponse: Partial<Extract<ApiResponseSettlementId, object>> = {}): ApiResponseSettlementId => ({success: faker.datatype.boolean(), data: {settlementId: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AdminSettlementsSettlementIdReleaseResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})


export const getGetApiV1AdminSummaryMockHandler = (overrideResponse?: ApiResponseAdminDashboardSummary | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminDashboardSummary> | ApiResponseAdminDashboardSummary), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/summary', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminSummaryResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminOrdersMockHandler = (overrideResponse?: ApiResponseAdminOrderPage | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminOrderPage> | ApiResponseAdminOrderPage), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/orders', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminOrdersResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminGroupBuyRequestsMockHandler = (overrideResponse?: ApiResponseAdminRequestPage | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminRequestPage> | ApiResponseAdminRequestPage), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/group-buy-requests', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminGroupBuyRequestsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminGroupBuyRequestsRequestIdMockHandler = (overrideResponse?: ApiResponseAdminRequestDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminRequestDetail> | ApiResponseAdminRequestDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/group-buy-requests/:requestId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminGroupBuyRequestsRequestIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMockHandler = (overrideResponse?: ApiResponseGroupBuyRequestDetail | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseGroupBuyRequestDetail> | ApiResponseGroupBuyRequestDetail), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/admin/group-buy-requests/:requestId/status', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1AdminGroupBuyRequestsRequestIdStatusResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveMockHandler = (overrideResponse?: ApiResponseAdminGroupBuyRequestAction | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAdminGroupBuyRequestAction> | ApiResponseAdminGroupBuyRequestAction), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/group-buy-requests/:requestId/approve', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminGroupBuyRequestsRequestIdApproveResponseMock(),
      { status: 201
      })
  }, options)
}

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectMockHandler = (overrideResponse?: ApiResponseAdminGroupBuyRequestAction | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAdminGroupBuyRequestAction> | ApiResponseAdminGroupBuyRequestAction), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/group-buy-requests/:requestId/reject', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminGroupBuyRequestsRequestIdRejectResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminGroupBuysMockHandler = (overrideResponse?: ApiResponseAdminGroupBuyList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminGroupBuyList> | ApiResponseAdminGroupBuyList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/group-buys', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminGroupBuysResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminGroupBuysMockHandler = (overrideResponse?: ApiResponseGroupBuyId | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseGroupBuyId> | ApiResponseGroupBuyId), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/group-buys', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminGroupBuysResponseMock(),
      { status: 201
      })
  }, options)
}

export const getGetApiV1AdminGroupBuysGroupBuyIdMockHandler = (overrideResponse?: ApiResponseAdminGroupBuyDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminGroupBuyDetail> | ApiResponseAdminGroupBuyDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/group-buys/:groupBuyId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminGroupBuysGroupBuyIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1AdminGroupBuysGroupBuyIdMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/admin/group-buys/:groupBuyId', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1AdminGroupBuysGroupBuyIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/group-buys/:groupBuyId/order-confirm', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/group-buys/:groupBuyId/order-sheet', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminRefundsMockHandler = (overrideResponse?: ApiResponseAdminRefundPage | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseAdminRefundPage> | ApiResponseAdminRefundPage), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/refunds', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminRefundsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminRefundsParticipationIdManualMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/refunds/:participationId/manual', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminRefundsParticipationIdManualResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AdminSettlementsMockHandler = (overrideResponse?: ApiResponseSettlementPage | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseSettlementPage> | ApiResponseSettlementPage), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/admin/settlements', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AdminSettlementsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AdminSettlementsMockHandler = (overrideResponse?: ApiResponseSettlementId | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseSettlementId> | ApiResponseSettlementId), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/settlements', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminSettlementsResponseMock(),
      { status: 201
      })
  }, options)
}

export const getPostApiV1AdminSettlementsSettlementIdReleaseMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/admin/settlements/:settlementId/release', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AdminSettlementsSettlementIdReleaseResponseMock(),
      { status: 200
      })
  }, options)
}
export const getAdminMock = () => [
  getGetApiV1AdminSummaryMockHandler(),
  getGetApiV1AdminOrdersMockHandler(),
  getGetApiV1AdminGroupBuyRequestsMockHandler(),
  getGetApiV1AdminGroupBuyRequestsRequestIdMockHandler(),
  getPatchApiV1AdminGroupBuyRequestsRequestIdStatusMockHandler(),
  getPostApiV1AdminGroupBuyRequestsRequestIdApproveMockHandler(),
  getPostApiV1AdminGroupBuyRequestsRequestIdRejectMockHandler(),
  getGetApiV1AdminGroupBuysMockHandler(),
  getPostApiV1AdminGroupBuysMockHandler(),
  getGetApiV1AdminGroupBuysGroupBuyIdMockHandler(),
  getPatchApiV1AdminGroupBuysGroupBuyIdMockHandler(),
  getPostApiV1AdminGroupBuysGroupBuyIdOrderConfirmMockHandler(),
  getPostApiV1AdminGroupBuysGroupBuyIdOrderSheetMockHandler(),
  getGetApiV1AdminRefundsMockHandler(),
  getPostApiV1AdminRefundsParticipationIdManualMockHandler(),
  getGetApiV1AdminSettlementsMockHandler(),
  getPostApiV1AdminSettlementsMockHandler(),
  getPostApiV1AdminSettlementsSettlementIdReleaseMockHandler()
]
