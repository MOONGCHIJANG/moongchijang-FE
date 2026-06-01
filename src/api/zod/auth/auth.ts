/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 카카오 인가 코드로 로그인하거나 최초 가입 처리한다.
카카오 닉네임은 선저장 단계에서 2~10자/한글·영문·숫자 조건을 만족할 때만 저장되며, 조건 미충족 시 null로 저장된다.

 * @summary 카카오 로그인 / 회원가입
 */
export const PostApiV1AuthKakaoBody = zod.object({
  authorizationCode: zod.string().describe('카카오 인가 코드'),
  redirectUri: zod
    .string()
    .nullish()
    .describe('카카오 인가 요청 시 사용한 redirect URI (서버 검증용)'),
});

export const PostApiV1AuthKakaoResponse = zod.object({
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
      deletedAt: zod.iso.datetime({ offset: true }).nullish(),
      createdAt: zod.iso.datetime({ offset: true }),
      updatedAt: zod.iso.datetime({ offset: true }),
    }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * HttpOnly 쿠키의 refreshToken을 검증해 Access Token을 재발급한다.
 * @summary Access Token 갱신
 */
export const PostApiV1AuthRefreshResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    accessToken: zod.string(),
    tokenType: zod.string(),
    expiresIn: zod.number().describe('Access Token 만료 시간(초)'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * Refresh Token을 무효화한다.
 * @summary 로그아웃
 */
export const PostApiV1AuthLogoutResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 정보 조회
 */
export const GetApiV1UsersMeResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
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
    deletedAt: zod.iso.datetime({ offset: true }).nullish(),
    createdAt: zod.iso.datetime({ offset: true }),
    updatedAt: zod.iso.datetime({ offset: true }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 소비자/사장님 모드를 전환한다.
 * @summary 마이페이지 역할 전환
 */
export const PatchApiV1UsersMeRoleBody = zod.object({
  role: zod.enum(['BUYER', 'SELLER']).describe('전환할 역할'),
});

export const PatchApiV1UsersMeRoleResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
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
    deletedAt: zod.iso.datetime({ offset: true }).nullish(),
    createdAt: zod.iso.datetime({ offset: true }),
    updatedAt: zod.iso.datetime({ offset: true }),
  }),
  error: zod.unknown().nullable(),
});

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
export const deleteApiV1UsersMeRoleBodyReasonDetailMax = 500;

export const DeleteApiV1UsersMeRoleBody = zod.object({
  reason: zod
    .enum([
      'NO_DESIRED_GROUPBUY',
      'INCONVENIENT_SERVICE',
      'PRIVACY_CONCERN',
      'OTHER',
    ])
    .nullish()
    .describe('탈퇴 사유(선택)'),
  reasonDetail: zod
    .string()
    .max(deleteApiV1UsersMeRoleBodyReasonDetailMax)
    .nullish()
    .describe('탈퇴 상세 사유 (reason=OTHER 일 때 입력)'),
});

export const DeleteApiV1UsersMeRoleResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * 소비자/사장님 탈퇴 가능 상태와 권장 탈퇴 화면 정보를 조회한다.
이 응답은 진입/라우팅 가이드 용도이며, 실제 탈퇴 실행 시점에는 최종 검증이 다시 수행된다.

 * @summary 탈퇴 진입 컨텍스트 조회
 */
export const GetApiV1UsersMeWithdrawalContextResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    currentRole: zod
      .enum(['BUYER', 'SELLER', 'ADMIN'])
      .describe('현재 사용자 활성 역할'),
    buyer: zod.object({
      canProceed: zod.boolean().describe('소비자 탈퇴 진행 가능 여부'),
      hasPendingPickup: zod.boolean().describe('수령 예정 공구 존재 여부'),
      hasActiveParticipation: zod
        .boolean()
        .describe('참여 중 공구(PAID_WAITING_GOAL) 존재 여부'),
      blockingReason: zod
        .enum(['NONE', 'PENDING_PICKUP'])
        .describe('소비자 탈퇴 차단 사유'),
    }),
    seller: zod.object({
      canProceed: zod.boolean().describe('사장님 탈퇴 진행 가능 여부'),
      hasOpenGroupBuy: zod.boolean().describe('개설된 진행중 공구 존재 여부'),
      hasPendingCustomerPickup: zod
        .boolean()
        .describe('달성\/완료 공구 고객 미픽업 존재 여부'),
      blockingReason: zod
        .enum(['NONE', 'OPEN_GROUPBUY', 'PENDING_CUSTOMER_PICKUP'])
        .describe('사장님 탈퇴 차단 사유'),
    }),
    recommendedScreen: zod
      .enum(['BUYER_WITHDRAWAL', 'SELLER_WITHDRAWAL'])
      .describe('탈퇴 화면 타입'),
    forceRedirect: zod
      .boolean()
      .describe('현재 역할 화면에서 강제 이동 필요 여부'),
    forceRedirectTarget: zod
      .enum(['BUYER_WITHDRAWAL', 'SELLER_WITHDRAWAL'])
      .describe('탈퇴 화면 타입')
      .nullish()
      .describe('강제 이동 대상 화면 타입(forceRedirect=true일 때만 존재)'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 추가정보 입력(0.5) 단계에서 닉네임 사용 가능 여부를 확인한다.
인증 사용자가 호출한 경우 본인 현재 닉네임은 중복으로 보지 않는다.

 * @summary 닉네임 중복 확인
 */
export const getApiV1UsersNicknameAvailabilityQueryNicknameMin = 2;
export const getApiV1UsersNicknameAvailabilityQueryNicknameMax = 10;

export const getApiV1UsersNicknameAvailabilityQueryNicknameRegExp = new RegExp(
  '^[A-Za-z0-9가-힣]{2,10}$',
);

export const GetApiV1UsersNicknameAvailabilityQueryParams = zod.object({
  nickname: zod
    .string()
    .min(getApiV1UsersNicknameAvailabilityQueryNicknameMin)
    .max(getApiV1UsersNicknameAvailabilityQueryNicknameMax)
    .regex(getApiV1UsersNicknameAvailabilityQueryNicknameRegExp)
    .describe('2~10자, 한글\/영문\/숫자만 허용'),
});

export const GetApiV1UsersNicknameAvailabilityResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    nickname: zod.string(),
    available: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 신규 가입 공통(카카오/이메일) 추가 정보 입력을 저장한다.
닉네임은 최종 저장 시점에 중복 검증되며, 본인 현재 닉네임과 동일한 값은 허용된다.
성공 시 nickname, phoneNumber, signupCompleted가 반영된다.

 * @summary 추가 정보 입력 완료
 */
export const patchApiV1UsersMeAdditionalInfoBodyNicknameMin = 2;
export const patchApiV1UsersMeAdditionalInfoBodyNicknameMax = 10;

export const patchApiV1UsersMeAdditionalInfoBodyNicknameRegExp = new RegExp(
  '^[A-Za-z0-9가-힣]{2,10}$',
);
export const patchApiV1UsersMeAdditionalInfoBodyPhoneNumberRegExp = new RegExp(
  '^01[0-9]-[0-9]{3,4}-[0-9]{4}$',
);

export const PatchApiV1UsersMeAdditionalInfoBody = zod.object({
  nickname: zod
    .string()
    .min(patchApiV1UsersMeAdditionalInfoBodyNicknameMin)
    .max(patchApiV1UsersMeAdditionalInfoBodyNicknameMax)
    .regex(patchApiV1UsersMeAdditionalInfoBodyNicknameRegExp)
    .describe('2~10자, 한글\/영문\/숫자만 허용'),
  phoneNumber: zod
    .string()
    .regex(patchApiV1UsersMeAdditionalInfoBodyPhoneNumberRegExp)
    .describe('하이픈 포함 휴대폰 번호 (01X-XXXX-XXXX)'),
});

export const PatchApiV1UsersMeAdditionalInfoResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    nickname: zod.string(),
    phoneNumber: zod.string(),
    signupCompleted: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사업자등록번호를 조회해 상태를 반환한다.
- `VALID`: 정상 사업자(계속사업자)
- `CLOSED`: 휴업/폐업
- `NOT_FOUND`: 조회 불가/미확인

 * @summary 사업자등록번호 조회
 */
export const postApiV1UsersMeSellerBusinessRegistrationLookupBodyBusinessRegistrationNumberRegExp =
  new RegExp('^\\d{3}-?\\d{2}-?\\d{5}$');

export const PostApiV1UsersMeSellerBusinessRegistrationLookupBody = zod.object({
  businessRegistrationNumber: zod
    .string()
    .regex(
      postApiV1UsersMeSellerBusinessRegistrationLookupBodyBusinessRegistrationNumberRegExp,
    )
    .describe('사업자등록번호(하이픈 포함\/미포함 모두 허용)'),
});

export const PostApiV1UsersMeSellerBusinessRegistrationLookupResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.object({
      businessRegistrationNumber: zod.string(),
      status: zod.enum(['VALID', 'CLOSED', 'NOT_FOUND']),
      message: zod.string().nullish(),
      storeName: zod.string().nullish(),
      ownerName: zod.string().nullish(),
      storeAddress: zod.string().nullish(),
    }),
    error: zod.unknown().nullable(),
  });

/**
 * 사장님 가입의 사업자 정보를 저장한다.
 * @summary 사장님 사업자 정보 저장
 */
export const patchApiV1UsersMeSellerBusinessInfoBodyBusinessRegistrationNumberRegExp =
  new RegExp('^\\d{3}-?\\d{2}-?\\d{5}$');
export const patchApiV1UsersMeSellerBusinessInfoBodyStoreNameMax = 100;

export const patchApiV1UsersMeSellerBusinessInfoBodyOwnerNameMax = 50;

export const patchApiV1UsersMeSellerBusinessInfoBodyStoreAddressMax = 255;

export const patchApiV1UsersMeSellerBusinessInfoBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');

export const PatchApiV1UsersMeSellerBusinessInfoBody = zod.object({
  businessRegistrationNumber: zod
    .string()
    .regex(
      patchApiV1UsersMeSellerBusinessInfoBodyBusinessRegistrationNumberRegExp,
    ),
  storeName: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessInfoBodyStoreNameMax),
  ownerName: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessInfoBodyOwnerNameMax),
  storeAddress: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessInfoBodyStoreAddressMax),
  phoneNumber: zod
    .string()
    .regex(patchApiV1UsersMeSellerBusinessInfoBodyPhoneNumberRegExp),
});

export const PatchApiV1UsersMeSellerBusinessInfoResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    sellerSignupCompleted: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님 정산 정보를 저장하고 사장님 가입 완료 상태를 반영한다.
 * @summary 사장님 정산 정보 저장
 */
export const patchApiV1UsersMeSellerSettlementInfoBodyAccountNumberMax = 50;

export const patchApiV1UsersMeSellerSettlementInfoBodyAccountHolderNameMax = 50;

export const PatchApiV1UsersMeSellerSettlementInfoBody = zod.object({
  bankCode: zod
    .enum([
      'NONGHYEOP',
      'KAKAOBANK',
      'KOOKMIN',
      'TOSSBANK',
      'SHINHAN',
      'WOORI',
      'IBK',
      'HANA',
      'SAEMAUL',
      'BUSANBANK',
      'DAEGUBANK',
      'KBANK',
      'SHINHYEOP',
      'POST',
      'SC',
      'KYONGNAMBANK',
      'GWANGJUBANK',
      'SUHYEOP',
      'JEONBUKBANK',
      'SAVINGBANK',
      'JEJUBANK',
      'CITI',
      'KDBBANK',
      'SANLIM',
      'BOA',
      'HSBC',
      'SAMSUNG_SECURITIES',
      'KB_SECURITIES',
      'NH_INVESTMENT_AND_SECURITIES',
      'YUANTA_SECURITES',
      'DAISHIN_SECURITIES',
      'HANA_INVESTMENT_AND_SECURITIES',
      'HANHWA_INVESTMENT_AND_SECURITIES',
      'EUGENE_INVESTMENT_AND_SECURITIES',
      'HI_INVESTMENT_AND_SECURITIES',
      'KYOBO_SECURITIES',
      'MERITZ_SECURITIES',
      'SK_SECURITIES',
      'LIG_INVESTMENT_AND_SECURITIES',
      'HYUNDAI_MOTOR_SECURITIES',
      'DB_INVESTMENT_AND_SECURITIES',
      'SHINYOUNG_SECURITIES',
      'DAOL_INVESTMENT_AND_SECURITIES',
      'BOOKOOK_SECURITIES',
      'TOSS_SECURITIES',
      'KAKAOPAY_SECURITIES',
      'MIRAE_ASSET_SECURITIES',
      'KIWOOM',
      'KOREA_INVESTMENT_AND_SECURITIES',
      'SHINHAN_SECURITIES',
      'IBK_INVESTMENT_SECURITIES',
      'WOORI_SECURITIES',
      'CAPE_INVESTMENT_SECURITIES',
      'BNK_INVESTMENT_SECURITIES',
      'SANGSANGIN_SECURITIES',
      'ICBC',
      'DEUTSCHE_BANK',
      'JPMORGAN_CHASE',
      'BNP_PARIBAS',
      'CCB',
      'BOC',
    ])
    .describe(
      '은행\/증권사 선택값(라벨 또는 코드).\n- 서버 저장 시 표준 코드로 정규화된다.\n- 아래 enum은 저장되는 표준 코드 목록이다.\n- BANK codes:\n  NONGHYEOP, KAKAOBANK, KOOKMIN, TOSSBANK, SHINHAN, WOORI, IBK, HANA, SAEMAUL, BUSANBANK,\n  DAEGUBANK, KBANK, SHINHYEOP, POST, SC, KYONGNAMBANK, GWANGJUBANK, SUHYEOP, JEONBUKBANK,\n  SAVINGBANK, JEJUBANK, CITI, KDBBANK, SANLIM, BOA, HSBC, ICBC, DEUTSCHE_BANK, JPMORGAN_CHASE,\n  BNP_PARIBAS, CCB, BOC\n- SECURITIES codes:\n  SAMSUNG_SECURITIES, KB_SECURITIES, NH_INVESTMENT_AND_SECURITIES, YUANTA_SECURITES, DAISHIN_SECURITIES,\n  HANA_INVESTMENT_AND_SECURITIES, HANHWA_INVESTMENT_AND_SECURITIES, EUGENE_INVESTMENT_AND_SECURITIES,\n  HI_INVESTMENT_AND_SECURITIES, KYOBO_SECURITIES, MERITZ_SECURITIES, SK_SECURITIES,\n  LIG_INVESTMENT_AND_SECURITIES, HYUNDAI_MOTOR_SECURITIES, DB_INVESTMENT_AND_SECURITIES,\n  SHINYOUNG_SECURITIES, DAOL_INVESTMENT_AND_SECURITIES, BOOKOOK_SECURITIES, TOSS_SECURITIES,\n  KAKAOPAY_SECURITIES, MIRAE_ASSET_SECURITIES, KIWOOM, KOREA_INVESTMENT_AND_SECURITIES,\n  SHINHAN_SECURITIES, IBK_INVESTMENT_SECURITIES, WOORI_SECURITIES, CAPE_INVESTMENT_SECURITIES,\n  BNK_INVESTMENT_SECURITIES, SANGSANGIN_SECURITIES\n',
    ),
  accountNumber: zod
    .string()
    .max(patchApiV1UsersMeSellerSettlementInfoBodyAccountNumberMax),
  accountHolderName: zod
    .string()
    .max(patchApiV1UsersMeSellerSettlementInfoBodyAccountHolderNameMax),
});

export const PatchApiV1UsersMeSellerSettlementInfoResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    sellerSignupCompleted: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님의 현재 입금 계좌 정보를 조회한다.
 * @summary 사장님 입금 계좌 조회
 */
export const GetApiV1UsersMeSellerSettlementAccountResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    bankCode: zod.string(),
    accountNumber: zod.string(),
    accountHolderName: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님의 입금 계좌 정보를 변경한다.
 * @summary 사장님 입금 계좌 변경
 */
export const patchApiV1UsersMeSellerSettlementAccountBodyAccountNumberMax = 50;

export const patchApiV1UsersMeSellerSettlementAccountBodyAccountHolderNameMax = 50;

export const PatchApiV1UsersMeSellerSettlementAccountBody = zod.object({
  bankCode: zod
    .enum([
      'NONGHYEOP',
      'KAKAOBANK',
      'KOOKMIN',
      'TOSSBANK',
      'SHINHAN',
      'WOORI',
      'IBK',
      'HANA',
      'SAEMAUL',
      'BUSANBANK',
      'DAEGUBANK',
      'KBANK',
      'SHINHYEOP',
      'POST',
      'SC',
      'KYONGNAMBANK',
      'GWANGJUBANK',
      'SUHYEOP',
      'JEONBUKBANK',
      'SAVINGBANK',
      'JEJUBANK',
      'CITI',
      'KDBBANK',
      'SANLIM',
      'BOA',
      'HSBC',
      'SAMSUNG_SECURITIES',
      'KB_SECURITIES',
      'NH_INVESTMENT_AND_SECURITIES',
      'YUANTA_SECURITES',
      'DAISHIN_SECURITIES',
      'HANA_INVESTMENT_AND_SECURITIES',
      'HANHWA_INVESTMENT_AND_SECURITIES',
      'EUGENE_INVESTMENT_AND_SECURITIES',
      'HI_INVESTMENT_AND_SECURITIES',
      'KYOBO_SECURITIES',
      'MERITZ_SECURITIES',
      'SK_SECURITIES',
      'LIG_INVESTMENT_AND_SECURITIES',
      'HYUNDAI_MOTOR_SECURITIES',
      'DB_INVESTMENT_AND_SECURITIES',
      'SHINYOUNG_SECURITIES',
      'DAOL_INVESTMENT_AND_SECURITIES',
      'BOOKOOK_SECURITIES',
      'TOSS_SECURITIES',
      'KAKAOPAY_SECURITIES',
      'MIRAE_ASSET_SECURITIES',
      'KIWOOM',
      'KOREA_INVESTMENT_AND_SECURITIES',
      'SHINHAN_SECURITIES',
      'IBK_INVESTMENT_SECURITIES',
      'WOORI_SECURITIES',
      'CAPE_INVESTMENT_SECURITIES',
      'BNK_INVESTMENT_SECURITIES',
      'SANGSANGIN_SECURITIES',
      'ICBC',
      'DEUTSCHE_BANK',
      'JPMORGAN_CHASE',
      'BNP_PARIBAS',
      'CCB',
      'BOC',
    ])
    .describe(
      '은행\/증권사 선택값(라벨 또는 코드).\n- 서버 저장 시 표준 코드로 정규화된다.\n- 아래 enum은 저장되는 표준 코드 목록이다.\n- BANK codes:\n  NONGHYEOP, KAKAOBANK, KOOKMIN, TOSSBANK, SHINHAN, WOORI, IBK, HANA, SAEMAUL, BUSANBANK,\n  DAEGUBANK, KBANK, SHINHYEOP, POST, SC, KYONGNAMBANK, GWANGJUBANK, SUHYEOP, JEONBUKBANK,\n  SAVINGBANK, JEJUBANK, CITI, KDBBANK, SANLIM, BOA, HSBC, ICBC, DEUTSCHE_BANK, JPMORGAN_CHASE,\n  BNP_PARIBAS, CCB, BOC\n- SECURITIES codes:\n  SAMSUNG_SECURITIES, KB_SECURITIES, NH_INVESTMENT_AND_SECURITIES, YUANTA_SECURITES, DAISHIN_SECURITIES,\n  HANA_INVESTMENT_AND_SECURITIES, HANHWA_INVESTMENT_AND_SECURITIES, EUGENE_INVESTMENT_AND_SECURITIES,\n  HI_INVESTMENT_AND_SECURITIES, KYOBO_SECURITIES, MERITZ_SECURITIES, SK_SECURITIES,\n  LIG_INVESTMENT_AND_SECURITIES, HYUNDAI_MOTOR_SECURITIES, DB_INVESTMENT_AND_SECURITIES,\n  SHINYOUNG_SECURITIES, DAOL_INVESTMENT_AND_SECURITIES, BOOKOOK_SECURITIES, TOSS_SECURITIES,\n  KAKAOPAY_SECURITIES, MIRAE_ASSET_SECURITIES, KIWOOM, KOREA_INVESTMENT_AND_SECURITIES,\n  SHINHAN_SECURITIES, IBK_INVESTMENT_SECURITIES, WOORI_SECURITIES, CAPE_INVESTMENT_SECURITIES,\n  BNK_INVESTMENT_SECURITIES, SANGSANGIN_SECURITIES\n',
    ),
  accountNumber: zod
    .string()
    .max(patchApiV1UsersMeSellerSettlementAccountBodyAccountNumberMax),
  accountHolderName: zod
    .string()
    .max(patchApiV1UsersMeSellerSettlementAccountBodyAccountHolderNameMax),
});

export const PatchApiV1UsersMeSellerSettlementAccountResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    bankCode: zod.string(),
    accountNumber: zod.string(),
    accountHolderName: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님의 현재 사업자 정보를 조회한다.
 * @summary 사장님 사업자 정보 조회
 */
export const GetApiV1UsersMeSellerBusinessProfileResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    businessRegistrationNumber: zod.string(),
    storeName: zod.string(),
    ownerName: zod.string(),
    storeAddress: zod.string(),
    phoneNumber: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님의 사업자 정보를 변경한다.
 * @summary 사장님 사업자 정보 변경
 */
export const patchApiV1UsersMeSellerBusinessProfileBodyBusinessRegistrationNumberRegExp =
  new RegExp('^\\d{3}-?\\d{2}-?\\d{5}$');
export const patchApiV1UsersMeSellerBusinessProfileBodyStoreNameMax = 100;

export const patchApiV1UsersMeSellerBusinessProfileBodyOwnerNameMax = 50;

export const patchApiV1UsersMeSellerBusinessProfileBodyStoreAddressMax = 255;

export const patchApiV1UsersMeSellerBusinessProfileBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');

export const PatchApiV1UsersMeSellerBusinessProfileBody = zod.object({
  businessRegistrationNumber: zod
    .string()
    .regex(
      patchApiV1UsersMeSellerBusinessProfileBodyBusinessRegistrationNumberRegExp,
    ),
  storeName: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessProfileBodyStoreNameMax),
  ownerName: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessProfileBodyOwnerNameMax),
  storeAddress: zod
    .string()
    .max(patchApiV1UsersMeSellerBusinessProfileBodyStoreAddressMax),
  phoneNumber: zod
    .string()
    .regex(patchApiV1UsersMeSellerBusinessProfileBodyPhoneNumberRegExp),
});

export const PatchApiV1UsersMeSellerBusinessProfileResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    businessRegistrationNumber: zod.string(),
    storeName: zod.string(),
    ownerName: zod.string(),
    storeAddress: zod.string(),
    phoneNumber: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

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
export const deleteApiV1UsersMeSellerBodyReasonDetailMax = 500;

export const DeleteApiV1UsersMeSellerBody = zod.object({
  reason: zod
    .enum([
      'INCONVENIENT_SERVICE',
      'NO_LONGER_NEEDED',
      'PRIVACY_CONCERN',
      'OTHER',
    ])
    .nullish()
    .describe('사장님 탈퇴 사유(선택)'),
  reasonDetail: zod
    .string()
    .max(deleteApiV1UsersMeSellerBodyReasonDetailMax)
    .nullish()
    .describe('사장님 탈퇴 상세 사유 (reason=OTHER 일 때 입력)'),
});

export const DeleteApiV1UsersMeSellerResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * 이메일 회원가입 전 가입 가능 이메일인지 확인한다.
 * @summary 이메일 중복 확인
 */
export const GetApiV1AuthEmailAvailabilityQueryParams = zod.object({
  email: zod.email(),
});

export const GetApiV1AuthEmailAvailabilityResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    email: zod.email(),
    available: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 6자리 숫자 인증코드를 이메일로 발송한다. (유효시간 3분, 재발송 60초 쿨다운, 1일 5회 제한)
 * @summary 이메일 인증코드 발송
 */
export const PostApiV1AuthEmailVerificationCodesBody = zod.object({
  email: zod.email(),
});

export const PostApiV1AuthEmailVerificationCodesResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    expiresInSeconds: zod.number(),
    resendAvailableInSeconds: zod.number(),
    remainingDailyAttempts: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증코드가 일치하면 이메일 인증 완료 상태로 처리한다.
 * @summary 이메일 인증코드 확인
 */
export const postApiV1AuthEmailVerificationCodesVerifyBodyCodeRegExp =
  new RegExp('^[0-9]{6}$');

export const PostApiV1AuthEmailVerificationCodesVerifyBody = zod.object({
  email: zod.email(),
  code: zod
    .string()
    .regex(postApiV1AuthEmailVerificationCodesVerifyBodyCodeRegExp),
});

export const PostApiV1AuthEmailVerificationCodesVerifyResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    verified: zod.boolean(),
    signupToken: zod.string().describe('이메일 회원가입 단계 진행용 임시 토큰'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 6자리 숫자 인증코드를 전화번호로 발송한다.
 * @summary 전화번호 인증코드 발송
 */
export const postApiV1AuthPhoneVerificationCodesBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');

export const PostApiV1AuthPhoneVerificationCodesBody = zod.object({
  phoneNumber: zod
    .string()
    .regex(postApiV1AuthPhoneVerificationCodesBodyPhoneNumberRegExp),
});

export const PostApiV1AuthPhoneVerificationCodesResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    expiresInSeconds: zod.number(),
    resendAvailableInSeconds: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증코드가 일치하면 전화번호 인증 완료 상태로 처리한다.
 * @summary 전화번호 인증코드 확인
 */
export const postApiV1AuthPhoneVerificationCodesVerifyBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');
export const postApiV1AuthPhoneVerificationCodesVerifyBodyCodeRegExp =
  new RegExp('^[0-9]{6}$');

export const PostApiV1AuthPhoneVerificationCodesVerifyBody = zod.object({
  phoneNumber: zod
    .string()
    .regex(postApiV1AuthPhoneVerificationCodesVerifyBodyPhoneNumberRegExp),
  code: zod
    .string()
    .regex(postApiV1AuthPhoneVerificationCodesVerifyBodyCodeRegExp),
});

export const PostApiV1AuthPhoneVerificationCodesVerifyResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    verified: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 이메일 인증 완료 후 비밀번호를 설정해 계정을 생성하고 로그인 처리한다.
 * @summary 이메일 회원가입
 */
export const postApiV1AuthEmailSignupBodyPasswordMin = 8;
export const postApiV1AuthEmailSignupBodyPasswordMax = 20;

export const postApiV1AuthEmailSignupBodyPasswordRegExp = new RegExp(
  '^(?=.\*[A-Za-z])(?=.\*[0-9]).{8,20}$',
);

export const PostApiV1AuthEmailSignupBody = zod.object({
  email: zod.email(),
  password: zod
    .string()
    .min(postApiV1AuthEmailSignupBodyPasswordMin)
    .max(postApiV1AuthEmailSignupBodyPasswordMax)
    .regex(postApiV1AuthEmailSignupBodyPasswordRegExp)
    .describe('8~20자, 영문+숫자 포함'),
  signupToken: zod.string(),
});

export const PostApiV1AuthEmailSignupResponse = zod.object({
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
      deletedAt: zod.iso.datetime({ offset: true }).nullish(),
      createdAt: zod.iso.datetime({ offset: true }),
      updatedAt: zod.iso.datetime({ offset: true }),
    }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 이메일과 비밀번호를 검증하고 로그인 처리한다.
 * @summary 이메일 로그인
 */
export const PostApiV1AuthEmailLoginBody = zod.object({
  email: zod.email(),
  password: zod.string(),
});

export const PostApiV1AuthEmailLoginResponse = zod.object({
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
      deletedAt: zod.iso.datetime({ offset: true }).nullish(),
      createdAt: zod.iso.datetime({ offset: true }),
      updatedAt: zod.iso.datetime({ offset: true }),
    }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증된 사용자의 닉네임을 변경한다.
 * @summary 닉네임 변경
 */
export const patchApiV1UsersMeNicknameBodyNicknameMin = 2;
export const patchApiV1UsersMeNicknameBodyNicknameMax = 10;

export const patchApiV1UsersMeNicknameBodyNicknameRegExp = new RegExp(
  '^[A-Za-z0-9가-힣]{2,10}$',
);

export const PatchApiV1UsersMeNicknameBody = zod.object({
  nickname: zod
    .string()
    .min(patchApiV1UsersMeNicknameBodyNicknameMin)
    .max(patchApiV1UsersMeNicknameBodyNicknameMax)
    .regex(patchApiV1UsersMeNicknameBodyNicknameRegExp),
});

export const PatchApiV1UsersMeNicknameResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    nickname: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증된 사용자의 전화번호를 변경한다.
 * @summary 전화번호 변경
 */
export const patchApiV1UsersMePhoneNumberBodyPhoneNumberRegExp = new RegExp(
  '^01[0-9]-[0-9]{3,4}-[0-9]{4}$',
);

export const PatchApiV1UsersMePhoneNumberBody = zod.object({
  phoneNumber: zod
    .string()
    .regex(patchApiV1UsersMePhoneNumberBodyPhoneNumberRegExp),
});

export const PatchApiV1UsersMePhoneNumberResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    phoneNumber: zod.string(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 새 전화번호 검증을 위한 6자리 인증코드를 발송한다.
 * @summary 전화번호 변경 인증코드 발송
 */
export const postApiV1UsersMePhoneVerificationCodesBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');

export const PostApiV1UsersMePhoneVerificationCodesBody = zod.object({
  phoneNumber: zod
    .string()
    .regex(postApiV1UsersMePhoneVerificationCodesBodyPhoneNumberRegExp),
});

export const PostApiV1UsersMePhoneVerificationCodesResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    expiresInSeconds: zod.number(),
    resendAvailableInSeconds: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증코드 확인 후 전화번호 변경 가능 상태를 확정한다.
 * @summary 전화번호 변경 인증코드 확인
 */
export const postApiV1UsersMePhoneVerificationCodesVerifyBodyPhoneNumberRegExp =
  new RegExp('^01[0-9]-[0-9]{3,4}-[0-9]{4}$');
export const postApiV1UsersMePhoneVerificationCodesVerifyBodyCodeRegExp =
  new RegExp('^[0-9]{6}$');

export const PostApiV1UsersMePhoneVerificationCodesVerifyBody = zod.object({
  phoneNumber: zod
    .string()
    .regex(postApiV1UsersMePhoneVerificationCodesVerifyBodyPhoneNumberRegExp),
  code: zod
    .string()
    .regex(postApiV1UsersMePhoneVerificationCodesVerifyBodyCodeRegExp),
});

export const PostApiV1UsersMePhoneVerificationCodesVerifyResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    verified: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 현재 비밀번호를 확인하고 새 비밀번호로 변경한다. 변경 완료 시 세션을 무효화한다.
 * @summary 비밀번호 변경 (이메일 가입자 전용)
 */
export const patchApiV1UsersMePasswordBodyNewPasswordMin = 8;
export const patchApiV1UsersMePasswordBodyNewPasswordMax = 20;

export const patchApiV1UsersMePasswordBodyNewPasswordRegExp = new RegExp(
  '^(?=.\*[A-Za-z])(?=.\*[0-9]).{8,20}$',
);

export const PatchApiV1UsersMePasswordBody = zod.object({
  currentPassword: zod.string(),
  newPassword: zod
    .string()
    .min(patchApiV1UsersMePasswordBodyNewPasswordMin)
    .max(patchApiV1UsersMePasswordBodyNewPasswordMax)
    .regex(patchApiV1UsersMePasswordBodyNewPasswordRegExp)
    .describe('8~20자, 영문+숫자 포함, 이메일 아이디와 동일값 불가'),
});

export const PatchApiV1UsersMePasswordResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    changed: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 관심 지역 조회
 */
export const GetApiV1UsersMeRegionsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    regions: zod
      .array(zod.string())
      .describe('선택한 관심 지역 목록 (등록 순, 시\/도 단위)'),
    primaryRegion: zod
      .string()
      .nullable()
      .describe('칩에 표시할 첫 번째 지역명. 비어있으면 null'),
    additionalCount: zod
      .number()
      .describe(
        'primaryRegion 외 추가 지역 수. 예: 서울 외 3곳 → additionalCount=3',
      ),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 기존 관심 지역을 모두 삭제하고 요청 목록으로 새로 저장한다. 빈 배열이면 전체 해제.
 * @summary 관심 지역 저장/수정 (전체 교체)
 */
export const putApiV1UsersMeRegionsBodyRegionsMax = 10;

export const PutApiV1UsersMeRegionsBody = zod.object({
  regions: zod
    .array(zod.string())
    .max(putApiV1UsersMeRegionsBodyRegionsMax)
    .describe('저장할 시\/도 지역 목록. 빈 배열이면 전체 해제'),
});

export const PutApiV1UsersMeRegionsResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});
