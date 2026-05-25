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
 * 탈퇴 사유(선택)
 * @nullable
 */
export type WithdrawRequestReason =
  | (typeof WithdrawRequestReason)[keyof typeof WithdrawRequestReason]
  | null;

export const WithdrawRequestReason = {
  TIME_NOT_AVAILABLE: 'TIME_NOT_AVAILABLE',
  NO_LONGER_INTERESTED: 'NO_LONGER_INTERESTED',
  PREFER_DIRECT_VISIT: 'PREFER_DIRECT_VISIT',
  BUYING_ELSEWHERE: 'BUYING_ELSEWHERE',
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
  /** @pattern ^01[0-9]-?\d{3,4}-?\d{4}$ */
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

export interface PasswordResetLinkRequest {
  email: string;
}

export interface ProfileUpdateRequest {
  /**
   * @minLength 2
   * @maxLength 10
   * @pattern ^[A-Za-z0-9가-힣]{2,10}$
   */
  nickname: string;
  /** @pattern ^01[0-9]-[0-9]{3,4}-[0-9]{4}$ */
  phoneNumber: string;
}

export type ApiResponseProfileUpdatedData = {
  id: number;
  nickname: string;
  phoneNumber: string;
  updatedAt: string;
};

export interface ApiResponseProfileUpdated {
  success: boolean;
  data: ApiResponseProfileUpdatedData;
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
   * 8~20자, 영문+숫자 포함
   * @minLength 8
   * @maxLength 20
   * @pattern ^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$
   */
  newPassword: string;
  newPasswordConfirm: string;
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

export interface GroupBuyViewerHeartbeatRequest {
  /**
   * 클라이언트가 생성/보관하는 조회 세션 식별자(UUID 권장)
   * @minLength 8
   * @maxLength 128
   */
  viewerSessionId: string;
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
  /** 알림 트리거 타입(1~14 시나리오 식별). 기존 데이터는 null일 수 있습니다. */
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
   * 상품 이미지 URL 목록. 첫 번째 이미지를 대표 이미지로 사용한다.
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
  /** 대기중 요청 건수 (처리 필요) */
  pendingRequestCount: number;
  /** 진행 중 공구 개수 */
  activeGroupBuyCount: number;
  /** 최근 30일 공구 달성률 (%). 달성완료 / 마감된 전체 공구 기준 */
  achievementRate: number;
  /** 대기 환불 건수 (처리 필요) */
  pendingRefundCount: number;
};

export interface ApiResponseAdminDashboardSummary {
  success: boolean;
  data: ApiResponseAdminDashboardSummaryData;
  error: unknown | null;
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

export type ApiResponseAdminGroupBuyListDataItemStatus =
  (typeof ApiResponseAdminGroupBuyListDataItemStatus)[keyof typeof ApiResponseAdminGroupBuyListDataItemStatus];

export const ApiResponseAdminGroupBuyListDataItemStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
} as const;

export type ApiResponseAdminGroupBuyListDataItem = {
  groupBuyId: number;
  storeName: string;
  productName: string;
  status: ApiResponseAdminGroupBuyListDataItemStatus;
  deadline: string;
  achievementRate: number;
  currentQuantity: number;
  targetQuantity: number;
  remainingQuantity: number;
  isOrderConfirmed: boolean;
  isOrderSheetSent: boolean;
};

export interface ApiResponseAdminGroupBuyList {
  success: boolean;
  data: ApiResponseAdminGroupBuyListDataItem[];
  error: unknown | null;
}

export interface AdminGroupBuyCreate {
  /** @nullable */
  requestId?: number | null;
  storeId: number;
  /** @maxLength 100 */
  productName: string;
  productDescription: string;
  /** @minimum 1 */
  price: number;
  /**
   * 목표 수량
   * @minimum 1
   */
  targetQuantity: number;
  /**
   * 최대 수량 (선착순 마감 기준)
   * @minimum 1
   */
  maxQuantity: number;
  /**
   * 유의사항
   * @nullable
   */
  notice?: string | null;
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  /**
   * 픽업 장소 주소 (매장 주소와 다를 경우 입력)
   * @nullable
   */
  pickupAddress?: string | null;
}

export interface AdminGroupBuyUpdate {
  productName?: string;
  productDescription?: string;
  /** @minimum 1 */
  price?: number;
  /** @minimum 1 */
  targetQuantity?: number;
  /** @minimum 1 */
  maxQuantity?: number;
  deadline?: string;
  pickupDate?: string;
  pickupTimeStart?: string;
  pickupTimeEnd?: string;
  pickupLocation?: string;
}

export type AdminGroupBuyDetailStatus =
  (typeof AdminGroupBuyDetailStatus)[keyof typeof AdminGroupBuyDetailStatus];

export const AdminGroupBuyDetailStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
  FAILED: 'FAILED',
} as const;

export interface AdminGroupBuyDetail {
  groupBuyId: number;
  /** @nullable */
  requestId: number | null;
  storeId: number;
  storeName: string;
  productName: string;
  productDescription: string;
  price: number;
  targetQuantity: number;
  /** @nullable */
  maxQuantity: number | null;
  currentQuantity: number;
  remainingQuantity: number;
  achievementRate: number;
  /** @nullable */
  notice: string | null;
  status: AdminGroupBuyDetailStatus;
  deadline: string;
  pickupDate: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  pickupLocation: string;
  isOrderConfirmed: boolean;
  isOrderSheetSent: boolean;
}

export type ApiResponseGroupBuyIdData = {
  groupBuyId: number;
};

export interface ApiResponseGroupBuyId {
  success: boolean;
  data: ApiResponseGroupBuyIdData;
  error: unknown | null;
}

export interface ApiResponseAdminGroupBuyDetail {
  success: boolean;
  data: AdminGroupBuyDetail;
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

export type ApiResponseSettlementPageDataContentItemEscrowStatus =
  (typeof ApiResponseSettlementPageDataContentItemEscrowStatus)[keyof typeof ApiResponseSettlementPageDataContentItemEscrowStatus];

export const ApiResponseSettlementPageDataContentItemEscrowStatus = {
  HOLDING: 'HOLDING',
  RELEASED: 'RELEASED',
} as const;

export type ApiResponseSettlementPageDataContentItem = {
  settlementId: number;
  storeName: string;
  productName: string;
  totalAmount: number;
  escrowStatus: ApiResponseSettlementPageDataContentItemEscrowStatus;
  /** @nullable */
  scheduledPaymentDate: string | null;
  /** @nullable */
  settlementMethod: string | null;
  /** @nullable */
  memo: string | null;
  createdAt: string;
};

export type ApiResponseSettlementPageData = {
  content: ApiResponseSettlementPageDataContentItem[];
  totalElements: number;
  totalPages: number;
};

export interface ApiResponseSettlementPage {
  success: boolean;
  data: ApiResponseSettlementPageData;
  error: unknown | null;
}

export type AdminSettlementCreateSettlementMethod =
  (typeof AdminSettlementCreateSettlementMethod)[keyof typeof AdminSettlementCreateSettlementMethod];

export const AdminSettlementCreateSettlementMethod = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  ESCROW_AUTO: 'ESCROW_AUTO',
} as const;

export interface AdminSettlementCreate {
  groupBuyId: number;
  scheduledPaymentDate: string;
  settlementMethod: AdminSettlementCreateSettlementMethod;
  /**
   * @maxLength 100
   * @nullable
   */
  memo?: string | null;
}

export type ApiResponseSettlementIdData = {
  settlementId: number;
};

export interface ApiResponseSettlementId {
  success: boolean;
  data: ApiResponseSettlementIdData;
  error: unknown | null;
}

/**
 * AI 키워드 분류 케이스
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
AMBIGUOUS_CONFIRMATION=AI 인식 결과 재확인 필요

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
  /** AI 키워드 분류 케이스 */
  searchCase: ApiResponseSearchAnalysisDataSearchCase;
  /**
   * AI가 감지한 동네 키워드
   * @nullable
   */
  detectedRegion?: string | null;
  /**
   * AI가 감지한 상품/베이커리 키워드
   * @nullable
   */
  detectedProduct?: string | null;
  /** AI 분류 신뢰도(0.0~1.0) */
  confidence: number;
  /** 프론트 화면 분기 상태.
  RESULTS=공구 결과 노출 /
  EMPTY_CAN_REQUEST=검색 결과 없음, 공구 개설 요청 진입점 /
  NEED_REGION/NEED_PRODUCT/NEED_BOTH=추가 키워드 입력 안내 /
  AMBIGUOUS_CONFIRMATION=AI 인식 결과 재확인 필요
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

export type GetApiV1AdminGroupBuysParams = {
  status?: GetApiV1AdminGroupBuysStatus;
};

export type GetApiV1AdminGroupBuysStatus =
  (typeof GetApiV1AdminGroupBuysStatus)[keyof typeof GetApiV1AdminGroupBuysStatus];

export const GetApiV1AdminGroupBuysStatus = {
  ALL: 'ALL',
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
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

export type GetApiV1AdminSettlementsParams = {
  escrowStatus?: GetApiV1AdminSettlementsEscrowStatus;
  page?: PageParameter;
  /**
   * @maximum 100
   */
  size?: SizeParameter;
};

export type GetApiV1AdminSettlementsEscrowStatus =
  (typeof GetApiV1AdminSettlementsEscrowStatus)[keyof typeof GetApiV1AdminSettlementsEscrowStatus];

export const GetApiV1AdminSettlementsEscrowStatus = {
  ALL: 'ALL',
  HOLDING: 'HOLDING',
  RELEASED: 'RELEASED',
} as const;
