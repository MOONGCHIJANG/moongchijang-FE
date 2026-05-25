/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import type {
  AdditionalInfoUpsertRequest,
  ApiResponseAccessToken,
  ApiResponseAdditionalInfoUpdated,
  ApiResponseAuthLogin,
  ApiResponseEmailAvailability,
  ApiResponseEmailVerificationCodeSent,
  ApiResponseEmailVerificationVerified,
  ApiResponseMyRegions,
  ApiResponseNicknameAvailability,
  ApiResponsePhoneVerificationCodeSent,
  ApiResponsePhoneVerificationVerified,
  ApiResponseProfileUpdated,
  ApiResponseUserInfo,
  BadRequestResponse,
  ConflictResponse,
  EmailLoginRequest,
  EmailSignupRequest,
  EmailVerificationCodeSendRequest,
  EmailVerificationCodeVerifyRequest,
  ForbiddenResponse,
  GetApiV1AuthEmailAvailabilityParams,
  GetApiV1UsersNicknameAvailabilityParams,
  KakaoLoginRequest,
  NotFoundResponse,
  PasswordChangeRequest,
  PasswordResetLinkRequest,
  PhoneVerificationCodeSendRequest,
  PhoneVerificationCodeVerifyRequest,
  ProfileUpdateRequest,
  SuccessNoDataResponse,
  TooManyRequestsResponse,
  UnauthorizedResponse,
  UpdateRegionsRequest,
  WithdrawRequest,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

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

export const getPostApiV1AuthKakaoMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthKakao>>,
    TError,
    { data: KakaoLoginRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthKakao>>,
  TError,
  { data: KakaoLoginRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthKakao'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthKakao>>,
    { data: KakaoLoginRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthKakao(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthKakaoMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthKakao>>
>;
export type PostApiV1AuthKakaoMutationBody = KakaoLoginRequest;
export type PostApiV1AuthKakaoMutationError = unknown;

/**
 * @summary 카카오 로그인 / 회원가입
 */
export const usePostApiV1AuthKakao = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthKakao>>,
      TError,
      { data: KakaoLoginRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthKakao>>,
  TError,
  { data: KakaoLoginRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthKakaoMutationOptions(options),
    queryClient,
  );
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

export const getPostApiV1AuthRefreshMutationOptions = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthRefresh>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthRefresh>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['postApiV1AuthRefresh'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthRefresh>>,
    void
  > = () => {
    return postApiV1AuthRefresh(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthRefreshMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthRefresh>>
>;

export type PostApiV1AuthRefreshMutationError = UnauthorizedResponse;

/**
 * @summary Access Token 갱신
 */
export const usePostApiV1AuthRefresh = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthRefresh>>,
      TError,
      void,
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthRefresh>>,
  TError,
  void,
  TContext
> => {
  return useMutation(
    getPostApiV1AuthRefreshMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthLogoutMutationOptions = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthLogout>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['postApiV1AuthLogout'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthLogout>>,
    void
  > = () => {
    return postApiV1AuthLogout(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthLogout>>
>;

export type PostApiV1AuthLogoutMutationError = UnauthorizedResponse;

/**
 * @summary 로그아웃
 */
export const usePostApiV1AuthLogout = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthLogout>>,
      TError,
      void,
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthLogout>>,
  TError,
  void,
  TContext
> => {
  return useMutation(
    getPostApiV1AuthLogoutMutationOptions(options),
    queryClient,
  );
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

export const getGetApiV1UsersMeQueryKey = () => {
  return [`/api/v1/users/me`] as const;
};

export const getGetApiV1UsersMeQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMe>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiV1UsersMe>>, TError, TData>
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1UsersMeQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1UsersMe>>> = ({
    signal,
  }) => getApiV1UsersMe({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMe>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMe>>
>;
export type GetApiV1UsersMeQueryError = unknown;

export function useGetApiV1UsersMe<
  TData = Awaited<ReturnType<typeof getApiV1UsersMe>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMe>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMe>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMe>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMe<
  TData = Awaited<ReturnType<typeof getApiV1UsersMe>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMe>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMe>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMe>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMe<
  TData = Awaited<ReturnType<typeof getApiV1UsersMe>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMe>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 내 정보 조회
 */

export function useGetApiV1UsersMe<
  TData = Awaited<ReturnType<typeof getApiV1UsersMe>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMe>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1UsersMeQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

/**
 * 회원 탈퇴를 처리한다.
- 수령 예정 공구(달성 완료 + 픽업 미완료)가 있으면 탈퇴할 수 없다.
- 참여 중 공구(PAID_WAITING_GOAL)는 자동 취소된다.
- 찜 목록은 모두 삭제된다.
- 동일 계정은 탈퇴 후 30일 이후 재가입 가능하다.

 * @summary 회원 탈퇴
 */
export type deleteApiV1UsersMeResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type deleteApiV1UsersMeResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type deleteApiV1UsersMeResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type deleteApiV1UsersMeResponseSuccess =
  deleteApiV1UsersMeResponse200 & {
    headers: Headers;
  };
export type deleteApiV1UsersMeResponseError = (
  | deleteApiV1UsersMeResponse401
  | deleteApiV1UsersMeResponse409
) & {
  headers: Headers;
};

export type deleteApiV1UsersMeResponse =
  | deleteApiV1UsersMeResponseSuccess
  | deleteApiV1UsersMeResponseError;

export const getDeleteApiV1UsersMeUrl = () => {
  return `/api/v1/users/me`;
};

export const deleteApiV1UsersMe = async (
  withdrawRequest?: WithdrawRequest,
  options?: RequestInit,
): Promise<deleteApiV1UsersMeResponse> => {
  return customFetch<deleteApiV1UsersMeResponse>(getDeleteApiV1UsersMeUrl(), {
    ...options,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(withdrawRequest),
  });
};

export const getDeleteApiV1UsersMeMutationOptions = <
  TError = UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1UsersMe>>,
    TError,
    { data?: WithdrawRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1UsersMe>>,
  TError,
  { data?: WithdrawRequest },
  TContext
> => {
  const mutationKey = ['deleteApiV1UsersMe'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1UsersMe>>,
    { data?: WithdrawRequest }
  > = (props) => {
    const { data } = props ?? {};

    return deleteApiV1UsersMe(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1UsersMeMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1UsersMe>>
>;
export type DeleteApiV1UsersMeMutationBody = WithdrawRequest | undefined;
export type DeleteApiV1UsersMeMutationError =
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary 회원 탈퇴
 */
export const useDeleteApiV1UsersMe = <
  TError = UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteApiV1UsersMe>>,
      TError,
      { data?: WithdrawRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1UsersMe>>,
  TError,
  { data?: WithdrawRequest },
  TContext
> => {
  return useMutation(
    getDeleteApiV1UsersMeMutationOptions(options),
    queryClient,
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

export const getGetApiV1UsersNicknameAvailabilityQueryKey = (
  params?: GetApiV1UsersNicknameAvailabilityParams,
) => {
  return [
    `/api/v1/users/nickname/availability`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1UsersNicknameAvailabilityQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: GetApiV1UsersNicknameAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetApiV1UsersNicknameAvailabilityQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>
  > = ({ signal }) =>
    getApiV1UsersNicknameAvailability(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersNicknameAvailabilityQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>
>;
export type GetApiV1UsersNicknameAvailabilityQueryError =
  | BadRequestResponse
  | UnauthorizedResponse;

export function useGetApiV1UsersNicknameAvailability<
  TData = Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: GetApiV1UsersNicknameAvailabilityParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersNicknameAvailability<
  TData = Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: GetApiV1UsersNicknameAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersNicknameAvailability<
  TData = Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: GetApiV1UsersNicknameAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 닉네임 중복 확인
 */

export function useGetApiV1UsersNicknameAvailability<
  TData = Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
  TError = BadRequestResponse | UnauthorizedResponse,
>(
  params: GetApiV1UsersNicknameAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersNicknameAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1UsersNicknameAvailabilityQueryOptions(
    params,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getPatchApiV1UsersMeAdditionalInfoMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>,
    TError,
    { data: AdditionalInfoUpsertRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>,
  TError,
  { data: AdditionalInfoUpsertRequest },
  TContext
> => {
  const mutationKey = ['patchApiV1UsersMeAdditionalInfo'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>,
    { data: AdditionalInfoUpsertRequest }
  > = (props) => {
    const { data } = props ?? {};

    return patchApiV1UsersMeAdditionalInfo(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiV1UsersMeAdditionalInfoMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>
>;
export type PatchApiV1UsersMeAdditionalInfoMutationBody =
  AdditionalInfoUpsertRequest;
export type PatchApiV1UsersMeAdditionalInfoMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary 추가 정보 입력 완료
 */
export const usePatchApiV1UsersMeAdditionalInfo = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>,
      TError,
      { data: AdditionalInfoUpsertRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchApiV1UsersMeAdditionalInfo>>,
  TError,
  { data: AdditionalInfoUpsertRequest },
  TContext
> => {
  return useMutation(
    getPatchApiV1UsersMeAdditionalInfoMutationOptions(options),
    queryClient,
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

export const getGetApiV1AuthEmailAvailabilityQueryKey = (
  params?: GetApiV1AuthEmailAvailabilityParams,
) => {
  return [
    `/api/v1/auth/email/availability`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiV1AuthEmailAvailabilityQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1AuthEmailAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1AuthEmailAvailabilityQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>
  > = ({ signal }) =>
    getApiV1AuthEmailAvailability(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1AuthEmailAvailabilityQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>
>;
export type GetApiV1AuthEmailAvailabilityQueryError = BadRequestResponse;

export function useGetApiV1AuthEmailAvailability<
  TData = Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1AuthEmailAvailabilityParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1AuthEmailAvailability<
  TData = Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1AuthEmailAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
          TError,
          Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1AuthEmailAvailability<
  TData = Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1AuthEmailAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 이메일 중복 확인
 */

export function useGetApiV1AuthEmailAvailability<
  TData = Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
  TError = BadRequestResponse,
>(
  params: GetApiV1AuthEmailAvailabilityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1AuthEmailAvailability>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1AuthEmailAvailabilityQueryOptions(
    params,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getPostApiV1AuthEmailVerificationCodesMutationOptions = <
  TError = BadRequestResponse | TooManyRequestsResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>,
    TError,
    { data: EmailVerificationCodeSendRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>,
  TError,
  { data: EmailVerificationCodeSendRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthEmailVerificationCodes'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>,
    { data: EmailVerificationCodeSendRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthEmailVerificationCodes(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthEmailVerificationCodesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>
>;
export type PostApiV1AuthEmailVerificationCodesMutationBody =
  EmailVerificationCodeSendRequest;
export type PostApiV1AuthEmailVerificationCodesMutationError =
  | BadRequestResponse
  | TooManyRequestsResponse;

/**
 * @summary 이메일 인증코드 발송
 */
export const usePostApiV1AuthEmailVerificationCodes = <
  TError = BadRequestResponse | TooManyRequestsResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>,
      TError,
      { data: EmailVerificationCodeSendRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodes>>,
  TError,
  { data: EmailVerificationCodeSendRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthEmailVerificationCodesMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthEmailVerificationCodesVerifyMutationOptions = <
  TError = BadRequestResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>,
    TError,
    { data: EmailVerificationCodeVerifyRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>,
  TError,
  { data: EmailVerificationCodeVerifyRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthEmailVerificationCodesVerify'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>,
    { data: EmailVerificationCodeVerifyRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthEmailVerificationCodesVerify(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthEmailVerificationCodesVerifyMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>
  >;
export type PostApiV1AuthEmailVerificationCodesVerifyMutationBody =
  EmailVerificationCodeVerifyRequest;
export type PostApiV1AuthEmailVerificationCodesVerifyMutationError =
  BadRequestResponse;

/**
 * @summary 이메일 인증코드 확인
 */
export const usePostApiV1AuthEmailVerificationCodesVerify = <
  TError = BadRequestResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>,
      TError,
      { data: EmailVerificationCodeVerifyRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthEmailVerificationCodesVerify>>,
  TError,
  { data: EmailVerificationCodeVerifyRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthEmailVerificationCodesVerifyMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthPhoneVerificationCodesMutationOptions = <
  TError = BadRequestResponse | TooManyRequestsResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>,
    TError,
    { data: PhoneVerificationCodeSendRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>,
  TError,
  { data: PhoneVerificationCodeSendRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthPhoneVerificationCodes'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>,
    { data: PhoneVerificationCodeSendRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthPhoneVerificationCodes(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthPhoneVerificationCodesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>
>;
export type PostApiV1AuthPhoneVerificationCodesMutationBody =
  PhoneVerificationCodeSendRequest;
export type PostApiV1AuthPhoneVerificationCodesMutationError =
  | BadRequestResponse
  | TooManyRequestsResponse;

/**
 * @summary 전화번호 인증코드 발송
 */
export const usePostApiV1AuthPhoneVerificationCodes = <
  TError = BadRequestResponse | TooManyRequestsResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>,
      TError,
      { data: PhoneVerificationCodeSendRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodes>>,
  TError,
  { data: PhoneVerificationCodeSendRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthPhoneVerificationCodesMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthPhoneVerificationCodesVerifyMutationOptions = <
  TError = BadRequestResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>,
    TError,
    { data: PhoneVerificationCodeVerifyRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>,
  TError,
  { data: PhoneVerificationCodeVerifyRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthPhoneVerificationCodesVerify'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>,
    { data: PhoneVerificationCodeVerifyRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthPhoneVerificationCodesVerify(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthPhoneVerificationCodesVerifyMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>
  >;
export type PostApiV1AuthPhoneVerificationCodesVerifyMutationBody =
  PhoneVerificationCodeVerifyRequest;
export type PostApiV1AuthPhoneVerificationCodesVerifyMutationError =
  BadRequestResponse;

/**
 * @summary 전화번호 인증코드 확인
 */
export const usePostApiV1AuthPhoneVerificationCodesVerify = <
  TError = BadRequestResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>,
      TError,
      { data: PhoneVerificationCodeVerifyRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthPhoneVerificationCodesVerify>>,
  TError,
  { data: PhoneVerificationCodeVerifyRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthPhoneVerificationCodesVerifyMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthEmailSignupMutationOptions = <
  TError = BadRequestResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>,
    TError,
    { data: EmailSignupRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>,
  TError,
  { data: EmailSignupRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthEmailSignup'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>,
    { data: EmailSignupRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthEmailSignup(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthEmailSignupMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>
>;
export type PostApiV1AuthEmailSignupMutationBody = EmailSignupRequest;
export type PostApiV1AuthEmailSignupMutationError =
  | BadRequestResponse
  | ConflictResponse;

/**
 * @summary 이메일 회원가입
 */
export const usePostApiV1AuthEmailSignup = <
  TError = BadRequestResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>,
      TError,
      { data: EmailSignupRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthEmailSignup>>,
  TError,
  { data: EmailSignupRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthEmailSignupMutationOptions(options),
    queryClient,
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

export const getPostApiV1AuthEmailLoginMutationOptions = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>,
    TError,
    { data: EmailLoginRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>,
  TError,
  { data: EmailLoginRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthEmailLogin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>,
    { data: EmailLoginRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthEmailLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthEmailLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>
>;
export type PostApiV1AuthEmailLoginMutationBody = EmailLoginRequest;
export type PostApiV1AuthEmailLoginMutationError = UnauthorizedResponse;

/**
 * @summary 이메일 로그인
 */
export const usePostApiV1AuthEmailLogin = <
  TError = UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>,
      TError,
      { data: EmailLoginRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthEmailLogin>>,
  TError,
  { data: EmailLoginRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthEmailLoginMutationOptions(options),
    queryClient,
  );
};
/**
 * 가입된 이메일로 비밀번호 재설정 링크를 발송한다.
 * @summary 비밀번호 재설정 링크 발송
 */
export type postApiV1AuthPasswordResetLinkResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1AuthPasswordResetLinkResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AuthPasswordResetLinkResponseSuccess =
  postApiV1AuthPasswordResetLinkResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthPasswordResetLinkResponseError =
  postApiV1AuthPasswordResetLinkResponse404 & {
    headers: Headers;
  };

export type postApiV1AuthPasswordResetLinkResponse =
  | postApiV1AuthPasswordResetLinkResponseSuccess
  | postApiV1AuthPasswordResetLinkResponseError;

export const getPostApiV1AuthPasswordResetLinkUrl = () => {
  return `/api/v1/auth/password/reset-link`;
};

export const postApiV1AuthPasswordResetLink = async (
  passwordResetLinkRequest: PasswordResetLinkRequest,
  options?: RequestInit,
): Promise<postApiV1AuthPasswordResetLinkResponse> => {
  return customFetch<postApiV1AuthPasswordResetLinkResponse>(
    getPostApiV1AuthPasswordResetLinkUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(passwordResetLinkRequest),
    },
  );
};

export const getPostApiV1AuthPasswordResetLinkMutationOptions = <
  TError = NotFoundResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>,
    TError,
    { data: PasswordResetLinkRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>,
  TError,
  { data: PasswordResetLinkRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthPasswordResetLink'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>,
    { data: PasswordResetLinkRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthPasswordResetLink(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthPasswordResetLinkMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>
>;
export type PostApiV1AuthPasswordResetLinkMutationBody =
  PasswordResetLinkRequest;
export type PostApiV1AuthPasswordResetLinkMutationError = NotFoundResponse;

/**
 * @summary 비밀번호 재설정 링크 발송
 */
export const usePostApiV1AuthPasswordResetLink = <
  TError = NotFoundResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>,
      TError,
      { data: PasswordResetLinkRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthPasswordResetLink>>,
  TError,
  { data: PasswordResetLinkRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthPasswordResetLinkMutationOptions(options),
    queryClient,
  );
};
/**
 * 닉네임과 전화번호를 수정한다.
 * @summary 프로필 수정
 */
export type patchApiV1UsersMeProfileResponse200 = {
  data: ApiResponseProfileUpdated;
  status: 200;
};

export type patchApiV1UsersMeProfileResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1UsersMeProfileResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type patchApiV1UsersMeProfileResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type patchApiV1UsersMeProfileResponseSuccess =
  patchApiV1UsersMeProfileResponse200 & {
    headers: Headers;
  };
export type patchApiV1UsersMeProfileResponseError = (
  | patchApiV1UsersMeProfileResponse400
  | patchApiV1UsersMeProfileResponse401
  | patchApiV1UsersMeProfileResponse409
) & {
  headers: Headers;
};

export type patchApiV1UsersMeProfileResponse =
  | patchApiV1UsersMeProfileResponseSuccess
  | patchApiV1UsersMeProfileResponseError;

export const getPatchApiV1UsersMeProfileUrl = () => {
  return `/api/v1/users/me/profile`;
};

export const patchApiV1UsersMeProfile = async (
  profileUpdateRequest: ProfileUpdateRequest,
  options?: RequestInit,
): Promise<patchApiV1UsersMeProfileResponse> => {
  return customFetch<patchApiV1UsersMeProfileResponse>(
    getPatchApiV1UsersMeProfileUrl(),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(profileUpdateRequest),
    },
  );
};

export const getPatchApiV1UsersMeProfileMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>,
    TError,
    { data: ProfileUpdateRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>,
  TError,
  { data: ProfileUpdateRequest },
  TContext
> => {
  const mutationKey = ['patchApiV1UsersMeProfile'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>,
    { data: ProfileUpdateRequest }
  > = (props) => {
    const { data } = props ?? {};

    return patchApiV1UsersMeProfile(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiV1UsersMeProfileMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>
>;
export type PatchApiV1UsersMeProfileMutationBody = ProfileUpdateRequest;
export type PatchApiV1UsersMeProfileMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ConflictResponse;

/**
 * @summary 프로필 수정
 */
export const usePatchApiV1UsersMeProfile = <
  TError = BadRequestResponse | UnauthorizedResponse | ConflictResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>,
      TError,
      { data: ProfileUpdateRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchApiV1UsersMeProfile>>,
  TError,
  { data: ProfileUpdateRequest },
  TContext
> => {
  return useMutation(
    getPatchApiV1UsersMeProfileMutationOptions(options),
    queryClient,
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

export const getPostApiV1UsersMePhoneVerificationCodesMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>,
    TError,
    { data: PhoneVerificationCodeSendRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>,
  TError,
  { data: PhoneVerificationCodeSendRequest },
  TContext
> => {
  const mutationKey = ['postApiV1UsersMePhoneVerificationCodes'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>,
    { data: PhoneVerificationCodeSendRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1UsersMePhoneVerificationCodes(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1UsersMePhoneVerificationCodesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>
>;
export type PostApiV1UsersMePhoneVerificationCodesMutationBody =
  PhoneVerificationCodeSendRequest;
export type PostApiV1UsersMePhoneVerificationCodesMutationError =
  | BadRequestResponse
  | UnauthorizedResponse;

/**
 * @summary 전화번호 변경 인증코드 발송
 */
export const usePostApiV1UsersMePhoneVerificationCodes = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>,
      TError,
      { data: PhoneVerificationCodeSendRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodes>>,
  TError,
  { data: PhoneVerificationCodeSendRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1UsersMePhoneVerificationCodesMutationOptions(options),
    queryClient,
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

export const getPostApiV1UsersMePhoneVerificationCodesVerifyMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>,
    TError,
    { data: PhoneVerificationCodeVerifyRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>,
  TError,
  { data: PhoneVerificationCodeVerifyRequest },
  TContext
> => {
  const mutationKey = ['postApiV1UsersMePhoneVerificationCodesVerify'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>,
    { data: PhoneVerificationCodeVerifyRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1UsersMePhoneVerificationCodesVerify(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1UsersMePhoneVerificationCodesVerifyMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>
  >;
export type PostApiV1UsersMePhoneVerificationCodesVerifyMutationBody =
  PhoneVerificationCodeVerifyRequest;
export type PostApiV1UsersMePhoneVerificationCodesVerifyMutationError =
  | BadRequestResponse
  | UnauthorizedResponse;

/**
 * @summary 전화번호 변경 인증코드 확인
 */
export const usePostApiV1UsersMePhoneVerificationCodesVerify = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>,
      TError,
      { data: PhoneVerificationCodeVerifyRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1UsersMePhoneVerificationCodesVerify>>,
  TError,
  { data: PhoneVerificationCodeVerifyRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1UsersMePhoneVerificationCodesVerifyMutationOptions(options),
    queryClient,
  );
};
/**
 * 현재 비밀번호를 확인하고 새 비밀번호로 변경한다. 변경 완료 시 세션을 무효화한다.
 * @summary 비밀번호 변경 (이메일 가입자 전용)
 */
export type postApiV1AuthPasswordChangeResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1AuthPasswordChangeResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AuthPasswordChangeResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1AuthPasswordChangeResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1AuthPasswordChangeResponseSuccess =
  postApiV1AuthPasswordChangeResponse200 & {
    headers: Headers;
  };
export type postApiV1AuthPasswordChangeResponseError = (
  | postApiV1AuthPasswordChangeResponse400
  | postApiV1AuthPasswordChangeResponse401
  | postApiV1AuthPasswordChangeResponse403
) & {
  headers: Headers;
};

export type postApiV1AuthPasswordChangeResponse =
  | postApiV1AuthPasswordChangeResponseSuccess
  | postApiV1AuthPasswordChangeResponseError;

export const getPostApiV1AuthPasswordChangeUrl = () => {
  return `/api/v1/auth/password/change`;
};

export const postApiV1AuthPasswordChange = async (
  passwordChangeRequest: PasswordChangeRequest,
  options?: RequestInit,
): Promise<postApiV1AuthPasswordChangeResponse> => {
  return customFetch<postApiV1AuthPasswordChangeResponse>(
    getPostApiV1AuthPasswordChangeUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(passwordChangeRequest),
    },
  );
};

export const getPostApiV1AuthPasswordChangeMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>,
    TError,
    { data: PasswordChangeRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>,
  TError,
  { data: PasswordChangeRequest },
  TContext
> => {
  const mutationKey = ['postApiV1AuthPasswordChange'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>,
    { data: PasswordChangeRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1AuthPasswordChange(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1AuthPasswordChangeMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>
>;
export type PostApiV1AuthPasswordChangeMutationBody = PasswordChangeRequest;
export type PostApiV1AuthPasswordChangeMutationError =
  | BadRequestResponse
  | UnauthorizedResponse
  | ForbiddenResponse;

/**
 * @summary 비밀번호 변경 (이메일 가입자 전용)
 */
export const usePostApiV1AuthPasswordChange = <
  TError = BadRequestResponse | UnauthorizedResponse | ForbiddenResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>,
      TError,
      { data: PasswordChangeRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1AuthPasswordChange>>,
  TError,
  { data: PasswordChangeRequest },
  TContext
> => {
  return useMutation(
    getPostApiV1AuthPasswordChangeMutationOptions(options),
    queryClient,
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

export const getGetApiV1UsersMeRegionsQueryKey = () => {
  return [`/api/v1/users/me/regions`] as const;
};

export const getGetApiV1UsersMeRegionsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
  TError = UnauthorizedResponse,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1UsersMeRegionsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1UsersMeRegions>>
  > = ({ signal }) => getApiV1UsersMeRegions({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiV1UsersMeRegionsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1UsersMeRegions>>
>;
export type GetApiV1UsersMeRegionsQueryError = UnauthorizedResponse;

export function useGetApiV1UsersMeRegions<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
  TError = UnauthorizedResponse,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeRegions>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeRegions<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
          TError,
          Awaited<ReturnType<typeof getApiV1UsersMeRegions>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiV1UsersMeRegions<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary 내 관심 지역 조회
 */

export function useGetApiV1UsersMeRegions<
  TData = Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
  TError = UnauthorizedResponse,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1UsersMeRegions>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiV1UsersMeRegionsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}

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

export const getPutApiV1UsersMeRegionsMutationOptions = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiV1UsersMeRegions>>,
    TError,
    { data: UpdateRegionsRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putApiV1UsersMeRegions>>,
  TError,
  { data: UpdateRegionsRequest },
  TContext
> => {
  const mutationKey = ['putApiV1UsersMeRegions'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putApiV1UsersMeRegions>>,
    { data: UpdateRegionsRequest }
  > = (props) => {
    const { data } = props ?? {};

    return putApiV1UsersMeRegions(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutApiV1UsersMeRegionsMutationResult = NonNullable<
  Awaited<ReturnType<typeof putApiV1UsersMeRegions>>
>;
export type PutApiV1UsersMeRegionsMutationBody = UpdateRegionsRequest;
export type PutApiV1UsersMeRegionsMutationError =
  | BadRequestResponse
  | UnauthorizedResponse;

/**
 * @summary 관심 지역 저장/수정 (전체 교체)
 */
export const usePutApiV1UsersMeRegions = <
  TError = BadRequestResponse | UnauthorizedResponse,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof putApiV1UsersMeRegions>>,
      TError,
      { data: UpdateRegionsRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof putApiV1UsersMeRegions>>,
  TError,
  { data: UpdateRegionsRequest },
  TContext
> => {
  return useMutation(
    getPutApiV1UsersMeRegionsMutationOptions(options),
    queryClient,
  );
};
