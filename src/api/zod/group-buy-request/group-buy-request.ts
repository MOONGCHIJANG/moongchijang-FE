/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 매장명 또는 주소 입력 시 외부 지도/장소 API 기반 매장 후보 목록을 반환한다.
각 항목은 매장명과 주소를 함께 포함한다. 예: 모모양과 / 서울 성북구 화랑로11길 23

 * @summary 매장 검색 자동완성 (2.1.1-1)
 */

export const GetApiV1StoresSearchQueryParams = zod.object({
  keyword: zod.string().min(1).describe('매장명 또는 주소 검색어'),
});

export const GetApiV1StoresSearchResponse = zod.object({
  success: zod.boolean().optional(),
  data: zod
    .object({
      stores: zod
        .array(
          zod.object({
            placeId: zod
              .string()
              .optional()
              .describe(
                '외부 지도 API 장소 고유 ID (운영자 공구 개설 시 storeId 대신 활용)',
              ),
            storeName: zod.string().optional().describe('매장명. 예) 모모양과'),
            roadAddress: zod
              .string()
              .optional()
              .describe('도로명 주소. 예) 서울 성북구 화랑로11길 23'),
            lotAddress: zod.string().nullish().describe('지번 주소'),
            latitude: zod.number().optional().describe('위도'),
            longitude: zod.number().optional().describe('경도'),
            imageUrl: zod
              .string()
              .nullish()
              .describe('추천 매장 표시용 이미지 URL'),
          }),
        )
        .optional()
        .describe('외부 지도 API 기반 매장 후보 목록'),
    })
    .optional(),
  error: zod.unknown().nullish(),
});

/**
 * @summary 공구 개설 요청 제출
 */
export const postApiV1GroupBuyRequestsBodyStoreNameMax = 100;

export const postApiV1GroupBuyRequestsBodyStoreAddressMax = 200;

export const postApiV1GroupBuyRequestsBodyPlaceIdMax = 100;

export const postApiV1GroupBuyRequestsBodyRoadAddressMax = 200;

export const postApiV1GroupBuyRequestsBodyLotAddressMax = 200;

export const postApiV1GroupBuyRequestsBodyProductNameMax = 100;

export const postApiV1GroupBuyRequestsBodyAdditionalNoteMax = 500;

export const PostApiV1GroupBuyRequestsBody = zod.object({
  storeName: zod.string().max(postApiV1GroupBuyRequestsBodyStoreNameMax),
  storeAddress: zod
    .string()
    .max(postApiV1GroupBuyRequestsBodyStoreAddressMax)
    .nullish()
    .describe(
      '매장 주소. roadAddress가 함께 전달되면 서버는 roadAddress를 우선 저장한다.',
    ),
  placeId: zod
    .string()
    .max(postApiV1GroupBuyRequestsBodyPlaceIdMax)
    .nullish()
    .describe('네이버 장소 고유 ID'),
  roadAddress: zod
    .string()
    .max(postApiV1GroupBuyRequestsBodyRoadAddressMax)
    .nullish()
    .describe('네이버 장소 도로명 주소'),
  lotAddress: zod
    .string()
    .max(postApiV1GroupBuyRequestsBodyLotAddressMax)
    .nullish()
    .describe('네이버 장소 지번 주소'),
  latitude: zod.number().nullish().describe('네이버 장소 위도'),
  longitude: zod.number().nullish().describe('네이버 장소 경도'),
  productName: zod.string().max(postApiV1GroupBuyRequestsBodyProductNameMax),
  desiredQuantity: zod.number().min(1),
  desiredPickupDate: zod.iso.date().describe('오늘 이후 날짜'),
  additionalNote: zod
    .string()
    .max(postApiV1GroupBuyRequestsBodyAdditionalNoteMax)
    .nullish(),
});

/**
 * @summary 내 공구 요청 목록 조회
 */
export const GetApiV1GroupBuyRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      requestId: zod.number(),
      storeName: zod.string(),
      storeAddress: zod.string().nullish(),
      placeId: zod.string().nullish(),
      roadAddress: zod.string().nullish(),
      lotAddress: zod.string().nullish(),
      latitude: zod.number().nullish(),
      longitude: zod.number().nullish(),
      productName: zod.string(),
      desiredQuantity: zod.number(),
      desiredPickupDate: zod.iso.date(),
      additionalNote: zod.string().nullish(),
      status: zod
        .enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED'])
        .describe(
          'IN_REVIEW=검토 중 \/ IN_CONTACT=매장 컨택 중 \/\nOPENED=공구 개설 완료 \/ REJECTED=개설 불가\n',
        ),
      rejectionReason: zod
        .string()
        .nullable()
        .describe('status=REJECTED 시 노출'),
      openedGroupBuyId: zod
        .number()
        .nullable()
        .describe('status=OPENED 시 개설된 공구 id'),
      statusHistory: zod.array(
        zod.object({
          status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
          changedAt: zod.iso
            .datetime({ offset: true })
            .describe(
              "UTC 기준 상태 변경 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`",
            ),
        }),
      ),
      createdAt: zod.iso
        .datetime({ offset: true })
        .describe(
          "UTC 기준 요청 생성 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`",
        ),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 요청 상세 조회
 */
export const GetApiV1GroupBuyRequestsRequestIdParams = zod.object({
  requestId: zod.number(),
});

export const GetApiV1GroupBuyRequestsRequestIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    requestId: zod.number(),
    storeName: zod.string(),
    storeAddress: zod.string().nullish(),
    placeId: zod.string().nullish(),
    roadAddress: zod.string().nullish(),
    lotAddress: zod.string().nullish(),
    latitude: zod.number().nullish(),
    longitude: zod.number().nullish(),
    productName: zod.string(),
    desiredQuantity: zod.number(),
    desiredPickupDate: zod.iso.date(),
    additionalNote: zod.string().nullish(),
    status: zod
      .enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED'])
      .describe(
        'IN_REVIEW=검토 중 \/ IN_CONTACT=매장 컨택 중 \/\nOPENED=공구 개설 완료 \/ REJECTED=개설 불가\n',
      ),
    rejectionReason: zod
      .string()
      .nullable()
      .describe('status=REJECTED 시 노출'),
    openedGroupBuyId: zod
      .number()
      .nullable()
      .describe('status=OPENED 시 개설된 공구 id'),
    statusHistory: zod.array(
      zod.object({
        status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
        changedAt: zod.iso
          .datetime({ offset: true })
          .describe(
            "UTC 기준 상태 변경 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`",
          ),
      }),
    ),
    createdAt: zod.iso
      .datetime({ offset: true })
      .describe("UTC 기준 요청 생성 시각. 응답 형식은 `yyyy-MM-dd'T'HH:mm:ss`"),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 특정 지역/상품 조합으로 공구가 개설되면 알림을 받기 위해 등록한다.
검색 결과가 비어 있을 때(EMPTY_CAN_REQUEST 상태) 진입 가능한 진입점이다.

 * @summary 공구 개설 알림 신청
 */
export const postApiV1GroupBuyOpenRequestsBodyRegionMax = 50;

export const postApiV1GroupBuyOpenRequestsBodyProductNameMax = 100;

export const PostApiV1GroupBuyOpenRequestsBody = zod.object({
  region: zod
    .string()
    .max(postApiV1GroupBuyOpenRequestsBodyRegionMax)
    .describe('알림 신청 대상 지역(동\/구 등)'),
  productName: zod
    .string()
    .max(postApiV1GroupBuyOpenRequestsBodyProductNameMax)
    .describe('알림 신청 대상 상품명'),
});

/**
 * 1.1.4-9 매장 추천 바텀시트용 API.

Case 1~4의 바텀시트에서 동네·상품 조건이 모두 확정된 후 CTA 버튼을 탭하면,
백엔드는 네이버 Local Search API를 조회하여 해당 조건에 맞는 매장 후보를 검색한다.

매장 후보는 최대 10개까지 반환하며, 추천 매장 후보는 다음 기준을 반영해 정렬한다.

- 네이버 Local Search API의 기본 관련도 순서
- 매장 주소가 선택한 동네와 일치하거나 포함되는지 여부
- 매장 카테고리가 상품 조건과 관련 있는지 여부
- 자사 DB에 등록된 매장인지 여부
- 해당 매장의 과거 공구 이력이 있는지 여부

네이버 결과가 0건이거나 네이버 API 호출 실패/timeout이 발생하면 `stores=[]`를 반환하며,
프론트는 기존 공구 개설 요청 플로우로 fallback한다.

중복 매장은 하나로 합쳐 반환하고, 매장명에 포함된 HTML 태그는 제거해서 반환한다.

 * @summary 매장 추천 바텀시트용 네이버 Local Search 매장 후보 조회
 */
export const postApiV1GroupBuyOpenRequestsStoreRecommendationsBodyProductNameMax = 100;

export const PostApiV1GroupBuyOpenRequestsStoreRecommendationsBody = zod.object(
  {
    region: zod
      .enum([
        'SEOUL_GANGNAM',
        'SEOUL_YEOKSAM',
        'SEOUL_SAMSEONG',
        'SEOUL_SINSA',
        'SEOUL_APGUJEONG',
        'SEOUL_CHEONGDAM',
        'SEOUL_SEOCHO',
        'SEOUL_BANGBAE',
        'SEOUL_GYODAE',
        'SEOUL_JAMSIL',
        'SEOUL_SINCHEON',
        'SEOUL_SONGPA',
        'SEOUL_JONGNO',
        'SEOUL_JUNGGU',
        'SEOUL_EULJIRO',
        'SEOUL_MYEONGDONG',
        'SEOUL_HONGDAE',
        'SEOUL_HAPJEONG',
        'SEOUL_SANGSU',
        'SEOUL_MAPO',
        'SEOUL_SEONGSU',
        'SEOUL_GEONDAE',
        'SEOUL_GWANGJIN',
        'SEOUL_ITAEWON',
        'SEOUL_HANNAM',
        'SEOUL_YONGSAN',
        'SEOUL_YEONGDEUNGPO',
        'SEOUL_YEOUIDO',
        'SEOUL_NOWON',
        'SEOUL_DOBONG',
        'SEOUL_GANGBUK',
        'GYEONGGI_SUWON',
        'GYEONGGI_YEONGTONG',
        'GYEONGGI_PALDAL',
        'GYEONGGI_SEONGNAM',
        'GYEONGGI_BUNDANG',
        'GYEONGGI_PANGYO',
        'GYEONGGI_GOYANG',
        'GYEONGGI_ILSAN',
        'GYEONGGI_YONGIN',
        'GYEONGGI_SUJI',
        'GYEONGGI_GIHEUNG',
        'GYEONGGI_BUCHEON',
        'GYEONGGI_JUNGDONG',
        'GYEONGGI_SANGDONG',
        'GYEONGGI_ANSAN',
        'GYEONGGI_DANWON',
        'GYEONGGI_SANGROK',
        'GYEONGGI_NAMYANGJU',
        'GYEONGGI_DASAN',
        'GYEONGGI_BYEOLNAE',
        'GYEONGGI_ANYANG',
        'GYEONGGI_PYEONGCHON',
        'GYEONGGI_BEOMGYE',
        'GYEONGGI_HWASEONG',
        'GYEONGGI_DONGTAN',
        'GYEONGGI_PAJU',
        'GYEONGGI_UNJEONG',
        'INCHEON_SONGDO',
        'INCHEON_YEONSU',
        'INCHEON_GUWOL',
        'INCHEON_NAMDONG',
        'INCHEON_BUPYEONG',
        'INCHEON_GYEYANG',
        'INCHEON_CHEONGNA',
        'INCHEON_SEOGU',
        'INCHEON_JUAN',
        'INCHEON_MICHUHOL',
        'INCHEON_YEONGJONGDO',
        'INCHEON_JUNGGU',
        'GANGWON_CHUNCHEON',
        'GANGWON_WONJU',
        'GANGWON_GANGNEUNG',
        'GANGWON_SOKCHO',
        'GANGWON_YANGYANG',
        'GANGWON_DONGHAE',
        'GANGWON_SAMCHEOK',
        'DAEJEON_DUNSAN',
        'DAEJEON_SEOGU',
        'DAEJEON_EUNHAENG',
        'DAEJEON_DAEHEUNG',
        'DAEJEON_JUNGGU',
        'DAEJEON_YUSEONG',
        'DAEJEON_DOAN',
        'DAEJEON_DONGGU',
        'DAEJEON_DAEDEOK',
        'SEJONG_SEJONG',
        'CHUNGNAM_CHEONAN',
        'CHUNGNAM_SINBU',
        'CHUNGNAM_DUJEONG',
        'CHUNGNAM_ASAN',
        'CHUNGNAM_TANGJEONG',
        'CHUNGNAM_DANGJIN',
        'CHUNGNAM_SEOSAN',
        'CHUNGNAM_GYERYONG',
        'CHUNGNAM_NONSAN',
        'CHUNGBUK_CHEONGJU',
        'CHUNGBUK_SANGDANG',
        'CHUNGBUK_HEUNGDEOK',
        'CHUNGBUK_CHUNGJU',
        'CHUNGBUK_JECHEON',
        'CHUNGBUK_EUMSEONG',
        'CHUNGBUK_JINCHEON',
        'BUSAN_SEOMYEON',
        'BUSAN_JEONPO',
        'BUSAN_JINGU',
        'BUSAN_HAEUNDAE',
        'BUSAN_CENTUM',
        'BUSAN_MARINE_CITY',
        'BUSAN_GWANGALLI',
        'BUSAN_SUYEONG',
        'BUSAN_NAMCHEON',
        'BUSAN_NAMPO',
        'BUSAN_JUNGGU',
        'BUSAN_YEONGDO',
        'BUSAN_DONGRAE',
        'BUSAN_YEONSAN',
        'BUSAN_BUSANDAE',
        'BUSAN_SAHA',
        'BUSAN_HADAN',
        'ULSAN_SAMSAN',
        'ULSAN_DALDONG',
        'ULSAN_NAMGU',
        'ULSAN_SEONGNAM',
        'ULSAN_JUNGGU',
        'ULSAN_DONGGU',
        'ULSAN_BUKGU',
        'ULSAN_ULJU',
        'GYEONGNAM_CHANGWON',
        'GYEONGNAM_SANGNAM',
        'GYEONGNAM_UICHANG',
        'GYEONGNAM_GIMHAE',
        'GYEONGNAM_YANGSAN',
        'GYEONGNAM_JINJU',
        'GYEONGNAM_GEOJE',
        'GYEONGNAM_TONGYEONG',
        'GYEONGBUK_POHANG',
        'GYEONGBUK_GYEONGJU',
        'GYEONGBUK_HWANGRIDAN_GIL',
        'GYEONGBUK_GUMI',
        'GYEONGBUK_GYEONGSAN',
        'GYEONGBUK_ANDONG',
        'DAEGU_DONGSEONGNO',
        'DAEGU_JUNGGU',
        'DAEGU_SUSEONGGU',
        'DAEGU_BEOMEO',
        'DAEGU_SANGIN',
        'DAEGU_DALSEO',
        'DAEGU_CHILGOK',
        'DAEGU_BUKGU',
        'DAEGU_DONGGU',
        'GWANGJU_SANGMU_JIGU',
        'GWANGJU_CHIPYEONG',
        'GWANGJU_SEOGU',
        'GWANGJU_DONGMYEONGDONG',
        'GWANGJU_CHUNGJANGRO',
        'GWANGJU_DONGGU',
        'GWANGJU_SUWAN',
        'GWANGJU_CHEOMDAN',
        'GWANGJU_GWANGSANGU',
        'GWANGJU_BONGSEON',
        'GWANGJU_NAMGU',
        'GWANGJU_BUKGU',
        'JEONNAM_YEOSU',
        'JEONNAM_SUNCHEON',
        'JEONNAM_MOKPO',
        'JEONNAM_NAMAK',
        'JEONNAM_NAJU',
        'JEONBUK_JEONJU',
        'JEONBUK_GAEKRIDANGIL',
        'JEONBUK_WANSAN',
        'JEONBUK_IKSAN',
        'JEONBUK_GUNSAN',
        'JEJU_JEJU_SI',
        'JEJU_AEWOL',
        'JEJU_HALLIM',
        'JEJU_JOCHEON',
        'JEJU_GUJWA',
        'JEJU_SEOGWIPO_SI',
        'JEJU_JUNGMUN',
        'JEJU_ANDEOK',
        'JEJU_SEONGSAN',
        'JEJU_PYOSEON',
      ])
      .describe(
        '매장 추천 API 전용 단일 지역 코드. 전체\/기타 지역 코드는 포함하지 않는다.',
      ),
    productName: zod
      .string()
      .max(postApiV1GroupBuyOpenRequestsStoreRecommendationsBodyProductNameMax)
      .describe('확정된 상품 조건'),
  },
);

export const PostApiV1GroupBuyOpenRequestsStoreRecommendationsResponse =
  zod.object({
    success: zod.boolean().optional(),
    data: zod
      .object({
        region: zod.string().describe('추천 검색에 사용된 단일 지역 라벨'),
        productName: zod.string(),
        stores: zod
          .array(
            zod.object({
              placeId: zod.string().describe('네이버 장소 고유 ID'),
              storeName: zod.string().describe('HTML 태그가 제거된 매장명'),
              roadAddress: zod.string().describe('도로명 주소'),
              lotAddress: zod.string().nullish().describe('지번 주소'),
              latitude: zod.number().describe('위도'),
              longitude: zod.number().describe('경도'),
              imageUrl: zod
                .string()
                .nullish()
                .describe('추천 매장 표시용 이미지 URL'),
              category: zod.string().describe('네이버 Local Search 카테고리'),
              addressMatched: zod
                .boolean()
                .describe('주소가 요청 region을 포함하는지 여부'),
              categoryMatched: zod
                .boolean()
                .describe('카테고리가 상품 조건과 관련 있는지 여부'),
              registeredStore: zod.boolean().describe('자사 DB 등록 매장 여부'),
              previousGroupBuyStore: zod
                .boolean()
                .describe('과거 공구 이력이 있는 매장 여부'),
            }),
          )
          .describe('추천 매장 후보 목록. 최대 10개이며 fallback 시 빈 배열.'),
      })
      .optional(),
    error: zod.unknown().nullish(),
  });
