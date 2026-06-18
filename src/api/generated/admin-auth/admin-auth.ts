/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseAuthLogin,
  BadRequestResponse,
  EmailLoginRequest,
  ForbiddenResponse,
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 이메일과 비밀번호를 검증하고 ADMIN 권한 보유 사용자만 로그인 처리한다.
 * @summary 관리자 이메일 로그인
 */
export type postApiV1AuthAdminEmailLoginResponse200 = {
  data: ApiResponseAuthLogin
  status: 200
}

export type postApiV1AuthAdminEmailLoginResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type postApiV1AuthAdminEmailLoginResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type postApiV1AuthAdminEmailLoginResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type postApiV1AuthAdminEmailLoginResponseSuccess = (postApiV1AuthAdminEmailLoginResponse200) & {
  headers: Headers;
};
export type postApiV1AuthAdminEmailLoginResponseError = (postApiV1AuthAdminEmailLoginResponse400 | postApiV1AuthAdminEmailLoginResponse401 | postApiV1AuthAdminEmailLoginResponse403) & {
  headers: Headers;
};

export type postApiV1AuthAdminEmailLoginResponse = (postApiV1AuthAdminEmailLoginResponseSuccess | postApiV1AuthAdminEmailLoginResponseError)

export const getPostApiV1AuthAdminEmailLoginUrl = () => {




  return `/api/v1/auth/admin/email/login`
}

export const postApiV1AuthAdminEmailLogin = async (emailLoginRequest: EmailLoginRequest, options?: RequestInit): Promise<postApiV1AuthAdminEmailLoginResponse> => {

  return customFetch<postApiV1AuthAdminEmailLoginResponse>(getPostApiV1AuthAdminEmailLoginUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      emailLoginRequest,)
  }
);}


