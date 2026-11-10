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
  ApiResponseProductDetail,
  ApiResponseProductFeed,
  ApiResponseProductShare
} from '../api.schemas';


export const getGetApiV1ProductsResponseMock = (overrideResponse: Partial<Extract<ApiResponseProductFeed, object>> = {}): ApiResponseProductFeed => ({success: faker.datatype.boolean(), data: {items: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({productId: faker.number.int(), categoryCode: faker.string.alpha({length: {min: 10, max: 20}}), name: faker.string.alpha({length: {min: 10, max: 20}}), thumbnailUrl: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), unitPrice: faker.number.int(), minQuantity: faker.number.int(), maxQuantity: faker.number.int(), storageType: faker.helpers.arrayElement(['ROOM_TEMPERATURE','REFRIGERATED','FROZEN'] as const), store: {storeId: faker.number.int(), name: faker.string.alpha({length: {min: 10, max: 20}}), region: faker.string.alpha({length: {min: 10, max: 20}}), district: faker.string.alpha({length: {min: 10, max: 20}})}, earliestPickupDate: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 10), null]), undefined]), holidaySummary: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), isNew: faker.datatype.boolean(), isWishlisted: faker.datatype.boolean(), canPurchase: faker.datatype.boolean(), unavailableReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['PRODUCT_NOT_FOR_SALE','STORE_NOT_FOR_SALE','NO_AVAILABLE_PICKUP_DATE'] as const), null]), undefined]), activeTogetherRoomCount: faker.number.int()})), nextCursor: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), hasNext: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1ProductsProductIdResponseMock = (overrideResponse: Partial<Extract<ApiResponseProductDetail, object>> = {}): ApiResponseProductDetail => ({success: faker.datatype.boolean(), data: {productId: faker.number.int(), categoryCode: faker.string.alpha({length: {min: 10, max: 20}}), name: faker.string.alpha({length: {min: 10, max: 20}}), description: faker.string.alpha({length: {min: 10, max: 20}}), thumbnailUrl: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), imageUrls: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.string.alpha({length: {min: 10, max: 20}}))), unitPrice: faker.number.int(), minQuantity: faker.number.int(), maxQuantity: faker.number.int(), storageType: faker.helpers.arrayElement(['ROOM_TEMPERATURE','REFRIGERATED','FROZEN'] as const), store: {storeId: faker.number.int(), name: faker.string.alpha({length: {min: 10, max: 20}}), region: faker.string.alpha({length: {min: 10, max: 20}}), district: faker.string.alpha({length: {min: 10, max: 20}}), address: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), placeId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined])}, pickup: {preparationDays: faker.number.int(), availableFrom: faker.date.past().toISOString().slice(0, 10), availableUntil: faker.date.past().toISOString().slice(0, 10), availableDates: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({date: faker.date.past().toISOString().slice(0, 10), timeSlots: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({startTime: faker.string.alpha({length: {min: 10, max: 20}}), endTime: faker.string.alpha({length: {min: 10, max: 20}})}))})), holidays: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({type: faker.helpers.arrayElement(['REGULAR','TEMPORARY'] as const), dayOfWeek: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.number.int(), null]), undefined]), date: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 10), null]), undefined]), reason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined])}))}, isWishlisted: faker.datatype.boolean(), canPurchase: faker.datatype.boolean(), unavailableReason: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['PRODUCT_NOT_FOR_SALE','STORE_NOT_FOR_SALE','NO_AVAILABLE_PICKUP_DATE'] as const), null]), undefined])}, error: {}, ...overrideResponse})

export const getGetApiV1ProductsProductIdShareResponseMock = (overrideResponse: Partial<Extract<ApiResponseProductShare, object>> = {}): ApiResponseProductShare => ({success: faker.datatype.boolean(), data: {productId: faker.number.int(), productName: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), imageUrl: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), shareUrl: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})


export const getGetApiV1ProductsMockHandler = (overrideResponse?: ApiResponseProductFeed | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseProductFeed> | ApiResponseProductFeed), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/products', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1ProductsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1ProductsProductIdMockHandler = (overrideResponse?: ApiResponseProductDetail | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseProductDetail> | ApiResponseProductDetail), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/products/:productId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1ProductsProductIdResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1ProductsProductIdShareMockHandler = (overrideResponse?: ApiResponseProductShare | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseProductShare> | ApiResponseProductShare), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/products/:productId/share', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1ProductsProductIdShareResponseMock(),
      { status: 200
      })
  }, options)
}
export const getProductMock = () => [
  getGetApiV1ProductsMockHandler(),
  getGetApiV1ProductsProductIdMockHandler(),
  getGetApiV1ProductsProductIdShareMockHandler()
]
