/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
export interface ApiResponseEmpty {
  success: boolean;
  data: unknown | null;
  error: unknown | null;
}

export type ApiResponseErrorError = {
  code: string;
  message: string;
  /** @nullable */
  detail: string | null;
};

export interface ApiResponseError {
  success: boolean;
  data: unknown | null;
  error: ApiResponseErrorError;
}

export interface KakaoLoginRequest {
  /** 카카오 인가 코드 */
  authorizationCode: string;
  /**
   * 카카오 인가 요청 시 사용한 redirect URI (서버 검증용)
   * @nullable
   */
  redirectUri?: string | null;
}

export type AuthUserProvider =
  (typeof AuthUserProvider)[keyof typeof AuthUserProvider];

export const AuthUserProvider = {
  KAKAO: 'KAKAO',
  EMAIL: 'EMAIL',
} as const;

export type AuthUserRole = (typeof AuthUserRole)[keyof typeof AuthUserRole];

export const AuthUserRole = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

/**
 * @nullable
 */
export type AuthUserLastRole =
  | (typeof AuthUserLastRole)[keyof typeof AuthUserLastRole]
  | null;

export const AuthUserLastRole = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

export interface AuthUser {
  id: number;
  provider: AuthUserProvider;
  /**
   * 소셜 제공자 아이디 (카카오 고유 ID 등)
   * @nullable
   */
  providerId?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  nickname?: string | null;
  /** @nullable */
  phoneNumber?: string | null;
  role: AuthUserRole;
  /** @nullable */
  lastRole?: AuthUserLastRole;
  /** BUYER 역할 assignment 보유 여부 */
  hasBuyerRole?: boolean;
  /** SELLER 역할 assignment 보유 여부 */
  hasSellerRole?: boolean;
  /** BUYER 역할 assignment를 보유했고 현재 역할이 BUYER가 아닐 때 true */
  canSwitchToBuyer?: boolean;
  /** SELLER 역할 assignment를 보유했고 현재 역할이 SELLER가 아닐 때 true */
  canSwitchToSeller?: boolean;
  signupCompleted: boolean;
  sellerSignupCompleted: boolean;
  /** @nullable */
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ApiResponseAuthLoginData = {
  accessToken: string;
  tokenType: string;
  /** Access Token 만료 시간(초) */
  expiresIn: number;
  /** 최초 가입 여부 */
  isNewUser: boolean;
  user: AuthUser;
};

export interface ApiResponseAuthLogin {
  success: boolean;
  data: ApiResponseAuthLoginData;
  error: unknown | null;
}

export type ApiResponseAccessTokenData = {
  accessToken: string;
  tokenType: string;
  /** Access Token 만료 시간(초) */
  expiresIn: number;
};

export interface ApiResponseAccessToken {
  success: boolean;
  data: ApiResponseAccessTokenData;
  error: unknown | null;
}

export interface ApiResponseUserInfo {
  success: boolean;
  data: AuthUser;
  error: unknown | null;
}

/**
 * 현재 사용자 활성 역할
 */
export type WithdrawalContextResponseCurrentRole =
  (typeof WithdrawalContextResponseCurrentRole)[keyof typeof WithdrawalContextResponseCurrentRole];

export const WithdrawalContextResponseCurrentRole = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

/**
 * 소비자 탈퇴 차단 사유
 */
export type BuyerWithdrawalBlockingReason =
  (typeof BuyerWithdrawalBlockingReason)[keyof typeof BuyerWithdrawalBlockingReason];

export const BuyerWithdrawalBlockingReason = {
  NONE: 'NONE',
  PENDING_PICKUP: 'PENDING_PICKUP',
} as const;

export interface BuyerWithdrawalContext {
  /** 소비자 탈퇴 진행 가능 여부 */
  canProceed: boolean;
  /** 수령 예정 공구 존재 여부 */
  hasPendingPickup: boolean;
  /** 참여 중 공구(PAID_WAITING_GOAL) 존재 여부 */
  hasActiveParticipation: boolean;
  blockingReason: BuyerWithdrawalBlockingReason;
}

/**
 * 사장님 탈퇴 차단 사유
 */
export type SellerWithdrawalBlockingReason =
  (typeof SellerWithdrawalBlockingReason)[keyof typeof SellerWithdrawalBlockingReason];

export const SellerWithdrawalBlockingReason = {
  NONE: 'NONE',
  OPEN_GROUPBUY: 'OPEN_GROUPBUY',
  PENDING_CUSTOMER_PICKUP: 'PENDING_CUSTOMER_PICKUP',
} as const;

export interface SellerWithdrawalContext {
  /** 사장님 탈퇴 진행 가능 여부 */
  canProceed: boolean;
  /** 개설된 진행중 공구 존재 여부 */
  hasOpenGroupBuy: boolean;
  /** 달성/완료 공구 고객 미픽업 존재 여부 */
  hasPendingCustomerPickup: boolean;
  blockingReason: SellerWithdrawalBlockingReason;
}

/**
 * 탈퇴 화면 타입
 */
export type WithdrawalScreenType =
  (typeof WithdrawalScreenType)[keyof typeof WithdrawalScreenType];

export const WithdrawalScreenType = {
  BUYER_WITHDRAWAL: 'BUYER_WITHDRAWAL',
  SELLER_WITHDRAWAL: 'SELLER_WITHDRAWAL',
} as const;

export interface WithdrawalContextResponse {
  /** 현재 사용자 활성 역할 */
  currentRole: WithdrawalContextResponseCurrentRole;
  buyer: BuyerWithdrawalContext;
  seller: SellerWithdrawalContext;
  recommendedScreen: WithdrawalScreenType;
  /** 현재 역할 화면에서 강제 이동 필요 여부 */
  forceRedirect: boolean;
  /** 강제 이동 대상 화면 타입(forceRedirect=true일 때만 존재) */
  forceRedirectTarget?: WithdrawalScreenType | null;
}

export interface ApiResponseWithdrawalContext {
  success: boolean;
  data: WithdrawalContextResponse;
  error: unknown | null;
}

export interface SellerSettlementAccountResponse {
  bankCode: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface ApiResponseSellerSettlementAccount {
  success: boolean;
  data: SellerSettlementAccountResponse;
  error: unknown | null;
}

export interface SellerBusinessProfileResponse {
  businessRegistrationNumber: string;
  storeName: string;
  ownerName: string;
  storeAddress: string;
  phoneNumber: string;
}

export interface ApiResponseSellerBusinessProfile {
  success: boolean;
  data: SellerBusinessProfileResponse;
  error: unknown | null;
}

export interface AdditionalInfoUpsertRequest {
  /**
   * 2~10자, 한글/영문/숫자만 허용
   * @minLength 2
   * @maxLength 10
   * @pattern ^[A-Za-z0-9가-힣]{2,10}$
   */
  nickname: string;
  /**
   * 하이픈 포함 휴대폰 번호 (01X-XXXX-XXXX)
   * @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$
   */
  phoneNumber: string;
}

/**
 * 전환할 역할
 */
export type MyPageRoleSwitchRequestRole =
  (typeof MyPageRoleSwitchRequestRole)[keyof typeof MyPageRoleSwitchRequestRole];

export const MyPageRoleSwitchRequestRole = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
} as const;

export interface MyPageRoleSwitchRequest {
  /** 전환할 역할 */
  role: MyPageRoleSwitchRequestRole;
}

/**
 * 탈퇴 사유(선택)
 * @nullable
 */
export type WithdrawRequestReason =
  | (typeof WithdrawRequestReason)[keyof typeof WithdrawRequestReason]
  | null;

export const WithdrawRequestReason = {
  NO_DESIRED_GROUPBUY: 'NO_DESIRED_GROUPBUY',
  INCONVENIENT_SERVICE: 'INCONVENIENT_SERVICE',
  PRIVACY_CONCERN: 'PRIVACY_CONCERN',
  OTHER: 'OTHER',
} as const;

export interface WithdrawRequest {
  /**
   * 탈퇴 사유(선택)
   * @nullable
   */
  reason?: WithdrawRequestReason;
  /**
   * 탈퇴 상세 사유 (reason=OTHER 일 때 입력)
   * @maxLength 500
   * @nullable
   */
  reasonDetail?: string | null;
}

/**
 * 사장님 탈퇴 사유(선택)
 * @nullable
 */
export type OwnerWithdrawRequestReason =
  | (typeof OwnerWithdrawRequestReason)[keyof typeof OwnerWithdrawRequestReason]
  | null;

export const OwnerWithdrawRequestReason = {
  INCONVENIENT_SERVICE: 'INCONVENIENT_SERVICE',
  NO_LONGER_NEEDED: 'NO_LONGER_NEEDED',
  PRIVACY_CONCERN: 'PRIVACY_CONCERN',
  OTHER: 'OTHER',
} as const;

export interface OwnerWithdrawRequest {
  /**
   * 사장님 탈퇴 사유(선택)
   * @nullable
   */
  reason?: OwnerWithdrawRequestReason;
  /**
   * 사장님 탈퇴 상세 사유 (reason=OTHER 일 때 입력)
   * @maxLength 500
   * @nullable
   */
  reasonDetail?: string | null;
}

export type ApiResponseNicknameAvailabilityData = {
  nickname: string;
  available: boolean;
};

export interface ApiResponseNicknameAvailability {
  success: boolean;
  data: ApiResponseNicknameAvailabilityData;
  error: unknown | null;
}

export type ApiResponseAdditionalInfoUpdatedData = {
  id: number;
  nickname: string;
  phoneNumber: string;
  signupCompleted: boolean;
};

export interface ApiResponseAdditionalInfoUpdated {
  success: boolean;
  data: ApiResponseAdditionalInfoUpdatedData;
  error: unknown | null;
}

export interface BusinessRegistrationLookupRequest {
  /**
   * 사업자등록번호(하이픈 포함/미포함 모두 허용)
   * @pattern ^\d{3}-?\d{2}-?\d{5}$
   */
  businessRegistrationNumber: string;
}

export type ApiResponseBusinessRegistrationLookupDataStatus =
  (typeof ApiResponseBusinessRegistrationLookupDataStatus)[keyof typeof ApiResponseBusinessRegistrationLookupDataStatus];

export const ApiResponseBusinessRegistrationLookupDataStatus = {
  VALID: 'VALID',
  CLOSED: 'CLOSED',
  NOT_FOUND: 'NOT_FOUND',
} as const;

export type ApiResponseBusinessRegistrationLookupData = {
  businessRegistrationNumber: string;
  status: ApiResponseBusinessRegistrationLookupDataStatus;
  /** @nullable */
  message?: string | null;
  /** @nullable */
  storeName?: string | null;
  /** @nullable */
  ownerName?: string | null;
  /** @nullable */
  storeAddress?: string | null;
};

export interface ApiResponseBusinessRegistrationLookup {
  success: boolean;
  data: ApiResponseBusinessRegistrationLookupData;
  error: unknown | null;
}

export interface SellerBusinessInfoUpsertRequest {
  /** @pattern ^\d{3}-?\d{2}-?\d{5}$ */
  businessRegistrationNumber: string;
  /** @maxLength 100 */
  storeName: string;
  /** @maxLength 50 */
  ownerName: string;
  /** @maxLength 255 */
  storeAddress: string;
  /** @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$ */
  phoneNumber: string;
}

/**
 * 은행/증권사 선택값(라벨 또는 코드).
- 서버 저장 시 표준 코드로 정규화된다.
- 아래 enum은 저장되는 표준 코드 목록이다.
- BANK codes:
  NONGHYEOP, KAKAOBANK, KOOKMIN, TOSSBANK, SHINHAN, WOORI, IBK, HANA, SAEMAUL, BUSANBANK,
  DAEGUBANK, KBANK, SHINHYEOP, POST, SC, KYONGNAMBANK, GWANGJUBANK, SUHYEOP, JEONBUKBANK,
  SAVINGBANK, JEJUBANK, CITI, KDBBANK, SANLIM, BOA, HSBC, ICBC, DEUTSCHE_BANK, JPMORGAN_CHASE,
  BNP_PARIBAS, CCB, BOC
- SECURITIES codes:
  SAMSUNG_SECURITIES, KB_SECURITIES, NH_INVESTMENT_AND_SECURITIES, YUANTA_SECURITES, DAISHIN_SECURITIES,
  HANA_INVESTMENT_AND_SECURITIES, HANHWA_INVESTMENT_AND_SECURITIES, EUGENE_INVESTMENT_AND_SECURITIES,
  HI_INVESTMENT_AND_SECURITIES, KYOBO_SECURITIES, MERITZ_SECURITIES, SK_SECURITIES,
  LIG_INVESTMENT_AND_SECURITIES, HYUNDAI_MOTOR_SECURITIES, DB_INVESTMENT_AND_SECURITIES,
  SHINYOUNG_SECURITIES, DAOL_INVESTMENT_AND_SECURITIES, BOOKOOK_SECURITIES, TOSS_SECURITIES,
  KAKAOPAY_SECURITIES, MIRAE_ASSET_SECURITIES, KIWOOM, KOREA_INVESTMENT_AND_SECURITIES,
  SHINHAN_SECURITIES, IBK_INVESTMENT_SECURITIES, WOORI_SECURITIES, CAPE_INVESTMENT_SECURITIES,
  BNK_INVESTMENT_SECURITIES, SANGSANGIN_SECURITIES

 * @maxLength 80
 */
export type SellerSettlementInfoUpsertRequestBankCode =
  (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode];

export const SellerSettlementInfoUpsertRequestBankCode = {
  NONGHYEOP: 'NONGHYEOP',
  KAKAOBANK: 'KAKAOBANK',
  KOOKMIN: 'KOOKMIN',
  TOSSBANK: 'TOSSBANK',
  SHINHAN: 'SHINHAN',
  WOORI: 'WOORI',
  IBK: 'IBK',
  HANA: 'HANA',
  SAEMAUL: 'SAEMAUL',
  BUSANBANK: 'BUSANBANK',
  DAEGUBANK: 'DAEGUBANK',
  KBANK: 'KBANK',
  SHINHYEOP: 'SHINHYEOP',
  POST: 'POST',
  SC: 'SC',
  KYONGNAMBANK: 'KYONGNAMBANK',
  GWANGJUBANK: 'GWANGJUBANK',
  SUHYEOP: 'SUHYEOP',
  JEONBUKBANK: 'JEONBUKBANK',
  SAVINGBANK: 'SAVINGBANK',
  JEJUBANK: 'JEJUBANK',
  CITI: 'CITI',
  KDBBANK: 'KDBBANK',
  SANLIM: 'SANLIM',
  BOA: 'BOA',
  HSBC: 'HSBC',
  SAMSUNG_SECURITIES: 'SAMSUNG_SECURITIES',
  KB_SECURITIES: 'KB_SECURITIES',
  NH_INVESTMENT_AND_SECURITIES: 'NH_INVESTMENT_AND_SECURITIES',
  YUANTA_SECURITES: 'YUANTA_SECURITES',
  DAISHIN_SECURITIES: 'DAISHIN_SECURITIES',
  HANA_INVESTMENT_AND_SECURITIES: 'HANA_INVESTMENT_AND_SECURITIES',
  HANHWA_INVESTMENT_AND_SECURITIES: 'HANHWA_INVESTMENT_AND_SECURITIES',
  EUGENE_INVESTMENT_AND_SECURITIES: 'EUGENE_INVESTMENT_AND_SECURITIES',
  HI_INVESTMENT_AND_SECURITIES: 'HI_INVESTMENT_AND_SECURITIES',
  KYOBO_SECURITIES: 'KYOBO_SECURITIES',
  MERITZ_SECURITIES: 'MERITZ_SECURITIES',
  SK_SECURITIES: 'SK_SECURITIES',
  LIG_INVESTMENT_AND_SECURITIES: 'LIG_INVESTMENT_AND_SECURITIES',
  HYUNDAI_MOTOR_SECURITIES: 'HYUNDAI_MOTOR_SECURITIES',
  DB_INVESTMENT_AND_SECURITIES: 'DB_INVESTMENT_AND_SECURITIES',
  SHINYOUNG_SECURITIES: 'SHINYOUNG_SECURITIES',
  DAOL_INVESTMENT_AND_SECURITIES: 'DAOL_INVESTMENT_AND_SECURITIES',
  BOOKOOK_SECURITIES: 'BOOKOOK_SECURITIES',
  TOSS_SECURITIES: 'TOSS_SECURITIES',
  KAKAOPAY_SECURITIES: 'KAKAOPAY_SECURITIES',
  MIRAE_ASSET_SECURITIES: 'MIRAE_ASSET_SECURITIES',
  KIWOOM: 'KIWOOM',
  KOREA_INVESTMENT_AND_SECURITIES: 'KOREA_INVESTMENT_AND_SECURITIES',
  SHINHAN_SECURITIES: 'SHINHAN_SECURITIES',
  IBK_INVESTMENT_SECURITIES: 'IBK_INVESTMENT_SECURITIES',
  WOORI_SECURITIES: 'WOORI_SECURITIES',
  CAPE_INVESTMENT_SECURITIES: 'CAPE_INVESTMENT_SECURITIES',
  BNK_INVESTMENT_SECURITIES: 'BNK_INVESTMENT_SECURITIES',
  SANGSANGIN_SECURITIES: 'SANGSANGIN_SECURITIES',
  ICBC: 'ICBC',
  DEUTSCHE_BANK: 'DEUTSCHE_BANK',
  JPMORGAN_CHASE: 'JPMORGAN_CHASE',
  BNP_PARIBAS: 'BNP_PARIBAS',
  CCB: 'CCB',
  BOC: 'BOC',
} as const;

export interface SellerSettlementInfoUpsertRequest {
  /**
     * 은행/증권사 선택값(라벨 또는 코드).
  - 서버 저장 시 표준 코드로 정규화된다.
  - 아래 enum은 저장되는 표준 코드 목록이다.
  - BANK codes:
    NONGHYEOP, KAKAOBANK, KOOKMIN, TOSSBANK, SHINHAN, WOORI, IBK, HANA, SAEMAUL, BUSANBANK,
    DAEGUBANK, KBANK, SHINHYEOP, POST, SC, KYONGNAMBANK, GWANGJUBANK, SUHYEOP, JEONBUKBANK,
    SAVINGBANK, JEJUBANK, CITI, KDBBANK, SANLIM, BOA, HSBC, ICBC, DEUTSCHE_BANK, JPMORGAN_CHASE,
    BNP_PARIBAS, CCB, BOC
  - SECURITIES codes:
    SAMSUNG_SECURITIES, KB_SECURITIES, NH_INVESTMENT_AND_SECURITIES, YUANTA_SECURITES, DAISHIN_SECURITIES,
    HANA_INVESTMENT_AND_SECURITIES, HANHWA_INVESTMENT_AND_SECURITIES, EUGENE_INVESTMENT_AND_SECURITIES,
    HI_INVESTMENT_AND_SECURITIES, KYOBO_SECURITIES, MERITZ_SECURITIES, SK_SECURITIES,
    LIG_INVESTMENT_AND_SECURITIES, HYUNDAI_MOTOR_SECURITIES, DB_INVESTMENT_AND_SECURITIES,
    SHINYOUNG_SECURITIES, DAOL_INVESTMENT_AND_SECURITIES, BOOKOOK_SECURITIES, TOSS_SECURITIES,
    KAKAOPAY_SECURITIES, MIRAE_ASSET_SECURITIES, KIWOOM, KOREA_INVESTMENT_AND_SECURITIES,
    SHINHAN_SECURITIES, IBK_INVESTMENT_SECURITIES, WOORI_SECURITIES, CAPE_INVESTMENT_SECURITIES,
    BNK_INVESTMENT_SECURITIES, SANGSANGIN_SECURITIES

     * @maxLength 80
     */
  bankCode: SellerSettlementInfoUpsertRequestBankCode;
  /** @maxLength 50 */
  accountNumber: string;
  /** @maxLength 50 */
  accountHolderName: string;
}

export type ApiResponseSellerSignupStatusData = {
  id: number;
  sellerSignupCompleted: boolean;
};

export interface ApiResponseSellerSignupStatus {
  success: boolean;
  data: ApiResponseSellerSignupStatusData;
  error: unknown | null;
}

export type ApiResponseEmailAvailabilityData = {
  email: string;
  available: boolean;
};

export interface ApiResponseEmailAvailability {
  success: boolean;
  data: ApiResponseEmailAvailabilityData;
  error: unknown | null;
}

export interface EmailVerificationCodeSendRequest {
  email: string;
}

export type ApiResponseEmailVerificationCodeSentData = {
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
  remainingDailyAttempts: number;
};

export interface ApiResponseEmailVerificationCodeSent {
  success: boolean;
  data: ApiResponseEmailVerificationCodeSentData;
  error: unknown | null;
}

export interface EmailVerificationCodeVerifyRequest {
  email: string;
  /** @pattern ^[0-9]{6}$ */
  code: string;
}

export type ApiResponseEmailVerificationVerifiedData = {
  verified: boolean;
  /** 이메일 회원가입 단계 진행용 임시 토큰 */
  signupToken: string;
};

export interface ApiResponseEmailVerificationVerified {
  success: boolean;
  data: ApiResponseEmailVerificationVerifiedData;
  error: unknown | null;
}

export interface EmailSignupRequest {
  email: string;
  /**
   * 8~20자, 영문+숫자 포함
   * @minLength 8
   * @maxLength 20
   * @pattern ^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$
   */
  password: string;
  signupToken: string;
}

export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface NicknameUpdateRequest {
  /**
   * @minLength 2
   * @maxLength 10
   * @pattern ^[A-Za-z0-9가-힣]{2,10}$
   */
  nickname: string;
}

export type ApiResponseNicknameUpdatedData = {
  id: number;
  nickname: string;
};

export interface ApiResponseNicknameUpdated {
  success: boolean;
  data: ApiResponseNicknameUpdatedData;
  error: unknown | null;
}

export interface PhoneNumberUpdateRequest {
  /** @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$ */
  phoneNumber: string;
}

export type ApiResponsePhoneNumberUpdatedData = {
  id: number;
  phoneNumber: string;
};

export interface ApiResponsePhoneNumberUpdated {
  success: boolean;
  data: ApiResponsePhoneNumberUpdatedData;
  error: unknown | null;
}

export interface PhoneVerificationCodeSendRequest {
  /** @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$ */
  phoneNumber: string;
}

export type ApiResponsePhoneVerificationCodeSentData = {
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
};

export interface ApiResponsePhoneVerificationCodeSent {
  success: boolean;
  data: ApiResponsePhoneVerificationCodeSentData;
  error: unknown | null;
}

export interface PhoneVerificationCodeVerifyRequest {
  /** @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$ */
  phoneNumber: string;
  /** @pattern ^[0-9]{6}$ */
  code: string;
}

export type ApiResponsePhoneVerificationVerifiedData = {
  verified: boolean;
};

export interface ApiResponsePhoneVerificationVerified {
  success: boolean;
  data: ApiResponsePhoneVerificationVerifiedData;
  error: unknown | null;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  /**
   * 8~20자, 영문+숫자 포함, 이메일 아이디와 동일값 불가
   * @minLength 8
   * @maxLength 20
   * @pattern ^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$
   */
  newPassword: string;
}

export type ApiResponsePasswordChangedData = {
  changed: boolean;
};

export interface ApiResponsePasswordChanged {
  success: boolean;
  data: ApiResponsePasswordChangedData;
  error: unknown | null;
}

export type ApiResponseMyRegionsData = {
  /** 선택한 관심 지역 목록 (등록 순, 시/도 단위) */
  regions: string[];
  /**
   * 칩에 표시할 첫 번째 지역명. 비어있으면 null
   * @nullable
   */
  primaryRegion: string | null;
  /** primaryRegion 외 추가 지역 수. 예: 서울 외 3곳 → additionalCount=3 */
  additionalCount: number;
};

export interface ApiResponseMyRegions {
  success: boolean;
  data: ApiResponseMyRegionsData;
  error: unknown | null;
}

export interface UpdateRegionsRequest {
  /**
   * 저장할 시/도 지역 목록. 빈 배열이면 전체 해제
   * @maxItems 10
   */
  regions: string[];
}

export type RegionType = (typeof RegionType)[keyof typeof RegionType];

export const RegionType = {
  NATIONWIDE: 'NATIONWIDE',
  SEOUL: 'SEOUL',
  GYEONGGI: 'GYEONGGI',
  INCHEON: 'INCHEON',
  GANGWON: 'GANGWON',
  DAEJEON: 'DAEJEON',
  SEJONG: 'SEJONG',
  CHUNGNAM: 'CHUNGNAM',
  CHUNGBUK: 'CHUNGBUK',
  BUSAN: 'BUSAN',
  ULSAN: 'ULSAN',
  GYEONGNAM: 'GYEONGNAM',
  GYEONGBUK: 'GYEONGBUK',
  DAEGU: 'DAEGU',
  GWANGJU: 'GWANGJU',
  JEONNAM: 'JEONNAM',
  JEONBUK: 'JEONBUK',
  JEJU: 'JEJU',
} as const;

export type DistrictType = (typeof DistrictType)[keyof typeof DistrictType];

export const DistrictType = {
  NATIONWIDE: 'NATIONWIDE',
  SEOUL_ALL: 'SEOUL_ALL',
  SEOUL_GANGNAM_YEOKSAM_SAMSEONG: 'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
  SEOUL_SINSA_APGUJEONG_CHEONGDAM: 'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
  SEOUL_SEOCHO_BANGBAE_GYODAE: 'SEOUL_SEOCHO_BANGBAE_GYODAE',
  SEOUL_JAMSIL_SINCHEON_SONGPA: 'SEOUL_JAMSIL_SINCHEON_SONGPA',
  SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG:
    'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
  SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO: 'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
  SEOUL_SEONGSU_GEONDAE_GWANGJIN: 'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
  SEOUL_ITAEWON_HANNAM_YONGSAN: 'SEOUL_ITAEWON_HANNAM_YONGSAN',
  SEOUL_YEONGDEUNGPO_YEOUIDO: 'SEOUL_YEONGDEUNGPO_YEOUIDO',
  SEOUL_NOWON_DOBONG_GANGBUK: 'SEOUL_NOWON_DOBONG_GANGBUK',
  SEOUL_ETC: 'SEOUL_ETC',
  GYEONGGI_ALL: 'GYEONGGI_ALL',
  GYEONGGI_SUWON_YEONGTONG_PALDAL: 'GYEONGGI_SUWON_YEONGTONG_PALDAL',
  GYEONGGI_SEONGNAM_BUNDANG_PANGYO: 'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
  GYEONGGI_GOYANG_ILSAN: 'GYEONGGI_GOYANG_ILSAN',
  GYEONGGI_YONGIN_SUJI_GIHEUNG: 'GYEONGGI_YONGIN_SUJI_GIHEUNG',
  GYEONGGI_BUCHEON_JUNGDONG_SANGDONG: 'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
  GYEONGGI_ANSAN_DANWON_SANGROK: 'GYEONGGI_ANSAN_DANWON_SANGROK',
  GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE: 'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
  GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE: 'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
  GYEONGGI_HWASEONG_DONGTAN: 'GYEONGGI_HWASEONG_DONGTAN',
  GYEONGGI_PAJU_UNJEONG: 'GYEONGGI_PAJU_UNJEONG',
  GYEONGGI_ETC: 'GYEONGGI_ETC',
  INCHEON_ALL: 'INCHEON_ALL',
  INCHEON_SONGDO_YEONSU: 'INCHEON_SONGDO_YEONSU',
  INCHEON_GUWOL_NAMDONG: 'INCHEON_GUWOL_NAMDONG',
  INCHEON_BUPYEONG_GYEYANG: 'INCHEON_BUPYEONG_GYEYANG',
  INCHEON_CHEONGNA_SEOGU: 'INCHEON_CHEONGNA_SEOGU',
  INCHEON_JUAN_MICHUHOL: 'INCHEON_JUAN_MICHUHOL',
  INCHEON_YEONGJONGDO_JUNGGU: 'INCHEON_YEONGJONGDO_JUNGGU',
  GANGWON_ALL: 'GANGWON_ALL',
  GANGWON_CHUNCHEON: 'GANGWON_CHUNCHEON',
  GANGWON_WONJU: 'GANGWON_WONJU',
  GANGWON_GANGNEUNG: 'GANGWON_GANGNEUNG',
  GANGWON_SOKCHO_YANGYANG: 'GANGWON_SOKCHO_YANGYANG',
  GANGWON_DONGHAE_SAMCHEOK: 'GANGWON_DONGHAE_SAMCHEOK',
  GANGWON_ETC: 'GANGWON_ETC',
  DAEJEON_ALL: 'DAEJEON_ALL',
  DAEJEON_DUNSAN_SEOGU: 'DAEJEON_DUNSAN_SEOGU',
  DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU: 'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
  DAEJEON_YUSEONG_DOAN: 'DAEJEON_YUSEONG_DOAN',
  DAEJEON_DONGGU: 'DAEJEON_DONGGU',
  DAEJEON_DAEDEOK: 'DAEJEON_DAEDEOK',
  SEJONG_ALL: 'SEJONG_ALL',
  CHUNGNAM_ALL: 'CHUNGNAM_ALL',
  CHUNGNAM_CHEONAN_SINBU_DUJEONG: 'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
  CHUNGNAM_ASAN_TANGJEONG: 'CHUNGNAM_ASAN_TANGJEONG',
  CHUNGNAM_DANGJIN: 'CHUNGNAM_DANGJIN',
  CHUNGNAM_SEOSAN: 'CHUNGNAM_SEOSAN',
  CHUNGNAM_GYERYONG_NONSAN: 'CHUNGNAM_GYERYONG_NONSAN',
  CHUNGNAM_ETC: 'CHUNGNAM_ETC',
  CHUNGBUK_ALL: 'CHUNGBUK_ALL',
  CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK: 'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
  CHUNGBUK_CHUNGJU: 'CHUNGBUK_CHUNGJU',
  CHUNGBUK_JECHEON: 'CHUNGBUK_JECHEON',
  CHUNGBUK_EUMSEONG_JINCHEON: 'CHUNGBUK_EUMSEONG_JINCHEON',
  CHUNGBUK_ETC: 'CHUNGBUK_ETC',
  BUSAN_ALL: 'BUSAN_ALL',
  BUSAN_SEOMYEON_JEONPO_JINGU: 'BUSAN_SEOMYEON_JEONPO_JINGU',
  BUSAN_HAEUNDAE_CENTUM_MARINE_CITY: 'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
  BUSAN_GWANGALLI_SUYEONG_NAMCHEON: 'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
  BUSAN_NAMPO_JUNGGU_YEONGDO: 'BUSAN_NAMPO_JUNGGU_YEONGDO',
  BUSAN_DONGRAE_YEONSAN_BUSANDAE: 'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
  BUSAN_SAHA_HADAN: 'BUSAN_SAHA_HADAN',
  BUSAN_ETC: 'BUSAN_ETC',
  ULSAN_ALL: 'ULSAN_ALL',
  ULSAN_SAMSAN_DALDONG_NAMGU: 'ULSAN_SAMSAN_DALDONG_NAMGU',
  ULSAN_SEONGNAM_JUNGGU: 'ULSAN_SEONGNAM_JUNGGU',
  ULSAN_DONGGU: 'ULSAN_DONGGU',
  ULSAN_BUKGU: 'ULSAN_BUKGU',
  ULSAN_ULJU: 'ULSAN_ULJU',
  GYEONGNAM_ALL: 'GYEONGNAM_ALL',
  GYEONGNAM_CHANGWON_SANGNAM_UICHANG: 'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
  GYEONGNAM_GIMHAE: 'GYEONGNAM_GIMHAE',
  GYEONGNAM_YANGSAN: 'GYEONGNAM_YANGSAN',
  GYEONGNAM_JINJU: 'GYEONGNAM_JINJU',
  GYEONGNAM_GEOJE_TONGYEONG: 'GYEONGNAM_GEOJE_TONGYEONG',
  GYEONGNAM_ETC: 'GYEONGNAM_ETC',
  GYEONGBUK_ALL: 'GYEONGBUK_ALL',
  GYEONGBUK_POHANG: 'GYEONGBUK_POHANG',
  GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL: 'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
  GYEONGBUK_GUMI: 'GYEONGBUK_GUMI',
  GYEONGBUK_GYEONGSAN: 'GYEONGBUK_GYEONGSAN',
  GYEONGBUK_ANDONG: 'GYEONGBUK_ANDONG',
  GYEONGBUK_ETC: 'GYEONGBUK_ETC',
  DAEGU_ALL: 'DAEGU_ALL',
  DAEGU_DONGSEONGNO_JUNGGU: 'DAEGU_DONGSEONGNO_JUNGGU',
  DAEGU_SUSEONGGU_BEOMEO: 'DAEGU_SUSEONGGU_BEOMEO',
  DAEGU_SANGIN_DALSEO: 'DAEGU_SANGIN_DALSEO',
  DAEGU_CHILGOK_BUKGU: 'DAEGU_CHILGOK_BUKGU',
  DAEGU_DONGGU: 'DAEGU_DONGGU',
  DAEGU_ETC: 'DAEGU_ETC',
  GWANGJU_ALL: 'GWANGJU_ALL',
  GWANGJU_SANGMU_JIGYEONG_SEOGU: 'GWANGJU_SANGMU_JIGYEONG_SEOGU',
  GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU:
    'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
  GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU: 'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
  GWANGJU_BONGSEON_NAMGU: 'GWANGJU_BONGSEON_NAMGU',
  GWANGJU_BUKGU: 'GWANGJU_BUKGU',
  JEONNAM_ALL: 'JEONNAM_ALL',
  JEONNAM_YEOSU: 'JEONNAM_YEOSU',
  JEONNAM_SUNCHEON: 'JEONNAM_SUNCHEON',
  JEONNAM_MOKPO_NAMAK: 'JEONNAM_MOKPO_NAMAK',
  JEONNAM_NAJU: 'JEONNAM_NAJU',
  JEONNAM_ETC: 'JEONNAM_ETC',
  JEONBUK_ALL: 'JEONBUK_ALL',
  JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN: 'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
  JEONBUK_IKSAN: 'JEONBUK_IKSAN',
  JEONBUK_GUNSAN: 'JEONBUK_GUNSAN',
  JEONBUK_ETC: 'JEONBUK_ETC',
  JEJU_ALL: 'JEJU_ALL',
  JEJU_JEJU_SI: 'JEJU_JEJU_SI',
  JEJU_AEWOL_HALLIM: 'JEJU_AEWOL_HALLIM',
  JEJU_JOCHEON_GUJWA: 'JEJU_JOCHEON_GUJWA',
  JEJU_SEOGWIPO_SI: 'JEJU_SEOGWIPO_SI',
  JEJU_JUNGMUN_ANDEOK: 'JEJU_JUNGMUN_ANDEOK',
  JEJU_SEONGSAN_PYOSEON: 'JEJU_SEONGSAN_PYOSEON',
} as const;

export interface GroupBuyFeedItemResponse {
  id: number;
  /**
   * 대표 썸네일 이미지 URL
   * @nullable
   */
  thumbnailUrl: string | null;
  /** 마감 D-day (예: D-3 -> 3) */
  dDay: number;
  /** 마감 뱃지 문자열 (예: D-3) */
  dDayLabel: string;
  storeName: string;
  regionType: RegionType;
  /** 시/도 한글 라벨 */
  regionLabel: string;
  districtType: DistrictType;
  /** 세부지역 한글 라벨 */
  districtLabel: string;
  productName: string;
  price: number;
  /** 달성률 % (0~100) */
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  /** 픽업 날짜 표시 문자열 */
  pickupDateLabel: string;
  /** 마감 일시 원본 값 */
  deadline: string;
}

export interface WishlistItemResponse {
  groupBuyId: number;
  /**
   * 대표 썸네일 URL
   * @nullable
   */
  thumbnailUrl: string | null;
  /** 마감 D-day (예: D-3 -> 3) */
  dDay: number;
  /** 마감 뱃지 문자열 (예: D-3) */
  dDayLabel: string;
  storeName: string;
  /** 시/도 한글 라벨 */
  regionLabel: string;
  productName: string;
  /** 픽업 날짜 원본 값 */
  pickupDate: string;
  /** 픽업 날짜 표시 문자열 */
  pickupDateLabel: string;
  /** 마감 일시 원본 값 */
  deadline: string;
  /** 마감 날짜 표시 문자열 */
  deadlineLabel: string;
  /** 달성률 % (0~100) */
  achievementRate: number;
  price: number;
  /** 현재 참여 인원 수 */
  currentParticipantCount: number;
  /** 목표 참여 인원 수 */
  targetParticipantCount: number;
  /** 찜 여부 */
  isWishlisted: boolean;
}

export type ApiResponseGroupBuyFeedPageResponseData = {
  content: GroupBuyFeedItemResponse[];
  /** 현재 페이지(1-base) */
  page: number;
  /** 페이지 크기 */
  size: number;
  /** 전체 페이지 수 */
  totalPages: number;
  totalElements: number;
  /** 다음 페이지 존재 여부 */
  hasNext: boolean;
  /** 지역 설정 조건에 맞는 공구 존재 여부 (없으면 false) */
  hasRegionalResult: boolean;
};

export interface ApiResponseGroupBuyFeedPageResponse {
  success: boolean;
  data: ApiResponseGroupBuyFeedPageResponseData;
  error: unknown | null;
}

export type ApiResponseGroupBuyDetailResponseData = {
  id: number;
  storeName: string;
  regionType: RegionType;
  /** 시/도 한글 라벨 */
  regionLabel: string;
  districtType: DistrictType;
  /** 세부지역 한글 라벨 */
  districtLabel: string;
  productName: string;
  productDescription: string;
  /**
   * 대표 썸네일 이미지 URL
   * @nullable
   */
  thumbnailUrl?: string | null;
  imageUrls: string[];
  price: number;
  /** 달성률 % (0~100) */
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  /** @nullable */
  maxQuantity?: number | null;
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  /** 픽업 날짜 표시 문자열 */
  pickupDateLabel: string;
  /** 픽업일시 표시용 문자열 */
  pickupDateTimeLabel: string;
  /** 마감일시 표시용 문자열 */
  deadlineDateTimeLabel: string;
  pickupLocation: string;
  /** @nullable */
  pickupLatitude?: number | null;
  /** @nullable */
  pickupLongitude?: number | null;
  dDay: number;
  /** 마감 뱃지 문자열 (예: D-3) */
  dDayLabel: string;
  isWishlisted: boolean;
  isClosed: boolean;
  isParticipated: boolean;
  canParticipate: boolean;
};

export interface ApiResponseGroupBuyDetailResponse {
  success: boolean;
  data: ApiResponseGroupBuyDetailResponseData;
  error: unknown | null;
}

export type ApiResponseGroupBuyViewerCountData = {
  /** @minimum 0 */
  activeViewerCount: number;
  /** FOMO 문구/뱃지 노출 여부 (activeViewerCount >= threshold) */
  showFomoBadge: boolean;
  /** 노출 기준 인원 수 */
  threshold: number;
};

export interface ApiResponseGroupBuyViewerCount {
  success: boolean;
  data: ApiResponseGroupBuyViewerCountData;
  error: unknown | null;
}

export type ApiResponseGroupBuyProgressData = {
  groupBuyId: number;
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  isClosed: boolean;
};

export interface ApiResponseGroupBuyProgress {
  success: boolean;
  data: ApiResponseGroupBuyProgressData;
  error: unknown | null;
}

export interface GroupBuyProgressItem {
  groupBuyId: number;
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  isClosed: boolean;
}

export interface ApiResponseGroupBuyProgressList {
  success: boolean;
  data: GroupBuyProgressItem[];
  error: unknown | null;
}

export type ApiResponseShareMetaData = {
  shareUrl: string;
  title: string;
  description: string;
  /** @nullable */
  imageUrl: string | null;
  storeName: string;
  deadline: string;
  pickupDate: string;
  /** @nullable */
  pickupTimeStart: string | null;
  /** @nullable */
  pickupTimeEnd: string | null;
};

export interface ApiResponseShareMeta {
  success: boolean;
  data: ApiResponseShareMetaData;
  error: unknown | null;
}

export interface GroupBuyRequestCreate {
  /** @maxLength 100 */
  storeName: string;
  /**
   * 매장 주소. roadAddress가 함께 전달되면 서버는 roadAddress를 우선 저장한다.
   * @maxLength 200
   * @nullable
   */
  storeAddress?: string | null;
  /**
   * 네이버 장소 고유 ID
   * @maxLength 100
   * @nullable
   */
  placeId?: string | null;
  /**
   * 네이버 장소 도로명 주소
   * @maxLength 200
   * @nullable
   */
  roadAddress?: string | null;
  /**
   * 네이버 장소 지번 주소
   * @maxLength 200
   * @nullable
   */
  lotAddress?: string | null;
  /**
   * 네이버 장소 위도
   * @nullable
   */
  latitude?: number | null;
  /**
   * 네이버 장소 경도
   * @nullable
   */
  longitude?: number | null;
  /** @maxLength 100 */
  productName: string;
  /** @minimum 1 */
  desiredQuantity: number;
  /** 오늘 이후 날짜 */
  desiredPickupDate: string;
  /**
   * @maxLength 500
   * @nullable
   */
  additionalNote?: string | null;
}

export type ApiResponseRequestIdData = {
  requestId: number;
};

export interface ApiResponseRequestId {
  success: boolean;
  data: ApiResponseRequestIdData;
  error: unknown | null;
}

/**
 * IN_REVIEW=검토 중 / IN_CONTACT=매장 컨택 중 /
OPENED=공구 개설 완료 / REJECTED=개설 불가

 */
export type GroupBuyRequestDetailStatus =
  (typeof GroupBuyRequestDetailStatus)[keyof typeof GroupBuyRequestDetailStatus];

export const GroupBuyRequestDetailStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type GroupBuyRequestDetailStatusHistoryItemStatus =
  (typeof GroupBuyRequestDetailStatusHistoryItemStatus)[keyof typeof GroupBuyRequestDetailStatusHistoryItemStatus];

export const GroupBuyRequestDetailStatusHistoryItemStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type GroupBuyRequestDetailStatusHistoryItem = {
  status: GroupBuyRequestDetailStatusHistoryItemStatus;
  changedAt: string;
};

export interface GroupBuyRequestDetail {
  requestId: number;
  storeName: string;
  /** @nullable */
  storeAddress?: string | null;
  /** @nullable */
  placeId?: string | null;
  /** @nullable */
  roadAddress?: string | null;
  /** @nullable */
  lotAddress?: string | null;
  /** @nullable */
  latitude?: number | null;
  /** @nullable */
  longitude?: number | null;
  productName: string;
  desiredQuantity: number;
  desiredPickupDate: string;
  /** @nullable */
  additionalNote?: string | null;
  /** IN_REVIEW=검토 중 / IN_CONTACT=매장 컨택 중 /
  OPENED=공구 개설 완료 / REJECTED=개설 불가
   */
  status: GroupBuyRequestDetailStatus;
  /**
   * status=REJECTED 시 노출
   * @nullable
   */
  rejectionReason: string | null;
  /**
   * status=OPENED 시 개설된 공구 id
   * @nullable
   */
  openedGroupBuyId: number | null;
  statusHistory: GroupBuyRequestDetailStatusHistoryItem[];
  createdAt: string;
}

export interface ApiResponseGroupBuyRequestList {
  success: boolean;
  data: GroupBuyRequestDetail[];
  error: unknown | null;
}

export interface ApiResponseGroupBuyRequestDetail {
  success: boolean;
  data: GroupBuyRequestDetail;
  error: unknown | null;
}

export type ApiResponseWishlistPageData = {
  content: WishlistItemResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  /** 마감 24시간 이내 건수 (0이면 배너 미노출) */
  urgentCount: number;
};

export interface ApiResponseWishlistPage {
  success: boolean;
  data: ApiResponseWishlistPageData;
  error: unknown | null;
}

export interface ParticipationCreate {
  /** @minimum 1 */
  quantity: number;
}

export type ApiResponseParticipationCreatedData = {
  participationId: number;
  /** 포트원 SDK에 전달할 주문명. 예) 두쫀쿠 오리지널 1개 */
  orderName: string;
  /** 상품금액 + 수수료(현재 정책상 0원) — 포트원 SDK totalAmount에 사용 */
  totalAmount: number;
  productAmount: number;
  /** 현재 정책: 0원 */
  feeAmount: number;
};

export interface ApiResponseParticipationCreated {
  success: boolean;
  data: ApiResponseParticipationCreatedData;
  error: unknown | null;
}

/**
 * 포트원 v2 + 토스페이먼츠 결제 성공 후 서버 검증 요청.
클라이언트가 PortOne.requestPayment() 완료 시 반환된 paymentId를 전달한다.
서버는 포트원 API(GET /payments/{paymentId})로 위변조 검증 후 확정 처리한다.

 */
export interface PaymentConfirm {
  /** 서버가 결제 주문 생성 시 반환한 PortOne paymentId */
  paymentId: string;
  /** 결제 요청 금액 — 서버 저장값과 불일치 시 위변조로 처리 */
  amount: number;
}

export interface PaymentOrderCreate {
  /** @minimum 1 */
  quantity: number;
  /** 달성 후 취소 불가 동의 */
  agreedNoCancelAfterGoal: boolean;
  /** 달성 전 이탈 시 전액 환불 동의 */
  agreedRefundBeforeGoal: boolean;
  /** 미수령 환불 불가 동의 */
  agreedNoRefundAfterNoShow: boolean;
  /** 청약철회 불가 동의 */
  agreedNoWithdrawal: boolean;
}

/**
 * 취소 사유. OTHER 선택 시 reasonDetail 필수.
 */
export type CancelParticipationRequestReason =
  (typeof CancelParticipationRequestReason)[keyof typeof CancelParticipationRequestReason];

export const CancelParticipationRequestReason = {
  TIME_UNAVAILABLE: 'TIME_UNAVAILABLE',
  NO_LONGER_WANTED: 'NO_LONGER_WANTED',
  PREFER_DIRECT_VISIT: 'PREFER_DIRECT_VISIT',
  BOUGHT_ELSEWHERE: 'BOUGHT_ELSEWHERE',
  OTHER: 'OTHER',
} as const;

export interface CancelParticipationRequest {
  /** 취소 사유. OTHER 선택 시 reasonDetail 필수. */
  reason: CancelParticipationRequestReason;
  /**
   * 기타 상세 사유
   * @maxLength 500
   * @nullable
   */
  reasonDetail?: string | null;
}

export type ApiResponseCheckoutInfoData = {
  groupBuyId: number;
  storeName: string;
  productName: string;
  /** @nullable */
  thumbnailUrl: string | null;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  unitPrice: number;
  quantity: number;
  productAmount: number;
  feeAmount: number;
  totalAmount: number;
  remainingQuantity: number;
};

export interface ApiResponseCheckoutInfo {
  success: boolean;
  data: ApiResponseCheckoutInfoData;
  error: unknown | null;
}

export type ApiResponsePaymentOrderCreatedData = {
  /** PortOne SDK requestPayment에 전달할 paymentId */
  paymentId: string;
  storeId: string;
  channelKey: string;
  orderName: string;
  amount: number;
  /** @nullable */
  customerName: string | null;
};

export interface ApiResponsePaymentOrderCreated {
  success: boolean;
  data: ApiResponsePaymentOrderCreatedData;
  error: unknown | null;
}

export type ApiResponsePaymentConfirmedDataParticipationStatus =
  (typeof ApiResponsePaymentConfirmedDataParticipationStatus)[keyof typeof ApiResponsePaymentConfirmedDataParticipationStatus];

export const ApiResponsePaymentConfirmedDataParticipationStatus = {
  PAID_WAITING_GOAL: 'PAID_WAITING_GOAL',
  CONFIRMED: 'CONFIRMED',
} as const;

export type ApiResponsePaymentConfirmedData = {
  paymentId: string;
  participationId: number;
  participationStatus: ApiResponsePaymentConfirmedDataParticipationStatus;
  displayStatus: string;
  amount: number;
  /** @nullable */
  method?: string | null;
  approvedAt: string;
};

export interface ApiResponsePaymentConfirmed {
  success: boolean;
  data: ApiResponsePaymentConfirmedData;
  error: unknown | null;
}

export type ApiResponseCancelParticipationDataStatus =
  (typeof ApiResponseCancelParticipationDataStatus)[keyof typeof ApiResponseCancelParticipationDataStatus];

export const ApiResponseCancelParticipationDataStatus = {
  REFUNDED: 'REFUNDED',
} as const;

export type ApiResponseCancelParticipationData = {
  participationId: number;
  status: ApiResponseCancelParticipationDataStatus;
  cancelledAt: string;
  refundedAt: string;
};

export interface ApiResponseCancelParticipation {
  success: boolean;
  data: ApiResponseCancelParticipationData;
  error: unknown | null;
}

export interface PortOneWebhook {
  /** @nullable */
  type?: string | null;
  /** @nullable */
  storeId?: string | null;
  /** @nullable */
  paymentId?: string | null;
}

export type ApiResponsePortOneWebhookData = {
  received: boolean;
};

export interface ApiResponsePortOneWebhook {
  success: boolean;
  data: ApiResponsePortOneWebhookData;
  error: unknown | null;
}

/**
 * PENDING=환불대기 / COMPLETED=환불완료
 */
export type ApiResponseRefundListDataItemRefundStatus =
  (typeof ApiResponseRefundListDataItemRefundStatus)[keyof typeof ApiResponseRefundListDataItemRefundStatus];

export const ApiResponseRefundListDataItemRefundStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

/**
 * 취소 사유
 * @nullable
 */
export type ApiResponseRefundListDataItemCancelReason =
  | (typeof ApiResponseRefundListDataItemCancelReason)[keyof typeof ApiResponseRefundListDataItemCancelReason]
  | null;

export const ApiResponseRefundListDataItemCancelReason = {
  TIME_UNAVAILABLE: 'TIME_UNAVAILABLE',
  NO_LONGER_WANTED: 'NO_LONGER_WANTED',
  PREFER_DIRECT_VISIT: 'PREFER_DIRECT_VISIT',
  BOUGHT_ELSEWHERE: 'BOUGHT_ELSEWHERE',
  OTHER: 'OTHER',
} as const;

export type ApiResponseRefundListDataItem = {
  participationId: number;
  /**
   * 카드 상품 이미지 URL
   * @nullable
   */
  thumbnailUrl: string | null;
  productName: string;
  storeName: string;
  /** @nullable */
  pickupDate: string | null;
  /** @nullable */
  pickupTimeStart: string | null;
  /** @nullable */
  pickupTimeEnd: string | null;
  paymentAmount: number;
  quantity: number;
  /** PENDING=환불대기 / COMPLETED=환불완료 */
  refundStatus: ApiResponseRefundListDataItemRefundStatus;
  /**
   * 취소 사유
   * @nullable
   */
  cancelReason: ApiResponseRefundListDataItemCancelReason;
  /**
   * 취소 상세 사유
   * @nullable
   */
  cancelReasonDetail?: string | null;
  /**
   * 결제 일시
   * @nullable
   */
  paidAt: string | null;
  /**
   * 결제 수단
   * @nullable
   */
  paymentMethod: string | null;
  /** @nullable */
  refundedAt?: string | null;
};

export interface ApiResponseRefundList {
  success: boolean;
  data: ApiResponseRefundListDataItem[];
  error: unknown | null;
}

export type ApiResponsePickupInfoDataAvailabilityStatus =
  (typeof ApiResponsePickupInfoDataAvailabilityStatus)[keyof typeof ApiResponsePickupInfoDataAvailabilityStatus];

export const ApiResponsePickupInfoDataAvailabilityStatus = {
  LOCKED: 'LOCKED',
  AVAILABLE: 'AVAILABLE',
  PICKED_UP: 'PICKED_UP',
} as const;

export type ApiResponsePickupInfoDataPickupStatus =
  (typeof ApiResponsePickupInfoDataPickupStatus)[keyof typeof ApiResponsePickupInfoDataPickupStatus];

export const ApiResponsePickupInfoDataPickupStatus = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  PICKED_UP: 'PICKED_UP',
  NO_SHOW: 'NO_SHOW',
} as const;

export type ApiResponsePickupInfoData = {
  participationId: number;
  availabilityStatus: ApiResponsePickupInfoDataAvailabilityStatus;
  pickupStatus: ApiResponsePickupInfoDataPickupStatus;
  storeName: string;
  storeAddress: string;
  /** @nullable */
  storePhone?: string | null;
  /** @nullable */
  latitude?: number | null;
  /** @nullable */
  longitude?: number | null;
  /**
   * 대중교통 안내. 현재 저장 원천이 없으면 null
   * @nullable
   */
  transitInfo?: string | null;
  /**
   * 픽업 안내 상단 카드 이미지 URL
   * @nullable
   */
  thumbnailUrl: string | null;
  productName: string;
  quantity: number;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  /**
   * 당일 픽업 종료까지 남은 분. 당일이 아니면 null
   * @nullable
   */
  remainingMinutes?: number | null;
  /** @nullable */
  pickedUpAt?: string | null;
};

export interface ApiResponsePickupInfo {
  success: boolean;
  data: ApiResponsePickupInfoData;
  error: unknown | null;
}

export type ApiResponseQrCodeDataAvailabilityStatus =
  (typeof ApiResponseQrCodeDataAvailabilityStatus)[keyof typeof ApiResponseQrCodeDataAvailabilityStatus];

export const ApiResponseQrCodeDataAvailabilityStatus = {
  LOCKED: 'LOCKED',
  AVAILABLE: 'AVAILABLE',
  PICKED_UP: 'PICKED_UP',
} as const;

export type ApiResponseQrCodeDataPickupStatus =
  (typeof ApiResponseQrCodeDataPickupStatus)[keyof typeof ApiResponseQrCodeDataPickupStatus];

export const ApiResponseQrCodeDataPickupStatus = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  PICKED_UP: 'PICKED_UP',
  NO_SHOW: 'NO_SHOW',
} as const;

export type ApiResponseQrCodeData = {
  participationId: number;
  /** 예약 번호. 참여 id 기반 표시값. 예) MCJ-P000123 */
  reservationNumber: string;
  availabilityStatus: ApiResponseQrCodeDataAvailabilityStatus;
  pickupStatus: ApiResponseQrCodeDataPickupStatus;
  /**
   * 참여자 닉네임
   * @nullable
   */
  userName?: string | null;
  productName: string;
  quantity: number;
  storeName: string;
  storeAddress: string;
  pickupLocation: string;
  /** @nullable */
  qrCode?: string | null;
  pickupDate: string;
  /** 픽업 시작 시각. 예) 13:00 */
  pickupTimeStart: string;
  /** 픽업 종료 시각. 예) 17:00 */
  pickupTimeEnd: string;
  /** KST 기준 픽업일까지 남은 날짜. 당일이면 0, 지난 픽업일이면 음수 */
  dDay: number;
  /** @nullable */
  pickedUpAt?: string | null;
};

export interface ApiResponseQrCode {
  success: boolean;
  data: ApiResponseQrCodeData;
  error: unknown | null;
}

/**
 * 후보가 없거나 QR이 잠긴 사유
 * @nullable
 */
export type ApiResponseNearestPickupQrDataReason =
  | (typeof ApiResponseNearestPickupQrDataReason)[keyof typeof ApiResponseNearestPickupQrDataReason]
  | null;

export const ApiResponseNearestPickupQrDataReason = {
  NO_AVAILABLE_PICKUP: 'NO_AVAILABLE_PICKUP',
  ONLY_FUTURE_PICKUP: 'ONLY_FUTURE_PICKUP',
} as const;

/**
 * @nullable
 */
export type ApiResponseNearestPickupQrDataItem = {
  participationId: number;
  /** 예약 번호. 참여 id 기반 표시값. 예) MCJ-P000123 */
  reservationNumber: string;
  /** 당일 00시 이후 QR 사용 가능 시 AVAILABLE */
  availabilityStatus: 'LOCKED' | 'AVAILABLE' | 'PICKED_UP';
  pickupStatus: 'NOT_READY' | 'READY' | 'PICKED_UP' | 'NO_SHOW';
  /**
   * 참여자 닉네임
   * @nullable
   */
  userName?: string | null;
  productName: string;
  quantity: number;
  storeName: string;
  storeAddress: string;
  pickupLocation: string;
  /**
   * LOCKED 상태에서는 null
   * @nullable
   */
  qrCode?: string | null;
  pickupDate: string;
  /** 픽업 시작 시각. 예) 13:00 */
  pickupTimeStart: string;
  /** 픽업 종료 시각. 예) 17:00 */
  pickupTimeEnd: string;
  /** KST 기준 픽업일까지 남은 날짜. 당일이면 0, 지난 픽업일이면 음수 */
  dDay: number;
  /** @nullable */
  pickedUpAt?: string | null;
} | null | null;

export type ApiResponseNearestPickupQrData = {
  /** 표시 가능한 픽업 후보가 있으면 true */
  hasCandidate: boolean;
  /** 당일 픽업 예정 건이 2개 이상이면 true */
  hasMultipleToday: boolean;
  /**
   * 후보가 없거나 QR이 잠긴 사유
   * @nullable
   */
  reason?: ApiResponseNearestPickupQrDataReason;
  /** @nullable */
  item: ApiResponseNearestPickupQrDataItem;
};

export interface ApiResponseNearestPickupQr {
  success: boolean;
  data: ApiResponseNearestPickupQrData;
  error: unknown | null;
}

export type ApiResponsePickupVerifyDataPickupStatus =
  (typeof ApiResponsePickupVerifyDataPickupStatus)[keyof typeof ApiResponsePickupVerifyDataPickupStatus];

export const ApiResponsePickupVerifyDataPickupStatus = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  PICKED_UP: 'PICKED_UP',
  NO_SHOW: 'NO_SHOW',
} as const;

export type ApiResponsePickupVerifyData = {
  participationId: number;
  pickupStatus: ApiResponsePickupVerifyDataPickupStatus;
  /** @nullable */
  userName?: string | null;
  productName: string;
  quantity: number;
  pickedUpAt: string;
  /** @nullable */
  pickupProcessedByUserId?: number | null;
};

export interface ApiResponsePickupVerify {
  success: boolean;
  data: ApiResponsePickupVerifyData;
  error: unknown | null;
}

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationType = {
  PICKUP: 'PICKUP',
  WISH: 'WISH',
  APPLY: 'APPLY',
  REQUEST: 'REQUEST',
} as const;

export type NotificationDeeplinkType =
  (typeof NotificationDeeplinkType)[keyof typeof NotificationDeeplinkType];

export const NotificationDeeplinkType = {
  PICKUP_GUIDE: 'PICKUP_GUIDE',
  GROUPBUY_DETAIL: 'GROUPBUY_DETAIL',
  MY_APPLYING: 'MY_APPLYING',
  REQUEST_STATUS: 'REQUEST_STATUS',
} as const;

/**
 * 알림 시나리오 식별자입니다.
1=PICKUP_SAME_DAY_MORNING
2=PICKUP_DAY_BEFORE_MORNING
3=PICKUP_NOT_COMPLETED_AFTER_CUTOFF
4=WISH_DEADLINE_MINUS_3_DAYS
5=WISH_DEADLINE_MINUS_1_DAY
6=WISH_TARGET_ACHIEVED_IMMEDIATE
7=APPLY_PAYMENT_SUCCESS_IMMEDIATE
8=APPLY_GROUPBUY_ACHIEVED_IMMEDIATE
9=APPLY_GROUPBUY_FAILED_IMMEDIATE
10=REQUEST_OPENED_IMMEDIATE
11=REQUEST_REJECTED_IMMEDIATE
12=REQUEST_NEW_PARTICIPANT_IMMEDIATE
13=REQUEST_TARGET_ACHIEVED_IMMEDIATE
14=REQUEST_DEADLINE_MINUS_3_DAYS
15=OWNER_PICKUP_SAME_DAY_MORNING
16=OWNER_PICKUP_DAY_BEFORE_MORNING
17=OWNER_GROUPBUY_ACHIEVED_IMMEDIATE
18=OWNER_GROUPBUY_FAILED_IMMEDIATE
19=OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE
20=OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE
21=OWNER_OPEN_REQUEST_APPROVED_IMMEDIATE
22=OWNER_OPEN_REQUEST_REJECTED_IMMEDIATE
23=OWNER_ORDER_CONFIRM_REQUIRED_IMMEDIATE
24=OWNER_ORDER_CANCELLED_IMMEDIATE

 */
export type NotificationTriggerType =
  (typeof NotificationTriggerType)[keyof typeof NotificationTriggerType];

export const NotificationTriggerType = {
  PICKUP_SAME_DAY_MORNING: 'PICKUP_SAME_DAY_MORNING',
  PICKUP_DAY_BEFORE_MORNING: 'PICKUP_DAY_BEFORE_MORNING',
  PICKUP_NOT_COMPLETED_AFTER_CUTOFF: 'PICKUP_NOT_COMPLETED_AFTER_CUTOFF',
  WISH_DEADLINE_MINUS_3_DAYS: 'WISH_DEADLINE_MINUS_3_DAYS',
  WISH_DEADLINE_MINUS_1_DAY: 'WISH_DEADLINE_MINUS_1_DAY',
  WISH_TARGET_ACHIEVED_IMMEDIATE: 'WISH_TARGET_ACHIEVED_IMMEDIATE',
  APPLY_PAYMENT_SUCCESS_IMMEDIATE: 'APPLY_PAYMENT_SUCCESS_IMMEDIATE',
  APPLY_GROUPBUY_ACHIEVED_IMMEDIATE: 'APPLY_GROUPBUY_ACHIEVED_IMMEDIATE',
  APPLY_GROUPBUY_FAILED_IMMEDIATE: 'APPLY_GROUPBUY_FAILED_IMMEDIATE',
  REQUEST_OPENED_IMMEDIATE: 'REQUEST_OPENED_IMMEDIATE',
  REQUEST_REJECTED_IMMEDIATE: 'REQUEST_REJECTED_IMMEDIATE',
  REQUEST_NEW_PARTICIPANT_IMMEDIATE: 'REQUEST_NEW_PARTICIPANT_IMMEDIATE',
  REQUEST_TARGET_ACHIEVED_IMMEDIATE: 'REQUEST_TARGET_ACHIEVED_IMMEDIATE',
  REQUEST_DEADLINE_MINUS_3_DAYS: 'REQUEST_DEADLINE_MINUS_3_DAYS',
  OWNER_PICKUP_SAME_DAY_MORNING: 'OWNER_PICKUP_SAME_DAY_MORNING',
  OWNER_PICKUP_DAY_BEFORE_MORNING: 'OWNER_PICKUP_DAY_BEFORE_MORNING',
  OWNER_GROUPBUY_ACHIEVED_IMMEDIATE: 'OWNER_GROUPBUY_ACHIEVED_IMMEDIATE',
  OWNER_GROUPBUY_FAILED_IMMEDIATE: 'OWNER_GROUPBUY_FAILED_IMMEDIATE',
  OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE:
    'OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE',
  OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE:
    'OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE',
  OWNER_OPEN_REQUEST_APPROVED_IMMEDIATE:
    'OWNER_OPEN_REQUEST_APPROVED_IMMEDIATE',
  OWNER_OPEN_REQUEST_REJECTED_IMMEDIATE:
    'OWNER_OPEN_REQUEST_REJECTED_IMMEDIATE',
  OWNER_ORDER_CONFIRM_REQUIRED_IMMEDIATE:
    'OWNER_ORDER_CONFIRM_REQUIRED_IMMEDIATE',
  OWNER_ORDER_CANCELLED_IMMEDIATE: 'OWNER_ORDER_CANCELLED_IMMEDIATE',
} as const;

export type NotificationSection =
  (typeof NotificationSection)[keyof typeof NotificationSection];

export const NotificationSection = {
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  OLDER: 'OLDER',
} as const;

/**
 * 딥링크 파라미터. PICKUP_GUIDE는 participationId, GROUPBUY_DETAIL/MY_APPLYING은 groupBuyId, REQUEST_STATUS는 requestId를 사용합니다.
 */
export type NotificationItemResponseDeeplinkParams = { [key: string]: string };

export interface NotificationItemResponse {
  id: number;
  type: NotificationType;
  title: string;
  /** 알림 본문 요약 */
  body: string;
  isRead: boolean;
  occurredAt: string;
  /** @nullable */
  targetId?: number | null;
  deeplinkType: NotificationDeeplinkType;
  /** 알림 트리거 타입(1~24 시나리오 식별). 기존 데이터는 null일 수 있습니다. */
  triggerType?: NotificationTriggerType | null;
  /** 딥링크 파라미터. PICKUP_GUIDE는 participationId, GROUPBUY_DETAIL/MY_APPLYING은 groupBuyId, REQUEST_STATUS는 requestId를 사용합니다. */
  deeplinkParams: NotificationItemResponseDeeplinkParams;
  section: NotificationSection;
}

export interface NotificationListResponse {
  items: NotificationItemResponse[];
  /** @nullable */
  nextCursor?: string | null;
  hasNext: boolean;
}

export interface ApiResponseNotificationListResponse {
  success: boolean;
  data: NotificationListResponse;
  error: unknown | null;
}

export type ApiResponseNotificationUnreadCountResponseData = {
  count: number;
};

export interface ApiResponseNotificationUnreadCountResponse {
  success: boolean;
  data: ApiResponseNotificationUnreadCountResponseData;
  error: unknown | null;
}

export type ApiResponseMypageParticipationListDataItemParticipationStatus =
  (typeof ApiResponseMypageParticipationListDataItemParticipationStatus)[keyof typeof ApiResponseMypageParticipationListDataItemParticipationStatus];

export const ApiResponseMypageParticipationListDataItemParticipationStatus = {
  PENDING: 'PENDING',
  PAID_WAITING_GOAL: 'PAID_WAITING_GOAL',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  REFUND_PENDING: 'REFUND_PENDING',
  REFUNDED: 'REFUNDED',
} as const;

export type ApiResponseMypageParticipationListDataItemAchievementStatus =
  (typeof ApiResponseMypageParticipationListDataItemAchievementStatus)[keyof typeof ApiResponseMypageParticipationListDataItemAchievementStatus];

export const ApiResponseMypageParticipationListDataItemAchievementStatus = {
  BEFORE_ACHIEVED: 'BEFORE_ACHIEVED',
  ACHIEVED: 'ACHIEVED',
} as const;

/**
 * 픽업/참여 상태 조합 기반 화면 표시 상태
 */
export type ApiResponseMypageParticipationListDataItemDisplayStatus =
  (typeof ApiResponseMypageParticipationListDataItemDisplayStatus)[keyof typeof ApiResponseMypageParticipationListDataItemDisplayStatus];

export const ApiResponseMypageParticipationListDataItemDisplayStatus = {
  PICKED_UP: 'PICKED_UP',
  PAID_WAITING_GOAL: 'PAID_WAITING_GOAL',
  CONFIRMED: 'CONFIRMED',
  REFUND_PENDING: 'REFUND_PENDING',
  REFUNDED: 'REFUNDED',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
} as const;

export type ApiResponseMypageParticipationListDataItemPickupStatus =
  (typeof ApiResponseMypageParticipationListDataItemPickupStatus)[keyof typeof ApiResponseMypageParticipationListDataItemPickupStatus];

export const ApiResponseMypageParticipationListDataItemPickupStatus = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  PICKED_UP: 'PICKED_UP',
  NO_SHOW: 'NO_SHOW',
} as const;

export type ApiResponseMypageParticipationListDataItemQrAvailability =
  (typeof ApiResponseMypageParticipationListDataItemQrAvailability)[keyof typeof ApiResponseMypageParticipationListDataItemQrAvailability];

export const ApiResponseMypageParticipationListDataItemQrAvailability = {
  UNAVAILABLE: 'UNAVAILABLE',
  LOCKED: 'LOCKED',
  AVAILABLE: 'AVAILABLE',
  PICKED_UP: 'PICKED_UP',
} as const;

export type ApiResponseMypageParticipationListDataItem = {
  participationId: number;
  groupBuyId: number;
  /**
   * 카드 상품 이미지 URL
   * @nullable
   */
  thumbnailUrl: string | null;
  productName: string;
  participationStatus: ApiResponseMypageParticipationListDataItemParticipationStatus;
  /**
   * 현재 수량 기준 달성률
   * @minimum 0
   * @maximum 100
   */
  achievementRate: number;
  achievementStatus: ApiResponseMypageParticipationListDataItemAchievementStatus;
  /** 픽업/참여 상태 조합 기반 화면 표시 상태 */
  displayStatus: ApiResponseMypageParticipationListDataItemDisplayStatus;
  storeName: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  paymentAmount: number;
  /**
   * 주문 상세 결제 날짜
   * @nullable
   */
  paidAt: string | null;
  /**
   * 결제 내역 결제 수단
   * @nullable
   */
  paymentMethod: string | null;
  quantity: number;
  pickupStatus: ApiResponseMypageParticipationListDataItemPickupStatus;
  /** 공구 마감일까지 남은 일수 */
  dDay: number;
  /** PAID_WAITING_GOAL 참여이고 APPROVED 결제 주문이 있으면 true */
  canCancel: boolean;
  /** 참여 확정 후 픽업 미완료이면 /api/v1/participations/{participationId}/pickup 호출 가능 */
  canViewPickup: boolean;
  /** 참여 확정 후 픽업 미완료이면 /api/v1/participations/{participationId}/qr 호출 가능. 픽업일 전에는 QR API가 LOCKED를 반환 */
  canViewQr: boolean;
  qrAvailability: ApiResponseMypageParticipationListDataItemQrAvailability;
};

export interface ApiResponseMypageParticipationList {
  success: boolean;
  data: ApiResponseMypageParticipationListDataItem[];
  error: unknown | null;
}

export type ApiResponseMypageGroupBuyRequestListDataItemStatus =
  (typeof ApiResponseMypageGroupBuyRequestListDataItemStatus)[keyof typeof ApiResponseMypageGroupBuyRequestListDataItemStatus];

export const ApiResponseMypageGroupBuyRequestListDataItemStatus = {
  SUBMITTED: 'SUBMITTED',
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseMypageGroupBuyRequestListDataItem = {
  productName: string;
  status: ApiResponseMypageGroupBuyRequestListDataItemStatus;
  storeName: string;
  desiredPickupDate: string;
  desiredQuantity: number;
  requestId: number;
};

export interface ApiResponseMypageGroupBuyRequestList {
  success: boolean;
  data: ApiResponseMypageGroupBuyRequestListDataItem[];
  error: unknown | null;
}

export type ApiResponseParticipationPageDataContentItemAchievementStatus =
  (typeof ApiResponseParticipationPageDataContentItemAchievementStatus)[keyof typeof ApiResponseParticipationPageDataContentItemAchievementStatus];

export const ApiResponseParticipationPageDataContentItemAchievementStatus = {
  BEFORE_ACHIEVED: 'BEFORE_ACHIEVED',
  ACHIEVED: 'ACHIEVED',
} as const;

export type ApiResponseParticipationPageDataContentItem = {
  participationId: number;
  productName: string;
  storeName: string;
  /** @nullable */
  pickupDate: string | null;
  /** @nullable */
  pickupTimeStart: string | null;
  /** @nullable */
  pickupTimeEnd: string | null;
  paymentAmount: number;
  quantity: number;
  achievementRate: number;
  achievementStatus: ApiResponseParticipationPageDataContentItemAchievementStatus;
  dDay: number;
  groupBuyId: number;
  canCancel: boolean;
  canViewPickup: boolean;
  canViewQr: boolean;
};

export type ApiResponseParticipationPageData = {
  content: ApiResponseParticipationPageDataContentItem[];
  totalElements: number;
  totalPages: number;
};

export interface ApiResponseParticipationPage {
  success: boolean;
  data: ApiResponseParticipationPageData;
  error: unknown | null;
}

export type ApiResponseInProgressParticipationPageDataContentItem = {
  participationId: number;
  groupBuyId: number;
  productName: string;
  storeName: string;
  pickupAt: string;
  paidAmount: number;
  quantity: number;
  /** 0~100 정수 퍼센트 */
  achievementRate: number;
  /** 마감일까지 남은 일수 */
  dDay: number;
  participatedAt: string;
};

export type ApiResponseInProgressParticipationPageData = {
  content: ApiResponseInProgressParticipationPageDataContentItem[];
  totalElements: number;
  totalPages: number;
};

export interface ApiResponseInProgressParticipationPage {
  success: boolean;
  data: ApiResponseInProgressParticipationPageData;
  error: unknown | null;
}

export type ApiResponsePickupWaitingParticipationPageDataContentItem = {
  participationId: number;
  groupBuyId: number;
  productName: string;
  storeName: string;
  pickupAt: string;
  paidAmount: number;
  quantity: number;
  /** 마감 공구 여부 */
  isClosed: boolean;
  participatedAt: string;
};

export type ApiResponsePickupWaitingParticipationPageData = {
  content: ApiResponsePickupWaitingParticipationPageDataContentItem[];
  totalElements: number;
  totalPages: number;
};

export interface ApiResponsePickupWaitingParticipationPage {
  success: boolean;
  data: ApiResponsePickupWaitingParticipationPageData;
  error: unknown | null;
}

export type ApiResponseTabCountsData = {
  /** 진행 중 */
  inProgressCount: number;
  /** 픽업 대기 */
  pickupWaitingCount: number;
  /** 픽업 완료 */
  pickupCompletedCount: number;
  /** 환불/취소 */
  cancelledOrRefundedCount: number;
  /** 개설 요청 내역 */
  requestCount: number;
};

export interface ApiResponseTabCounts {
  success: boolean;
  data: ApiResponseTabCountsData;
  error: unknown | null;
}

export type ApiResponseOwnerSummaryData = {
  pickupWaitingCount: number;
  pickupCompletedCount: number;
  activeGroupBuyCount: number;
  /** @nullable */
  nextPickupTime: string | null;
};

export interface ApiResponseOwnerSummary {
  success: boolean;
  data: ApiResponseOwnerSummaryData;
  error: unknown | null;
}

export type ApiResponsePickupScheduleListDataItem = {
  timeSlot: string;
  totalReservationCount: number;
  waitingCount: number;
  completedCount: number;
};

export interface ApiResponsePickupScheduleList {
  success: boolean;
  data: ApiResponsePickupScheduleListDataItem[];
  error: unknown | null;
}

export type ApiResponseOwnerGroupBuyListDataItemStatus =
  (typeof ApiResponseOwnerGroupBuyListDataItemStatus)[keyof typeof ApiResponseOwnerGroupBuyListDataItemStatus];

export const ApiResponseOwnerGroupBuyListDataItemStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  FAILED: 'FAILED',
} as const;

export type ApiResponseOwnerGroupBuyListDataItem = {
  groupBuyId: number;
  productName: string;
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  /** 공구가 */
  price: number;
  deadline: string;
  status: ApiResponseOwnerGroupBuyListDataItemStatus;
};

export interface ApiResponseOwnerGroupBuyList {
  success: boolean;
  data: ApiResponseOwnerGroupBuyListDataItem[];
  error: unknown | null;
}

export type ApiResponseOwnerGroupBuySummaryData = {
  /** 진행 중 공구 건수 */
  ongoingCount: number;
  /** 달성 완료 공구 건수 */
  achievedCount: number;
  /** 오늘 픽업 예정 인원 수 */
  todayPickupUserCount: number;
  /** 정산 예정 금액 */
  settlementExpectedAmount: number;
  /** 공구 요약 데이터 비어있는지 여부 */
  isEmpty: boolean;
};

export interface ApiResponseOwnerGroupBuySummary {
  success: boolean;
  data: ApiResponseOwnerGroupBuySummaryData;
  error: unknown | null;
}

export type OwnerGroupBuyManageListItemStatus =
  (typeof OwnerGroupBuyManageListItemStatus)[keyof typeof OwnerGroupBuyManageListItemStatus];

export const OwnerGroupBuyManageListItemStatus = {
  ALL: 'ALL',
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  ENDED: 'ENDED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
} as const;

export interface OwnerGroupBuyManageListItem {
  /**
   * 실제 공구 항목일 때 사용하는 공구 ID. PENDING_APPROVAL 항목에서는 null
   * @nullable
   */
  groupBuyId?: number | null;
  /**
   * 승인대기(PENDING_APPROVAL) 항목일 때 사용하는 공구 개설 요청 ID. 실제 공구 항목에서는 null
   * @nullable
   */
  requestId?: number | null;
  productName: string;
  price: number;
  pickupDate: string;
  /** @nullable */
  deadlineDday?: number | null;
  /** @nullable */
  achievementRate?: number | null;
  /** @nullable */
  currentQuantity?: number | null;
  /** @nullable */
  targetQuantity?: number | null;
  status: OwnerGroupBuyManageListItemStatus;
}

export interface ApiResponseOwnerGroupBuyManageList {
  success: boolean;
  data: OwnerGroupBuyManageListItem[];
  error: unknown | null;
}

export type OwnerGroupBuyManageDetailStatus =
  (typeof OwnerGroupBuyManageDetailStatus)[keyof typeof OwnerGroupBuyManageDetailStatus];

export const OwnerGroupBuyManageDetailStatus = {
  ALL: 'ALL',
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  ENDED: 'ENDED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
} as const;

export interface OwnerGroupBuyManageParticipantSummary {
  totalCount: number;
  completedCount: number;
  waitingCount: number;
}

export interface OwnerGroupBuyParticipantItem {
  name: string;
  phoneNumber: string;
  productName: string;
  quantity: number;
  paymentMethod: string;
  paymentStatus: string;
  pickupTime: string;
}

export interface OwnerGroupBuyManageDetail {
  groupBuyId: number;
  status: OwnerGroupBuyManageDetailStatus;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  participantSummary: OwnerGroupBuyManageParticipantSummary;
  participants: OwnerGroupBuyParticipantItem[];
}

export interface ApiResponseOwnerGroupBuyManageDetail {
  success: boolean;
  data: OwnerGroupBuyManageDetail;
  error: unknown | null;
}

export interface OwnerGroupBuyExtensionRequest {
  /** 연장 희망 마감일시 (기존 마감일 이후) */
  extendedDeadline: string;
}

export type OwnerGroupBuyCloseReasonType =
  (typeof OwnerGroupBuyCloseReasonType)[keyof typeof OwnerGroupBuyCloseReasonType];

export const OwnerGroupBuyCloseReasonType = {
  SOLD_OUT: 'SOLD_OUT',
  STORE_CONDITION: 'STORE_CONDITION',
  OTHER: 'OTHER',
} as const;

/**
 * 사장님 공구 마감 요청 검토 상태
 */
export type GroupBuyCloseRequestReviewStatus =
  (typeof GroupBuyCloseRequestReviewStatus)[keyof typeof GroupBuyCloseRequestReviewStatus];

export const GroupBuyCloseRequestReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export interface OwnerGroupBuyCloseRequest {
  reason: OwnerGroupBuyCloseReasonType;
  /**
   * reason이 OTHER일 때 필수
   * @maxLength 100
   * @nullable
   */
  reasonDetail?: string | null;
}

export interface AdminOwnerGroupBuyCloseRequestReject {
  /**
   * 운영자 반려 사유
   * @maxLength 200
   */
  rejectionReason: string;
}

/**
 * 처리 후 공구 상태
 */
export type AdminOwnerGroupBuyCloseRequestActionGroupBuyStatus =
  (typeof AdminOwnerGroupBuyCloseRequestActionGroupBuyStatus)[keyof typeof AdminOwnerGroupBuyCloseRequestActionGroupBuyStatus];

export const AdminOwnerGroupBuyCloseRequestActionGroupBuyStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CLOSED: 'CLOSED',
} as const;

export interface AdminOwnerGroupBuyCloseRequestAction {
  /** 마감 요청을 처리한 공구 ID */
  groupBuyId: number;
  reviewStatus: GroupBuyCloseRequestReviewStatus;
  /** 처리 후 공구 상태 */
  groupBuyStatus: AdminOwnerGroupBuyCloseRequestActionGroupBuyStatus;
}

export interface ApiResponseAdminOwnerGroupBuyCloseRequestAction {
  success: boolean;
  data: AdminOwnerGroupBuyCloseRequestAction;
  error: unknown | null;
}

export interface OwnerSettlementMonthlySummary {
  year: number;
  month: number;
  settlementExpectedAmount: number;
  grossRevenueAmount: number;
  refundFeeAmount: number;
}

export interface ApiResponseOwnerSettlementMonthlySummary {
  success: boolean;
  data: OwnerSettlementMonthlySummary;
  error: unknown | null;
}

export interface OwnerSettlementMonthChip {
  year: number;
  month: number;
  label: string;
}

export interface OwnerSettlementMonthChipList {
  chips: OwnerSettlementMonthChip[];
}

export interface ApiResponseOwnerSettlementMonthChipList {
  success: boolean;
  data: OwnerSettlementMonthChipList;
  error: unknown | null;
}

/**
 * 사장님 공구 정산 상태
 */
export type OwnerSettlementStatus =
  (typeof OwnerSettlementStatus)[keyof typeof OwnerSettlementStatus];

export const OwnerSettlementStatus = {
  SETTLEMENT_COMPLETED: 'SETTLEMENT_COMPLETED',
  SETTLEMENT_PENDING: 'SETTLEMENT_PENDING',
  REFUND_PROCESSING: 'REFUND_PROCESSING',
} as const;

export interface OwnerSettlementItem {
  groupBuyId: number;
  productName: string;
  participantCount: number;
  pickupDate: string;
  amount: number;
  settlementStatus: OwnerSettlementStatus;
}

export interface OwnerSettlementItemList {
  year: number;
  month: number;
  items: OwnerSettlementItem[];
}

export interface ApiResponseOwnerSettlementItemList {
  success: boolean;
  data: OwnerSettlementItemList;
  error: unknown | null;
}

export type OwnerRefundRequestListItemStatus =
  (typeof OwnerRefundRequestListItemStatus)[keyof typeof OwnerRefundRequestListItemStatus];

export const OwnerRefundRequestListItemStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

export interface OwnerRefundRequestListItem {
  participationId: number;
  groupBuyId: number;
  productName: string;
  paymentAmount: number;
  requesterName: string;
  requesterCode: string;
  refundReasonLabel: string;
  requestedDate: string;
  status: OwnerRefundRequestListItemStatus;
  exceeded24Hours: boolean;
}

export interface OwnerRefundRequestList {
  pendingCount: number;
  completedCount: number;
  hasPendingItems: boolean;
  items: OwnerRefundRequestListItem[];
}

export interface ApiResponseOwnerRefundRequestList {
  success: boolean;
  data: OwnerRefundRequestList;
  error: unknown | null;
}

export type OwnerRefundRequestDetailStatus =
  (typeof OwnerRefundRequestDetailStatus)[keyof typeof OwnerRefundRequestDetailStatus];

export const OwnerRefundRequestDetailStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

export interface OwnerRefundRequestDetail {
  participationId: number;
  groupBuyId: number;
  productName: string;
  requesterName: string;
  requestedDate: string;
  paymentAmount: number;
  penaltyAmount: number;
  refundExpectedAmount: number;
  /** @nullable */
  refundReasonDetail?: string | null;
  status: OwnerRefundRequestDetailStatus;
}

export interface ApiResponseOwnerRefundRequestDetail {
  success: boolean;
  data: OwnerRefundRequestDetail;
  error: unknown | null;
}

export type OwnerRefundReviewActionType =
  (typeof OwnerRefundReviewActionType)[keyof typeof OwnerRefundReviewActionType];

export const OwnerRefundReviewActionType = {
  APPROVE: 'APPROVE',
  DISPUTE: 'DISPUTE',
} as const;

export interface OwnerRefundReviewSubmitRequest {
  action: OwnerRefundReviewActionType;
  /**
   * action이 DISPUTE일 때 입력
   * @maxLength 500
   * @nullable
   */
  disputeReason?: string | null;
}

export interface OwnerRefundReviewSubmitResponse {
  participationId: number;
  processed: boolean;
}

export interface ApiResponseOwnerRefundReviewSubmit {
  success: boolean;
  data: OwnerRefundReviewSubmitResponse;
  error: unknown | null;
}

export interface OwnerGroupBuyRequestCreate {
  /** 요청자가 소속된 매장 ID */
  storeId: number;
  /**
   * 공구명
   * @maxLength 30
   */
  productName: string;
  /**
   * 상품 설명
   * @maxLength 30
   */
  productDescription: string;
  /** 희망 모집 마감일시. 현재 시각 기준 최소 7일 이후여야 한다. */
  deadline: string;
  /**
   * 상품 정가
   * @minimum 1
   * @nullable
   */
  originalPrice?: number | null;
  /**
   * 공구가
   * @minimum 1
   */
  price: number;
  /**
   * 목표 수량
   * @minimum 1
   */
  targetQuantity: number;
  /**
   * 최대 수량. 목표 수량 이상이어야 한다.
   * @minimum 1
   */
  maxQuantity: number;
  /**
   * 1인 구매 제한 수량
   * @minimum 1
   * @nullable
   */
  perUserLimit?: number | null;
  /**
   * 상품 이미지 S3 key 목록. 첫 번째 key를 대표 이미지로 사용한다.
   * @minItems 1
   * @maxItems 5
   */
  imageUrls: string[];
  /** 픽업일. 공구 마감일 이후여야 한다. */
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  /** @maxLength 200 */
  pickupLocation: string;
  /**
   * @maxLength 20
   * @nullable
   */
  pickupContact?: string | null;
}

export type ApiResponseOwnerGroupBuyRequestCreatedDataStatus =
  (typeof ApiResponseOwnerGroupBuyRequestCreatedDataStatus)[keyof typeof ApiResponseOwnerGroupBuyRequestCreatedDataStatus];

export const ApiResponseOwnerGroupBuyRequestCreatedDataStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseOwnerGroupBuyRequestCreatedData = {
  requestId: number;
  status: ApiResponseOwnerGroupBuyRequestCreatedDataStatus;
};

export interface ApiResponseOwnerGroupBuyRequestCreated {
  success: boolean;
  data: ApiResponseOwnerGroupBuyRequestCreatedData;
  error: unknown | null;
}

export type ApiResponseOwnerGroupBuyRequestListDataContentItemStatus =
  (typeof ApiResponseOwnerGroupBuyRequestListDataContentItemStatus)[keyof typeof ApiResponseOwnerGroupBuyRequestListDataContentItemStatus];

export const ApiResponseOwnerGroupBuyRequestListDataContentItemStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseOwnerGroupBuyRequestListDataContentItem = {
  requestId: number;
  productName: string;
  storeName: string;
  /** @nullable */
  originalPrice?: number | null;
  price: number;
  targetQuantity: number;
  pickupDate: string;
  /** @nullable */
  requestedAt?: string | null;
  status: ApiResponseOwnerGroupBuyRequestListDataContentItemStatus;
  /** @nullable */
  rejectionReason?: string | null;
  /** @nullable */
  approvedGroupBuyId?: number | null;
};

export type ApiResponseOwnerGroupBuyRequestListData = {
  content: ApiResponseOwnerGroupBuyRequestListDataContentItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseOwnerGroupBuyRequestList {
  success: boolean;
  data: ApiResponseOwnerGroupBuyRequestListData;
  error: unknown | null;
}

export type ApiResponseOwnerGroupBuyRequestDetailDataStatus =
  (typeof ApiResponseOwnerGroupBuyRequestDetailDataStatus)[keyof typeof ApiResponseOwnerGroupBuyRequestDetailDataStatus];

export const ApiResponseOwnerGroupBuyRequestDetailDataStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseOwnerGroupBuyRequestDetailData = {
  requestId: number;
  storeId: number;
  storeName: string;
  productName: string;
  productDescription: string;
  /** @nullable */
  originalPrice?: number | null;
  price: number;
  targetQuantity: number;
  maxQuantity: number;
  /** @nullable */
  perUserLimit?: number | null;
  thumbnailUrl: string;
  imageUrls: string[];
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  /** @nullable */
  pickupContact?: string | null;
  status: ApiResponseOwnerGroupBuyRequestDetailDataStatus;
  /** @nullable */
  rejectionReason?: string | null;
  /** @nullable */
  approvedGroupBuyId?: number | null;
  /** @nullable */
  reviewedAt?: string | null;
  /** @nullable */
  requestedAt?: string | null;
};

export interface ApiResponseOwnerGroupBuyRequestDetail {
  success: boolean;
  data: ApiResponseOwnerGroupBuyRequestDetailData;
  error: unknown | null;
}

export type ApiResponseReservationPageDataContentItemStatus =
  (typeof ApiResponseReservationPageDataContentItemStatus)[keyof typeof ApiResponseReservationPageDataContentItemStatus];

export const ApiResponseReservationPageDataContentItemStatus = {
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
} as const;

export type ApiResponseReservationPageDataContentItem = {
  participationId: number;
  userName: string;
  productName: string;
  quantity: number;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  status: ApiResponseReservationPageDataContentItemStatus;
};

export type ApiResponseReservationPageData = {
  content: ApiResponseReservationPageDataContentItem[];
  waitingCount: number;
  completedCount: number;
  totalElements: number;
  totalPages: number;
};

export interface ApiResponseReservationPage {
  success: boolean;
  data: ApiResponseReservationPageData;
  error: unknown | null;
}

export type ApiResponseAdminDashboardSummaryData = {
  /** 검토 대기 환불 총 금액. 현재는 REFUND_PENDING 참여의 결제 주문 총액 기준 */
  pendingRefundAmount: number;
  /** 전일 대비 검토 대기 환불 금액 증감률(%) */
  pendingRefundAmountChangeRate: number;
  /** 개설승인 대기 건수 */
  pendingApprovalCount: number;
  /** 개설승인 대기 요청의 평균 검토 시간(분) */
  averageReviewMinutes: number;
  /** 전일 대비 개설승인 대기 요청 생성 건수 증감률(%) */
  pendingApprovalChangeRate: number;
  /** 달성된 공구 중 발주 확정 대기 건수 */
  unconfirmedOrderCount: number;
  /** 달성 후 48시간을 초과한 발주 확정 대기 건수 */
  unconfirmedOrderOver48hCount: number;
  /** 오늘 환불 처리 완료 건수 */
  todayCompletedRefundCount: number;
  /** 오늘 개설 승인/반려 처리 완료 건수 */
  todayCompletedApprovalCount: number;
  /** 48시간 초과 발주 미확정 경고 노출 여부 */
  hasOrderOver48h: boolean;
};

export interface ApiResponseAdminDashboardSummary {
  success: boolean;
  data: ApiResponseAdminDashboardSummaryData;
  error: unknown | null;
}

export interface AdminDashboardUnconfirmedOrderItem {
  /** 발주 관리 식별자. 현재는 groupBuyId와 동일 */
  orderId: number;
  groupBuyId: number;
  productName: string;
  storeName: string;
  /**
   * 공구 달성 일시
   * @nullable
   */
  achievedAt?: string | null;
  /** 최종 참여 수량 */
  finalQuantity: number;
  /** 해당 공구의 환불 대기 건수 */
  pendingRefundCount: number;
  pickupDate: string;
  /** 달성 후 경과 시간 */
  elapsedHours: number;
  /** 달성 후 48시간 초과 여부 */
  overdue: boolean;
  /** 목표 수량 대비 달성률(%) */
  progressRate: number;
  /** 사장님 연락 완료 여부 */
  ownerContacted: boolean;
  /** @nullable */
  ownerContactedAt?: string | null;
}

export type ApiResponseAdminDashboardUnconfirmedOrdersData = {
  /** 달성된 공구 중 발주 확정 대기 건수 */
  totalUnconfirmedCount: number;
  /** 달성 후 48시간을 초과한 발주 확정 대기 건수 */
  overdueCount: number;
  /** 48시간 초과 발주 미확정 경고 노출 여부 */
  hasOverdue: boolean;
  content: AdminDashboardUnconfirmedOrderItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminDashboardUnconfirmedOrders {
  success: boolean;
  data: ApiResponseAdminDashboardUnconfirmedOrdersData;
  error: unknown | null;
}

/**
 * 환불 케이스
 */
export type AdminDashboardUrgentRefundItemCaseFilter =
  (typeof AdminDashboardUrgentRefundItemCaseFilter)[keyof typeof AdminDashboardUrgentRefundItemCaseFilter];

export const AdminDashboardUrgentRefundItemCaseFilter = {
  ALL: 'ALL',
  PRE_ACHIEVEMENT_FREE_CANCEL: 'PRE_ACHIEVEMENT_FREE_CANCEL',
  POST_ACHIEVEMENT_CANCEL: 'POST_ACHIEVEMENT_CANCEL',
  PICKUP_PERIOD_NO_SHOW: 'PICKUP_PERIOD_NO_SHOW',
  OWNER_FAULT_CANCEL: 'OWNER_FAULT_CANCEL',
  TARGET_NOT_MET: 'TARGET_NOT_MET',
  DISPUTE_OR_DROPOUT_REFUND: 'DISPUTE_OR_DROPOUT_REFUND',
} as const;

export interface AdminDashboardUrgentRefundItem {
  /** 환불 요청 ID. 현재는 participationId와 동일 */
  requestId: number;
  /** 환불 케이스 */
  caseFilter: AdminDashboardUrgentRefundItemCaseFilter;
  consumerName: string;
  groupBuyName: string;
  /** 승인 전에는 환불 가능 예상 금액, 승인 후에는 승인 환불 금액 */
  refundAmount: number;
  /** 환불 요청 일시 */
  requestedAt: string;
  /** 요청 후 경과 시간(시간) */
  slaElapsedHours: number;
}

export type ApiResponseAdminDashboardUrgentRefundsData = {
  /** 요청 후 1시간을 초과한 환불 요청 건수 */
  totalUrgentCount: number;
  /** 긴급 환불 요청 존재 여부 */
  hasUrgentRefunds: boolean;
  content: AdminDashboardUrgentRefundItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminDashboardUrgentRefunds {
  success: boolean;
  data: ApiResponseAdminDashboardUrgentRefundsData;
  error: unknown | null;
}

export type AdminOrderListItemOrderStatus =
  (typeof AdminOrderListItemOrderStatus)[keyof typeof AdminOrderListItemOrderStatus];

export const AdminOrderListItemOrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

export interface AdminOrderListItem {
  /** 발주 관리 식별자. 현재는 groupBuyId와 동일 */
  orderId: number;
  groupBuyId: number;
  productName: string;
  storeName: string;
  /**
   * 공구 달성 일시
   * @nullable
   */
  achievedAt?: string | null;
  /** 최종 참여 수량 */
  finalQuantity: number;
  /** 해당 공구의 환불 대기 건수 */
  pendingRefundCount: number;
  pickupDate: string;
  /** 달성 후 경과 시간 */
  elapsedHours: number;
  /** 목표 수량 대비 달성률(%) */
  progressRate: number;
  orderStatus: AdminOrderListItemOrderStatus;
  /** @nullable */
  ownerContactedAt?: string | null;
  /** @nullable */
  orderConfirmedAt?: string | null;
  /** 발주 확정/연락 등 운영 작업 가능 여부 */
  actionable: boolean;
}

export type ApiResponseAdminOrderPageData = {
  content: AdminOrderListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminOrderPage {
  success: boolean;
  data: ApiResponseAdminOrderPageData;
  error: unknown | null;
}

export type AdminOrderDetailOrderStatus =
  (typeof AdminOrderDetailOrderStatus)[keyof typeof AdminOrderDetailOrderStatus];

export const AdminOrderDetailOrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

export interface AdminOrderDetail {
  /** 발주 관리 식별자. 현재는 groupBuyId와 동일 */
  orderId: number;
  groupBuyId: number;
  productName: string;
  productDescription: string;
  storeName: string;
  storeAddress: string;
  /** @nullable */
  storePhoneNumber?: string | null;
  /**
   * 공구 달성 일시
   * @nullable
   */
  achievedAt?: string | null;
  /** 최종 참여 수량 */
  finalQuantity: number;
  /** 목표 수량 */
  targetQuantity: number;
  /** 해당 공구의 환불 대기 건수 */
  pendingRefundCount: number;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  /** @nullable */
  pickupContact?: string | null;
  /** 달성 후 경과 시간 */
  elapsedHours: number;
  /** 목표 수량 대비 달성률(%) */
  progressRate: number;
  orderStatus: AdminOrderDetailOrderStatus;
  /** @nullable */
  ownerContactedAt?: string | null;
  /** @nullable */
  orderConfirmedAt?: string | null;
  /** @nullable */
  orderCancelledAt?: string | null;
  /** 발주 확정/연락 등 운영 작업 가능 여부 */
  actionable: boolean;
}

export interface ApiResponseAdminOrderDetail {
  success: boolean;
  data: AdminOrderDetail;
  error: unknown | null;
}

/**
 * 티켓 유형
 */
export type AdminCsTicketListItemType =
  (typeof AdminCsTicketListItemType)[keyof typeof AdminCsTicketListItemType];

export const AdminCsTicketListItemType = {
  REFUND: 'REFUND',
  ORDER: 'ORDER',
  PICKUP: 'PICKUP',
  ACCOUNT: 'ACCOUNT',
  ETC: 'ETC',
} as const;

export type AdminCsTicketListItemPriority =
  (typeof AdminCsTicketListItemPriority)[keyof typeof AdminCsTicketListItemPriority];

export const AdminCsTicketListItemPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type AdminCsTicketListItemStatus =
  (typeof AdminCsTicketListItemStatus)[keyof typeof AdminCsTicketListItemStatus];

export const AdminCsTicketListItemStatus = {
  RECEIVED: 'RECEIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export interface AdminCsTicketListItem {
  ticketId: number;
  /** 티켓 유형 */
  type: AdminCsTicketListItemType;
  title: string;
  /** @nullable */
  consumerId?: number | null;
  /** @nullable */
  consumerName?: string | null;
  /** @nullable */
  groupBuyId?: number | null;
  /** @nullable */
  groupBuyName?: string | null;
  priority: AdminCsTicketListItemPriority;
  /** @nullable */
  assigneeName?: string | null;
  /** @nullable */
  createdAt?: string | null;
  /** 티켓 생성 후 경과 시간 */
  slaHours: number;
  status: AdminCsTicketListItemStatus;
  /** 운영 처리 가능 여부 */
  actionable: boolean;
}

export type ApiResponseAdminCsTicketPageData = {
  content: AdminCsTicketListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminCsTicketPage {
  success: boolean;
  data: ApiResponseAdminCsTicketPageData;
  error: unknown | null;
}

export type AdminCsTicketDetailType =
  (typeof AdminCsTicketDetailType)[keyof typeof AdminCsTicketDetailType];

export const AdminCsTicketDetailType = {
  REFUND: 'REFUND',
  ORDER: 'ORDER',
  PICKUP: 'PICKUP',
  ACCOUNT: 'ACCOUNT',
  ETC: 'ETC',
} as const;

export type AdminCsTicketDetailPriority =
  (typeof AdminCsTicketDetailPriority)[keyof typeof AdminCsTicketDetailPriority];

export const AdminCsTicketDetailPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type AdminCsTicketDetailStatus =
  (typeof AdminCsTicketDetailStatus)[keyof typeof AdminCsTicketDetailStatus];

export const AdminCsTicketDetailStatus = {
  RECEIVED: 'RECEIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export interface AdminCsTicketUser {
  /** @nullable */
  userId?: number | null;
  /** @nullable */
  nickname?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  phoneNumber?: string | null;
}

export interface AdminCsTicketOwner {
  storeId: number;
  storeName: string;
  /** @nullable */
  storePhoneNumber?: string | null;
}

export interface AdminCsTicketGroupBuy {
  groupBuyId: number;
  productName: string;
  storeName: string;
}

export interface AdminCsTicketDetail {
  ticketId: number;
  type: AdminCsTicketDetailType;
  title: string;
  description: string;
  priority: AdminCsTicketDetailPriority;
  status: AdminCsTicketDetailStatus;
  /** @nullable */
  createdAt?: string | null;
  /** @nullable */
  updatedAt?: string | null;
  /** 티켓 생성 후 경과 시간 */
  slaHours: number;
  consumer?: AdminCsTicketUser | null;
  owner?: AdminCsTicketOwner | null;
  groupBuy?: AdminCsTicketGroupBuy | null;
  /** @nullable */
  refundParticipationId?: number | null;
  /** @nullable */
  assigneeName?: string | null;
  /** @nullable */
  processingMemo?: string | null;
  /** @nullable */
  resolvedAt?: string | null;
  /** 운영 처리 가능 여부 */
  actionable: boolean;
}

export interface ApiResponseAdminCsTicketDetail {
  success: boolean;
  data: AdminCsTicketDetail;
  error: unknown | null;
}

/**
 * @nullable
 */
export type AdminCsTicketUpdateRequestStatus =
  | (typeof AdminCsTicketUpdateRequestStatus)[keyof typeof AdminCsTicketUpdateRequestStatus]
  | null;

export const AdminCsTicketUpdateRequestStatus = {
  RECEIVED: 'RECEIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export interface AdminCsTicketUpdateRequest {
  /** @nullable */
  status?: AdminCsTicketUpdateRequestStatus;
  /**
   * @maxLength 50
   * @nullable
   */
  assigneeName?: string | null;
  /**
   * @maxLength 1000
   * @nullable
   */
  processingMemo?: string | null;
}

export type ApiResponseAdminRequestPageDataContentItemStatus =
  (typeof ApiResponseAdminRequestPageDataContentItemStatus)[keyof typeof ApiResponseAdminRequestPageDataContentItemStatus];

export const ApiResponseAdminRequestPageDataContentItemStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseAdminRequestPageDataContentItem = {
  requestId: number;
  storeName: string;
  productName: string;
  desiredQuantity: number;
  desiredPickupDate: string;
  status: ApiResponseAdminRequestPageDataContentItemStatus;
  requesterId: number;
  /** @nullable */
  requesterName?: string | null;
  /**
   * 승인 후 생성된 공구 정가. 승인 전 요청은 null
   * @nullable
   */
  originalPrice?: number | null;
  /**
   * 승인 후 생성된 공구가. 승인 전 요청은 null
   * @nullable
   */
  price?: number | null;
  /**
   * 요청 생성 후 경과한 검토 시간(분)
   * @nullable
   */
  reviewElapsedMinutes?: number | null;
  /** 운영자가 승인/반려 등 후속 작업을 할 수 있는 상태 여부 */
  actionable: boolean;
  /** @nullable */
  createdAt: string | null;
};

export type ApiResponseAdminRequestPageData = {
  content: ApiResponseAdminRequestPageDataContentItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminRequestPage {
  success: boolean;
  data: ApiResponseAdminRequestPageData;
  error: unknown | null;
}

/**
 * @nullable
 */
export type ApiResponseAdminRequestDetailDataRequesterProvider =
  | (typeof ApiResponseAdminRequestDetailDataRequesterProvider)[keyof typeof ApiResponseAdminRequestDetailDataRequesterProvider]
  | null;

export const ApiResponseAdminRequestDetailDataRequesterProvider = {
  KAKAO: 'KAKAO',
  EMAIL: 'EMAIL',
} as const;

export type ApiResponseAdminRequestDetailDataRequester = {
  userId: number;
  /** @nullable */
  nickname?: string | null;
  /** @nullable */
  phoneNumber?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  provider?: ApiResponseAdminRequestDetailDataRequesterProvider;
};

export type ApiResponseAdminRequestDetailDataStatus =
  (typeof ApiResponseAdminRequestDetailDataStatus)[keyof typeof ApiResponseAdminRequestDetailDataStatus];

export const ApiResponseAdminRequestDetailDataStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseAdminRequestDetailDataStatusHistoryItemStatus =
  (typeof ApiResponseAdminRequestDetailDataStatusHistoryItemStatus)[keyof typeof ApiResponseAdminRequestDetailDataStatusHistoryItemStatus];

export const ApiResponseAdminRequestDetailDataStatusHistoryItemStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseAdminRequestDetailDataStatusHistoryItem = {
  status: ApiResponseAdminRequestDetailDataStatusHistoryItemStatus;
  changedAt: string;
};

export type ApiResponseAdminRequestDetailData = {
  requestId: number;
  requester: ApiResponseAdminRequestDetailDataRequester;
  storeName: string;
  /** @nullable */
  storeAddress?: string | null;
  /** @nullable */
  placeId?: string | null;
  /** @nullable */
  roadAddress?: string | null;
  /** @nullable */
  lotAddress?: string | null;
  /** @nullable */
  latitude?: number | null;
  /** @nullable */
  longitude?: number | null;
  productName: string;
  desiredQuantity: number;
  desiredPickupDate: string;
  /** @nullable */
  additionalNote?: string | null;
  status: ApiResponseAdminRequestDetailDataStatus;
  /** @nullable */
  rejectionReason?: string | null;
  /** @nullable */
  openedGroupBuyId?: number | null;
  statusHistory: ApiResponseAdminRequestDetailDataStatusHistoryItem[];
  /** @nullable */
  createdAt: string | null;
};

export interface ApiResponseAdminRequestDetail {
  success: boolean;
  data: ApiResponseAdminRequestDetailData;
  error: unknown | null;
}

export type AdminRequestStatusUpdateTargetStatus =
  (typeof AdminRequestStatusUpdateTargetStatus)[keyof typeof AdminRequestStatusUpdateTargetStatus];

export const AdminRequestStatusUpdateTargetStatus = {
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export interface AdminRequestStatusUpdate {
  targetStatus: AdminRequestStatusUpdateTargetStatus;
  /**
   * targetStatus=REJECTED 시 필수
   * @maxLength 500
   * @nullable
   */
  rejectionReason?: string | null;
  /**
   * targetStatus=OPENED 시 필수. 실제 개설된 공구 id이며 존재 검증 후 개설 알림 발송에 사용
   * @nullable
   */
  openedGroupBuyId?: number | null;
}

export interface AdminGroupBuyRequestApprove {
  /**
   * 기존 등록 매장을 사용할 때 입력. 없으면 매장명/주소/지역 정보로 신규 매장을 생성
   * @nullable
   */
  storeId?: number | null;
  /**
   * @maxLength 100
   * @nullable
   */
  storeName?: string | null;
  /**
   * @maxLength 200
   * @nullable
   */
  storeAddress?: string | null;
  /**
   * @maxLength 20
   * @nullable
   */
  storePhoneNumber?: string | null;
  /**
   * 신규 매장 생성 시 필수
   * @nullable
   */
  region?: string | null;
  /**
   * 신규 매장 생성 시 필수
   * @nullable
   */
  district?: string | null;
  /** @nullable */
  latitude?: number | null;
  /** @nullable */
  longitude?: number | null;
  /**
   * 공구 제목
   * @maxLength 100
   */
  productName: string;
  /**
   * 공구 내용
   * @maxLength 1000
   */
  productDescription: string;
  /**
   * 정가
   * @minimum 1
   * @nullable
   */
  originalPrice?: number | null;
  /**
   * 공구가
   * @minimum 1
   */
  price: number;
  /**
   * 목표 수량
   * @minimum 1
   */
  targetQuantity: number;
  /**
   * 최대 수량. 생략 시 목표 수량과 동일하게 저장
   * @minimum 1
   * @nullable
   */
  maxQuantity?: number | null;
  /**
   * 1인 구매 제한
   * @minimum 1
   * @nullable
   */
  perUserLimit?: number | null;
  /**
   * 상품 이미지 S3 key 목록
   * @minItems 1
   * @maxItems 5
   */
  imageUrls: string[];
  recruitmentStartAt: string;
  /** 모집 마감일시 */
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  /** @maxLength 200 */
  pickupLocation: string;
  /**
   * @maxLength 20
   * @nullable
   */
  pickupContact?: string | null;
}

export interface AdminGroupBuyRequestReject {
  /** @maxLength 200 */
  rejectionReason: string;
}

export type ApiResponseAdminGroupBuyRequestActionDataStatus =
  (typeof ApiResponseAdminGroupBuyRequestActionDataStatus)[keyof typeof ApiResponseAdminGroupBuyRequestActionDataStatus];

export const ApiResponseAdminGroupBuyRequestActionDataStatus = {
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseAdminGroupBuyRequestActionData = {
  requestId: number;
  status: ApiResponseAdminGroupBuyRequestActionDataStatus;
  /** @nullable */
  groupBuyId?: number | null;
};

export interface ApiResponseAdminGroupBuyRequestAction {
  success: boolean;
  data: ApiResponseAdminGroupBuyRequestActionData;
  error: unknown | null;
}

/**
 * 사장님 요청 공구 구분 칩
 */
export type AdminOwnerGroupBuyRequestListItemRequestType =
  (typeof AdminOwnerGroupBuyRequestListItemRequestType)[keyof typeof AdminOwnerGroupBuyRequestListItemRequestType];

export const AdminOwnerGroupBuyRequestListItemRequestType = {
  OWNER: 'OWNER',
} as const;

export type AdminOwnerGroupBuyRequestListItemStatus =
  (typeof AdminOwnerGroupBuyRequestListItemStatus)[keyof typeof AdminOwnerGroupBuyRequestListItemStatus];

export const AdminOwnerGroupBuyRequestListItemStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export interface AdminOwnerGroupBuyRequestListItem {
  requestId: number;
  /** 사장님 요청 공구 구분 칩 */
  requestType: AdminOwnerGroupBuyRequestListItemRequestType;
  productName: string;
  storeName: string;
  /** @nullable */
  ownerName?: string | null;
  /** @nullable */
  originalPrice: number | null;
  price: number;
  /**
   * 정가 대비 할인율(%)
   * @nullable
   */
  discountRate?: number | null;
  targetQuantity: number;
  pickupDate: string;
  /** @nullable */
  requestedAt?: string | null;
  /** 요청 생성 후 경과한 검토 시간(분) */
  reviewElapsedMinutes: number;
  status: AdminOwnerGroupBuyRequestListItemStatus;
  /** 승인/반려 작업 가능 여부 */
  actionable: boolean;
  /** @nullable */
  approvedGroupBuyId?: number | null;
}

export type ApiResponseAdminOwnerGroupBuyRequestPageData = {
  content: AdminOwnerGroupBuyRequestListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminOwnerGroupBuyRequestPage {
  success: boolean;
  data: ApiResponseAdminOwnerGroupBuyRequestPageData;
  error: unknown | null;
}

/**
 * 사장님 요청 공구 구분 칩
 */
export type AdminOwnerGroupBuyRequestDetailRequestType =
  (typeof AdminOwnerGroupBuyRequestDetailRequestType)[keyof typeof AdminOwnerGroupBuyRequestDetailRequestType];

export const AdminOwnerGroupBuyRequestDetailRequestType = {
  OWNER: 'OWNER',
} as const;

export type AdminOwnerGroupBuyRequestDetailStatus =
  (typeof AdminOwnerGroupBuyRequestDetailStatus)[keyof typeof AdminOwnerGroupBuyRequestDetailStatus];

export const AdminOwnerGroupBuyRequestDetailStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export interface AdminOwnerGroupBuyRequestOwner {
  /** @nullable */
  ownerId?: number | null;
  /** @nullable */
  nickname?: string | null;
  /** @nullable */
  phoneNumber?: string | null;
  /** @nullable */
  email?: string | null;
}

export interface AdminOwnerGroupBuyRequestStore {
  storeId: number;
  storeName: string;
  address: string;
  /** @nullable */
  phoneNumber?: string | null;
}

export interface AdminOwnerGroupBuyRequestProduct {
  productName: string;
  productDescription: string;
  /** @nullable */
  originalPrice?: number | null;
  price: number;
  /**
   * 정가 대비 할인율(%)
   * @nullable
   */
  discountRate?: number | null;
  targetQuantity: number;
  maxQuantity: number;
  /** @nullable */
  perUserLimit?: number | null;
}

export interface AdminOwnerGroupBuyRequestRecruitment {
  /**
   * 승인 후 생성된 공구의 모집 시작일시. 승인 전 요청은 null
   * @nullable
   */
  recruitmentStartAt?: string | null;
  /** 모집 마감일시 */
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  /** @nullable */
  pickupContact?: string | null;
}

export interface AdminOwnerGroupBuyRequestImage {
  imageUrl: string;
  sortOrder: number;
}

export interface AdminOwnerGroupBuyRequestDetail {
  requestId: number;
  /** 사장님 요청 공구 구분 칩 */
  requestType: AdminOwnerGroupBuyRequestDetailRequestType;
  status: AdminOwnerGroupBuyRequestDetailStatus;
  owner: AdminOwnerGroupBuyRequestOwner;
  store: AdminOwnerGroupBuyRequestStore;
  product: AdminOwnerGroupBuyRequestProduct;
  recruitment: AdminOwnerGroupBuyRequestRecruitment;
  images: AdminOwnerGroupBuyRequestImage[];
  /** 승인 확인 팝업에 표시할 이미지 장수 */
  imageCount: number;
  /**
   * @maxLength 200
   * @nullable
   */
  rejectionReason?: string | null;
  /** @nullable */
  approvedGroupBuyId?: number | null;
  /** @nullable */
  reviewedAt?: string | null;
  /** @nullable */
  requestedAt?: string | null;
  /** 승인/반려 작업 가능 여부 */
  actionable: boolean;
}

export interface ApiResponseAdminOwnerGroupBuyRequestDetail {
  success: boolean;
  data: AdminOwnerGroupBuyRequestDetail;
  error: unknown | null;
}

export interface AdminOwnerGroupBuyRequestReject {
  /** @maxLength 200 */
  rejectionReason: string;
}

export type ApiResponseAdminOwnerGroupBuyRequestActionDataStatus =
  (typeof ApiResponseAdminOwnerGroupBuyRequestActionDataStatus)[keyof typeof ApiResponseAdminOwnerGroupBuyRequestActionDataStatus];

export const ApiResponseAdminOwnerGroupBuyRequestActionDataStatus = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ApiResponseAdminOwnerGroupBuyRequestActionData = {
  requestId: number;
  status: ApiResponseAdminOwnerGroupBuyRequestActionDataStatus;
  /** @nullable */
  groupBuyId?: number | null;
};

export interface ApiResponseAdminOwnerGroupBuyRequestAction {
  success: boolean;
  data: ApiResponseAdminOwnerGroupBuyRequestActionData;
  error: unknown | null;
}

export type ApiResponseAdminRefundPageDataContentItemRefundStatus =
  (typeof ApiResponseAdminRefundPageDataContentItemRefundStatus)[keyof typeof ApiResponseAdminRefundPageDataContentItemRefundStatus];

export const ApiResponseAdminRefundPageDataContentItemRefundStatus = {
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
} as const;

export type ApiResponseAdminRefundPageDataContentItem = {
  participationId: number;
  userName: string;
  productName: string;
  storeName: string;
  paymentAmount: number;
  refundStatus: ApiResponseAdminRefundPageDataContentItemRefundStatus;
  /** @nullable */
  refundReason: string | null;
  createdAt: string;
};

export type ApiResponseAdminRefundPageData = {
  content: ApiResponseAdminRefundPageDataContentItem[];
  totalElements: number;
  totalPages: number;
};

export interface ApiResponseAdminRefundPage {
  success: boolean;
  data: ApiResponseAdminRefundPageData;
  error: unknown | null;
}

export type AdminManualRefundRefundReason =
  (typeof AdminManualRefundRefundReason)[keyof typeof AdminManualRefundRefundReason];

export const AdminManualRefundRefundReason = {
  NOT_ACHIEVED: 'NOT_ACHIEVED',
  EARLY_EXIT: 'EARLY_EXIT',
  PAYMENT_ERROR: 'PAYMENT_ERROR',
  OTHER: 'OTHER',
} as const;

export interface AdminManualRefund {
  refundReason: AdminManualRefundRefundReason;
  /**
   * @maxLength 100
   * @nullable
   */
  detailReason?: string | null;
}

export type ApiResponseAdminSettlementDashboardData = {
  year: number;
  month: number;
  /** 정산 완료 금액 합계 */
  completedSettlementAmount: number;
  /** 정산 예정 금액 합계 */
  scheduledSettlementAmount: number;
  /** 서비스 수수료 합계. 현재 정책은 0원 */
  platformFeeAmount: number;
  /** 총 거래액 합계 */
  totalTransactionAmount: number;
};

export interface ApiResponseAdminSettlementDashboard {
  success: boolean;
  data: ApiResponseAdminSettlementDashboardData;
  error: unknown | null;
}

export type AdminSettlementListItemStatus =
  (typeof AdminSettlementListItemStatus)[keyof typeof AdminSettlementListItemStatus];

export const AdminSettlementListItemStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
} as const;

export interface AdminSettlementListItem {
  /** 정산 식별자. 현재는 groupBuyId와 동일 */
  settlementId: number;
  groupBuyId: number;
  storeName: string;
  productName: string;
  /** 픽업 완료 기준일. 현재는 공구 pickupDate 기준 */
  pickupCompletedDate: string;
  /** 정산 대상 참여 인원 */
  participantCount: number;
  /** 총 결제액 */
  totalPaymentAmount: number;
  /** 환불 차감액 */
  refundDeductionAmount: number;
  /** 서비스 수수료. 현재 정책은 0원 */
  platformFeeAmount: number;
  /** 총 결제액 - 환불 차감액 */
  settlementAmount: number;
  /** 정산 예정일. 현재 정책은 pickupCompletedDate + 3일 */
  scheduledSettlementDate: string;
  status: AdminSettlementListItemStatus;
  /** 운영 작업 가능 여부 */
  actionable: boolean;
}

export type ApiResponseAdminSettlementPageData = {
  content: AdminSettlementListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface ApiResponseAdminSettlementPage {
  success: boolean;
  data: ApiResponseAdminSettlementPageData;
  error: unknown | null;
}

export type AdminSettlementDetail = AdminSettlementListItem;

export interface ApiResponseAdminSettlementDetail {
  success: boolean;
  data: AdminSettlementDetail;
  error: unknown | null;
}

/**
 * FULLTEXT 인덱스 매칭 결과 기반 분류 케이스(상품 인덱스 + 매장/주소 인덱스 hit 조합)
 */
export type ApiResponseSearchAnalysisDataSearchCase =
  (typeof ApiResponseSearchAnalysisDataSearchCase)[keyof typeof ApiResponseSearchAnalysisDataSearchCase];

export const ApiResponseSearchAnalysisDataSearchCase = {
  BOTH_DETECTED: 'BOTH_DETECTED',
  PRODUCT_ONLY: 'PRODUCT_ONLY',
  NEIGHBORHOOD_ONLY: 'NEIGHBORHOOD_ONLY',
  NONE_DETECTED: 'NONE_DETECTED',
} as const;

/**
 * 프론트 화면 분기 상태.
RESULTS=공구 결과 노출 /
EMPTY_CAN_REQUEST=검색 결과 없음, 공구 개설 요청 진입점 /
NEED_REGION/NEED_PRODUCT/NEED_BOTH=추가 키워드 입력 안내 /
AMBIGUOUS_CONFIRMATION=분류 결과 재확인 필요

 */
export type ApiResponseSearchAnalysisDataUiState =
  (typeof ApiResponseSearchAnalysisDataUiState)[keyof typeof ApiResponseSearchAnalysisDataUiState];

export const ApiResponseSearchAnalysisDataUiState = {
  RESULTS: 'RESULTS',
  EMPTY_CAN_REQUEST: 'EMPTY_CAN_REQUEST',
  NEED_REGION: 'NEED_REGION',
  NEED_PRODUCT: 'NEED_PRODUCT',
  NEED_BOTH: 'NEED_BOTH',
  AMBIGUOUS_CONFIRMATION: 'AMBIGUOUS_CONFIRMATION',
} as const;

export interface RecommendedStoreDto {
  /** 외부 장소 ID(예: 네이버 Local) */
  placeId: string;
  storeName: string;
  roadAddress: string;
  /** @nullable */
  lotAddress?: string | null;
  latitude: number;
  longitude: number;
}

export type ApiResponseSearchAnalysisData = {
  /** FULLTEXT 인덱스 매칭 결과 기반 분류 케이스(상품 인덱스 + 매장/주소 인덱스 hit 조합) */
  searchCase: ApiResponseSearchAnalysisDataSearchCase;
  /**
   * 매장/주소 인덱스가 매치된 경우 검색어, 아니면 null
   * @nullable
   */
  detectedRegion?: string | null;
  /**
   * 상품 인덱스가 매치된 경우 검색어, 아니면 null
   * @nullable
   */
  detectedProduct?: string | null;
  /** FULLTEXT 분류 신뢰도. BOTH=1.0 / 단일 인덱스 매치=0.5 / NONE=0.0 */
  confidence: number;
  /** 프론트 화면 분기 상태.
  RESULTS=공구 결과 노출 /
  EMPTY_CAN_REQUEST=검색 결과 없음, 공구 개설 요청 진입점 /
  NEED_REGION/NEED_PRODUCT/NEED_BOTH=추가 키워드 입력 안내 /
  AMBIGUOUS_CONFIRMATION=분류 결과 재확인 필요
   */
  uiState: ApiResponseSearchAnalysisDataUiState;
  /** 전체 공구 결과 개수 */
  totalCount: number;
  /** 검색된 공구 카드 목록 */
  results: GroupBuyFeedItemResponse[];
  /**
   * 검색 결과 0건(EMPTY_CAN_REQUEST) 일 때 동봉되는 동네 매장 추천 목록
   * @nullable
   */
  recommendedStores?: RecommendedStoreDto[] | null;
};

export interface ApiResponseSearchAnalysis {
  success?: boolean;
  data?: ApiResponseSearchAnalysisData;
  error?: unknown | null;
}

export interface ApiResponseRecentSearchList {
  success: boolean;
  /** 최근 검색어 목록 (최신순). 이력 없으면 빈 배열. */
  data: string[];
  error: unknown | null;
}

export type ApiResponseStoreSearchListDataStoresItem = {
  /** 외부 지도 API 장소 고유 ID (운영자 공구 개설 시 storeId 대신 활용) */
  placeId?: string;
  /** 매장명. 예) 모모양과 */
  storeName?: string;
  /** 도로명 주소. 예) 서울 성북구 화랑로11길 23 */
  roadAddress?: string;
  /**
   * 지번 주소
   * @nullable
   */
  lotAddress?: string | null;
  /** 위도 */
  latitude?: number;
  /** 경도 */
  longitude?: number;
};

export type ApiResponseStoreSearchListData = {
  /** 외부 지도 API 기반 매장 후보 목록 */
  stores?: ApiResponseStoreSearchListDataStoresItem[];
};

export interface ApiResponseStoreSearchList {
  success?: boolean;
  data?: ApiResponseStoreSearchListData;
  error?: unknown | null;
}

/**
 * 매장 추천 API 전용 단일 지역 코드. 전체/기타 지역 코드는 포함하지 않는다.
 */
export type StoreRecommendationRegionType =
  (typeof StoreRecommendationRegionType)[keyof typeof StoreRecommendationRegionType];

export const StoreRecommendationRegionType = {
  SEOUL_GANGNAM: 'SEOUL_GANGNAM',
  SEOUL_YEOKSAM: 'SEOUL_YEOKSAM',
  SEOUL_SAMSEONG: 'SEOUL_SAMSEONG',
  SEOUL_SINSA: 'SEOUL_SINSA',
  SEOUL_APGUJEONG: 'SEOUL_APGUJEONG',
  SEOUL_CHEONGDAM: 'SEOUL_CHEONGDAM',
  SEOUL_SEOCHO: 'SEOUL_SEOCHO',
  SEOUL_BANGBAE: 'SEOUL_BANGBAE',
  SEOUL_GYODAE: 'SEOUL_GYODAE',
  SEOUL_JAMSIL: 'SEOUL_JAMSIL',
  SEOUL_SINCHEON: 'SEOUL_SINCHEON',
  SEOUL_SONGPA: 'SEOUL_SONGPA',
  SEOUL_JONGNO: 'SEOUL_JONGNO',
  SEOUL_JUNGGU: 'SEOUL_JUNGGU',
  SEOUL_EULJIRO: 'SEOUL_EULJIRO',
  SEOUL_MYEONGDONG: 'SEOUL_MYEONGDONG',
  SEOUL_HONGDAE: 'SEOUL_HONGDAE',
  SEOUL_HAPJEONG: 'SEOUL_HAPJEONG',
  SEOUL_SANGSU: 'SEOUL_SANGSU',
  SEOUL_MAPO: 'SEOUL_MAPO',
  SEOUL_SEONGSU: 'SEOUL_SEONGSU',
  SEOUL_GEONDAE: 'SEOUL_GEONDAE',
  SEOUL_GWANGJIN: 'SEOUL_GWANGJIN',
  SEOUL_ITAEWON: 'SEOUL_ITAEWON',
  SEOUL_HANNAM: 'SEOUL_HANNAM',
  SEOUL_YONGSAN: 'SEOUL_YONGSAN',
  SEOUL_YEONGDEUNGPO: 'SEOUL_YEONGDEUNGPO',
  SEOUL_YEOUIDO: 'SEOUL_YEOUIDO',
  SEOUL_NOWON: 'SEOUL_NOWON',
  SEOUL_DOBONG: 'SEOUL_DOBONG',
  SEOUL_GANGBUK: 'SEOUL_GANGBUK',
  GYEONGGI_SUWON: 'GYEONGGI_SUWON',
  GYEONGGI_YEONGTONG: 'GYEONGGI_YEONGTONG',
  GYEONGGI_PALDAL: 'GYEONGGI_PALDAL',
  GYEONGGI_SEONGNAM: 'GYEONGGI_SEONGNAM',
  GYEONGGI_BUNDANG: 'GYEONGGI_BUNDANG',
  GYEONGGI_PANGYO: 'GYEONGGI_PANGYO',
  GYEONGGI_GOYANG: 'GYEONGGI_GOYANG',
  GYEONGGI_ILSAN: 'GYEONGGI_ILSAN',
  GYEONGGI_YONGIN: 'GYEONGGI_YONGIN',
  GYEONGGI_SUJI: 'GYEONGGI_SUJI',
  GYEONGGI_GIHEUNG: 'GYEONGGI_GIHEUNG',
  GYEONGGI_BUCHEON: 'GYEONGGI_BUCHEON',
  GYEONGGI_JUNGDONG: 'GYEONGGI_JUNGDONG',
  GYEONGGI_SANGDONG: 'GYEONGGI_SANGDONG',
  GYEONGGI_ANSAN: 'GYEONGGI_ANSAN',
  GYEONGGI_DANWON: 'GYEONGGI_DANWON',
  GYEONGGI_SANGROK: 'GYEONGGI_SANGROK',
  GYEONGGI_NAMYANGJU: 'GYEONGGI_NAMYANGJU',
  GYEONGGI_DASAN: 'GYEONGGI_DASAN',
  GYEONGGI_BYEOLNAE: 'GYEONGGI_BYEOLNAE',
  GYEONGGI_ANYANG: 'GYEONGGI_ANYANG',
  GYEONGGI_PYEONGCHON: 'GYEONGGI_PYEONGCHON',
  GYEONGGI_BEOMGYE: 'GYEONGGI_BEOMGYE',
  GYEONGGI_HWASEONG: 'GYEONGGI_HWASEONG',
  GYEONGGI_DONGTAN: 'GYEONGGI_DONGTAN',
  GYEONGGI_PAJU: 'GYEONGGI_PAJU',
  GYEONGGI_UNJEONG: 'GYEONGGI_UNJEONG',
  INCHEON_SONGDO: 'INCHEON_SONGDO',
  INCHEON_YEONSU: 'INCHEON_YEONSU',
  INCHEON_GUWOL: 'INCHEON_GUWOL',
  INCHEON_NAMDONG: 'INCHEON_NAMDONG',
  INCHEON_BUPYEONG: 'INCHEON_BUPYEONG',
  INCHEON_GYEYANG: 'INCHEON_GYEYANG',
  INCHEON_CHEONGNA: 'INCHEON_CHEONGNA',
  INCHEON_SEOGU: 'INCHEON_SEOGU',
  INCHEON_JUAN: 'INCHEON_JUAN',
  INCHEON_MICHUHOL: 'INCHEON_MICHUHOL',
  INCHEON_YEONGJONGDO: 'INCHEON_YEONGJONGDO',
  INCHEON_JUNGGU: 'INCHEON_JUNGGU',
  GANGWON_CHUNCHEON: 'GANGWON_CHUNCHEON',
  GANGWON_WONJU: 'GANGWON_WONJU',
  GANGWON_GANGNEUNG: 'GANGWON_GANGNEUNG',
  GANGWON_SOKCHO: 'GANGWON_SOKCHO',
  GANGWON_YANGYANG: 'GANGWON_YANGYANG',
  GANGWON_DONGHAE: 'GANGWON_DONGHAE',
  GANGWON_SAMCHEOK: 'GANGWON_SAMCHEOK',
  DAEJEON_DUNSAN: 'DAEJEON_DUNSAN',
  DAEJEON_SEOGU: 'DAEJEON_SEOGU',
  DAEJEON_EUNHAENG: 'DAEJEON_EUNHAENG',
  DAEJEON_DAEHEUNG: 'DAEJEON_DAEHEUNG',
  DAEJEON_JUNGGU: 'DAEJEON_JUNGGU',
  DAEJEON_YUSEONG: 'DAEJEON_YUSEONG',
  DAEJEON_DOAN: 'DAEJEON_DOAN',
  DAEJEON_DONGGU: 'DAEJEON_DONGGU',
  DAEJEON_DAEDEOK: 'DAEJEON_DAEDEOK',
  SEJONG_SEJONG: 'SEJONG_SEJONG',
  CHUNGNAM_CHEONAN: 'CHUNGNAM_CHEONAN',
  CHUNGNAM_SINBU: 'CHUNGNAM_SINBU',
  CHUNGNAM_DUJEONG: 'CHUNGNAM_DUJEONG',
  CHUNGNAM_ASAN: 'CHUNGNAM_ASAN',
  CHUNGNAM_TANGJEONG: 'CHUNGNAM_TANGJEONG',
  CHUNGNAM_DANGJIN: 'CHUNGNAM_DANGJIN',
  CHUNGNAM_SEOSAN: 'CHUNGNAM_SEOSAN',
  CHUNGNAM_GYERYONG: 'CHUNGNAM_GYERYONG',
  CHUNGNAM_NONSAN: 'CHUNGNAM_NONSAN',
  CHUNGBUK_CHEONGJU: 'CHUNGBUK_CHEONGJU',
  CHUNGBUK_SANGDANG: 'CHUNGBUK_SANGDANG',
  CHUNGBUK_HEUNGDEOK: 'CHUNGBUK_HEUNGDEOK',
  CHUNGBUK_CHUNGJU: 'CHUNGBUK_CHUNGJU',
  CHUNGBUK_JECHEON: 'CHUNGBUK_JECHEON',
  CHUNGBUK_EUMSEONG: 'CHUNGBUK_EUMSEONG',
  CHUNGBUK_JINCHEON: 'CHUNGBUK_JINCHEON',
  BUSAN_SEOMYEON: 'BUSAN_SEOMYEON',
  BUSAN_JEONPO: 'BUSAN_JEONPO',
  BUSAN_JINGU: 'BUSAN_JINGU',
  BUSAN_HAEUNDAE: 'BUSAN_HAEUNDAE',
  BUSAN_CENTUM: 'BUSAN_CENTUM',
  BUSAN_MARINE_CITY: 'BUSAN_MARINE_CITY',
  BUSAN_GWANGALLI: 'BUSAN_GWANGALLI',
  BUSAN_SUYEONG: 'BUSAN_SUYEONG',
  BUSAN_NAMCHEON: 'BUSAN_NAMCHEON',
  BUSAN_NAMPO: 'BUSAN_NAMPO',
  BUSAN_JUNGGU: 'BUSAN_JUNGGU',
  BUSAN_YEONGDO: 'BUSAN_YEONGDO',
  BUSAN_DONGRAE: 'BUSAN_DONGRAE',
  BUSAN_YEONSAN: 'BUSAN_YEONSAN',
  BUSAN_BUSANDAE: 'BUSAN_BUSANDAE',
  BUSAN_SAHA: 'BUSAN_SAHA',
  BUSAN_HADAN: 'BUSAN_HADAN',
  ULSAN_SAMSAN: 'ULSAN_SAMSAN',
  ULSAN_DALDONG: 'ULSAN_DALDONG',
  ULSAN_NAMGU: 'ULSAN_NAMGU',
  ULSAN_SEONGNAM: 'ULSAN_SEONGNAM',
  ULSAN_JUNGGU: 'ULSAN_JUNGGU',
  ULSAN_DONGGU: 'ULSAN_DONGGU',
  ULSAN_BUKGU: 'ULSAN_BUKGU',
  ULSAN_ULJU: 'ULSAN_ULJU',
  GYEONGNAM_CHANGWON: 'GYEONGNAM_CHANGWON',
  GYEONGNAM_SANGNAM: 'GYEONGNAM_SANGNAM',
  GYEONGNAM_UICHANG: 'GYEONGNAM_UICHANG',
  GYEONGNAM_GIMHAE: 'GYEONGNAM_GIMHAE',
  GYEONGNAM_YANGSAN: 'GYEONGNAM_YANGSAN',
  GYEONGNAM_JINJU: 'GYEONGNAM_JINJU',
  GYEONGNAM_GEOJE: 'GYEONGNAM_GEOJE',
  GYEONGNAM_TONGYEONG: 'GYEONGNAM_TONGYEONG',
  GYEONGBUK_POHANG: 'GYEONGBUK_POHANG',
  GYEONGBUK_GYEONGJU: 'GYEONGBUK_GYEONGJU',
  GYEONGBUK_HWANGRIDAN_GIL: 'GYEONGBUK_HWANGRIDAN_GIL',
  GYEONGBUK_GUMI: 'GYEONGBUK_GUMI',
  GYEONGBUK_GYEONGSAN: 'GYEONGBUK_GYEONGSAN',
  GYEONGBUK_ANDONG: 'GYEONGBUK_ANDONG',
  DAEGU_DONGSEONGNO: 'DAEGU_DONGSEONGNO',
  DAEGU_JUNGGU: 'DAEGU_JUNGGU',
  DAEGU_SUSEONGGU: 'DAEGU_SUSEONGGU',
  DAEGU_BEOMEO: 'DAEGU_BEOMEO',
  DAEGU_SANGIN: 'DAEGU_SANGIN',
  DAEGU_DALSEO: 'DAEGU_DALSEO',
  DAEGU_CHILGOK: 'DAEGU_CHILGOK',
  DAEGU_BUKGU: 'DAEGU_BUKGU',
  DAEGU_DONGGU: 'DAEGU_DONGGU',
  GWANGJU_SANGMU_JIGU: 'GWANGJU_SANGMU_JIGU',
  GWANGJU_CHIPYEONG: 'GWANGJU_CHIPYEONG',
  GWANGJU_SEOGU: 'GWANGJU_SEOGU',
  GWANGJU_DONGMYEONGDONG: 'GWANGJU_DONGMYEONGDONG',
  GWANGJU_CHUNGJANGRO: 'GWANGJU_CHUNGJANGRO',
  GWANGJU_DONGGU: 'GWANGJU_DONGGU',
  GWANGJU_SUWAN: 'GWANGJU_SUWAN',
  GWANGJU_CHEOMDAN: 'GWANGJU_CHEOMDAN',
  GWANGJU_GWANGSANGU: 'GWANGJU_GWANGSANGU',
  GWANGJU_BONGSEON: 'GWANGJU_BONGSEON',
  GWANGJU_NAMGU: 'GWANGJU_NAMGU',
  GWANGJU_BUKGU: 'GWANGJU_BUKGU',
  JEONNAM_YEOSU: 'JEONNAM_YEOSU',
  JEONNAM_SUNCHEON: 'JEONNAM_SUNCHEON',
  JEONNAM_MOKPO: 'JEONNAM_MOKPO',
  JEONNAM_NAMAK: 'JEONNAM_NAMAK',
  JEONNAM_NAJU: 'JEONNAM_NAJU',
  JEONBUK_JEONJU: 'JEONBUK_JEONJU',
  JEONBUK_GAEKRIDANGIL: 'JEONBUK_GAEKRIDANGIL',
  JEONBUK_WANSAN: 'JEONBUK_WANSAN',
  JEONBUK_IKSAN: 'JEONBUK_IKSAN',
  JEONBUK_GUNSAN: 'JEONBUK_GUNSAN',
  JEJU_JEJU_SI: 'JEJU_JEJU_SI',
  JEJU_AEWOL: 'JEJU_AEWOL',
  JEJU_HALLIM: 'JEJU_HALLIM',
  JEJU_JOCHEON: 'JEJU_JOCHEON',
  JEJU_GUJWA: 'JEJU_GUJWA',
  JEJU_SEOGWIPO_SI: 'JEJU_SEOGWIPO_SI',
  JEJU_JUNGMUN: 'JEJU_JUNGMUN',
  JEJU_ANDEOK: 'JEJU_ANDEOK',
  JEJU_SEONGSAN: 'JEJU_SEONGSAN',
  JEJU_PYOSEON: 'JEJU_PYOSEON',
} as const;

export interface StoreRecommendationRequest {
  region: StoreRecommendationRegionType;
  /**
   * 확정된 상품 조건
   * @maxLength 100
   */
  productName: string;
}

export type ApiResponseStoreRecommendationDataStoresItem = {
  /** 네이버 장소 고유 ID */
  placeId: string;
  /** HTML 태그가 제거된 매장명 */
  storeName: string;
  /** 도로명 주소 */
  roadAddress: string;
  /**
   * 지번 주소
   * @nullable
   */
  lotAddress?: string | null;
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
  /** 네이버 Local Search 카테고리 */
  category: string;
  /** 주소가 요청 region을 포함하는지 여부 */
  addressMatched: boolean;
  /** 카테고리가 상품 조건과 관련 있는지 여부 */
  categoryMatched: boolean;
  /** 자사 DB 등록 매장 여부 */
  registeredStore: boolean;
  /** 과거 공구 이력이 있는 매장 여부 */
  previousGroupBuyStore: boolean;
};

export type ApiResponseStoreRecommendationData = {
  /** 추천 검색에 사용된 단일 지역 라벨 */
  region: string;
  productName: string;
  /** 추천 매장 후보 목록. 최대 10개이며 fallback 시 빈 배열. */
  stores: ApiResponseStoreRecommendationDataStoresItem[];
};

export interface ApiResponseStoreRecommendation {
  success?: boolean;
  data?: ApiResponseStoreRecommendationData;
  error?: unknown | null;
}

/**
 * 이미지 업로드 카테고리
 */
export type ImageUploadCategory =
  (typeof ImageUploadCategory)[keyof typeof ImageUploadCategory];

export const ImageUploadCategory = {
  THUMBNAIL: 'THUMBNAIL',
  PRODUCT: 'PRODUCT',
} as const;

export interface ImagePresignedUploadItemRequest {
  category: ImageUploadCategory;
  /** 원본 파일명 */
  fileName: string;
  /** 파일 Content-Type */
  contentType: string;
}

export interface ImagePresignedUploadRequest {
  /**
   * 공구 ID. 생성 전 단계면 null
   * @nullable
   */
  groupBuyId?: number | null;
  /** 발급 대상 파일 목록 */
  files: ImagePresignedUploadItemRequest[];
}

export interface ImagePresignedUploadItemResponse {
  category: ImageUploadCategory;
  /** S3 Object Key */
  key: string;
  /** S3 업로드용 Presigned URL */
  uploadUrl: string;
  method: string;
}

export interface ImagePresignedUploadResponse {
  /** 발급 결과 목록 */
  items: ImagePresignedUploadItemResponse[];
}

export interface ApiResponseImagePresignedUpload {
  success: boolean;
  data: ImagePresignedUploadResponse;
  error: unknown | null;
}

export interface ImageDeleteRequest {
  /** 삭제할 S3 key 목록 */
  keys: string[];
}

export interface ImageDeleteResponse {
  /** 삭제 완료 key 목록 */
  deletedKeys: string[];
  /** 삭제 실패 key 목록 */
  failedKeys: string[];
}

export interface ApiResponseImageDelete {
  success: boolean;
  data: ImageDeleteResponse;
  error: unknown | null;
}

/**
 * 성공 (데이터 없음)
 */
export type SuccessNoDataResponse = ApiResponseEmpty;

/**
 * 잘못된 요청
 */
export type BadRequestResponse = ApiResponseError;

/**
 * 인증 실패
 */
export type UnauthorizedResponse = ApiResponseError;

/**
 * 권한 없음
 */
export type ForbiddenResponse = ApiResponseError;

/**
 * 리소스 없음
 */
export type NotFoundResponse = ApiResponseError;

/**
 * 상태 충돌
 */
export type ConflictResponse = ApiResponseError;

/**
 * 요청 횟수 초과
 */
export type TooManyRequestsResponse = ApiResponseError;

export type PageParameter = number;

export type SizeParameter = number;

export type GetApiV1UsersNicknameAvailabilityParams = {
  /**
   * 2~10자, 한글/영문/숫자만 허용
   * @minLength 2
   * @maxLength 10
   * @pattern ^[A-Za-z0-9가-힣]{2,10}$
   */
  nickname: string;
};

export type GetApiV1AuthEmailAvailabilityParams = {
  email: string;
};

export type GetApiV1GroupBuysParams = {
  /**
   * 전체/마감임박/달성임박 단일 선택 칩
   */
  filter?: GetApiV1GroupBuysFilter;
  /**
   * 지역/세부지역 통합 필터 (복수 선택, 최대 10개, 예: SEOUL_ALL / SEOUL_GANGNAM_YEOKSAM_SAMSEONG)
   * @maxItems 10
   */
  districts?: DistrictType[];
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1GroupBuysFilter =
  (typeof GetApiV1GroupBuysFilter)[keyof typeof GetApiV1GroupBuysFilter];

export const GetApiV1GroupBuysFilter = {
  ALL: 'ALL',
  CLOSING_SOON: 'CLOSING_SOON',
  ALMOST_ACHIEVED: 'ALMOST_ACHIEVED',
} as const;

export type GetApiV1GroupBuysProgressParams = {
  /**
   * 조회할 공구 ID 목록 (양수 ID만 허용, 최대 20개)
   * @maxItems 20
   */
  ids: number[];
};

export type PostApiV1SearchBody = {
  /** @minLength 1 */
  keyword: string;
};

export type GetApiV1StoresSearchParams = {
  /**
   * 매장명 또는 주소 검색어
   * @minLength 1
   */
  keyword: string;
};

export type PostApiV1GroupBuyOpenRequestsBody = {
  /**
   * 알림 신청 대상 지역(동/구 등)
   * @maxLength 50
   */
  region: string;
  /**
   * 알림 신청 대상 상품명
   * @maxLength 100
   */
  productName: string;
};

export type GetApiV1WishlistsParams = {
  /**
   * ALL=전체 / CLOSING_SOON=마감임박(D-3) / OPEN=모집중
   */
  filter?: GetApiV1WishlistsFilter;
  /**
   * true면 마감 공고 제외, false면 마감 포함
   */
  excludeClosed?: boolean;
  sort?: GetApiV1WishlistsSort;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1WishlistsFilter =
  (typeof GetApiV1WishlistsFilter)[keyof typeof GetApiV1WishlistsFilter];

export const GetApiV1WishlistsFilter = {
  ALL: 'ALL',
  CLOSING_SOON: 'CLOSING_SOON',
  OPEN: 'OPEN',
} as const;

export type GetApiV1WishlistsSort =
  (typeof GetApiV1WishlistsSort)[keyof typeof GetApiV1WishlistsSort];

export const GetApiV1WishlistsSort = {
  LATEST: 'LATEST',
  DEADLINE: 'DEADLINE',
} as const;

export type GetApiV1AdminDashboardUnconfirmedOrdersParams = {
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminDashboardUrgentRefundsParams = {
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminOrdersParams = {
  /**
   * OVERDUE_48H=48시간 초과, PENDING=확정 대기, CONFIRMED=확정 완료, ALL=전체
   */
  status?: GetApiV1AdminOrdersStatus;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminOrdersStatus =
  (typeof GetApiV1AdminOrdersStatus)[keyof typeof GetApiV1AdminOrdersStatus];

export const GetApiV1AdminOrdersStatus = {
  OVERDUE_48H: 'OVERDUE_48H',
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ALL: 'ALL',
} as const;

export type GetApiV1AdminCsTicketsParams = {
  /**
   * RECEIVED=접수, IN_PROGRESS=처리중, COMPLETED=완료, ALL=전체
   */
  status?: GetApiV1AdminCsTicketsStatus;
  /**
   * 티켓 ID, 제목, 소비자 닉네임/이메일/전화번호, 공구명 검색어
   */
  keyword?: string;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminCsTicketsStatus =
  (typeof GetApiV1AdminCsTicketsStatus)[keyof typeof GetApiV1AdminCsTicketsStatus];

export const GetApiV1AdminCsTicketsStatus = {
  RECEIVED: 'RECEIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ALL: 'ALL',
} as const;

export type GetApiV1GroupBuysGroupBuyIdCheckoutParams = {
  /**
   * 참여 수량
   * @minimum 1
   */
  quantity: number;
};

export type GetApiV1NotificationsParams = {
  /**
 * 알림 카테고리 필터
- 소비자 역할: `ALL`, `WISH`, `APPLY`, `PICKUP`, `REQUEST`
- 사장님 역할: `ALL`, `TODAY_PICKUP`, `REMINDER`, `CONFIRMED`, `CANCELLED`

 */
  category?: GetApiV1NotificationsCategory;
  /**
   * 다음 페이지 조회 커서. 형식: `{occurredAt}|{id}`
   */
  cursor?: string;
  /**
   * 조회 개수 (1~100, 기본 20)
   * @minimum 1
   * @maximum 100
   */
  limit?: number;
};

export type GetApiV1NotificationsCategory =
  (typeof GetApiV1NotificationsCategory)[keyof typeof GetApiV1NotificationsCategory];

export const GetApiV1NotificationsCategory = {
  ALL: 'ALL',
  WISH: 'WISH',
  APPLY: 'APPLY',
  PICKUP: 'PICKUP',
  REQUEST: 'REQUEST',
  TODAY_PICKUP: 'TODAY_PICKUP',
  REMINDER: 'REMINDER',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

export type GetApiV1UsersMeParticipationsParams = {
  /**
   * IN_PROGRESS=진행 중 / PICKUP_WAITING=픽업 대기 / PICKUP_COMPLETED=픽업 완료 / CANCELLED_OR_REFUNDED=환불·취소
   */
  status: GetApiV1UsersMeParticipationsStatus;
};

export type GetApiV1UsersMeParticipationsStatus =
  (typeof GetApiV1UsersMeParticipationsStatus)[keyof typeof GetApiV1UsersMeParticipationsStatus];

export const GetApiV1UsersMeParticipationsStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  PICKUP_WAITING: 'PICKUP_WAITING',
  PICKUP_COMPLETED: 'PICKUP_COMPLETED',
  CANCELLED_OR_REFUNDED: 'CANCELLED_OR_REFUNDED',
} as const;

export type GetApiV1UsersMeParticipationsInProgressParams = {
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1UsersMeParticipationsPickupWaitingParams = {
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1OwnerGroupBuysManageParams = {
  /**
   * 상태 필터 (기본값 ALL)
   */
  filter?: GetApiV1OwnerGroupBuysManageFilter;
};

export type GetApiV1OwnerGroupBuysManageFilter =
  (typeof GetApiV1OwnerGroupBuysManageFilter)[keyof typeof GetApiV1OwnerGroupBuysManageFilter];

export const GetApiV1OwnerGroupBuysManageFilter = {
  ALL: 'ALL',
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  ENDED: 'ENDED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
} as const;

export type GetApiV1OwnerSettlementsMonthlySummaryParams = {
  year: number;
  /**
   * @minimum 1
   * @maximum 12
   */
  month: number;
};

export type GetApiV1OwnerSettlementsItemsParams = {
  /**
   * @minimum 2000
   * @maximum 2100
   */
  year: number;
  /**
   * @minimum 1
   * @maximum 12
   */
  month: number;
};

export type GetApiV1OwnerSettlementsRefundRequestsParams = {
  tab?: GetApiV1OwnerSettlementsRefundRequestsTab;
};

export type GetApiV1OwnerSettlementsRefundRequestsTab =
  (typeof GetApiV1OwnerSettlementsRefundRequestsTab)[keyof typeof GetApiV1OwnerSettlementsRefundRequestsTab];

export const GetApiV1OwnerSettlementsRefundRequestsTab = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

export type GetApiV1OwnerGroupBuyRequestsParams = {
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1OwnerReservationsParams = {
  status?: GetApiV1OwnerReservationsStatus;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1OwnerReservationsStatus =
  (typeof GetApiV1OwnerReservationsStatus)[keyof typeof GetApiV1OwnerReservationsStatus];

export const GetApiV1OwnerReservationsStatus = {
  ALL: 'ALL',
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
} as const;

export type GetApiV1AdminGroupBuyRequestsParams = {
  status?: GetApiV1AdminGroupBuyRequestsStatus;
  /**
   * 요청 ID, 상품명, 가게명, 요청자 닉네임/이메일/전화번호 검색어
   */
  keyword?: string;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminGroupBuyRequestsStatus =
  (typeof GetApiV1AdminGroupBuyRequestsStatus)[keyof typeof GetApiV1AdminGroupBuyRequestsStatus];

export const GetApiV1AdminGroupBuyRequestsStatus = {
  ALL: 'ALL',
  IN_REVIEW: 'IN_REVIEW',
  IN_CONTACT: 'IN_CONTACT',
  OPENED: 'OPENED',
  REJECTED: 'REJECTED',
} as const;

export type GetApiV1AdminOwnerGroupBuyRequestsParams = {
  /**
   * 미입력 시 전체 조회
   */
  status?: GetApiV1AdminOwnerGroupBuyRequestsStatus;
  /**
   * 요청 ID, 공구명, 사장님 닉네임, 매장명 검색어
   */
  keyword?: string;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminOwnerGroupBuyRequestsStatus =
  (typeof GetApiV1AdminOwnerGroupBuyRequestsStatus)[keyof typeof GetApiV1AdminOwnerGroupBuyRequestsStatus];

export const GetApiV1AdminOwnerGroupBuyRequestsStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type GetApiV1AdminRefundsParams = {
  status?: GetApiV1AdminRefundsStatus;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminRefundsStatus =
  (typeof GetApiV1AdminRefundsStatus)[keyof typeof GetApiV1AdminRefundsStatus];

export const GetApiV1AdminRefundsStatus = {
  ALL: 'ALL',
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
} as const;

export type GetApiV1AdminSettlementsDashboardParams = {
  year: number;
  /**
   * @minimum 1
   * @maximum 12
   */
  month: number;
};

export type GetApiV1AdminSettlementsParams = {
  year: number;
  /**
   * @minimum 1
   * @maximum 12
   */
  month: number;
  /**
   * SCHEDULED=정산 예정, COMPLETED=정산 완료, ALL=전체
   */
  status?: GetApiV1AdminSettlementsStatus;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminSettlementsStatus =
  (typeof GetApiV1AdminSettlementsStatus)[keyof typeof GetApiV1AdminSettlementsStatus];

export const GetApiV1AdminSettlementsStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  ALL: 'ALL',
} as const;
