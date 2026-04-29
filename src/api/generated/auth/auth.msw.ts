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
  ApiResponseAccessToken,
  ApiResponseAdditionalInfoUpdated,
  ApiResponseAuthLogin,
  ApiResponseEmailAvailability,
  ApiResponseEmailVerificationCodeSent,
  ApiResponseEmailVerificationVerified,
  ApiResponseNicknameAvailability,
  ApiResponsePhoneVerificationCodeSent,
  ApiResponsePhoneVerificationVerified,
  ApiResponseProfileUpdated,
  ApiResponseUserInfo,
  SuccessNoDataResponse
} from '../api.schemas';


export const getPostApiV1AuthKakaoResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), signupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPostApiV1AuthRefreshResponseMock = (overrideResponse: Partial<Extract<ApiResponseAccessToken, object>> = {}): ApiResponseAccessToken => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthLogoutResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeResponseMock = (overrideResponse: Partial<Extract<ApiResponseUserInfo, object>> = {}): ApiResponseUserInfo => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), signupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}, error: {}, ...overrideResponse})

export const getDeleteApiV1UsersMeResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1UsersNicknameAvailabilityResponseMock = (overrideResponse: Partial<Extract<ApiResponseNicknameAvailability, object>> = {}): ApiResponseNicknameAvailability => ({success: faker.datatype.boolean(), data: {nickname: faker.string.alpha({length: {min: 10, max: 20}}), available: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeAdditionalInfoResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdditionalInfoUpdated, object>> = {}): ApiResponseAdditionalInfoUpdated => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), nickname: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}}), signupCompleted: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1AuthEmailAvailabilityResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailAvailability, object>> = {}): ApiResponseEmailAvailability => ({success: faker.datatype.boolean(), data: {email: faker.internet.email(), available: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailVerificationCodesResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailVerificationCodeSent, object>> = {}): ApiResponseEmailVerificationCodeSent => ({success: faker.datatype.boolean(), data: {expiresInSeconds: faker.number.int(), resendAvailableInSeconds: faker.number.int(), remainingDailyAttempts: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailVerificationCodesVerifyResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailVerificationVerified, object>> = {}): ApiResponseEmailVerificationVerified => ({success: faker.datatype.boolean(), data: {verified: faker.datatype.boolean(), signupToken: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailSignupResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), signupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailLoginResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), signupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPostApiV1AuthPasswordResetLinkResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeProfileResponseMock = (overrideResponse: Partial<Extract<ApiResponseProfileUpdated, object>> = {}): ApiResponseProfileUpdated => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), nickname: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}}), updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}, error: {}, ...overrideResponse})

export const getPostApiV1UsersMePhoneVerificationCodesResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationCodeSent, object>> = {}): ApiResponsePhoneVerificationCodeSent => ({success: faker.datatype.boolean(), data: {expiresInSeconds: faker.number.int(), resendAvailableInSeconds: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1UsersMePhoneVerificationCodesVerifyResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationVerified, object>> = {}): ApiResponsePhoneVerificationVerified => ({success: faker.datatype.boolean(), data: {verified: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthPasswordChangeResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})


export const getPostApiV1AuthKakaoMockHandler = (overrideResponse?: ApiResponseAuthLogin | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAuthLogin> | ApiResponseAuthLogin), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/kakao', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthKakaoResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthRefreshMockHandler = (overrideResponse?: ApiResponseAccessToken | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAccessToken> | ApiResponseAccessToken), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/refresh', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthRefreshResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthLogoutMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/logout', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthLogoutResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersMeMockHandler = (overrideResponse?: ApiResponseUserInfo | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseUserInfo> | ApiResponseUserInfo), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/me', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersMeResponseMock(),
      { status: 200
      })
  }, options)
}

export const getDeleteApiV1UsersMeMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.delete('*/api/v1/users/me', async (info: Parameters<Parameters<typeof http.delete>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getDeleteApiV1UsersMeResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersNicknameAvailabilityMockHandler = (overrideResponse?: ApiResponseNicknameAvailability | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseNicknameAvailability> | ApiResponseNicknameAvailability), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/nickname/availability', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersNicknameAvailabilityResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeAdditionalInfoMockHandler = (overrideResponse?: ApiResponseAdditionalInfoUpdated | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseAdditionalInfoUpdated> | ApiResponseAdditionalInfoUpdated), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/additional-info', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeAdditionalInfoResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1AuthEmailAvailabilityMockHandler = (overrideResponse?: ApiResponseEmailAvailability | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseEmailAvailability> | ApiResponseEmailAvailability), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/auth/email/availability', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1AuthEmailAvailabilityResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthEmailVerificationCodesMockHandler = (overrideResponse?: ApiResponseEmailVerificationCodeSent | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseEmailVerificationCodeSent> | ApiResponseEmailVerificationCodeSent), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/email/verification-codes', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthEmailVerificationCodesResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthEmailVerificationCodesVerifyMockHandler = (overrideResponse?: ApiResponseEmailVerificationVerified | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseEmailVerificationVerified> | ApiResponseEmailVerificationVerified), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/email/verification-codes/verify', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthEmailVerificationCodesVerifyResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthEmailSignupMockHandler = (overrideResponse?: ApiResponseAuthLogin | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAuthLogin> | ApiResponseAuthLogin), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/email/signup', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthEmailSignupResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthEmailLoginMockHandler = (overrideResponse?: ApiResponseAuthLogin | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseAuthLogin> | ApiResponseAuthLogin), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/email/login', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthEmailLoginResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthPasswordResetLinkMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/password/reset-link', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthPasswordResetLinkResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeProfileMockHandler = (overrideResponse?: ApiResponseProfileUpdated | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseProfileUpdated> | ApiResponseProfileUpdated), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/profile', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeProfileResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1UsersMePhoneVerificationCodesMockHandler = (overrideResponse?: ApiResponsePhoneVerificationCodeSent | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponsePhoneVerificationCodeSent> | ApiResponsePhoneVerificationCodeSent), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/users/me/phone/verification-codes', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1UsersMePhoneVerificationCodesResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1UsersMePhoneVerificationCodesVerifyMockHandler = (overrideResponse?: ApiResponsePhoneVerificationVerified | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponsePhoneVerificationVerified> | ApiResponsePhoneVerificationVerified), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/users/me/phone/verification-codes/verify', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1UsersMePhoneVerificationCodesVerifyResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthPasswordChangeMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/password/change', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthPasswordChangeResponseMock(),
      { status: 200
      })
  }, options)
}
export const getAuthMock = () => [
  getPostApiV1AuthKakaoMockHandler(),
  getPostApiV1AuthRefreshMockHandler(),
  getPostApiV1AuthLogoutMockHandler(),
  getGetApiV1UsersMeMockHandler(),
  getDeleteApiV1UsersMeMockHandler(),
  getGetApiV1UsersNicknameAvailabilityMockHandler(),
  getPatchApiV1UsersMeAdditionalInfoMockHandler(),
  getGetApiV1AuthEmailAvailabilityMockHandler(),
  getPostApiV1AuthEmailVerificationCodesMockHandler(),
  getPostApiV1AuthEmailVerificationCodesVerifyMockHandler(),
  getPostApiV1AuthEmailSignupMockHandler(),
  getPostApiV1AuthEmailLoginMockHandler(),
  getPostApiV1AuthPasswordResetLinkMockHandler(),
  getPatchApiV1UsersMeProfileMockHandler(),
  getPostApiV1UsersMePhoneVerificationCodesMockHandler(),
  getPostApiV1UsersMePhoneVerificationCodesVerifyMockHandler(),
  getPostApiV1AuthPasswordChangeMockHandler()
]
