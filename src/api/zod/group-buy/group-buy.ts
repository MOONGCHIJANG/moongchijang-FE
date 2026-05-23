/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 진행 중인 공구 목록(2열 카드 피드)을 페이지네이션으로 조회한다. 비로그인 허용.
- `filter=ALL`: 전체
- `filter=CLOSING_SOON`: 마감임박 (마감일 D-3 이하)
- `filter=ALMOST_ACHIEVED`: 달성임박 (달성률 80% 이상)
- 지역 필터는 `districts`로 복수 선택(최대 10개) 가능
- 클라이언트 표시는 한글 라벨, 요청 전송값은 영문 코드(enum) 사용
- 선택 규칙:
  - 같은 시/도 내 `*_ALL`과 하위 세부지역 동시 선택 불가
  - 전체 선택 개수(지역/세부지역 통합) 최대 10개

 * @summary 공구 피드 목록 조회
 */
export const getApiV1GroupBuysQueryFilterDefault = `ALL`;
export const getApiV1GroupBuysQueryDistrictsMax = 10;

export const getApiV1GroupBuysQueryPageDefault = 0;
export const getApiV1GroupBuysQuerySizeDefault = 20;
export const getApiV1GroupBuysQuerySizeMax = 100;

export const GetApiV1GroupBuysQueryParams = zod.object({
  filter: zod
    .enum(['ALL', 'CLOSING_SOON', 'ALMOST_ACHIEVED'])
    .default(getApiV1GroupBuysQueryFilterDefault)
    .describe('전체\/마감임박\/달성임박 단일 선택 칩'),
  districts: zod
    .array(
      zod.enum([
        'NATIONWIDE',
        'SEOUL_ALL',
        'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
        'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
        'SEOUL_SEOCHO_BANGBAE_GYODAE',
        'SEOUL_JAMSIL_SINCHEON_SONGPA',
        'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
        'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
        'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
        'SEOUL_ITAEWON_HANNAM_YONGSAN',
        'SEOUL_YEONGDEUNGPO_YEOUIDO',
        'SEOUL_NOWON_DOBONG_GANGBUK',
        'SEOUL_ETC',
        'GYEONGGI_ALL',
        'GYEONGGI_SUWON_YEONGTONG_PALDAL',
        'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
        'GYEONGGI_GOYANG_ILSAN',
        'GYEONGGI_YONGIN_SUJI_GIHEUNG',
        'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
        'GYEONGGI_ANSAN_DANWON_SANGROK',
        'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
        'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
        'GYEONGGI_HWASEONG_DONGTAN',
        'GYEONGGI_PAJU_UNJEONG',
        'GYEONGGI_ETC',
        'INCHEON_ALL',
        'INCHEON_SONGDO_YEONSU',
        'INCHEON_GUWOL_NAMDONG',
        'INCHEON_BUPYEONG_GYEYANG',
        'INCHEON_CHEONGNA_SEOGU',
        'INCHEON_JUAN_MICHUHOL',
        'INCHEON_YEONGJONGDO_JUNGGU',
        'GANGWON_ALL',
        'GANGWON_CHUNCHEON',
        'GANGWON_WONJU',
        'GANGWON_GANGNEUNG',
        'GANGWON_SOKCHO_YANGYANG',
        'GANGWON_DONGHAE_SAMCHEOK',
        'GANGWON_ETC',
        'DAEJEON_ALL',
        'DAEJEON_DUNSAN_SEOGU',
        'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
        'DAEJEON_YUSEONG_DOAN',
        'DAEJEON_DONGGU',
        'DAEJEON_DAEDEOK',
        'SEJONG_ALL',
        'CHUNGNAM_ALL',
        'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
        'CHUNGNAM_ASAN_TANGJEONG',
        'CHUNGNAM_DANGJIN',
        'CHUNGNAM_SEOSAN',
        'CHUNGNAM_GYERYONG_NONSAN',
        'CHUNGNAM_ETC',
        'CHUNGBUK_ALL',
        'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
        'CHUNGBUK_CHUNGJU',
        'CHUNGBUK_JECHEON',
        'CHUNGBUK_EUMSEONG_JINCHEON',
        'CHUNGBUK_ETC',
        'BUSAN_ALL',
        'BUSAN_SEOMYEON_JEONPO_JINGU',
        'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
        'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
        'BUSAN_NAMPO_JUNGGU_YEONGDO',
        'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
        'BUSAN_SAHA_HADAN',
        'BUSAN_ETC',
        'ULSAN_ALL',
        'ULSAN_SAMSAN_DALDONG_NAMGU',
        'ULSAN_SEONGNAM_JUNGGU',
        'ULSAN_DONGGU',
        'ULSAN_BUKGU',
        'ULSAN_ULJU',
        'GYEONGNAM_ALL',
        'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
        'GYEONGNAM_GIMHAE',
        'GYEONGNAM_YANGSAN',
        'GYEONGNAM_JINJU',
        'GYEONGNAM_GEOJE_TONGYEONG',
        'GYEONGNAM_ETC',
        'GYEONGBUK_ALL',
        'GYEONGBUK_POHANG',
        'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
        'GYEONGBUK_GUMI',
        'GYEONGBUK_GYEONGSAN',
        'GYEONGBUK_ANDONG',
        'GYEONGBUK_ETC',
        'DAEGU_ALL',
        'DAEGU_DONGSEONGNO_JUNGGU',
        'DAEGU_SUSEONGGU_BEOMEO',
        'DAEGU_SANGIN_DALSEO',
        'DAEGU_CHILGOK_BUKGU',
        'DAEGU_DONGGU',
        'DAEGU_ETC',
        'GWANGJU_ALL',
        'GWANGJU_SANGMU_JIGYEONG_SEOGU',
        'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
        'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
        'GWANGJU_BONGSEON_NAMGU',
        'GWANGJU_BUKGU',
        'JEONNAM_ALL',
        'JEONNAM_YEOSU',
        'JEONNAM_SUNCHEON',
        'JEONNAM_MOKPO_NAMAK',
        'JEONNAM_NAJU',
        'JEONNAM_ETC',
        'JEONBUK_ALL',
        'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
        'JEONBUK_IKSAN',
        'JEONBUK_GUNSAN',
        'JEONBUK_ETC',
        'JEJU_ALL',
        'JEJU_JEJU_SI',
        'JEJU_AEWOL_HALLIM',
        'JEJU_JOCHEON_GUJWA',
        'JEJU_SEOGWIPO_SI',
        'JEJU_JUNGMUN_ANDEOK',
        'JEJU_SEONGSAN_PYOSEON',
      ]),
    )
    .max(getApiV1GroupBuysQueryDistrictsMax)
    .optional()
    .describe(
      '지역\/세부지역 통합 필터 (복수 선택, 최대 10개, 예: SEOUL_ALL \/ SEOUL_GANGNAM_YEOKSAM_SAMSEONG)',
    ),
  page: zod.number().default(getApiV1GroupBuysQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1GroupBuysQuerySizeMax)
    .default(getApiV1GroupBuysQuerySizeDefault),
});

export const GetApiV1GroupBuysResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        id: zod.number(),
        thumbnailUrl: zod
          .string()
          .nullable()
          .describe('대표 썸네일 이미지 URL'),
        dDay: zod.number().describe('마감 D-day (예: D-3 -> 3)'),
        dDayLabel: zod.string().describe('마감 뱃지 문자열 (예: D-3)'),
        storeName: zod.string(),
        regionType: zod.enum([
          'NATIONWIDE',
          'SEOUL',
          'GYEONGGI',
          'INCHEON',
          'GANGWON',
          'DAEJEON',
          'SEJONG',
          'CHUNGNAM',
          'CHUNGBUK',
          'BUSAN',
          'ULSAN',
          'GYEONGNAM',
          'GYEONGBUK',
          'DAEGU',
          'GWANGJU',
          'JEONNAM',
          'JEONBUK',
          'JEJU',
        ]),
        regionLabel: zod.string().describe('시\/도 한글 라벨'),
        districtType: zod.enum([
          'NATIONWIDE',
          'SEOUL_ALL',
          'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
          'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
          'SEOUL_SEOCHO_BANGBAE_GYODAE',
          'SEOUL_JAMSIL_SINCHEON_SONGPA',
          'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
          'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
          'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
          'SEOUL_ITAEWON_HANNAM_YONGSAN',
          'SEOUL_YEONGDEUNGPO_YEOUIDO',
          'SEOUL_NOWON_DOBONG_GANGBUK',
          'SEOUL_ETC',
          'GYEONGGI_ALL',
          'GYEONGGI_SUWON_YEONGTONG_PALDAL',
          'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
          'GYEONGGI_GOYANG_ILSAN',
          'GYEONGGI_YONGIN_SUJI_GIHEUNG',
          'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
          'GYEONGGI_ANSAN_DANWON_SANGROK',
          'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
          'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
          'GYEONGGI_HWASEONG_DONGTAN',
          'GYEONGGI_PAJU_UNJEONG',
          'GYEONGGI_ETC',
          'INCHEON_ALL',
          'INCHEON_SONGDO_YEONSU',
          'INCHEON_GUWOL_NAMDONG',
          'INCHEON_BUPYEONG_GYEYANG',
          'INCHEON_CHEONGNA_SEOGU',
          'INCHEON_JUAN_MICHUHOL',
          'INCHEON_YEONGJONGDO_JUNGGU',
          'GANGWON_ALL',
          'GANGWON_CHUNCHEON',
          'GANGWON_WONJU',
          'GANGWON_GANGNEUNG',
          'GANGWON_SOKCHO_YANGYANG',
          'GANGWON_DONGHAE_SAMCHEOK',
          'GANGWON_ETC',
          'DAEJEON_ALL',
          'DAEJEON_DUNSAN_SEOGU',
          'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
          'DAEJEON_YUSEONG_DOAN',
          'DAEJEON_DONGGU',
          'DAEJEON_DAEDEOK',
          'SEJONG_ALL',
          'CHUNGNAM_ALL',
          'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
          'CHUNGNAM_ASAN_TANGJEONG',
          'CHUNGNAM_DANGJIN',
          'CHUNGNAM_SEOSAN',
          'CHUNGNAM_GYERYONG_NONSAN',
          'CHUNGNAM_ETC',
          'CHUNGBUK_ALL',
          'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
          'CHUNGBUK_CHUNGJU',
          'CHUNGBUK_JECHEON',
          'CHUNGBUK_EUMSEONG_JINCHEON',
          'CHUNGBUK_ETC',
          'BUSAN_ALL',
          'BUSAN_SEOMYEON_JEONPO_JINGU',
          'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
          'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
          'BUSAN_NAMPO_JUNGGU_YEONGDO',
          'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
          'BUSAN_SAHA_HADAN',
          'BUSAN_ETC',
          'ULSAN_ALL',
          'ULSAN_SAMSAN_DALDONG_NAMGU',
          'ULSAN_SEONGNAM_JUNGGU',
          'ULSAN_DONGGU',
          'ULSAN_BUKGU',
          'ULSAN_ULJU',
          'GYEONGNAM_ALL',
          'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
          'GYEONGNAM_GIMHAE',
          'GYEONGNAM_YANGSAN',
          'GYEONGNAM_JINJU',
          'GYEONGNAM_GEOJE_TONGYEONG',
          'GYEONGNAM_ETC',
          'GYEONGBUK_ALL',
          'GYEONGBUK_POHANG',
          'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
          'GYEONGBUK_GUMI',
          'GYEONGBUK_GYEONGSAN',
          'GYEONGBUK_ANDONG',
          'GYEONGBUK_ETC',
          'DAEGU_ALL',
          'DAEGU_DONGSEONGNO_JUNGGU',
          'DAEGU_SUSEONGGU_BEOMEO',
          'DAEGU_SANGIN_DALSEO',
          'DAEGU_CHILGOK_BUKGU',
          'DAEGU_DONGGU',
          'DAEGU_ETC',
          'GWANGJU_ALL',
          'GWANGJU_SANGMU_JIGYEONG_SEOGU',
          'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
          'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
          'GWANGJU_BONGSEON_NAMGU',
          'GWANGJU_BUKGU',
          'JEONNAM_ALL',
          'JEONNAM_YEOSU',
          'JEONNAM_SUNCHEON',
          'JEONNAM_MOKPO_NAMAK',
          'JEONNAM_NAJU',
          'JEONNAM_ETC',
          'JEONBUK_ALL',
          'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
          'JEONBUK_IKSAN',
          'JEONBUK_GUNSAN',
          'JEONBUK_ETC',
          'JEJU_ALL',
          'JEJU_JEJU_SI',
          'JEJU_AEWOL_HALLIM',
          'JEJU_JOCHEON_GUJWA',
          'JEJU_SEOGWIPO_SI',
          'JEJU_JUNGMUN_ANDEOK',
          'JEJU_SEONGSAN_PYOSEON',
        ]),
        districtLabel: zod.string().describe('세부지역 한글 라벨'),
        productName: zod.string(),
        price: zod.number(),
        achievementRate: zod.number().describe('달성률 % (0~100)'),
        currentQuantity: zod.number(),
        targetQuantity: zod.number(),
        pickupDateLabel: zod.string().describe('픽업 날짜 표시 문자열'),
        deadline: zod.iso
          .datetime({ offset: true })
          .describe('마감 일시 원본 값'),
      }),
    ),
    page: zod.number().describe('현재 페이지(1-base)'),
    size: zod.number().describe('페이지 크기'),
    totalPages: zod.number().describe('전체 페이지 수'),
    totalElements: zod.number(),
    hasNext: zod.boolean().describe('다음 페이지 존재 여부'),
    hasRegionalResult: zod
      .boolean()
      .describe('지역 설정 조건에 맞는 공구 존재 여부 (없으면 false)'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 공구의 상품·매장·픽업·이미지 정보를 조회한다. 비로그인 허용.
 * @summary 공구 상세 조회
 */
export const GetApiV1GroupBuysGroupBuyIdParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1GroupBuysGroupBuyIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    id: zod.number(),
    storeName: zod.string(),
    regionType: zod.enum([
      'NATIONWIDE',
      'SEOUL',
      'GYEONGGI',
      'INCHEON',
      'GANGWON',
      'DAEJEON',
      'SEJONG',
      'CHUNGNAM',
      'CHUNGBUK',
      'BUSAN',
      'ULSAN',
      'GYEONGNAM',
      'GYEONGBUK',
      'DAEGU',
      'GWANGJU',
      'JEONNAM',
      'JEONBUK',
      'JEJU',
    ]),
    regionLabel: zod.string().describe('시\/도 한글 라벨'),
    districtType: zod.enum([
      'NATIONWIDE',
      'SEOUL_ALL',
      'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
      'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
      'SEOUL_SEOCHO_BANGBAE_GYODAE',
      'SEOUL_JAMSIL_SINCHEON_SONGPA',
      'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
      'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
      'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
      'SEOUL_ITAEWON_HANNAM_YONGSAN',
      'SEOUL_YEONGDEUNGPO_YEOUIDO',
      'SEOUL_NOWON_DOBONG_GANGBUK',
      'SEOUL_ETC',
      'GYEONGGI_ALL',
      'GYEONGGI_SUWON_YEONGTONG_PALDAL',
      'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
      'GYEONGGI_GOYANG_ILSAN',
      'GYEONGGI_YONGIN_SUJI_GIHEUNG',
      'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
      'GYEONGGI_ANSAN_DANWON_SANGROK',
      'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
      'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
      'GYEONGGI_HWASEONG_DONGTAN',
      'GYEONGGI_PAJU_UNJEONG',
      'GYEONGGI_ETC',
      'INCHEON_ALL',
      'INCHEON_SONGDO_YEONSU',
      'INCHEON_GUWOL_NAMDONG',
      'INCHEON_BUPYEONG_GYEYANG',
      'INCHEON_CHEONGNA_SEOGU',
      'INCHEON_JUAN_MICHUHOL',
      'INCHEON_YEONGJONGDO_JUNGGU',
      'GANGWON_ALL',
      'GANGWON_CHUNCHEON',
      'GANGWON_WONJU',
      'GANGWON_GANGNEUNG',
      'GANGWON_SOKCHO_YANGYANG',
      'GANGWON_DONGHAE_SAMCHEOK',
      'GANGWON_ETC',
      'DAEJEON_ALL',
      'DAEJEON_DUNSAN_SEOGU',
      'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
      'DAEJEON_YUSEONG_DOAN',
      'DAEJEON_DONGGU',
      'DAEJEON_DAEDEOK',
      'SEJONG_ALL',
      'CHUNGNAM_ALL',
      'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
      'CHUNGNAM_ASAN_TANGJEONG',
      'CHUNGNAM_DANGJIN',
      'CHUNGNAM_SEOSAN',
      'CHUNGNAM_GYERYONG_NONSAN',
      'CHUNGNAM_ETC',
      'CHUNGBUK_ALL',
      'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
      'CHUNGBUK_CHUNGJU',
      'CHUNGBUK_JECHEON',
      'CHUNGBUK_EUMSEONG_JINCHEON',
      'CHUNGBUK_ETC',
      'BUSAN_ALL',
      'BUSAN_SEOMYEON_JEONPO_JINGU',
      'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
      'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
      'BUSAN_NAMPO_JUNGGU_YEONGDO',
      'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
      'BUSAN_SAHA_HADAN',
      'BUSAN_ETC',
      'ULSAN_ALL',
      'ULSAN_SAMSAN_DALDONG_NAMGU',
      'ULSAN_SEONGNAM_JUNGGU',
      'ULSAN_DONGGU',
      'ULSAN_BUKGU',
      'ULSAN_ULJU',
      'GYEONGNAM_ALL',
      'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
      'GYEONGNAM_GIMHAE',
      'GYEONGNAM_YANGSAN',
      'GYEONGNAM_JINJU',
      'GYEONGNAM_GEOJE_TONGYEONG',
      'GYEONGNAM_ETC',
      'GYEONGBUK_ALL',
      'GYEONGBUK_POHANG',
      'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
      'GYEONGBUK_GUMI',
      'GYEONGBUK_GYEONGSAN',
      'GYEONGBUK_ANDONG',
      'GYEONGBUK_ETC',
      'DAEGU_ALL',
      'DAEGU_DONGSEONGNO_JUNGGU',
      'DAEGU_SUSEONGGU_BEOMEO',
      'DAEGU_SANGIN_DALSEO',
      'DAEGU_CHILGOK_BUKGU',
      'DAEGU_DONGGU',
      'DAEGU_ETC',
      'GWANGJU_ALL',
      'GWANGJU_SANGMU_JIGYEONG_SEOGU',
      'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
      'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
      'GWANGJU_BONGSEON_NAMGU',
      'GWANGJU_BUKGU',
      'JEONNAM_ALL',
      'JEONNAM_YEOSU',
      'JEONNAM_SUNCHEON',
      'JEONNAM_MOKPO_NAMAK',
      'JEONNAM_NAJU',
      'JEONNAM_ETC',
      'JEONBUK_ALL',
      'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
      'JEONBUK_IKSAN',
      'JEONBUK_GUNSAN',
      'JEONBUK_ETC',
      'JEJU_ALL',
      'JEJU_JEJU_SI',
      'JEJU_AEWOL_HALLIM',
      'JEJU_JOCHEON_GUJWA',
      'JEJU_SEOGWIPO_SI',
      'JEJU_JUNGMUN_ANDEOK',
      'JEJU_SEONGSAN_PYOSEON',
    ]),
    districtLabel: zod.string().describe('세부지역 한글 라벨'),
    productName: zod.string(),
    productDescription: zod.string(),
    thumbnailUrl: zod.string().nullish().describe('대표 썸네일 이미지 URL'),
    imageUrls: zod.array(zod.string()),
    price: zod.number(),
    achievementRate: zod.number().describe('달성률 % (0~100)'),
    currentQuantity: zod.number(),
    targetQuantity: zod.number(),
    maxQuantity: zod.number().nullish(),
    deadline: zod.iso.datetime({ offset: true }),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    pickupDateLabel: zod.string().describe('픽업 날짜 표시 문자열'),
    pickupDateTimeLabel: zod.string().describe('픽업일시 표시용 문자열'),
    deadlineDateTimeLabel: zod.string().describe('마감일시 표시용 문자열'),
    pickupLocation: zod.string(),
    pickupLatitude: zod.number().nullish(),
    pickupLongitude: zod.number().nullish(),
    dDay: zod.number(),
    dDayLabel: zod.string().describe('마감 뱃지 문자열 (예: D-3)'),
    isWishlisted: zod.boolean(),
    isClosed: zod.boolean(),
    isParticipated: zod.boolean(),
    canParticipate: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 단일 공구 달성률 조회 (폴링용)
 */
export const GetApiV1GroupBuysGroupBuyIdProgressParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1GroupBuysGroupBuyIdProgressResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    groupBuyId: zod.number(),
    achievementRate: zod.number(),
    currentQuantity: zod.number(),
    targetQuantity: zod.number(),
    isClosed: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 공구 상세 화면 진입 시 및 체류 중 일정 주기(예: 20~30초)로 호출한다.
서버는 세션 TTL을 연장하고 최신 활성 조회자 수를 반환한다.

 * @summary 활성 조회자 heartbeat 조회/갱신
 */
export const PostApiV1GroupBuysGroupBuyIdViewersHeartbeatParams = zod.object({
  groupBuyId: zod.number(),
});

export const postApiV1GroupBuysGroupBuyIdViewersHeartbeatBodyViewerSessionIdMin = 8;
export const postApiV1GroupBuysGroupBuyIdViewersHeartbeatBodyViewerSessionIdMax = 128;

export const PostApiV1GroupBuysGroupBuyIdViewersHeartbeatBody = zod.object({
  viewerSessionId: zod
    .string()
    .min(postApiV1GroupBuysGroupBuyIdViewersHeartbeatBodyViewerSessionIdMin)
    .max(postApiV1GroupBuysGroupBuyIdViewersHeartbeatBodyViewerSessionIdMax)
    .describe('클라이언트가 생성\/보관하는 조회 세션 식별자(UUID 권장)'),
});

export const postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseDataActiveViewerCountMin = 0;

export const PostApiV1GroupBuysGroupBuyIdViewersHeartbeatResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    activeViewerCount: zod
      .number()
      .min(
        postApiV1GroupBuysGroupBuyIdViewersHeartbeatResponseDataActiveViewerCountMin,
      ),
    showFomoBadge: zod
      .boolean()
      .describe('FOMO 문구\/뱃지 노출 여부 (activeViewerCount >= threshold)'),
    threshold: zod.number().describe('노출 기준 인원 수'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 다건 공구 달성률 조회 (피드 갱신용)
 */

export const getApiV1GroupBuysProgressQueryIdsMax = 20;

export const GetApiV1GroupBuysProgressQueryParams = zod.object({
  ids: zod
    .array(zod.number().min(1))
    .max(getApiV1GroupBuysProgressQueryIdsMax)
    .describe('조회할 공구 ID 목록 (양수 ID만 허용, 최대 20개)'),
});

export const GetApiV1GroupBuysProgressResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      groupBuyId: zod.number(),
      achievementRate: zod.number(),
      currentQuantity: zod.number(),
      targetQuantity: zod.number(),
      isClosed: zod.boolean(),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * SNS 공유용 딥링크 URL 및 카드 메타데이터를 반환한다.
 * @summary 공유 메타데이터 조회
 */
export const GetApiV1GroupBuysGroupBuyIdShareParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1GroupBuysGroupBuyIdShareResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    shareUrl: zod.string(),
    title: zod.string(),
    description: zod.string(),
    imageUrl: zod.string(),
    storeName: zod.string(),
    deadline: zod.iso.datetime({ offset: true }),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}).nullable(),
    pickupTimeEnd: zod.iso.time({}).nullable(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 검색어를 입력하면 동네/베이커리 키워드를 AI로 분석하고 최근 검색어로 저장한다.
분석 결과에 따라 4가지 케이스로 분기한다.
자체 검색 결과가 없을 때 제공되는 recommendedStores는 Naver Local Search 결과 중
베이커리/디저트 도메인으로 분류된 매장만 반환한다.
- case 1: 베이커리 인식, 동네 미인식
- case 2: 동네 인식, 베이커리 미인식
- case 3: 동네+베이커리 모두 인식
- case 4: 모두 인식 불가

 * @summary 검색 실행 및 AI 키워드 분석 (1.1.4-1)
 */

export const PostApiV1SearchBody = zod.object({
  keyword: zod.string().min(1),
});

export const PostApiV1SearchResponse = zod.object({
  success: zod.boolean().optional(),
  data: zod
    .object({
      searchCase: zod
        .enum([
          'BOTH_DETECTED',
          'PRODUCT_ONLY',
          'NEIGHBORHOOD_ONLY',
          'NONE_DETECTED',
        ])
        .describe('AI 키워드 분류 케이스'),
      detectedRegion: zod
        .string()
        .nullish()
        .describe('AI가 감지한 동네 키워드'),
      detectedProduct: zod
        .string()
        .nullish()
        .describe('AI가 감지한 상품\/베이커리 키워드'),
      confidence: zod.number().describe('AI 분류 신뢰도(0.0~1.0)'),
      uiState: zod
        .enum([
          'RESULTS',
          'EMPTY_CAN_REQUEST',
          'NEED_REGION',
          'NEED_PRODUCT',
          'NEED_BOTH',
          'AMBIGUOUS_CONFIRMATION',
        ])
        .describe(
          '프론트 화면 분기 상태.\nRESULTS=공구 결과 노출 \/\nEMPTY_CAN_REQUEST=검색 결과 없음, 공구 개설 요청 진입점 \/\nNEED_REGION\/NEED_PRODUCT\/NEED_BOTH=추가 키워드 입력 안내 \/\nAMBIGUOUS_CONFIRMATION=AI 인식 결과 재확인 필요\n',
        ),
      totalCount: zod.number().describe('전체 공구 결과 개수'),
      results: zod
        .array(
          zod.object({
            id: zod.number(),
            thumbnailUrl: zod
              .string()
              .nullable()
              .describe('대표 썸네일 이미지 URL'),
            dDay: zod.number().describe('마감 D-day (예: D-3 -> 3)'),
            dDayLabel: zod.string().describe('마감 뱃지 문자열 (예: D-3)'),
            storeName: zod.string(),
            regionType: zod.enum([
              'NATIONWIDE',
              'SEOUL',
              'GYEONGGI',
              'INCHEON',
              'GANGWON',
              'DAEJEON',
              'SEJONG',
              'CHUNGNAM',
              'CHUNGBUK',
              'BUSAN',
              'ULSAN',
              'GYEONGNAM',
              'GYEONGBUK',
              'DAEGU',
              'GWANGJU',
              'JEONNAM',
              'JEONBUK',
              'JEJU',
            ]),
            regionLabel: zod.string().describe('시\/도 한글 라벨'),
            districtType: zod.enum([
              'NATIONWIDE',
              'SEOUL_ALL',
              'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
              'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
              'SEOUL_SEOCHO_BANGBAE_GYODAE',
              'SEOUL_JAMSIL_SINCHEON_SONGPA',
              'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
              'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
              'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
              'SEOUL_ITAEWON_HANNAM_YONGSAN',
              'SEOUL_YEONGDEUNGPO_YEOUIDO',
              'SEOUL_NOWON_DOBONG_GANGBUK',
              'SEOUL_ETC',
              'GYEONGGI_ALL',
              'GYEONGGI_SUWON_YEONGTONG_PALDAL',
              'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
              'GYEONGGI_GOYANG_ILSAN',
              'GYEONGGI_YONGIN_SUJI_GIHEUNG',
              'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
              'GYEONGGI_ANSAN_DANWON_SANGROK',
              'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
              'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
              'GYEONGGI_HWASEONG_DONGTAN',
              'GYEONGGI_PAJU_UNJEONG',
              'GYEONGGI_ETC',
              'INCHEON_ALL',
              'INCHEON_SONGDO_YEONSU',
              'INCHEON_GUWOL_NAMDONG',
              'INCHEON_BUPYEONG_GYEYANG',
              'INCHEON_CHEONGNA_SEOGU',
              'INCHEON_JUAN_MICHUHOL',
              'INCHEON_YEONGJONGDO_JUNGGU',
              'GANGWON_ALL',
              'GANGWON_CHUNCHEON',
              'GANGWON_WONJU',
              'GANGWON_GANGNEUNG',
              'GANGWON_SOKCHO_YANGYANG',
              'GANGWON_DONGHAE_SAMCHEOK',
              'GANGWON_ETC',
              'DAEJEON_ALL',
              'DAEJEON_DUNSAN_SEOGU',
              'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
              'DAEJEON_YUSEONG_DOAN',
              'DAEJEON_DONGGU',
              'DAEJEON_DAEDEOK',
              'SEJONG_ALL',
              'CHUNGNAM_ALL',
              'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
              'CHUNGNAM_ASAN_TANGJEONG',
              'CHUNGNAM_DANGJIN',
              'CHUNGNAM_SEOSAN',
              'CHUNGNAM_GYERYONG_NONSAN',
              'CHUNGNAM_ETC',
              'CHUNGBUK_ALL',
              'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
              'CHUNGBUK_CHUNGJU',
              'CHUNGBUK_JECHEON',
              'CHUNGBUK_EUMSEONG_JINCHEON',
              'CHUNGBUK_ETC',
              'BUSAN_ALL',
              'BUSAN_SEOMYEON_JEONPO_JINGU',
              'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
              'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
              'BUSAN_NAMPO_JUNGGU_YEONGDO',
              'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
              'BUSAN_SAHA_HADAN',
              'BUSAN_ETC',
              'ULSAN_ALL',
              'ULSAN_SAMSAN_DALDONG_NAMGU',
              'ULSAN_SEONGNAM_JUNGGU',
              'ULSAN_DONGGU',
              'ULSAN_BUKGU',
              'ULSAN_ULJU',
              'GYEONGNAM_ALL',
              'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
              'GYEONGNAM_GIMHAE',
              'GYEONGNAM_YANGSAN',
              'GYEONGNAM_JINJU',
              'GYEONGNAM_GEOJE_TONGYEONG',
              'GYEONGNAM_ETC',
              'GYEONGBUK_ALL',
              'GYEONGBUK_POHANG',
              'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
              'GYEONGBUK_GUMI',
              'GYEONGBUK_GYEONGSAN',
              'GYEONGBUK_ANDONG',
              'GYEONGBUK_ETC',
              'DAEGU_ALL',
              'DAEGU_DONGSEONGNO_JUNGGU',
              'DAEGU_SUSEONGGU_BEOMEO',
              'DAEGU_SANGIN_DALSEO',
              'DAEGU_CHILGOK_BUKGU',
              'DAEGU_DONGGU',
              'DAEGU_ETC',
              'GWANGJU_ALL',
              'GWANGJU_SANGMU_JIGYEONG_SEOGU',
              'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
              'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
              'GWANGJU_BONGSEON_NAMGU',
              'GWANGJU_BUKGU',
              'JEONNAM_ALL',
              'JEONNAM_YEOSU',
              'JEONNAM_SUNCHEON',
              'JEONNAM_MOKPO_NAMAK',
              'JEONNAM_NAJU',
              'JEONNAM_ETC',
              'JEONBUK_ALL',
              'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
              'JEONBUK_IKSAN',
              'JEONBUK_GUNSAN',
              'JEONBUK_ETC',
              'JEJU_ALL',
              'JEJU_JEJU_SI',
              'JEJU_AEWOL_HALLIM',
              'JEJU_JOCHEON_GUJWA',
              'JEJU_SEOGWIPO_SI',
              'JEJU_JUNGMUN_ANDEOK',
              'JEJU_SEONGSAN_PYOSEON',
            ]),
            districtLabel: zod.string().describe('세부지역 한글 라벨'),
            productName: zod.string(),
            price: zod.number(),
            achievementRate: zod.number().describe('달성률 % (0~100)'),
            currentQuantity: zod.number(),
            targetQuantity: zod.number(),
            pickupDateLabel: zod.string().describe('픽업 날짜 표시 문자열'),
            deadline: zod.iso
              .datetime({ offset: true })
              .describe('마감 일시 원본 값'),
          }),
        )
        .describe('검색된 공구 카드 목록'),
      recommendedStores: zod
        .array(
          zod.object({
            placeId: zod.string().describe('외부 장소 ID(예: 네이버 Local)'),
            storeName: zod.string(),
            roadAddress: zod.string(),
            lotAddress: zod.string().nullish(),
            latitude: zod.number(),
            longitude: zod.number(),
          }),
        )
        .nullish()
        .describe(
          '검색 결과 0건(EMPTY_CAN_REQUEST) 일 때 동봉되는 동네 매장 추천 목록',
        ),
    })
    .optional(),
  error: zod.unknown().nullish(),
});

/**
 * 검색창 탭 시 표시할 사용자의 최근 검색어를 최신순으로 반환한다. (1.1.4-10)
동일 검색어는 중복 저장하지 않고 가장 최근 검색 위치로 이동한다.
최근 검색어는 최대 10개까지 반환하며, 검색 이력이 없으면 빈 배열을 반환한다.

 * @summary 최근 검색어 목록 조회
 */
export const GetApiV1SearchRecentResponse = zod.object({
  success: zod.boolean(),
  data: zod
    .array(zod.string())
    .describe('최근 검색어 목록 (최신순). 이력 없으면 빈 배열.'),
  error: zod.unknown().nullable(),
});

/**
 * @summary 최근 검색어 전체 삭제
 */
export const DeleteApiV1SearchRecentResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 최근 검색어 단건 삭제
 */
export const DeleteApiV1SearchRecentKeywordParams = zod.object({
  keyword: zod.string(),
});

export const DeleteApiV1SearchRecentKeywordResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});
