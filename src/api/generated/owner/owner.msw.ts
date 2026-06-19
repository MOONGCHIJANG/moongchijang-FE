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

import {
  OwnerSettlementStatus
} from '../api.schemas';
import type {
  ApiResponseOwnerGroupBuyList,
  ApiResponseOwnerGroupBuyManageDetail,
  ApiResponseOwnerGroupBuyManageList,
  ApiResponseOwnerGroupBuyRequestCreated,
  ApiResponseOwnerGroupBuyRequestDetail,
  ApiResponseOwnerGroupBuyRequestList,
  ApiResponseOwnerGroupBuySummary,
  ApiResponseOwnerRefundRequestDetail,
  ApiResponseOwnerRefundRequestList,
  ApiResponseOwnerRefundReviewSubmit,
  ApiResponseOwnerSettlementItemList,
  ApiResponseOwnerSettlementMonthChipList,
  ApiResponseOwnerSettlementMonthlySummary,
  ApiResponsePickupScheduleList,
  ApiResponseReservationPage,
  SuccessNoDataResponse
} from '../api.schemas';


export const getGetApiV1OwnerHomePickupScheduleResponseMock = (overrideResponse: Partial<Extract<ApiResponsePickupScheduleList, object>> = {}): ApiResponsePickupScheduleList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({timeSlot: faker.string.alpha({length: {min: 10, max: 20}}), totalReservationCount: faker.number.int(), waitingCount: faker.number.int(), completedCount: faker.number.int()})), error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyList, object>> = {}): ApiResponseOwnerGroupBuyList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), achievementRate: faker.number.int(), currentQuantity: faker.number.int(), targetQuantity: faker.number.int(), price: faker.number.int(), deadline: faker.date.past().toISOString().slice(0, 10), status: faker.helpers.arrayElement(['IN_PROGRESS','ACHIEVED','FAILED'] as const)})), error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysSummaryResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuySummary, object>> = {}): ApiResponseOwnerGroupBuySummary => ({success: faker.datatype.boolean(), data: {ongoingCount: faker.number.int(), achievedCount: faker.number.int(), todayPickupUserCount: faker.number.int(), settlementExpectedAmount: faker.number.int(), isEmpty: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysManageResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyManageList, object>> = {}): ApiResponseOwnerGroupBuyManageList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({groupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), requestId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), productName: faker.string.alpha({length: {min: 10, max: 20}}), price: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), deadlineDday: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), achievementRate: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), currentQuantity: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), targetQuantity: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), status: faker.helpers.arrayElement(['ALL','IN_PROGRESS','ACHIEVED','ENDED','PENDING_APPROVAL'] as const)})), error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyManageDetail, object>> = {}): ApiResponseOwnerGroupBuyManageDetail => ({success: faker.datatype.boolean(), data: {groupBuyId: faker.number.int(), status: faker.helpers.arrayElement(['ALL','IN_PROGRESS','ACHIEVED','ENDED','PENDING_APPROVAL'] as const), recruitmentStartDate: faker.date.past().toISOString().slice(0, 10), recruitmentEndDate: faker.date.past().toISOString().slice(0, 10), participantSummary: {totalCount: faker.number.int(), completedCount: faker.number.int(), waitingCount: faker.number.int()}, participants: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({name: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), quantity: faker.number.int(), paymentMethod: faker.string.alpha({length: {min: 10, max: 20}}), paymentStatus: faker.string.alpha({length: {min: 10, max: 20}}), pickupTime: faker.string.alpha({length: {min: 10, max: 20}})}))}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysGroupBuyIdManageAchievedResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyManageDetail, object>> = {}): ApiResponseOwnerGroupBuyManageDetail => ({success: faker.datatype.boolean(), data: {groupBuyId: faker.number.int(), status: faker.helpers.arrayElement(['ALL','IN_PROGRESS','ACHIEVED','ENDED','PENDING_APPROVAL'] as const), recruitmentStartDate: faker.date.past().toISOString().slice(0, 10), recruitmentEndDate: faker.date.past().toISOString().slice(0, 10), participantSummary: {totalCount: faker.number.int(), completedCount: faker.number.int(), waitingCount: faker.number.int()}, participants: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({name: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), quantity: faker.number.int(), paymentMethod: faker.string.alpha({length: {min: 10, max: 20}}), paymentStatus: faker.string.alpha({length: {min: 10, max: 20}}), pickupTime: faker.string.alpha({length: {min: 10, max: 20}})}))}, error: {}, ...overrideResponse})

export const getPostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getPostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerSettlementsMonthlySummaryResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerSettlementMonthlySummary, object>> = {}): ApiResponseOwnerSettlementMonthlySummary => ({success: faker.datatype.boolean(), data: {year: faker.number.int(), month: faker.number.int(), settlementExpectedAmount: faker.number.int(), grossRevenueAmount: faker.number.int(), refundFeeAmount: faker.number.int()}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerSettlementsMonthChipsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerSettlementMonthChipList, object>> = {}): ApiResponseOwnerSettlementMonthChipList => ({success: faker.datatype.boolean(), data: {chips: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({year: faker.number.int(), month: faker.number.int(), label: faker.string.alpha({length: {min: 10, max: 20}})}))}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerSettlementsItemsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerSettlementItemList, object>> = {}): ApiResponseOwnerSettlementItemList => ({success: faker.datatype.boolean(), data: {year: faker.number.int(), month: faker.number.int(), items: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), participantCount: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), amount: faker.number.int(), settlementStatus: faker.helpers.arrayElement(Object.values(OwnerSettlementStatus))}))}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerSettlementsRefundRequestsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerRefundRequestList, object>> = {}): ApiResponseOwnerRefundRequestList => ({success: faker.datatype.boolean(), data: {pendingCount: faker.number.int(), completedCount: faker.number.int(), hasPendingItems: faker.datatype.boolean(), items: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({participationId: faker.number.int(), groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), paymentAmount: faker.number.int(), requesterName: faker.string.alpha({length: {min: 10, max: 20}}), requesterCode: faker.string.alpha({length: {min: 10, max: 20}}), refundReasonLabel: faker.string.alpha({length: {min: 10, max: 20}}), requestedDate: faker.date.past().toISOString().slice(0, 10), status: faker.helpers.arrayElement(['PENDING','COMPLETED'] as const), exceeded24Hours: faker.datatype.boolean()}))}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerSettlementsRefundRequestsParticipationIdResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerRefundRequestDetail, object>> = {}): ApiResponseOwnerRefundRequestDetail => ({success: faker.datatype.boolean(), data: {participationId: faker.number.int(), groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), requesterName: faker.string.alpha({length: {min: 10, max: 20}}), requestedDate: faker.date.past().toISOString().slice(0, 10), paymentAmount: faker.number.int(), penaltyAmount: faker.number.int(), refundExpectedAmount: faker.number.int(), refundReasonDetail: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), status: faker.helpers.arrayElement(['PENDING','COMPLETED'] as const)}, error: {}, ...overrideResponse})

export const getPostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerRefundReviewSubmit, object>> = {}): ApiResponseOwnerRefundReviewSubmit => ({success: faker.datatype.boolean(), data: {participationId: faker.number.int(), processed: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuyRequestsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyRequestList, object>> = {}): ApiResponseOwnerGroupBuyRequestList => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({requestId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), originalPrice: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), price: faker.number.int(), targetQuantity: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), requestedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), status: faker.helpers.arrayElement(['PENDING','APPROVED','REJECTED'] as const), rejectionReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), approvedGroupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined])})), totalElements: faker.number.int(), totalPages: faker.number.int(), number: faker.number.int(), size: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1OwnerGroupBuyRequestsResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyRequestCreated, object>> = {}): ApiResponseOwnerGroupBuyRequestCreated => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), status: faker.helpers.arrayElement(['PENDING','APPROVED','REJECTED'] as const)}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuyRequestsRequestIdResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyRequestDetail, object>> = {}): ApiResponseOwnerGroupBuyRequestDetail => ({success: faker.datatype.boolean(), data: {requestId: faker.number.int(), storeId: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), productDescription: faker.string.alpha({length: {min: 10, max: 20}}), originalPrice: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), price: faker.number.int(), targetQuantity: faker.number.int(), maxQuantity: faker.number.int(), perUserLimit: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), thumbnailUrl: faker.string.alpha({length: {min: 10, max: 20}}), imageUrls: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.string.alpha({length: {min: 10, max: 20}}))), deadline: faker.date.past().toISOString().slice(0, 19) + 'Z', pickupDate: faker.date.past().toISOString().slice(0, 10), pickupTimeStart: faker.string.alpha({length: {min: 10, max: 20}}), pickupTimeEnd: faker.string.alpha({length: {min: 10, max: 20}}), pickupLocation: faker.string.alpha({length: {min: 10, max: 20}}), pickupContact: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), status: faker.helpers.arrayElement(['PENDING','APPROVED','REJECTED'] as const), rejectionReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), approvedGroupBuyId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), reviewedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), requestedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined])}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerReservationsResponseMock = (overrideResponse: Partial<Extract<ApiResponseReservationPage, object>> = {}): ApiResponseReservationPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({participationId: faker.number.int(), userName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), quantity: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), pickupTimeStart: faker.string.alpha({length: {min: 10, max: 20}}), pickupTimeEnd: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(['WAITING','COMPLETED'] as const)})), waitingCount: faker.number.int(), completedCount: faker.number.int(), totalElements: faker.number.int(), totalPages: faker.number.int()}, error: {}, ...overrideResponse})

export const getPatchApiV1OwnerReservationsParticipationIdCompleteResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})


export const getGetApiV1OwnerHomePickupScheduleMockHandler = (overrideResponse?: ApiResponsePickupScheduleList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponsePickupScheduleList> | ApiResponsePickupScheduleList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/home/pickup-schedule', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerHomePickupScheduleResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuysMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyList> | ApiResponseOwnerGroupBuyList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buys', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuysResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuysSummaryMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuySummary | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuySummary> | ApiResponseOwnerGroupBuySummary), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buys/summary', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuysSummaryResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuysManageMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyManageList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyManageList> | ApiResponseOwnerGroupBuyManageList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buys/manage', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuysManageResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyManageDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyManageDetail> | ApiResponseOwnerGroupBuyManageDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buys/:groupBuyId/manage/in-progress', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuysGroupBuyIdManageAchievedMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyManageDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyManageDetail> | ApiResponseOwnerGroupBuyManageDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buys/:groupBuyId/manage/achieved', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuysGroupBuyIdManageAchievedResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/owner/group-buys/:groupBuyId/extension-requests', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/owner/group-buys/:groupBuyId/close-requests', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerSettlementsMonthlySummaryMockHandler = (overrideResponse?: ApiResponseOwnerSettlementMonthlySummary | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerSettlementMonthlySummary> | ApiResponseOwnerSettlementMonthlySummary), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/settlements/monthly-summary', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerSettlementsMonthlySummaryResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerSettlementsMonthChipsMockHandler = (overrideResponse?: ApiResponseOwnerSettlementMonthChipList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerSettlementMonthChipList> | ApiResponseOwnerSettlementMonthChipList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/settlements/month-chips', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerSettlementsMonthChipsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerSettlementsItemsMockHandler = (overrideResponse?: ApiResponseOwnerSettlementItemList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerSettlementItemList> | ApiResponseOwnerSettlementItemList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/settlements/items', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerSettlementsItemsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerSettlementsRefundRequestsMockHandler = (overrideResponse?: ApiResponseOwnerRefundRequestList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerRefundRequestList> | ApiResponseOwnerRefundRequestList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/settlements/refund-requests', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerSettlementsRefundRequestsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerSettlementsRefundRequestsParticipationIdMockHandler = (overrideResponse?: ApiResponseOwnerRefundRequestDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerRefundRequestDetail> | ApiResponseOwnerRefundRequestDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/settlements/refund-requests/:participationId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerSettlementsRefundRequestsParticipationIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsMockHandler = (overrideResponse?: ApiResponseOwnerRefundReviewSubmit | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseOwnerRefundReviewSubmit> | ApiResponseOwnerRefundReviewSubmit), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/owner/settlements/refund-requests/:participationId/review-submissions', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuyRequestsMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyRequestList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyRequestList> | ApiResponseOwnerGroupBuyRequestList), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buy-requests', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuyRequestsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1OwnerGroupBuyRequestsMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyRequestCreated | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyRequestCreated> | ApiResponseOwnerGroupBuyRequestCreated), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/owner/group-buy-requests', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1OwnerGroupBuyRequestsResponseMock(),
      { status: 201
      })
  }, options)
}

export const getGetApiV1OwnerGroupBuyRequestsRequestIdMockHandler = (overrideResponse?: ApiResponseOwnerGroupBuyRequestDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerGroupBuyRequestDetail> | ApiResponseOwnerGroupBuyRequestDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/group-buy-requests/:requestId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerGroupBuyRequestsRequestIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1OwnerReservationsMockHandler = (overrideResponse?: ApiResponseReservationPage | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseReservationPage> | ApiResponseReservationPage), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/reservations', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerReservationsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1OwnerReservationsParticipationIdCompleteMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/owner/reservations/:participationId/complete', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1OwnerReservationsParticipationIdCompleteResponseMock(),
      { status: 200
      })
  }, options)
}
export const getOwnerMock = () => [
  getGetApiV1OwnerHomePickupScheduleMockHandler(),
  getGetApiV1OwnerGroupBuysMockHandler(),
  getGetApiV1OwnerGroupBuysSummaryMockHandler(),
  getGetApiV1OwnerGroupBuysManageMockHandler(),
  getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressMockHandler(),
  getGetApiV1OwnerGroupBuysGroupBuyIdManageAchievedMockHandler(),
  getPostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsMockHandler(),
  getPostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsMockHandler(),
  getGetApiV1OwnerSettlementsMonthlySummaryMockHandler(),
  getGetApiV1OwnerSettlementsMonthChipsMockHandler(),
  getGetApiV1OwnerSettlementsItemsMockHandler(),
  getGetApiV1OwnerSettlementsRefundRequestsMockHandler(),
  getGetApiV1OwnerSettlementsRefundRequestsParticipationIdMockHandler(),
  getPostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsMockHandler(),
  getGetApiV1OwnerGroupBuyRequestsMockHandler(),
  getPostApiV1OwnerGroupBuyRequestsMockHandler(),
  getGetApiV1OwnerGroupBuyRequestsRequestIdMockHandler(),
  getGetApiV1OwnerReservationsMockHandler(),
  getPatchApiV1OwnerReservationsParticipationIdCompleteMockHandler()
]
