/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  ApiResponseAuthLogin,
  BadRequestResponse,
  EmailLoginRequest,
  ForbiddenResponse,
  UnauthorizedResponse
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



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




export const getPostApiV1AuthAdminEmailLoginMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>, TError,{data: EmailLoginRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>, TError,{data: EmailLoginRequest}, TContext> => {

const mutationKey = ['postApiV1AuthAdminEmailLogin'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>, {data: EmailLoginRequest}> = (props) => {
          const {data} = props ?? {};

          return  postApiV1AuthAdminEmailLogin(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiV1AuthAdminEmailLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>>
    export type PostApiV1AuthAdminEmailLoginMutationBody = EmailLoginRequest
    export type PostApiV1AuthAdminEmailLoginMutationError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse

    /**
 * @summary 관리자 이메일 로그인
 */
export const usePostApiV1AuthAdminEmailLogin = <TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>, TError,{data: EmailLoginRequest}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV1AuthAdminEmailLogin>>,
        TError,
        {data: EmailLoginRequest},
        TContext
      > => {
      return useMutation(getPostApiV1AuthAdminEmailLoginMutationOptions(options), queryClient);
    }
