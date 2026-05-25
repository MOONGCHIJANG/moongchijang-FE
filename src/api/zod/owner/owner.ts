/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 픽업 대기/완료 건수, 진행 중 공구 수, 다음 픽업 시간을 반환한다.
 * @summary 사장님 홈 요약 정보
 */
export const GetApiV1OwnerHomeSummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    pickupWaitingCount: zod.number(),
    pickupCompletedCount: zod.number(),
    activeGroupBuyCount: zod.number(),
    nextPickupTime: zod.iso.time({}).nullable(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 시간대별 픽업 현황 조회
 */
export const GetApiV1OwnerHomePickupScheduleResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      timeSlot: zod.string(),
      totalReservationCount: zod.number(),
      waitingCount: zod.number(),
      completedCount: zod.number(),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * 사장님이 소속된 매장의 공구를 조회한다.
공구 상태는 진행 중(IN_PROGRESS), 달성(ACHIEVED), 미달(FAILED) 기준으로 반환한다.

 * @summary 진행 중인 공구 목록 조회 (사장님용)
 */
export const GetApiV1OwnerGroupBuysResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      groupBuyId: zod.number(),
      productName: zod.string(),
      achievementRate: zod.number(),
      currentQuantity: zod.number(),
      targetQuantity: zod.number(),
      price: zod.number().describe('공구가'),
      deadline: zod.iso.date(),
      status: zod.enum(['IN_PROGRESS', 'ACHIEVED', 'FAILED']),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * 사장님이 본인 매장 기준으로 제출한 공구 개설 요청 목록을 조회한다.
 * @summary 사장님 공구 개설 요청 목록 조회
 */
export const getApiV1OwnerGroupBuyRequestsQueryPageDefault = 0;
export const getApiV1OwnerGroupBuyRequestsQuerySizeDefault = 20;
export const getApiV1OwnerGroupBuyRequestsQuerySizeMax = 100;

export const GetApiV1OwnerGroupBuyRequestsQueryParams = zod.object({
  page: zod.number().default(getApiV1OwnerGroupBuyRequestsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1OwnerGroupBuyRequestsQuerySizeMax)
    .default(getApiV1OwnerGroupBuyRequestsQuerySizeDefault),
});

export const GetApiV1OwnerGroupBuyRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        requestId: zod.number(),
        productName: zod.string(),
        storeName: zod.string(),
        originalPrice: zod.number().nullish(),
        price: zod.number(),
        targetQuantity: zod.number(),
        pickupDate: zod.iso.date(),
        requestedAt: zod.iso.datetime({ offset: true }).nullish(),
        status: zod.enum(['PENDING', 'APPROVED', 'REJECTED']),
        rejectionReason: zod.string().nullish(),
        approvedGroupBuyId: zod.number().nullish(),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
    number: zod.number(),
    size: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 사장님이 본인 매장에 대한 공구 개설 요청을 제출한다.
- SELLER 권한만 요청할 수 있다.
- storeId는 요청자에게 연결된 매장이어야 한다.
- imageUrls의 첫 번째 이미지를 대표 이미지(thumbnailUrl)로 저장한다.
- 희망 공구 기간은 현재 시각 기준 최소 7일 이상이어야 한다.

 * @summary 사장님 공구 개설 요청 제출
 */
export const postApiV1OwnerGroupBuyRequestsBodyProductNameMax = 30;

export const postApiV1OwnerGroupBuyRequestsBodyProductDescriptionMax = 30;

export const postApiV1OwnerGroupBuyRequestsBodyImageUrlsMax = 5;

export const postApiV1OwnerGroupBuyRequestsBodyPickupLocationMax = 200;

export const postApiV1OwnerGroupBuyRequestsBodyPickupContactMax = 20;

export const PostApiV1OwnerGroupBuyRequestsBody = zod.object({
  storeId: zod.number().describe('요청자가 소속된 매장 ID'),
  productName: zod
    .string()
    .max(postApiV1OwnerGroupBuyRequestsBodyProductNameMax)
    .describe('공구명'),
  productDescription: zod
    .string()
    .max(postApiV1OwnerGroupBuyRequestsBodyProductDescriptionMax)
    .describe('상품 설명'),
  deadline: zod.iso
    .datetime({ offset: true })
    .describe('희망 모집 마감일시. 현재 시각 기준 최소 7일 이후여야 한다.'),
  originalPrice: zod.number().min(1).nullish().describe('상품 정가'),
  price: zod.number().min(1).describe('공구가'),
  targetQuantity: zod.number().min(1).describe('목표 수량'),
  maxQuantity: zod
    .number()
    .min(1)
    .describe('최대 수량. 목표 수량 이상이어야 한다.'),
  perUserLimit: zod.number().min(1).nullish().describe('1인 구매 제한 수량'),
  imageUrls: zod
    .array(zod.string())
    .min(1)
    .max(postApiV1OwnerGroupBuyRequestsBodyImageUrlsMax)
    .describe('상품 이미지 URL 목록. 첫 번째 이미지를 대표 이미지로 사용한다.'),
  pickupDate: zod.iso.date().describe('픽업일. 공구 마감일 이후여야 한다.'),
  pickupTimeStart: zod.iso.time({}),
  pickupTimeEnd: zod.iso.time({}),
  pickupLocation: zod
    .string()
    .max(postApiV1OwnerGroupBuyRequestsBodyPickupLocationMax),
  pickupContact: zod
    .string()
    .max(postApiV1OwnerGroupBuyRequestsBodyPickupContactMax)
    .nullish(),
});

/**
 * 사장님이 본인 매장 기준으로 제출한 공구 개설 요청 상세와 승인/반려 상태를 조회한다.
 * @summary 사장님 공구 개설 요청 상세 조회
 */
export const GetApiV1OwnerGroupBuyRequestsRequestIdParams = zod.object({
  requestId: zod.number(),
});

export const GetApiV1OwnerGroupBuyRequestsRequestIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    requestId: zod.number(),
    storeId: zod.number(),
    storeName: zod.string(),
    productName: zod.string(),
    productDescription: zod.string(),
    originalPrice: zod.number().nullish(),
    price: zod.number(),
    targetQuantity: zod.number(),
    maxQuantity: zod.number(),
    perUserLimit: zod.number().nullish(),
    thumbnailUrl: zod.string(),
    imageUrls: zod.array(zod.string()),
    deadline: zod.iso.datetime({ offset: true }),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    pickupLocation: zod.string(),
    pickupContact: zod.string().nullish(),
    status: zod.enum(['PENDING', 'APPROVED', 'REJECTED']),
    rejectionReason: zod.string().nullish(),
    approvedGroupBuyId: zod.number().nullish(),
    reviewedAt: zod.iso.datetime({ offset: true }).nullish(),
    requestedAt: zod.iso.datetime({ offset: true }).nullish(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 픽업 예약자 목록 조회
 */
export const getApiV1OwnerReservationsQueryStatusDefault = `ALL`;
export const getApiV1OwnerReservationsQueryPageDefault = 0;
export const getApiV1OwnerReservationsQuerySizeDefault = 20;
export const getApiV1OwnerReservationsQuerySizeMax = 100;

export const GetApiV1OwnerReservationsQueryParams = zod.object({
  status: zod
    .enum(['ALL', 'WAITING', 'COMPLETED'])
    .default(getApiV1OwnerReservationsQueryStatusDefault),
  page: zod.number().default(getApiV1OwnerReservationsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1OwnerReservationsQuerySizeMax)
    .default(getApiV1OwnerReservationsQuerySizeDefault),
});

export const GetApiV1OwnerReservationsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        participationId: zod.number(),
        userName: zod.string(),
        productName: zod.string(),
        quantity: zod.number(),
        pickupDate: zod.iso.date(),
        pickupTimeStart: zod.iso.time({}),
        pickupTimeEnd: zod.iso.time({}),
        status: zod.enum(['WAITING', 'COMPLETED']),
      }),
    ),
    waitingCount: zod.number(),
    completedCount: zod.number(),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * QR 없이 수동으로 수령 완료 처리한다.
 * @summary 수령 처리 (수동)
 */
export const PatchApiV1OwnerReservationsParticipationIdCompleteParams =
  zod.object({
    participationId: zod.number(),
  });

export const PatchApiV1OwnerReservationsParticipationIdCompleteResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.unknown().nullable(),
    error: zod.unknown().nullable(),
  });
