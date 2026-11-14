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
  ApiResponseHomeTogetherStatus
} from '../api.schemas';


export const getGetApiV1HomeTogetherResponseMock = (overrideResponse: Partial<Extract<ApiResponseHomeTogetherStatus, object>> = {}): ApiResponseHomeTogetherStatus => ({success: faker.datatype.boolean(), data: {hasActiveRooms: faker.datatype.boolean(), showTogetherRoomModule: faker.datatype.boolean(), showFirstVisitGuide: faker.datatype.boolean(), togetherTabBadgeCount: faker.number.int(), isTodayPickupLeader: faker.datatype.boolean(), todayPickups: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({roomId: faker.number.int(), role: faker.helpers.arrayElement(['ORGANIZER','PARTICIPANT'] as const), productName: faker.string.alpha({length: {min: 10, max: 20}}), quantity: faker.number.int(), storeName: faker.string.alpha({length: {min: 10, max: 20}}), pickupDate: faker.date.past().toISOString().slice(0, 10), pickupTimeStart: faker.string.alpha({length: {min: 10, max: 20}}), pickupTimeEnd: faker.string.alpha({length: {min: 10, max: 20}}), canOpenQr: faker.datatype.boolean()})), rooms: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({roomId: faker.number.int(), role: faker.helpers.arrayElement(['ORGANIZER','PARTICIPANT'] as const), productId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), productName: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), currentQuantity: faker.number.int(), minQuantity: faker.number.int(), maxQuantity: faker.number.int(), paymentDeadlineAt: faker.date.past().toISOString().slice(0, 19) + 'Z', nextAction: faker.helpers.arrayElement(['NONE','PAY','TRANSFER','PICKUP'] as const)}))}, error: {}, ...overrideResponse})


export const getGetApiV1HomeTogetherMockHandler = (overrideResponse?: ApiResponseHomeTogetherStatus | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseHomeTogetherStatus> | ApiResponseHomeTogetherStatus), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/home/together', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1HomeTogetherResponseMock(),
      { status: 200
      })
  }, options)
}
export const getHomeMock = () => [
  getGetApiV1HomeTogetherMockHandler()
]
