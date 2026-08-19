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
  ImageUploadCategory
} from '../api.schemas';
import type {
  ApiResponseImageDelete,
  ApiResponseImagePresignedUpload
} from '../api.schemas';


export const getPostApiV1ImagesPresignedUrlsResponseMock = (overrideResponse: Partial<Extract<ApiResponseImagePresignedUpload, object>> = {}): ApiResponseImagePresignedUpload => ({success: faker.datatype.boolean(), data: {items: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({category: faker.helpers.arrayElement(Object.values(ImageUploadCategory)), key: faker.string.alpha({length: {min: 10, max: 20}}), uploadUrl: faker.string.alpha({length: {min: 10, max: 20}}), method: faker.string.alpha({length: {min: 10, max: 20}})}))}, error: {}, ...overrideResponse})

export const getDeleteApiV1ImagesResponseMock = (overrideResponse: Partial<Extract<ApiResponseImageDelete, object>> = {}): ApiResponseImageDelete => ({success: faker.datatype.boolean(), data: {deletedKeys: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.string.alpha({length: {min: 10, max: 20}}))), failedKeys: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.string.alpha({length: {min: 10, max: 20}})))}, error: {}, ...overrideResponse})


export const getPostApiV1ImagesPresignedUrlsMockHandler = (overrideResponse?: ApiResponseImagePresignedUpload | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseImagePresignedUpload> | ApiResponseImagePresignedUpload), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/images/presigned-urls', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1ImagesPresignedUrlsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getDeleteApiV1ImagesMockHandler = (overrideResponse?: ApiResponseImageDelete | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<ApiResponseImageDelete> | ApiResponseImageDelete), options?: RequestHandlerOptions) => {
  return http.delete('*/api/v1/images', async (info: Parameters<Parameters<typeof http.delete>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getDeleteApiV1ImagesResponseMock(),
      { status: 200
      })
  }, options)
}
export const getImageUploadMock = () => [
  getPostApiV1ImagesPresignedUrlsMockHandler(),
  getDeleteApiV1ImagesMockHandler()
]
