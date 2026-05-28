/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  AdditionalInfoUpsertRequest,
  ApiResponseAccessToken,
  ApiResponseAdditionalInfoUpdated,
  ApiResponseAuthLogin,
  ApiResponseBusinessRegistrationLookup,
  ApiResponseEmailAvailability,
  ApiResponseEmailVerificationCodeSent,
  ApiResponseEmailVerificationVerified,
  ApiResponseError,
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
  BadRequestResponse,
  BusinessRegistrationLookupRequest,
  ConflictResponse,
  EmailLoginRequest,
  EmailSignupRequest,
  EmailVerificationCodeSendRequest,
  EmailVerificationCodeVerifyRequest,
  ForbiddenResponse,
  GetApiV1AuthEmailAvailabilityParams,
  GetApiV1UsersNicknameAvailabilityParams,
  KakaoLoginRequest,
  MyPageRoleSwitchRequest,
  NicknameUpdateRequest,
  NotFoundResponse,
  OwnerWithdrawRequest,
  PasswordChangeRequest,
  PhoneNumberUpdateRequest,
  PhoneVerificationCodeSendRequest,
  PhoneVerificationCodeVerifyRequest,
  SellerBusinessInfoUpsertRequest,
  SellerSettlementInfoUpsertRequest,
  SuccessNoDataResponse,
  TooManyRequestsResponse,
  UnauthorizedResponse,
  UpdateRegionsRequest,
  WithdrawRequest,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 카카오 인가 코드로 로그인하거나 최초 가입 처리한다.
 * @summary 카카오 로그인 / 회원가입
 */
export type postApiV1AuthKakaoResponse200 = {
  data: ApiResponseAuthLogin;
  status: 200;
};

export type postApiV1AuthKakaoResponseSuccess =
  postApiV1AuthKakaoResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthKakaoResponse = postApiV1AuthKakaoResponseSuccess;

export const getPostApiV1AuthKakaoUrl = () => {
  return `/api/v1/auth/kakao`;
};

export const postApiV1AuthKakao = async (
  kakaoLoginRequest: KakaoLoginRequest,
  options?: RequestInit,
): Promise<postApiV1AuthKakaoResponse> => {
  return customFetch<postApiV1AuthKakaoResponse>(getPostApiV1AuthKakaoUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(kakaoLoginRequest),
  });
};

/**
 * HttpOnly 쿠키의 refreshToken을 검증해 Access Token을 재발급한다.
 * @summary Access Token 갱신
 */
export type postApiV1AuthRefreshResponse200 = {
  data: ApiResponseAccessToken;
  status: 200;
};

export type postApiV1AuthRefreshResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1AuthRefreshResponseSuccess =
  postApiV1AuthRefreshResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthRefreshResponseError =
  postApiV1AuthRefreshResponse401 & {
    headers: Headers;
  };

export type postApiV1AuthRefreshResponse =
  | postApiV1AuthRefreshResponseSuccess
  | postApiV1AuthRefreshResponseError;

export const getPostApiV1AuthRefreshUrl = () => {
  return `/api/v1/auth/refresh`;
};

export const postApiV1AuthRefresh = async (
  options?: RequestInit,
): Promise<postApiV1AuthRefreshResponse> => {
  return customFetch<postApiV1AuthRefreshResponse>(
    getPostApiV1AuthRefreshUrl(),
    {
      ...options,
      method: 'POST',
    },
  );
};

/**
 * Refresh Token을 무효화한다.
 * @summary 로그아웃
 */
export type postApiV1AuthLogoutResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1AuthLogoutResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1AuthLogoutResponseSuccess =
  postApiV1AuthLogoutResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthLogoutResponseError =
  postApiV1AuthLogoutResponse401 & {
    headers: Headers;
  };

export type postApiV1AuthLogoutResponse =
  | postApiV1AuthLogoutResponseSuccess
  | postApiV1AuthLogoutResponseError;

export const getPostApiV1AuthLogoutUrl = () => {
  return `/api/v1/auth/logout`;
};

export const postApiV1AuthLogout = async (
  options?: RequestInit,
): Promise<postApiV1AuthLogoutResponse> => {
  return customFetch<postApiV1AuthLogoutResponse>(getPostApiV1AuthLogoutUrl(), {
    ...options,
    method: 'POST',
  });
};

/**
 * @summary 내 정보 조회
 */
export type getApiV1UsersMeResponse200 = {
  data: ApiResponseUserInfo;
  status: 200;
};

export type getApiV1UsersMeResponseSuccess = getApiV1UsersMeResponse200 & {
  headers: Headers;
};
export type getApiV1UsersMeResponse = getApiV1UsersMeResponseSuccess;

export const getGetApiV1UsersMeUrl = () => {
  return `/api/v1/users/me`;
};

export const getApiV1UsersMe = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeResponse> => {
  return customFetch<getApiV1UsersMeResponse>(getGetApiV1UsersMeUrl(), {
    ...options,
    method: 'GET',
  });
};

/**
 * 소비자/사장님 모드를 전환한다.
 * @summary 마이페이지 역할 전환
 */
export type patchApiV1UsersMeRoleResponse200 = {
  data: ApiResponseUserInfo;
  status: 200;
};

export type patchApiV1UsersMeRoleResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeRoleResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeRoleResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1UsersMeRoleResponseSuccess =
  patchApiV1UsersMeRoleResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeRoleResponseError = (
  | patchApiV1UsersMeRoleResponse400
  | patchApiV1UsersMeRoleResponse401
  | patchApiV1UsersMeRoleResponse403
) & {
  headers: Headers;
};

export type patchApiV1UsersMeRoleResponse =
  | patchApiV1UsersMeRoleResponseSuccess
  | patchApiV1UsersMeRoleResponseError;

export const getPatchApiV1UsersMeRoleUrl = () => {
  return `/api/v1/users/me/role`;
};

export const patchApiV1UsersMeRole = async (
  myPageRoleSwitchRequest: MyPageRoleSwitchRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeRoleResponse> => {
  return customFetch<patchApiV1UsersMeRoleResponse>(
    getPatchApiV1UsersMeRoleUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(myPageRoleSwitchRequest),
    },
  );
};

/**
 * 회원 탈퇴를 처리한다.
- 탈퇴 진입 컨텍스트 조회 결과와 무관하게 실행 시점 최종 검증을 다시 수행한다.
- 수령 예정 공구(달성 완료 + 픽업 미완료)가 있으면 탈퇴할 수 없다.
- 참여 중 공구(PAID_WAITING_GOAL)는 자동 취소된다.
- 찜 목록은 모두 삭제된다.
- 동일 계정은 탈퇴 후 30일 이후 재가입 가능하다.
- 최종 검증 실패 시 409 에러를 반환한다. (예: WITHDRAWAL_BLOCKED_PENDING_PICKUP)

 * @summary 회원 탈퇴
 */
export type deleteApiV1UsersMeRoleResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1UsersMeRoleResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type deleteApiV1UsersMeRoleResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type deleteApiV1UsersMeRoleResponseSuccess =
  deleteApiV1UsersMeRoleResponse200 & {
    headers: Headers;
  };
export type deleteApiV1UsersMeRoleResponseError = (
  | deleteApiV1UsersMeRoleResponse401
  | deleteApiV1UsersMeRoleResponse409
) & {
  headers: Headers;
};

export type deleteApiV1UsersMeRoleResponse =
  | deleteApiV1UsersMeRoleResponseSuccess
  | deleteApiV1UsersMeRoleResponseError;

export const getDeleteApiV1UsersMeRoleUrl = () => {
  return `/api/v1/users/me/role`;
};

export const deleteApiV1UsersMeRole = async (
  withdrawRequest?: WithdrawRequest,
  options?: RequestInit,
): Promise<deleteApiV1UsersMeRoleResponse> => {
  return customFetch<deleteApiV1UsersMeRoleResponse>(
    getDeleteApiV1UsersMeRoleUrl(),
    {
      ...options,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(withdrawRequest),
    },
  );
};

/**
 * 소비자/사장님 탈퇴 가능 상태와 권장 탈퇴 화면 정보를 조회한다.
이 응답은 진입/라우팅 가이드 용도이며, 실제 탈퇴 실행 시점에는 최종 검증이 다시 수행된다.

 * @summary 탈퇴 진입 컨텍스트 조회
 */
export type getApiV1UsersMeWithdrawalContextResponse200 = {
  data: ApiResponseWithdrawalContext;
  status: 200;
};

export type getApiV1UsersMeWithdrawalContextResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeWithdrawalContextResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1UsersMeWithdrawalContextResponseSuccess =
  getApiV1UsersMeWithdrawalContextResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeWithdrawalContextResponseError = (
  | getApiV1UsersMeWithdrawalContextResponse401
  | getApiV1UsersMeWithdrawalContextResponse404
) & {
  headers: Headers;
};

export type getApiV1UsersMeWithdrawalContextResponse =
  | getApiV1UsersMeWithdrawalContextResponseSuccess
  | getApiV1UsersMeWithdrawalContextResponseError;

export const getGetApiV1UsersMeWithdrawalContextUrl = () => {
  return `/api/v1/users/me/withdrawal-context`;
};

export const getApiV1UsersMeWithdrawalContext = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeWithdrawalContextResponse> => {
  return customFetch<getApiV1UsersMeWithdrawalContextResponse>(
    getGetApiV1UsersMeWithdrawalContextUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 추가정보 입력(0.5) 단계에서 닉네임 사용 가능 여부를 확인한다.
 * @summary 닉네임 중복 확인
 */
export type getApiV1UsersNicknameAvailabilityResponse200 = {
  data: ApiResponseNicknameAvailability;
  status: 200;
};

export type getApiV1UsersNicknameAvailabilityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1UsersNicknameAvailabilityResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersNicknameAvailabilityResponseSuccess =
  getApiV1UsersNicknameAvailabilityResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersNicknameAvailabilityResponseError = (
  | getApiV1UsersNicknameAvailabilityResponse400
  | getApiV1UsersNicknameAvailabilityResponse401
) & {
  headers: Headers;
};

export type getApiV1UsersNicknameAvailabilityResponse =
  | getApiV1UsersNicknameAvailabilityResponseSuccess
  | getApiV1UsersNicknameAvailabilityResponseError;

export const getGetApiV1UsersNicknameAvailabilityUrl = (
  params: GetApiV1UsersNicknameAvailabilityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/users/nickname/availability?${stringifiedParams}`
    : `/api/v1/users/nickname/availability`;
};

export const getApiV1UsersNicknameAvailability = async (
  params: GetApiV1UsersNicknameAvailabilityParams,
  options?: RequestInit,
): Promise<getApiV1UsersNicknameAvailabilityResponse> => {
  return customFetch<getApiV1UsersNicknameAvailabilityResponse>(
    getGetApiV1UsersNicknameAvailabilityUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 신규 가입 공통(카카오/이메일) 추가 정보 입력을 저장한다.
성공 시 nickname, phoneNumber, signupCompleted가 반영된다.

 * @summary 추가 정보 입력 완료
 */
export type patchApiV1UsersMeAdditionalInfoResponse200 = {
  data: ApiResponseAdditionalInfoUpdated;
  status: 200;
};

export type patchApiV1UsersMeAdditionalInfoResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeAdditionalInfoResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeAdditionalInfoResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type patchApiV1UsersMeAdditionalInfoResponseSuccess =
  patchApiV1UsersMeAdditionalInfoResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeAdditionalInfoResponseError = (
  | patchApiV1UsersMeAdditionalInfoResponse400
  | patchApiV1UsersMeAdditionalInfoResponse401
  | patchApiV1UsersMeAdditionalInfoResponse409
) & {
  headers: Headers;
};

export type patchApiV1UsersMeAdditionalInfoResponse =
  | patchApiV1UsersMeAdditionalInfoResponseSuccess
  | patchApiV1UsersMeAdditionalInfoResponseError;

export const getPatchApiV1UsersMeAdditionalInfoUrl = () => {
  return `/api/v1/users/me/additional-info`;
};

export const patchApiV1UsersMeAdditionalInfo = async (
  additionalInfoUpsertRequest: AdditionalInfoUpsertRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeAdditionalInfoResponse> => {
  return customFetch<patchApiV1UsersMeAdditionalInfoResponse>(
    getPatchApiV1UsersMeAdditionalInfoUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(additionalInfoUpsertRequest),
    },
  );
};

/**
 * 사업자등록번호를 조회해 상태를 반환한다.
- `VALID`: 정상 사업자(계속사업자)
- `CLOSED`: 휴업/폐업
- `NOT_FOUND`: 조회 불가/미확인

 * @summary 사업자등록번호 조회
 */
export type postApiV1UsersMeSellerBusinessRegistrationLookupResponse200 = {
  data: ApiResponseBusinessRegistrationLookup;
  status: 200;
};

export type postApiV1UsersMeSellerBusinessRegistrationLookupResponse400 = {
  data: ApiResponseError;
  status: 400;
};

export type postApiV1UsersMeSellerBusinessRegistrationLookupResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1UsersMeSellerBusinessRegistrationLookupResponseSuccess =
  postApiV1UsersMeSellerBusinessRegistrationLookupResponse200 & {
    headers: Headers;
  };
export type postApiV1UsersMeSellerBusinessRegistrationLookupResponseError = (
  | postApiV1UsersMeSellerBusinessRegistrationLookupResponse400
  | postApiV1UsersMeSellerBusinessRegistrationLookupResponse401
) & {
  headers: Headers;
};

export type postApiV1UsersMeSellerBusinessRegistrationLookupResponse =
  | postApiV1UsersMeSellerBusinessRegistrationLookupResponseSuccess
  | postApiV1UsersMeSellerBusinessRegistrationLookupResponseError;

export const getPostApiV1UsersMeSellerBusinessRegistrationLookupUrl = () => {
  return `/api/v1/users/me/seller/business-registration/lookup`;
};

export const postApiV1UsersMeSellerBusinessRegistrationLookup = async (
  businessRegistrationLookupRequest: BusinessRegistrationLookupRequest,
  options?: RequestInit,
): Promise<postApiV1UsersMeSellerBusinessRegistrationLookupResponse> => {
  return customFetch<postApiV1UsersMeSellerBusinessRegistrationLookupResponse>(
    getPostApiV1UsersMeSellerBusinessRegistrationLookupUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(businessRegistrationLookupRequest),
    },
  );
};

/**
 * 사장님 가입의 사업자 정보를 저장한다.
 * @summary 사장님 사업자 정보 저장
 */
export type patchApiV1UsersMeSellerBusinessInfoResponse200 = {
  data: ApiResponseSellerSignupStatus;
  status: 200;
};

export type patchApiV1UsersMeSellerBusinessInfoResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeSellerBusinessInfoResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeSellerBusinessInfoResponseSuccess =
  patchApiV1UsersMeSellerBusinessInfoResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeSellerBusinessInfoResponseError = (
  | patchApiV1UsersMeSellerBusinessInfoResponse400
  | patchApiV1UsersMeSellerBusinessInfoResponse401
) & {
  headers: Headers;
};

export type patchApiV1UsersMeSellerBusinessInfoResponse =
  | patchApiV1UsersMeSellerBusinessInfoResponseSuccess
  | patchApiV1UsersMeSellerBusinessInfoResponseError;

export const getPatchApiV1UsersMeSellerBusinessInfoUrl = () => {
  return `/api/v1/users/me/seller/business-info`;
};

export const patchApiV1UsersMeSellerBusinessInfo = async (
  sellerBusinessInfoUpsertRequest: SellerBusinessInfoUpsertRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeSellerBusinessInfoResponse> => {
  return customFetch<patchApiV1UsersMeSellerBusinessInfoResponse>(
    getPatchApiV1UsersMeSellerBusinessInfoUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(sellerBusinessInfoUpsertRequest),
    },
  );
};

/**
 * 사장님 정산 정보를 저장하고 사장님 가입 완료 상태를 반영한다.
 * @summary 사장님 정산 정보 저장
 */
export type patchApiV1UsersMeSellerSettlementInfoResponse200 = {
  data: ApiResponseSellerSignupStatus;
  status: 200;
};

export type patchApiV1UsersMeSellerSettlementInfoResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeSellerSettlementInfoResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeSellerSettlementInfoResponseSuccess =
  patchApiV1UsersMeSellerSettlementInfoResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeSellerSettlementInfoResponseError = (
  | patchApiV1UsersMeSellerSettlementInfoResponse400
  | patchApiV1UsersMeSellerSettlementInfoResponse401
) & {
  headers: Headers;
};

export type patchApiV1UsersMeSellerSettlementInfoResponse =
  | patchApiV1UsersMeSellerSettlementInfoResponseSuccess
  | patchApiV1UsersMeSellerSettlementInfoResponseError;

export const getPatchApiV1UsersMeSellerSettlementInfoUrl = () => {
  return `/api/v1/users/me/seller/settlement-info`;
};

export const patchApiV1UsersMeSellerSettlementInfo = async (
  sellerSettlementInfoUpsertRequest: SellerSettlementInfoUpsertRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeSellerSettlementInfoResponse> => {
  return customFetch<patchApiV1UsersMeSellerSettlementInfoResponse>(
    getPatchApiV1UsersMeSellerSettlementInfoUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(sellerSettlementInfoUpsertRequest),
    },
  );
};

/**
 * 사장님의 현재 입금 계좌 정보를 조회한다.
 * @summary 사장님 입금 계좌 조회
 */
export type getApiV1UsersMeSellerSettlementAccountResponse200 = {
  data: ApiResponseSellerSettlementAccount;
  status: 200;
};

export type getApiV1UsersMeSellerSettlementAccountResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeSellerSettlementAccountResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1UsersMeSellerSettlementAccountResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1UsersMeSellerSettlementAccountResponseSuccess =
  getApiV1UsersMeSellerSettlementAccountResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeSellerSettlementAccountResponseError = (
  | getApiV1UsersMeSellerSettlementAccountResponse401
  | getApiV1UsersMeSellerSettlementAccountResponse403
  | getApiV1UsersMeSellerSettlementAccountResponse404
) & {
  headers: Headers;
};

export type getApiV1UsersMeSellerSettlementAccountResponse =
  | getApiV1UsersMeSellerSettlementAccountResponseSuccess
  | getApiV1UsersMeSellerSettlementAccountResponseError;

export const getGetApiV1UsersMeSellerSettlementAccountUrl = () => {
  return `/api/v1/users/me/seller/settlement-account`;
};

export const getApiV1UsersMeSellerSettlementAccount = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeSellerSettlementAccountResponse> => {
  return customFetch<getApiV1UsersMeSellerSettlementAccountResponse>(
    getGetApiV1UsersMeSellerSettlementAccountUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 사장님의 입금 계좌 정보를 변경한다.
 * @summary 사장님 입금 계좌 변경
 */
export type patchApiV1UsersMeSellerSettlementAccountResponse200 = {
  data: ApiResponseSellerSettlementAccount;
  status: 200;
};

export type patchApiV1UsersMeSellerSettlementAccountResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeSellerSettlementAccountResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeSellerSettlementAccountResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1UsersMeSellerSettlementAccountResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type patchApiV1UsersMeSellerSettlementAccountResponseSuccess =
  patchApiV1UsersMeSellerSettlementAccountResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeSellerSettlementAccountResponseError = (
  | patchApiV1UsersMeSellerSettlementAccountResponse400
  | patchApiV1UsersMeSellerSettlementAccountResponse401
  | patchApiV1UsersMeSellerSettlementAccountResponse403
  | patchApiV1UsersMeSellerSettlementAccountResponse404
) & {
  headers: Headers;
};

export type patchApiV1UsersMeSellerSettlementAccountResponse =
  | patchApiV1UsersMeSellerSettlementAccountResponseSuccess
  | patchApiV1UsersMeSellerSettlementAccountResponseError;

export const getPatchApiV1UsersMeSellerSettlementAccountUrl = () => {
  return `/api/v1/users/me/seller/settlement-account`;
};

export const patchApiV1UsersMeSellerSettlementAccount = async (
  sellerSettlementInfoUpsertRequest: SellerSettlementInfoUpsertRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeSellerSettlementAccountResponse> => {
  return customFetch<patchApiV1UsersMeSellerSettlementAccountResponse>(
    getPatchApiV1UsersMeSellerSettlementAccountUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(sellerSettlementInfoUpsertRequest),
    },
  );
};

/**
 * 사장님의 현재 사업자 정보를 조회한다.
 * @summary 사장님 사업자 정보 조회
 */
export type getApiV1UsersMeSellerBusinessProfileResponse200 = {
  data: ApiResponseSellerBusinessProfile;
  status: 200;
};

export type getApiV1UsersMeSellerBusinessProfileResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeSellerBusinessProfileResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1UsersMeSellerBusinessProfileResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1UsersMeSellerBusinessProfileResponseSuccess =
  getApiV1UsersMeSellerBusinessProfileResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeSellerBusinessProfileResponseError = (
  | getApiV1UsersMeSellerBusinessProfileResponse401
  | getApiV1UsersMeSellerBusinessProfileResponse403
  | getApiV1UsersMeSellerBusinessProfileResponse404
) & {
  headers: Headers;
};

export type getApiV1UsersMeSellerBusinessProfileResponse =
  | getApiV1UsersMeSellerBusinessProfileResponseSuccess
  | getApiV1UsersMeSellerBusinessProfileResponseError;

export const getGetApiV1UsersMeSellerBusinessProfileUrl = () => {
  return `/api/v1/users/me/seller/business-profile`;
};

export const getApiV1UsersMeSellerBusinessProfile = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeSellerBusinessProfileResponse> => {
  return customFetch<getApiV1UsersMeSellerBusinessProfileResponse>(
    getGetApiV1UsersMeSellerBusinessProfileUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 사장님의 사업자 정보를 변경한다.
 * @summary 사장님 사업자 정보 변경
 */
export type patchApiV1UsersMeSellerBusinessProfileResponse200 = {
  data: ApiResponseSellerBusinessProfile;
  status: 200;
};

export type patchApiV1UsersMeSellerBusinessProfileResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeSellerBusinessProfileResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeSellerBusinessProfileResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1UsersMeSellerBusinessProfileResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type patchApiV1UsersMeSellerBusinessProfileResponseSuccess =
  patchApiV1UsersMeSellerBusinessProfileResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeSellerBusinessProfileResponseError = (
  | patchApiV1UsersMeSellerBusinessProfileResponse400
  | patchApiV1UsersMeSellerBusinessProfileResponse401
  | patchApiV1UsersMeSellerBusinessProfileResponse403
  | patchApiV1UsersMeSellerBusinessProfileResponse404
) & {
  headers: Headers;
};

export type patchApiV1UsersMeSellerBusinessProfileResponse =
  | patchApiV1UsersMeSellerBusinessProfileResponseSuccess
  | patchApiV1UsersMeSellerBusinessProfileResponseError;

export const getPatchApiV1UsersMeSellerBusinessProfileUrl = () => {
  return `/api/v1/users/me/seller/business-profile`;
};

export const patchApiV1UsersMeSellerBusinessProfile = async (
  sellerBusinessInfoUpsertRequest: SellerBusinessInfoUpsertRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeSellerBusinessProfileResponse> => {
  return customFetch<patchApiV1UsersMeSellerBusinessProfileResponse>(
    getPatchApiV1UsersMeSellerBusinessProfileUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(sellerBusinessInfoUpsertRequest),
    },
  );
};

/**
 * 사장님 회원 탈퇴를 처리한다.
- 탈퇴 진입 컨텍스트 조회 결과와 무관하게 실행 시점 최종 검증을 다시 수행한다.
- 개설된 공구(IN_PROGRESS)가 있으면 탈퇴할 수 없다.
- 달성 완료/완료 공구(ACHIEVED, COMPLETED)에 픽업 미완료 참여가 있으면 탈퇴할 수 없다.
- 소비자 수령 예정 공구가 있으면 탈퇴할 수 없다.
- 동일 계정은 탈퇴 후 30일 이후 재가입 가능하다.
- 최종 검증 실패 시 409 에러를 반환한다. (예: OWNER_WITHDRAWAL_BLOCKED_OPEN_GROUPBUY, OWNER_WITHDRAWAL_BLOCKED_PENDING_CUSTOMER_PICKUP, WITHDRAWAL_BLOCKED_PENDING_PICKUP)

 * @summary 사장님 회원 탈퇴
 */
export type deleteApiV1UsersMeSellerResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1UsersMeSellerResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type deleteApiV1UsersMeSellerResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type deleteApiV1UsersMeSellerResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type deleteApiV1UsersMeSellerResponseSuccess =
  deleteApiV1UsersMeSellerResponse200 & {
    headers: Headers;
  };
export type deleteApiV1UsersMeSellerResponseError = (
  | deleteApiV1UsersMeSellerResponse401
  | deleteApiV1UsersMeSellerResponse403
  | deleteApiV1UsersMeSellerResponse409
) & {
  headers: Headers;
};

export type deleteApiV1UsersMeSellerResponse =
  | deleteApiV1UsersMeSellerResponseSuccess
  | deleteApiV1UsersMeSellerResponseError;

export const getDeleteApiV1UsersMeSellerUrl = () => {
  return `/api/v1/users/me/seller`;
};

export const deleteApiV1UsersMeSeller = async (
  ownerWithdrawRequest: OwnerWithdrawRequest,
  options?: RequestInit,
): Promise<deleteApiV1UsersMeSellerResponse> => {
  return customFetch<deleteApiV1UsersMeSellerResponse>(
    getDeleteApiV1UsersMeSellerUrl(),
    {
      ...options,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(ownerWithdrawRequest),
    },
  );
};

/**
 * 이메일 회원가입 전 가입 가능 이메일인지 확인한다.
 * @summary 이메일 중복 확인
 */
export type getApiV1AuthEmailAvailabilityResponse200 = {
  data: ApiResponseEmailAvailability;
  status: 200;
};

export type getApiV1AuthEmailAvailabilityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1AuthEmailAvailabilityResponseSuccess =
  getApiV1AuthEmailAvailabilityResponse200 & {
    headers: Headers;
  };
export type getApiV1AuthEmailAvailabilityResponseError =
  getApiV1AuthEmailAvailabilityResponse400 & {
    headers: Headers;
  };

export type getApiV1AuthEmailAvailabilityResponse =
  | getApiV1AuthEmailAvailabilityResponseSuccess
  | getApiV1AuthEmailAvailabilityResponseError;

export const getGetApiV1AuthEmailAvailabilityUrl = (
  params: GetApiV1AuthEmailAvailabilityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/auth/email/availability?${stringifiedParams}`
    : `/api/v1/auth/email/availability`;
};

export const getApiV1AuthEmailAvailability = async (
  params: GetApiV1AuthEmailAvailabilityParams,
  options?: RequestInit,
): Promise<getApiV1AuthEmailAvailabilityResponse> => {
  return customFetch<getApiV1AuthEmailAvailabilityResponse>(
    getGetApiV1AuthEmailAvailabilityUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 6자리 숫자 인증코드를 이메일로 발송한다. (유효시간 3분, 재발송 60초 쿨다운, 1일 5회 제한)
 * @summary 이메일 인증코드 발송
 */
export type postApiV1AuthEmailVerificationCodesResponse200 = {
  data: ApiResponseEmailVerificationCodeSent;
  status: 200;
};

export type postApiV1AuthEmailVerificationCodesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthEmailVerificationCodesResponse429 = {
  data: TooManyRequestsResponse;
  status: 429;
};

export type postApiV1AuthEmailVerificationCodesResponseSuccess =
  postApiV1AuthEmailVerificationCodesResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthEmailVerificationCodesResponseError = (
  | postApiV1AuthEmailVerificationCodesResponse400
  | postApiV1AuthEmailVerificationCodesResponse429
) & {
  headers: Headers;
};

export type postApiV1AuthEmailVerificationCodesResponse =
  | postApiV1AuthEmailVerificationCodesResponseSuccess
  | postApiV1AuthEmailVerificationCodesResponseError;

export const getPostApiV1AuthEmailVerificationCodesUrl = () => {
  return `/api/v1/auth/email/verification-codes`;
};

export const postApiV1AuthEmailVerificationCodes = async (
  emailVerificationCodeSendRequest: EmailVerificationCodeSendRequest,
  options?: RequestInit,
): Promise<postApiV1AuthEmailVerificationCodesResponse> => {
  return customFetch<postApiV1AuthEmailVerificationCodesResponse>(
    getPostApiV1AuthEmailVerificationCodesUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(emailVerificationCodeSendRequest),
    },
  );
};

/**
 * 인증코드가 일치하면 이메일 인증 완료 상태로 처리한다.
 * @summary 이메일 인증코드 확인
 */
export type postApiV1AuthEmailVerificationCodesVerifyResponse200 = {
  data: ApiResponseEmailVerificationVerified;
  status: 200;
};

export type postApiV1AuthEmailVerificationCodesVerifyResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthEmailVerificationCodesVerifyResponseSuccess =
  postApiV1AuthEmailVerificationCodesVerifyResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthEmailVerificationCodesVerifyResponseError =
  postApiV1AuthEmailVerificationCodesVerifyResponse400 & {
    headers: Headers;
  };

export type postApiV1AuthEmailVerificationCodesVerifyResponse =
  | postApiV1AuthEmailVerificationCodesVerifyResponseSuccess
  | postApiV1AuthEmailVerificationCodesVerifyResponseError;

export const getPostApiV1AuthEmailVerificationCodesVerifyUrl = () => {
  return `/api/v1/auth/email/verification-codes/verify`;
};

export const postApiV1AuthEmailVerificationCodesVerify = async (
  emailVerificationCodeVerifyRequest: EmailVerificationCodeVerifyRequest,
  options?: RequestInit,
): Promise<postApiV1AuthEmailVerificationCodesVerifyResponse> => {
  return customFetch<postApiV1AuthEmailVerificationCodesVerifyResponse>(
    getPostApiV1AuthEmailVerificationCodesVerifyUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(emailVerificationCodeVerifyRequest),
    },
  );
};

/**
 * 6자리 숫자 인증코드를 전화번호로 발송한다.
 * @summary 전화번호 인증코드 발송
 */
export type postApiV1AuthPhoneVerificationCodesResponse200 = {
  data: ApiResponsePhoneVerificationCodeSent;
  status: 200;
};

export type postApiV1AuthPhoneVerificationCodesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthPhoneVerificationCodesResponse429 = {
  data: TooManyRequestsResponse;
  status: 429;
};

export type postApiV1AuthPhoneVerificationCodesResponseSuccess =
  postApiV1AuthPhoneVerificationCodesResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthPhoneVerificationCodesResponseError = (
  | postApiV1AuthPhoneVerificationCodesResponse400
  | postApiV1AuthPhoneVerificationCodesResponse429
) & {
  headers: Headers;
};

export type postApiV1AuthPhoneVerificationCodesResponse =
  | postApiV1AuthPhoneVerificationCodesResponseSuccess
  | postApiV1AuthPhoneVerificationCodesResponseError;

export const getPostApiV1AuthPhoneVerificationCodesUrl = () => {
  return `/api/v1/auth/phone/verification-codes`;
};

export const postApiV1AuthPhoneVerificationCodes = async (
  phoneVerificationCodeSendRequest: PhoneVerificationCodeSendRequest,
  options?: RequestInit,
): Promise<postApiV1AuthPhoneVerificationCodesResponse> => {
  return customFetch<postApiV1AuthPhoneVerificationCodesResponse>(
    getPostApiV1AuthPhoneVerificationCodesUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(phoneVerificationCodeSendRequest),
    },
  );
};

/**
 * 인증코드가 일치하면 전화번호 인증 완료 상태로 처리한다.
 * @summary 전화번호 인증코드 확인
 */
export type postApiV1AuthPhoneVerificationCodesVerifyResponse200 = {
  data: ApiResponsePhoneVerificationVerified;
  status: 200;
};

export type postApiV1AuthPhoneVerificationCodesVerifyResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthPhoneVerificationCodesVerifyResponseSuccess =
  postApiV1AuthPhoneVerificationCodesVerifyResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthPhoneVerificationCodesVerifyResponseError =
  postApiV1AuthPhoneVerificationCodesVerifyResponse400 & {
    headers: Headers;
  };

export type postApiV1AuthPhoneVerificationCodesVerifyResponse =
  | postApiV1AuthPhoneVerificationCodesVerifyResponseSuccess
  | postApiV1AuthPhoneVerificationCodesVerifyResponseError;

export const getPostApiV1AuthPhoneVerificationCodesVerifyUrl = () => {
  return `/api/v1/auth/phone/verification-codes/verify`;
};

export const postApiV1AuthPhoneVerificationCodesVerify = async (
  phoneVerificationCodeVerifyRequest: PhoneVerificationCodeVerifyRequest,
  options?: RequestInit,
): Promise<postApiV1AuthPhoneVerificationCodesVerifyResponse> => {
  return customFetch<postApiV1AuthPhoneVerificationCodesVerifyResponse>(
    getPostApiV1AuthPhoneVerificationCodesVerifyUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(phoneVerificationCodeVerifyRequest),
    },
  );
};

/**
 * 이메일 인증 완료 후 비밀번호를 설정해 계정을 생성하고 로그인 처리한다.
 * @summary 이메일 회원가입
 */
export type postApiV1AuthEmailSignupResponse200 = {
  data: ApiResponseAuthLogin;
  status: 200;
};

export type postApiV1AuthEmailSignupResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthEmailSignupResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1AuthEmailSignupResponseSuccess =
  postApiV1AuthEmailSignupResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthEmailSignupResponseError = (
  | postApiV1AuthEmailSignupResponse400
  | postApiV1AuthEmailSignupResponse409
) & {
  headers: Headers;
};

export type postApiV1AuthEmailSignupResponse =
  | postApiV1AuthEmailSignupResponseSuccess
  | postApiV1AuthEmailSignupResponseError;

export const getPostApiV1AuthEmailSignupUrl = () => {
  return `/api/v1/auth/email/signup`;
};

export const postApiV1AuthEmailSignup = async (
  emailSignupRequest: EmailSignupRequest,
  options?: RequestInit,
): Promise<postApiV1AuthEmailSignupResponse> => {
  return customFetch<postApiV1AuthEmailSignupResponse>(
    getPostApiV1AuthEmailSignupUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(emailSignupRequest),
    },
  );
};

/**
 * 이메일과 비밀번호를 검증하고 로그인 처리한다.
 * @summary 이메일 로그인
 */
export type postApiV1AuthEmailLoginResponse200 = {
  data: ApiResponseAuthLogin;
  status: 200;
};

export type postApiV1AuthEmailLoginResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1AuthEmailLoginResponseSuccess =
  postApiV1AuthEmailLoginResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthEmailLoginResponseError =
  postApiV1AuthEmailLoginResponse401 & {
    headers: Headers;
  };

export type postApiV1AuthEmailLoginResponse =
  | postApiV1AuthEmailLoginResponseSuccess
  | postApiV1AuthEmailLoginResponseError;

export const getPostApiV1AuthEmailLoginUrl = () => {
  return `/api/v1/auth/email/login`;
};

export const postApiV1AuthEmailLogin = async (
  emailLoginRequest: EmailLoginRequest,
  options?: RequestInit,
): Promise<postApiV1AuthEmailLoginResponse> => {
  return customFetch<postApiV1AuthEmailLoginResponse>(
    getPostApiV1AuthEmailLoginUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(emailLoginRequest),
    },
  );
};

/**
 * 인증된 사용자의 닉네임을 변경한다.
 * @summary 닉네임 변경
 */
export type patchApiV1UsersMeNicknameResponse200 = {
  data: ApiResponseNicknameUpdated;
  status: 200;
};

export type patchApiV1UsersMeNicknameResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeNicknameResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeNicknameResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type patchApiV1UsersMeNicknameResponseSuccess =
  patchApiV1UsersMeNicknameResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeNicknameResponseError = (
  | patchApiV1UsersMeNicknameResponse400
  | patchApiV1UsersMeNicknameResponse401
  | patchApiV1UsersMeNicknameResponse409
) & {
  headers: Headers;
};

export type patchApiV1UsersMeNicknameResponse =
  | patchApiV1UsersMeNicknameResponseSuccess
  | patchApiV1UsersMeNicknameResponseError;

export const getPatchApiV1UsersMeNicknameUrl = () => {
  return `/api/v1/users/me/nickname`;
};

export const patchApiV1UsersMeNickname = async (
  nicknameUpdateRequest: NicknameUpdateRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeNicknameResponse> => {
  return customFetch<patchApiV1UsersMeNicknameResponse>(
    getPatchApiV1UsersMeNicknameUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(nicknameUpdateRequest),
    },
  );
};

/**
 * 인증된 사용자의 전화번호를 변경한다.
 * @summary 전화번호 변경
 */
export type patchApiV1UsersMePhoneNumberResponse200 = {
  data: ApiResponsePhoneNumberUpdated;
  status: 200;
};

export type patchApiV1UsersMePhoneNumberResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMePhoneNumberResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMePhoneNumberResponseSuccess =
  patchApiV1UsersMePhoneNumberResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMePhoneNumberResponseError = (
  | patchApiV1UsersMePhoneNumberResponse400
  | patchApiV1UsersMePhoneNumberResponse401
) & {
  headers: Headers;
};

export type patchApiV1UsersMePhoneNumberResponse =
  | patchApiV1UsersMePhoneNumberResponseSuccess
  | patchApiV1UsersMePhoneNumberResponseError;

export const getPatchApiV1UsersMePhoneNumberUrl = () => {
  return `/api/v1/users/me/phone-number`;
};

export const patchApiV1UsersMePhoneNumber = async (
  phoneNumberUpdateRequest: PhoneNumberUpdateRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMePhoneNumberResponse> => {
  return customFetch<patchApiV1UsersMePhoneNumberResponse>(
    getPatchApiV1UsersMePhoneNumberUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(phoneNumberUpdateRequest),
    },
  );
};

/**
 * 새 전화번호 검증을 위한 6자리 인증코드를 발송한다.
 * @summary 전화번호 변경 인증코드 발송
 */
export type postApiV1UsersMePhoneVerificationCodesResponse200 = {
  data: ApiResponsePhoneVerificationCodeSent;
  status: 200;
};

export type postApiV1UsersMePhoneVerificationCodesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1UsersMePhoneVerificationCodesResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1UsersMePhoneVerificationCodesResponseSuccess =
  postApiV1UsersMePhoneVerificationCodesResponse200 & {
    headers: Headers;
  };
export type postApiV1UsersMePhoneVerificationCodesResponseError = (
  | postApiV1UsersMePhoneVerificationCodesResponse400
  | postApiV1UsersMePhoneVerificationCodesResponse401
) & {
  headers: Headers;
};

export type postApiV1UsersMePhoneVerificationCodesResponse =
  | postApiV1UsersMePhoneVerificationCodesResponseSuccess
  | postApiV1UsersMePhoneVerificationCodesResponseError;

export const getPostApiV1UsersMePhoneVerificationCodesUrl = () => {
  return `/api/v1/users/me/phone/verification-codes`;
};

export const postApiV1UsersMePhoneVerificationCodes = async (
  phoneVerificationCodeSendRequest: PhoneVerificationCodeSendRequest,
  options?: RequestInit,
): Promise<postApiV1UsersMePhoneVerificationCodesResponse> => {
  return customFetch<postApiV1UsersMePhoneVerificationCodesResponse>(
    getPostApiV1UsersMePhoneVerificationCodesUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(phoneVerificationCodeSendRequest),
    },
  );
};

/**
 * 인증코드 확인 후 전화번호 변경 가능 상태를 확정한다.
 * @summary 전화번호 변경 인증코드 확인
 */
export type postApiV1UsersMePhoneVerificationCodesVerifyResponse200 = {
  data: ApiResponsePhoneVerificationVerified;
  status: 200;
};

export type postApiV1UsersMePhoneVerificationCodesVerifyResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1UsersMePhoneVerificationCodesVerifyResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1UsersMePhoneVerificationCodesVerifyResponseSuccess =
  postApiV1UsersMePhoneVerificationCodesVerifyResponse200 & {
    headers: Headers;
  };
export type postApiV1UsersMePhoneVerificationCodesVerifyResponseError = (
  | postApiV1UsersMePhoneVerificationCodesVerifyResponse400
  | postApiV1UsersMePhoneVerificationCodesVerifyResponse401
) & {
  headers: Headers;
};

export type postApiV1UsersMePhoneVerificationCodesVerifyResponse =
  | postApiV1UsersMePhoneVerificationCodesVerifyResponseSuccess
  | postApiV1UsersMePhoneVerificationCodesVerifyResponseError;

export const getPostApiV1UsersMePhoneVerificationCodesVerifyUrl = () => {
  return `/api/v1/users/me/phone/verification-codes/verify`;
};

export const postApiV1UsersMePhoneVerificationCodesVerify = async (
  phoneVerificationCodeVerifyRequest: PhoneVerificationCodeVerifyRequest,
  options?: RequestInit,
): Promise<postApiV1UsersMePhoneVerificationCodesVerifyResponse> => {
  return customFetch<postApiV1UsersMePhoneVerificationCodesVerifyResponse>(
    getPostApiV1UsersMePhoneVerificationCodesVerifyUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(phoneVerificationCodeVerifyRequest),
    },
  );
};

/**
 * 현재 비밀번호를 확인하고 새 비밀번호로 변경한다. 변경 완료 시 세션을 무효화한다.
 * @summary 비밀번호 변경 (이메일 가입자 전용)
 */
export type patchApiV1UsersMePasswordResponse200 = {
  data: ApiResponsePasswordChanged;
  status: 200;
};

export type patchApiV1UsersMePasswordResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMePasswordResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMePasswordResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1UsersMePasswordResponseSuccess =
  patchApiV1UsersMePasswordResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMePasswordResponseError = (
  | patchApiV1UsersMePasswordResponse400
  | patchApiV1UsersMePasswordResponse401
  | patchApiV1UsersMePasswordResponse403
) & {
  headers: Headers;
};

export type patchApiV1UsersMePasswordResponse =
  | patchApiV1UsersMePasswordResponseSuccess
  | patchApiV1UsersMePasswordResponseError;

export const getPatchApiV1UsersMePasswordUrl = () => {
  return `/api/v1/users/me/password`;
};

export const patchApiV1UsersMePassword = async (
  passwordChangeRequest: PasswordChangeRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMePasswordResponse> => {
  return customFetch<patchApiV1UsersMePasswordResponse>(
    getPatchApiV1UsersMePasswordUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(passwordChangeRequest),
    },
  );
};

/**
 * @summary 내 관심 지역 조회
 */
export type getApiV1UsersMeRegionsResponse200 = {
  data: ApiResponseMyRegions;
  status: 200;
};

export type getApiV1UsersMeRegionsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type getApiV1UsersMeRegionsResponseSuccess =
  getApiV1UsersMeRegionsResponse200 & {
    headers: Headers;
  };
export type getApiV1UsersMeRegionsResponseError =
  getApiV1UsersMeRegionsResponse401 & {
    headers: Headers;
  };

export type getApiV1UsersMeRegionsResponse =
  | getApiV1UsersMeRegionsResponseSuccess
  | getApiV1UsersMeRegionsResponseError;

export const getGetApiV1UsersMeRegionsUrl = () => {
  return `/api/v1/users/me/regions`;
};

export const getApiV1UsersMeRegions = async (
  options?: RequestInit,
): Promise<getApiV1UsersMeRegionsResponse> => {
  return customFetch<getApiV1UsersMeRegionsResponse>(
    getGetApiV1UsersMeRegionsUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 기존 관심 지역을 모두 삭제하고 요청 목록으로 새로 저장한다. 빈 배열이면 전체 해제.
 * @summary 관심 지역 저장/수정 (전체 교체)
 */
export type putApiV1UsersMeRegionsResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type putApiV1UsersMeRegionsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type putApiV1UsersMeRegionsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type putApiV1UsersMeRegionsResponseSuccess =
  putApiV1UsersMeRegionsResponse200 & {
    headers: Headers;
  };
export type putApiV1UsersMeRegionsResponseError = (
  | putApiV1UsersMeRegionsResponse400
  | putApiV1UsersMeRegionsResponse401
) & {
  headers: Headers;
};

export type putApiV1UsersMeRegionsResponse =
  | putApiV1UsersMeRegionsResponseSuccess
  | putApiV1UsersMeRegionsResponseError;

export const getPutApiV1UsersMeRegionsUrl = () => {
  return `/api/v1/users/me/regions`;
};

export const putApiV1UsersMeRegions = async (
  updateRegionsRequest: UpdateRegionsRequest,
  options?: RequestInit,
): Promise<putApiV1UsersMeRegionsResponse> => {
  return customFetch<putApiV1UsersMeRegionsResponse>(
    getPutApiV1UsersMeRegionsUrl(),
    {
      ...options,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateRegionsRequest),
    },
  );
};
