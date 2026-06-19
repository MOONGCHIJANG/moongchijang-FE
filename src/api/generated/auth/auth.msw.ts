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
  BuyerWithdrawalBlockingReason,
  SellerWithdrawalBlockingReason,
  WithdrawalScreenType
} from '../api.schemas';
import type {
  ApiResponseAccessToken,
  ApiResponseAdditionalInfoUpdated,
  ApiResponseAuthLogin,
  ApiResponseBusinessRegistrationLookup,
  ApiResponseEmailAvailability,
  ApiResponseEmailVerificationCodeSent,
  ApiResponseEmailVerificationVerified,
  ApiResponseMyRegions,
  ApiResponseNicknameAvailability,
  ApiResponseNicknameUpdated,
  ApiResponsePasswordChanged,
  ApiResponsePhoneNumberUpdated,
  ApiResponsePhoneVerificationCodeSent,
  ApiResponsePhoneVerificationVerified,
  ApiResponseSellerBusinessProfile,
  ApiResponseSellerSettlementAccount,
  ApiResponseSellerSignupStatus,
  ApiResponseUserInfo,
  ApiResponseWithdrawalContext,
  SuccessNoDataResponse
} from '../api.schemas';


export const getPostApiV1AuthKakaoResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPostApiV1AuthRefreshResponseMock = (overrideResponse: Partial<Extract<ApiResponseAccessToken, object>> = {}): ApiResponseAccessToken => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthLogoutResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeResponseMock = (overrideResponse: Partial<Extract<ApiResponseUserInfo, object>> = {}): ApiResponseUserInfo => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}, error: {}, ...overrideResponse})

export const getDeleteApiV1UsersMeResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeRoleResponseMock = (overrideResponse: Partial<Extract<ApiResponseUserInfo, object>> = {}): ApiResponseUserInfo => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeWithdrawalContextResponseMock = (overrideResponse: Partial<Extract<ApiResponseWithdrawalContext, object>> = {}): ApiResponseWithdrawalContext => ({success: faker.datatype.boolean(), data: {currentRole: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), buyer: {canProceed: faker.datatype.boolean(), hasPendingPickup: faker.datatype.boolean(), hasActiveParticipation: faker.datatype.boolean(), blockingReason: faker.helpers.arrayElement(Object.values(BuyerWithdrawalBlockingReason))}, seller: {canProceed: faker.datatype.boolean(), hasOpenGroupBuy: faker.datatype.boolean(), hasPendingCustomerPickup: faker.datatype.boolean(), blockingReason: faker.helpers.arrayElement(Object.values(SellerWithdrawalBlockingReason))}, recommendedScreen: faker.helpers.arrayElement(Object.values(WithdrawalScreenType)), forceRedirect: faker.datatype.boolean(), forceRedirectTarget: faker.helpers.arrayElement([faker.helpers.arrayElement(Object.values(WithdrawalScreenType)), null])}, error: {}, ...overrideResponse})

export const getGetApiV1UsersNicknameAvailabilityResponseMock = (overrideResponse: Partial<Extract<ApiResponseNicknameAvailability, object>> = {}): ApiResponseNicknameAvailability => ({success: faker.datatype.boolean(), data: {nickname: faker.string.alpha({length: {min: 10, max: 20}}), available: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeAdditionalInfoResponseMock = (overrideResponse: Partial<Extract<ApiResponseAdditionalInfoUpdated, object>> = {}): ApiResponseAdditionalInfoUpdated => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), nickname: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}}), signupCompleted: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPostApiV1UsersMeSellerBusinessRegistrationLookupResponseMock = (overrideResponse: Partial<Extract<ApiResponseBusinessRegistrationLookup, object>> = {}): ApiResponseBusinessRegistrationLookup => ({success: faker.datatype.boolean(), data: {businessRegistrationNumber: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(['VALID','CLOSED','NOT_FOUND'] as const), message: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), storeName: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), ownerName: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), storeAddress: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined])}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeSellerBusinessInfoResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerSignupStatus, object>> = {}): ApiResponseSellerSignupStatus => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), sellerSignupCompleted: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeSellerSettlementInfoResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerSignupStatus, object>> = {}): ApiResponseSellerSignupStatus => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), sellerSignupCompleted: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeSellerSettlementAccountResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerSettlementAccount, object>> = {}): ApiResponseSellerSettlementAccount => ({success: faker.datatype.boolean(), data: {bankCode: faker.string.alpha({length: {min: 10, max: 20}}), accountNumber: faker.string.alpha({length: {min: 10, max: 20}}), accountHolderName: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeSellerSettlementAccountResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerSettlementAccount, object>> = {}): ApiResponseSellerSettlementAccount => ({success: faker.datatype.boolean(), data: {bankCode: faker.string.alpha({length: {min: 10, max: 20}}), accountNumber: faker.string.alpha({length: {min: 10, max: 20}}), accountHolderName: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeSellerBusinessProfileResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerBusinessProfile, object>> = {}): ApiResponseSellerBusinessProfile => ({success: faker.datatype.boolean(), data: {businessRegistrationNumber: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), ownerName: faker.string.alpha({length: {min: 10, max: 20}}), storeAddress: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeSellerBusinessProfileResponseMock = (overrideResponse: Partial<Extract<ApiResponseSellerBusinessProfile, object>> = {}): ApiResponseSellerBusinessProfile => ({success: faker.datatype.boolean(), data: {businessRegistrationNumber: faker.string.alpha({length: {min: 10, max: 20}}), storeName: faker.string.alpha({length: {min: 10, max: 20}}), ownerName: faker.string.alpha({length: {min: 10, max: 20}}), storeAddress: faker.string.alpha({length: {min: 10, max: 20}}), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getDeleteApiV1UsersMeSellerResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})

export const getGetApiV1AuthEmailAvailabilityResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailAvailability, object>> = {}): ApiResponseEmailAvailability => ({success: faker.datatype.boolean(), data: {email: faker.internet.email(), available: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailVerificationCodesResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailVerificationCodeSent, object>> = {}): ApiResponseEmailVerificationCodeSent => ({success: faker.datatype.boolean(), data: {expiresInSeconds: faker.number.int(), resendAvailableInSeconds: faker.number.int(), remainingDailyAttempts: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailVerificationCodesVerifyResponseMock = (overrideResponse: Partial<Extract<ApiResponseEmailVerificationVerified, object>> = {}): ApiResponseEmailVerificationVerified => ({success: faker.datatype.boolean(), data: {verified: faker.datatype.boolean(), signupToken: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPostApiV1AuthPhoneVerificationCodesResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationCodeSent, object>> = {}): ApiResponsePhoneVerificationCodeSent => ({success: faker.datatype.boolean(), data: {expiresInSeconds: faker.number.int(), resendAvailableInSeconds: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthPhoneVerificationCodesVerifyResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationVerified, object>> = {}): ApiResponsePhoneVerificationVerified => ({success: faker.datatype.boolean(), data: {verified: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailSignupResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPostApiV1AuthEmailLoginResponseMock = (overrideResponse: Partial<Extract<ApiResponseAuthLogin, object>> = {}): ApiResponseAuthLogin => ({success: faker.datatype.boolean(), data: {accessToken: faker.string.alpha({length: {min: 10, max: 20}}), tokenType: faker.string.alpha({length: {min: 10, max: 20}}), expiresIn: faker.number.int(), isNewUser: faker.datatype.boolean(), user: {id: faker.number.int(), provider: faker.helpers.arrayElement(['KAKAO','EMAIL'] as const), providerId: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), email: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.internet.email(), null]), undefined]), nickname: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), phoneNumber: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), role: faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), lastRole: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.helpers.arrayElement(['BUYER','SELLER','ADMIN'] as const), null]), undefined]), hasBuyerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), hasSellerRole: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToBuyer: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), canSwitchToSeller: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), signupCompleted: faker.datatype.boolean(), sellerSignupCompleted: faker.datatype.boolean(), deletedAt: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.date.past().toISOString().slice(0, 19) + 'Z', null]), undefined]), createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z', updatedAt: faker.date.past().toISOString().slice(0, 19) + 'Z'}}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMeNicknameResponseMock = (overrideResponse: Partial<Extract<ApiResponseNicknameUpdated, object>> = {}): ApiResponseNicknameUpdated => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), nickname: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMePhoneNumberResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneNumberUpdated, object>> = {}): ApiResponsePhoneNumberUpdated => ({success: faker.datatype.boolean(), data: {id: faker.number.int(), phoneNumber: faker.string.alpha({length: {min: 10, max: 20}})}, error: {}, ...overrideResponse})

export const getPostApiV1UsersMePhoneVerificationCodesResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationCodeSent, object>> = {}): ApiResponsePhoneVerificationCodeSent => ({success: faker.datatype.boolean(), data: {expiresInSeconds: faker.number.int(), resendAvailableInSeconds: faker.number.int()}, error: {}, ...overrideResponse})

export const getPostApiV1UsersMePhoneVerificationCodesVerifyResponseMock = (overrideResponse: Partial<Extract<ApiResponsePhoneVerificationVerified, object>> = {}): ApiResponsePhoneVerificationVerified => ({success: faker.datatype.boolean(), data: {verified: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getPatchApiV1UsersMePasswordResponseMock = (overrideResponse: Partial<Extract<ApiResponsePasswordChanged, object>> = {}): ApiResponsePasswordChanged => ({success: faker.datatype.boolean(), data: {changed: faker.datatype.boolean()}, error: {}, ...overrideResponse})

export const getGetApiV1UsersMeRegionsResponseMock = (overrideResponse: Partial<Extract<ApiResponseMyRegions, object>> = {}): ApiResponseMyRegions => ({success: faker.datatype.boolean(), data: {regions: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.string.alpha({length: {min: 10, max: 20}}))), primaryRegion: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), null]), additionalCount: faker.number.int()}, error: {}, ...overrideResponse})

export const getPutApiV1UsersMeRegionsResponseMock = (overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {}): SuccessNoDataResponse => ({success: faker.datatype.boolean(), data: {}, error: {}, ...overrideResponse})


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

export const getPatchApiV1UsersMeRoleMockHandler = (overrideResponse?: ApiResponseUserInfo | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseUserInfo> | ApiResponseUserInfo), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/role', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeRoleResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersMeWithdrawalContextMockHandler = (overrideResponse?: ApiResponseWithdrawalContext | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseWithdrawalContext> | ApiResponseWithdrawalContext), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/me/withdrawal-context', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersMeWithdrawalContextResponseMock(),
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

export const getPostApiV1UsersMeSellerBusinessRegistrationLookupMockHandler = (overrideResponse?: ApiResponseBusinessRegistrationLookup | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponseBusinessRegistrationLookup> | ApiResponseBusinessRegistrationLookup), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/users/me/seller/business-registration/lookup', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1UsersMeSellerBusinessRegistrationLookupResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeSellerBusinessInfoMockHandler = (overrideResponse?: ApiResponseSellerSignupStatus | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseSellerSignupStatus> | ApiResponseSellerSignupStatus), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/seller/business-info', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeSellerBusinessInfoResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeSellerSettlementInfoMockHandler = (overrideResponse?: ApiResponseSellerSignupStatus | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseSellerSignupStatus> | ApiResponseSellerSignupStatus), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/seller/settlement-info', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeSellerSettlementInfoResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersMeSellerSettlementAccountMockHandler = (overrideResponse?: ApiResponseSellerSettlementAccount | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseSellerSettlementAccount> | ApiResponseSellerSettlementAccount), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/me/seller/settlement-account', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersMeSellerSettlementAccountResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeSellerSettlementAccountMockHandler = (overrideResponse?: ApiResponseSellerSettlementAccount | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseSellerSettlementAccount> | ApiResponseSellerSettlementAccount), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/seller/settlement-account', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeSellerSettlementAccountResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersMeSellerBusinessProfileMockHandler = (overrideResponse?: ApiResponseSellerBusinessProfile | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseSellerBusinessProfile> | ApiResponseSellerBusinessProfile), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/me/seller/business-profile', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersMeSellerBusinessProfileResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMeSellerBusinessProfileMockHandler = (overrideResponse?: ApiResponseSellerBusinessProfile | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseSellerBusinessProfile> | ApiResponseSellerBusinessProfile), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/seller/business-profile', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeSellerBusinessProfileResponseMock(),
      { status: 200
      })
  }, options)
}

export const getDeleteApiV1UsersMeSellerMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.delete('*/api/v1/users/me/seller', async (info: Parameters<Parameters<typeof http.delete>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getDeleteApiV1UsersMeSellerResponseMock(),
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

export const getPostApiV1AuthPhoneVerificationCodesMockHandler = (overrideResponse?: ApiResponsePhoneVerificationCodeSent | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponsePhoneVerificationCodeSent> | ApiResponsePhoneVerificationCodeSent), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/phone/verification-codes', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthPhoneVerificationCodesResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPostApiV1AuthPhoneVerificationCodesVerifyMockHandler = (overrideResponse?: ApiResponsePhoneVerificationVerified | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ApiResponsePhoneVerificationVerified> | ApiResponsePhoneVerificationVerified), options?: RequestHandlerOptions) => {
  return http.post('*/api/v1/auth/phone/verification-codes/verify', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostApiV1AuthPhoneVerificationCodesVerifyResponseMock(),
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

export const getPatchApiV1UsersMeNicknameMockHandler = (overrideResponse?: ApiResponseNicknameUpdated | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponseNicknameUpdated> | ApiResponseNicknameUpdated), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/nickname', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMeNicknameResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPatchApiV1UsersMePhoneNumberMockHandler = (overrideResponse?: ApiResponsePhoneNumberUpdated | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponsePhoneNumberUpdated> | ApiResponsePhoneNumberUpdated), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/phone-number', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMePhoneNumberResponseMock(),
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

export const getPatchApiV1UsersMePasswordMockHandler = (overrideResponse?: ApiResponsePasswordChanged | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<ApiResponsePasswordChanged> | ApiResponsePasswordChanged), options?: RequestHandlerOptions) => {
  return http.patch('*/api/v1/users/me/password', async (info: Parameters<Parameters<typeof http.patch>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPatchApiV1UsersMePasswordResponseMock(),
      { status: 200
      })
  }, options)
}

export const getGetApiV1UsersMeRegionsMockHandler = (overrideResponse?: ApiResponseMyRegions | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ApiResponseMyRegions> | ApiResponseMyRegions), options?: RequestHandlerOptions) => {
  return http.get('*/api/v1/users/me/regions', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetApiV1UsersMeRegionsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getPutApiV1UsersMeRegionsMockHandler = (overrideResponse?: SuccessNoDataResponse | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse), options?: RequestHandlerOptions) => {
  return http.put('*/api/v1/users/me/regions', async (info: Parameters<Parameters<typeof http.put>[1]>[0]) => {


    return HttpResponse.json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPutApiV1UsersMeRegionsResponseMock(),
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
  getPatchApiV1UsersMeRoleMockHandler(),
  getGetApiV1UsersMeWithdrawalContextMockHandler(),
  getGetApiV1UsersNicknameAvailabilityMockHandler(),
  getPatchApiV1UsersMeAdditionalInfoMockHandler(),
  getPostApiV1UsersMeSellerBusinessRegistrationLookupMockHandler(),
  getPatchApiV1UsersMeSellerBusinessInfoMockHandler(),
  getPatchApiV1UsersMeSellerSettlementInfoMockHandler(),
  getGetApiV1UsersMeSellerSettlementAccountMockHandler(),
  getPatchApiV1UsersMeSellerSettlementAccountMockHandler(),
  getGetApiV1UsersMeSellerBusinessProfileMockHandler(),
  getPatchApiV1UsersMeSellerBusinessProfileMockHandler(),
  getDeleteApiV1UsersMeSellerMockHandler(),
  getGetApiV1AuthEmailAvailabilityMockHandler(),
  getPostApiV1AuthEmailVerificationCodesMockHandler(),
  getPostApiV1AuthEmailVerificationCodesVerifyMockHandler(),
  getPostApiV1AuthPhoneVerificationCodesMockHandler(),
  getPostApiV1AuthPhoneVerificationCodesVerifyMockHandler(),
  getPostApiV1AuthEmailSignupMockHandler(),
  getPostApiV1AuthEmailLoginMockHandler(),
  getPatchApiV1UsersMeNicknameMockHandler(),
  getPatchApiV1UsersMePhoneNumberMockHandler(),
  getPostApiV1UsersMePhoneVerificationCodesMockHandler(),
  getPostApiV1UsersMePhoneVerificationCodesVerifyMockHandler(),
  getPatchApiV1UsersMePasswordMockHandler(),
  getGetApiV1UsersMeRegionsMockHandler(),
  getPutApiV1UsersMeRegionsMockHandler()
]
