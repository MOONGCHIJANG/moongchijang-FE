/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 참여 목록 조회 (참여중 · 완료 · 환불 탭)
 */
export const getApiV1UsersMeParticipationsQueryStatusDefault = `ACTIVE`;
export const getApiV1UsersMeParticipationsQueryPageDefault = 0;
export const getApiV1UsersMeParticipationsQuerySizeDefault = 20;
export const getApiV1UsersMeParticipationsQuerySizeMax = 100;

export const GetApiV1UsersMeParticipationsQueryParams = zod.object({
  status: zod
    .enum(['ACTIVE', 'COMPLETED', 'REFUNDED'])
    .default(getApiV1UsersMeParticipationsQueryStatusDefault)
    .describe('ACTIVE=참여중 \/ COMPLETED=완료 \/ REFUNDED=환불내역'),
  page: zod.number().default(getApiV1UsersMeParticipationsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1UsersMeParticipationsQuerySizeMax)
    .default(getApiV1UsersMeParticipationsQuerySizeDefault),
});

export const GetApiV1UsersMeParticipationsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        participationId: zod.number(),
        productName: zod.string(),
        storeName: zod.string(),
        pickupDate: zod.iso.date().nullable(),
        pickupTimeStart: zod.iso.time({}).nullable(),
        pickupTimeEnd: zod.iso.time({}).nullable(),
        paymentAmount: zod.number(),
        quantity: zod.number(),
        achievementRate: zod.number(),
        achievementStatus: zod.enum(['BEFORE_ACHIEVED', 'ACHIEVED']),
        dDay: zod.number(),
        groupBuyId: zod.number(),
        canCancel: zod.boolean(),
        canViewPickup: zod.boolean(),
        canViewQr: zod.boolean(),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 페이지네이션 기반으로 진행 중 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 진행 중 탭 참여 공구 목록 조회
 */
export const getApiV1UsersMeParticipationsInProgressQueryPageDefault = 0;
export const getApiV1UsersMeParticipationsInProgressQuerySizeDefault = 20;
export const getApiV1UsersMeParticipationsInProgressQuerySizeMax = 100;

export const GetApiV1UsersMeParticipationsInProgressQueryParams = zod.object({
  page: zod
    .number()
    .default(getApiV1UsersMeParticipationsInProgressQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1UsersMeParticipationsInProgressQuerySizeMax)
    .default(getApiV1UsersMeParticipationsInProgressQuerySizeDefault),
});

export const GetApiV1UsersMeParticipationsInProgressResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        participationId: zod.number(),
        groupBuyId: zod.number(),
        productName: zod.string(),
        storeName: zod.string(),
        pickupAt: zod.iso.datetime({ offset: true }),
        paidAmount: zod.number(),
        quantity: zod.number(),
        achievementRate: zod.number().describe('0~100 정수 퍼센트'),
        dDay: zod.number().describe('마감일까지 남은 일수'),
        participatedAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 페이지네이션 기반으로 픽업 대기 탭 카드를 조회한다. 정렬 기준은 참여일시(participatedAt) 내림차순이다.
 * @summary 픽업 대기 탭 참여 완료 공구 이력 조회
 */
export const getApiV1UsersMeParticipationsPickupWaitingQueryPageDefault = 0;
export const getApiV1UsersMeParticipationsPickupWaitingQuerySizeDefault = 20;
export const getApiV1UsersMeParticipationsPickupWaitingQuerySizeMax = 100;

export const GetApiV1UsersMeParticipationsPickupWaitingQueryParams = zod.object(
  {
    page: zod
      .number()
      .default(getApiV1UsersMeParticipationsPickupWaitingQueryPageDefault),
    size: zod
      .number()
      .max(getApiV1UsersMeParticipationsPickupWaitingQuerySizeMax)
      .default(getApiV1UsersMeParticipationsPickupWaitingQuerySizeDefault),
  },
);

export const GetApiV1UsersMeParticipationsPickupWaitingResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        participationId: zod.number(),
        groupBuyId: zod.number(),
        productName: zod.string(),
        storeName: zod.string(),
        pickupAt: zod.iso.datetime({ offset: true }),
        paidAmount: zod.number(),
        quantity: zod.number(),
        isClosed: zod.boolean().describe('마감 공구 여부'),
        participatedAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 공구 요청 목록 조회 (개설 요청 내역 탭)
 */
export const GetApiV1UsersMeGroupBuyRequestsResponse = zod.object({
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
        .enum(['SUBMITTED', 'IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED'])
        .describe(
          'SUBMITTED=요청 접수 \/ IN_REVIEW=검토 중 \/ IN_CONTACT=매장 컨택 중 \/\nOPENED=공구 개설 완료 \/ REJECTED=개설 불가\n',
        ),
      rejectionReason: zod
        .string()
        .nullable()
        .describe('status=REJECTED 시 노출'),
      createdAt: zod.iso.datetime({ offset: true }),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * 참여중 · 완료 · 환불내역 · 개설요청 건수를 반환한다 (탭 칩 괄호 숫자용).
 * @summary 마이페이지 탭별 건수 조회
 */
export const GetApiV1UsersMeTabsCountsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    activeCount: zod.number().describe('참여중'),
    completedCount: zod.number().describe('완료'),
    refundedCount: zod.number().describe('환불내역'),
    requestCount: zod.number().describe('개설 요청 내역'),
  }),
  error: zod.unknown().nullable(),
});
