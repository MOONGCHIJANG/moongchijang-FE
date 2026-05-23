/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 내 참여 내역 상태별 조회
 */
export const GetApiV1UsersMeParticipationsQueryParams = zod.object({
  status: zod
    .enum(['ACTIVE', 'COMPLETED', 'REFUNDED'])
    .describe('ACTIVE=참여중 \/ COMPLETED=완료 \/ REFUNDED=환불내역'),
});

export const getApiV1UsersMeParticipationsResponseDataItemAchievementRateMin = 0;
export const getApiV1UsersMeParticipationsResponseDataItemAchievementRateMax = 100;

export const GetApiV1UsersMeParticipationsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      participationId: zod.number(),
      groupBuyId: zod.number(),
      productName: zod.string(),
      participationStatus: zod.enum([
        'PENDING',
        'PAID_WAITING_GOAL',
        'CONFIRMED',
        'CANCELLED',
        'REFUND_PENDING',
        'REFUNDED',
      ]),
      achievementRate: zod
        .number()
        .min(getApiV1UsersMeParticipationsResponseDataItemAchievementRateMin)
        .max(getApiV1UsersMeParticipationsResponseDataItemAchievementRateMax)
        .describe('현재 수량 기준 달성률'),
      achievementStatus: zod.enum(['BEFORE_ACHIEVED', 'ACHIEVED']),
      displayStatus: zod
        .enum([
          'PICKED_UP',
          'PAID_WAITING_GOAL',
          'CONFIRMED',
          'REFUND_PENDING',
          'REFUNDED',
          'PENDING',
          'CANCELLED',
        ])
        .describe('픽업\/참여 상태 조합 기반 화면 표시 상태'),
      storeName: zod.string(),
      pickupDate: zod.iso.date(),
      pickupTimeStart: zod.iso.time({}),
      pickupTimeEnd: zod.iso.time({}),
      pickupLocation: zod.string(),
      paymentAmount: zod.number(),
      quantity: zod.number(),
      pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
      dDay: zod.number().describe('공구 마감일까지 남은 일수'),
      canCancel: zod
        .boolean()
        .describe(
          'PAID_WAITING_GOAL 참여이고 APPROVED 결제 주문이 있으면 true',
        ),
      canViewPickup: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/pickup 호출 가능',
        ),
      canViewQr: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/qr 호출 가능. 픽업일 전에는 QR API가 LOCKED를 반환',
        ),
      qrAvailability: zod.enum([
        'UNAVAILABLE',
        'LOCKED',
        'AVAILABLE',
        'PICKED_UP',
      ]),
    }),
  ),
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
 * @summary 내 공구 개설 요청 내역 조회
 */
export const GetApiV1UsersMeGroupBuyRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      productName: zod.string(),
      status: zod.enum([
        'SUBMITTED',
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ]),
      storeName: zod.string(),
      desiredPickupDate: zod.iso.date(),
      desiredQuantity: zod.number(),
      requestId: zod.number(),
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

/**
 * 참여중 · 완료 · 환불내역 · 개설요청 건수를 반환한다.
 * @summary 마이페이지 탭별 건수 조회
 */
export const GetApiV1MypageSummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    activeCount: zod.number().describe('참여중'),
    completedCount: zod.number().describe('완료'),
    refundedCount: zod.number().describe('환불내역'),
    requestCount: zod.number().describe('개설 요청 내역'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 참여중 공구 내역 조회
 */
export const getApiV1MypageParticipationsActiveResponseDataItemAchievementRateMin = 0;
export const getApiV1MypageParticipationsActiveResponseDataItemAchievementRateMax = 100;

export const GetApiV1MypageParticipationsActiveResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      participationId: zod.number(),
      groupBuyId: zod.number(),
      productName: zod.string(),
      participationStatus: zod.enum([
        'PENDING',
        'PAID_WAITING_GOAL',
        'CONFIRMED',
        'CANCELLED',
        'REFUND_PENDING',
        'REFUNDED',
      ]),
      achievementRate: zod
        .number()
        .min(
          getApiV1MypageParticipationsActiveResponseDataItemAchievementRateMin,
        )
        .max(
          getApiV1MypageParticipationsActiveResponseDataItemAchievementRateMax,
        )
        .describe('현재 수량 기준 달성률'),
      achievementStatus: zod.enum(['BEFORE_ACHIEVED', 'ACHIEVED']),
      displayStatus: zod
        .enum([
          'PICKED_UP',
          'PAID_WAITING_GOAL',
          'CONFIRMED',
          'REFUND_PENDING',
          'REFUNDED',
          'PENDING',
          'CANCELLED',
        ])
        .describe('픽업\/참여 상태 조합 기반 화면 표시 상태'),
      storeName: zod.string(),
      pickupDate: zod.iso.date(),
      pickupTimeStart: zod.iso.time({}),
      pickupTimeEnd: zod.iso.time({}),
      pickupLocation: zod.string(),
      paymentAmount: zod.number(),
      quantity: zod.number(),
      pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
      dDay: zod.number().describe('공구 마감일까지 남은 일수'),
      canCancel: zod
        .boolean()
        .describe(
          'PAID_WAITING_GOAL 참여이고 APPROVED 결제 주문이 있으면 true',
        ),
      canViewPickup: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/pickup 호출 가능',
        ),
      canViewQr: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/qr 호출 가능. 픽업일 전에는 QR API가 LOCKED를 반환',
        ),
      qrAvailability: zod.enum([
        'UNAVAILABLE',
        'LOCKED',
        'AVAILABLE',
        'PICKED_UP',
      ]),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 완료 공구 내역 조회
 */
export const getApiV1MypageParticipationsCompletedResponseDataItemAchievementRateMin = 0;
export const getApiV1MypageParticipationsCompletedResponseDataItemAchievementRateMax = 100;

export const GetApiV1MypageParticipationsCompletedResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      participationId: zod.number(),
      groupBuyId: zod.number(),
      productName: zod.string(),
      participationStatus: zod.enum([
        'PENDING',
        'PAID_WAITING_GOAL',
        'CONFIRMED',
        'CANCELLED',
        'REFUND_PENDING',
        'REFUNDED',
      ]),
      achievementRate: zod
        .number()
        .min(
          getApiV1MypageParticipationsCompletedResponseDataItemAchievementRateMin,
        )
        .max(
          getApiV1MypageParticipationsCompletedResponseDataItemAchievementRateMax,
        )
        .describe('현재 수량 기준 달성률'),
      achievementStatus: zod.enum(['BEFORE_ACHIEVED', 'ACHIEVED']),
      displayStatus: zod
        .enum([
          'PICKED_UP',
          'PAID_WAITING_GOAL',
          'CONFIRMED',
          'REFUND_PENDING',
          'REFUNDED',
          'PENDING',
          'CANCELLED',
        ])
        .describe('픽업\/참여 상태 조합 기반 화면 표시 상태'),
      storeName: zod.string(),
      pickupDate: zod.iso.date(),
      pickupTimeStart: zod.iso.time({}),
      pickupTimeEnd: zod.iso.time({}),
      pickupLocation: zod.string(),
      paymentAmount: zod.number(),
      quantity: zod.number(),
      pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
      dDay: zod.number().describe('공구 마감일까지 남은 일수'),
      canCancel: zod
        .boolean()
        .describe(
          'PAID_WAITING_GOAL 참여이고 APPROVED 결제 주문이 있으면 true',
        ),
      canViewPickup: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/pickup 호출 가능',
        ),
      canViewQr: zod
        .boolean()
        .describe(
          '참여 확정 후 픽업 미완료이면 \/api\/v1\/participations\/{participationId}\/qr 호출 가능. 픽업일 전에는 QR API가 LOCKED를 반환',
        ),
      qrAvailability: zod.enum([
        'UNAVAILABLE',
        'LOCKED',
        'AVAILABLE',
        'PICKED_UP',
      ]),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 환불 내역 조회
 */
export const GetApiV1MypageRefundsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      participationId: zod.number(),
      productName: zod.string(),
      storeName: zod.string(),
      pickupDate: zod.iso.date().nullable(),
      pickupTimeStart: zod.iso.time({}).nullable(),
      pickupTimeEnd: zod.iso.time({}).nullable(),
      paymentAmount: zod.number(),
      quantity: zod.number(),
      refundStatus: zod
        .enum(['PENDING', 'COMPLETED'])
        .describe('PENDING=환불대기 \/ COMPLETED=환불완료'),
      cancelReason: zod
        .enum([
          'TIME_UNAVAILABLE',
          'NO_LONGER_WANTED',
          'PREFER_DIRECT_VISIT',
          'BOUGHT_ELSEWHERE',
          'OTHER',
        ])
        .nullable()
        .describe('취소 사유'),
      cancelReasonDetail: zod.string().nullish().describe('취소 상세 사유'),
      refundedAt: zod.iso.datetime({ offset: true }).nullish(),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * /api/v1/mypage/refunds 와 동일한 응답을 반환한다. 신규 클라이언트는 본 경로를 사용한다.
 * @summary 내 환불 내역 조회 (마이페이지 alias)
 */
export const GetApiV1UsersMeRefundsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      participationId: zod.number(),
      productName: zod.string(),
      storeName: zod.string(),
      pickupDate: zod.iso.date().nullable(),
      pickupTimeStart: zod.iso.time({}).nullable(),
      pickupTimeEnd: zod.iso.time({}).nullable(),
      paymentAmount: zod.number(),
      quantity: zod.number(),
      refundStatus: zod
        .enum(['PENDING', 'COMPLETED'])
        .describe('PENDING=환불대기 \/ COMPLETED=환불완료'),
      cancelReason: zod
        .enum([
          'TIME_UNAVAILABLE',
          'NO_LONGER_WANTED',
          'PREFER_DIRECT_VISIT',
          'BOUGHT_ELSEWHERE',
          'OTHER',
        ])
        .nullable()
        .describe('취소 사유'),
      cancelReasonDetail: zod.string().nullish().describe('취소 상세 사유'),
      refundedAt: zod.iso.datetime({ offset: true }).nullish(),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 공구 개설 요청 내역 조회
 */
export const GetApiV1MypageGroupBuyRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      productName: zod.string(),
      status: zod.enum([
        'SUBMITTED',
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ]),
      storeName: zod.string(),
      desiredPickupDate: zod.iso.date(),
      desiredQuantity: zod.number(),
      requestId: zod.number(),
    }),
  ),
  error: zod.unknown().nullable(),
});
