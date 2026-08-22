/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 이메일과 비밀번호를 검증하고 ADMIN 권한 보유 사용자만 로그인 처리한다.
 * @summary 관리자 이메일 로그인
 */
export const PostApiV1AuthAdminEmailLoginBody = zod.object({
  email: zod.email(),
  password: zod.string(),
});

export const PostApiV1AuthAdminEmailLoginResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    accessToken: zod.string(),
    tokenType: zod.string(),
    expiresIn: zod.number().describe('Access Token 만료 시간(초)'),
    isNewUser: zod.boolean().describe('최초 가입 여부'),
    user: zod.object({
      id: zod.number(),
      provider: zod.enum(['KAKAO', 'EMAIL']),
      providerId: zod
        .string()
        .nullish()
        .describe('소셜 제공자 아이디 (카카오 고유 ID 등)'),
      email: zod.email().nullish(),
      nickname: zod.string().nullish(),
      phoneNumber: zod.string().nullish(),
      role: zod.enum(['BUYER', 'SELLER', 'ADMIN']),
      lastRole: zod.enum(['BUYER', 'SELLER', 'ADMIN']).nullish(),
      hasBuyerRole: zod
        .boolean()
        .optional()
        .describe('BUYER 역할 assignment 보유 여부'),
      hasSellerRole: zod
        .boolean()
        .optional()
        .describe('SELLER 역할 assignment 보유 여부'),
      canSwitchToBuyer: zod
        .boolean()
        .optional()
        .describe(
          'BUYER 역할 assignment를 보유했고 현재 역할이 BUYER가 아닐 때 true',
        ),
      canSwitchToSeller: zod
        .boolean()
        .optional()
        .describe(
          'SELLER 역할 assignment를 보유했고 현재 역할이 SELLER가 아닐 때 true',
        ),
      signupCompleted: zod.boolean(),
      sellerSignupCompleted: zod.boolean(),
      deletedAt: zod.iso
        .datetime({ offset: true })
        .nullish()
        .describe("UTC 기준 삭제 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`"),
      createdAt: zod.iso
        .datetime({ offset: true })
        .describe("UTC 기준 생성 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`"),
      updatedAt: zod.iso
        .datetime({ offset: true })
        .describe("UTC 기준 수정 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`"),
    }),
  }),
  error: zod.unknown().nullable(),
});
