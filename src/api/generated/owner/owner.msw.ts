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
  ApiResponseOwnerGroupBuyList,
  ApiResponseOwnerSummary,
  ApiResponsePickupScheduleList,
  ApiResponseReservationPage,
  SuccessNoDataResponse
} from '../api.schemas';


export const getGetApiV1OwnerHomeSummaryResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerSummary, object>> = {}): ApiResponseOwnerSummary => ({success: faker.datatype.boolean(), data: {pickupWaitingCount: faker.number.int(), pickupCompletedCount: faker.number.int(), activeGroupBuyCount: faker.number.int(), nextPickupTime: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null])}, error: {}, ...overrideResponse})

export const getGetApiV1OwnerHomePickupScheduleResponseMock = (overrideResponse: Partial<Extract<ApiResponsePickupScheduleList, object>> = {}): ApiResponsePickupScheduleList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({timeSlot: faker.string.alpha({length: {min: 10, max: 20}}), totalReservationCount: faker.number.int(), waitingCount: faker.number.int(), completedCount: faker.number.int()})), error: {}, ...overrideResponse})

export const getGetApiV1OwnerGroupBuysResponseMock = (overrideResponse: Partial<Extract<ApiResponseOwnerGroupBuyList, object>> = {}): ApiResponseOwnerGroupBuyList => ({success: faker.datatype.boolean(), data: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({groupBuyId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), achievementRate: faker.number.int(), currentQuantity: faker.number.int(), targetQuantity: faker.number.int(), deadline: faker.date.past().toISOString().slice(0, 10), status: faker.helpers.arrayElement(['IN_PROGRESS','ACHIEVED','FAILED'] as const)})), error: {}, ...overrideResponse})

export const getGetApiV1OwnerReservationsResponseMock = (overrideResponse: Partial<Extract<ApiResponseReservationPage, object>> = {}): ApiResponseReservationPage => ({success: faker.datatype.boolean(), data: {content: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({participationId: faker.number.int(), userName: faker.string.alpha({length: {min: 10, max: 20}}), productName: faker.string.alpha({length: {min: 10, max: 20}}), quantity: faker.number.int(), pickupDate: faker.date.past().toISOString().slice(0, 10), pickupTimeStart: faker.string.alpha({length: {min: 10, max: 20}}), pickupTimeEnd: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(['WAITING','COMPLETED'] as const)})), waitingCount: faker.number.int(), completedCount: faker.number.int(), totalElements: faker.number.int(), totalPages: faker.number.int()}, error: {}, ...overrideResponse})

export const getPatchApiV1OwnerReservationsParticipationIdCompleteResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})


export const getGetApiV1OwnerHomeSummaryMockHandler = (overrideResponse?: ApiResponseOwnerSummary | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseOwnerSummary> | ApiResponseOwnerSummary), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/owner/home/summary', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1OwnerHomeSummaryResponseMock(),
      { status: 200
      })
  }, options)
}

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
  getGetApiV1OwnerHomeSummaryMockHandler(),
  getGetApiV1OwnerHomePickupScheduleMockHandler(),
  getGetApiV1OwnerGroupBuysMockHandler(),
  getGetApiV1OwnerReservationsMockHandler(),
  getPatchApiV1OwnerReservationsParticipationIdCompleteMockHandler()
]
