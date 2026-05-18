/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 찜 추가
 */
export const PostApiV1GroupBuysGroupBuyIdWishlistParams = zod.object({
  groupBuyId: zod.number(),
});

/**
 * @summary 찜 해제
 */
export const DeleteApiV1GroupBuysGroupBuyIdWishlistParams = zod.object({
  groupBuyId: zod.number(),
});

export const DeleteApiV1GroupBuysGroupBuyIdWishlistResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 찜 목록 조회
 */
export const getApiV1WishlistsQueryFilterDefault = `ALL`;
export const getApiV1WishlistsQuerySortDefault = `LATEST`;
export const getApiV1WishlistsQueryPageDefault = 0;
export const getApiV1WishlistsQuerySizeDefault = 20;
export const getApiV1WishlistsQuerySizeMax = 100;

export const GetApiV1WishlistsQueryParams = zod.object({
  filter: zod
    .enum(['ALL', 'CLOSING_SOON', 'OPEN', 'CLOSED'])
    .default(getApiV1WishlistsQueryFilterDefault)
    .describe(
      'ALL=전체 \/ CLOSING_SOON=마감임박(D-3) \/ OPEN=모집중 \/ CLOSED=마감공구',
    ),
  sort: zod
    .enum(['LATEST', 'DEADLINE'])
    .default(getApiV1WishlistsQuerySortDefault),
  page: zod.number().default(getApiV1WishlistsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1WishlistsQuerySizeMax)
    .default(getApiV1WishlistsQuerySizeDefault),
});

export const GetApiV1WishlistsResponse = zod.object({
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
    totalElements: zod.number(),
    totalPages: zod.number(),
    number: zod.number(),
    size: zod.number(),
    urgentCount: zod
      .number()
      .describe('마감 24시간 이내 건수 (0이면 배너 미노출)'),
  }),
  error: zod.unknown().nullable(),
});
