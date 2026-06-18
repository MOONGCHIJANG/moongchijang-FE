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
  ApiResponseAuthLogin
} from '../api.schemas';


export const getPostApiV1AuthAdminEmailLoginResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})


export const getPostApiV1AuthAdminEmailLoginMockHandler = (overrideResponse?: ApiResponseAuthLogin | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAuthLogin> | ApiResponseAuthLogin), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/admin/email/login', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthAdminEmailLoginResponseMock(),
      { status: 200
      })
  }, options)
}
export const getAdminAuthMock = () => [
  getPostApiV1AuthAdminEmailLoginMockHandler()
]
