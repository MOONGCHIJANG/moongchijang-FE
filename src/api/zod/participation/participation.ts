/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 참여하기 화면 결제 정보 조회
 */
export const GetApiV1GroupBuysGroupBuyIdCheckoutParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1GroupBuysGroupBuyIdCheckoutQueryParams = zod.object({
  quantity: zod.number().min(1).describe('참여 수량'),
});

export const GetApiV1GroupBuysGroupBuyIdCheckoutResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    groupBuyId: zod.number(),
    storeName: zod.string(),
    productName: zod.string(),
    thumbnailUrl: zod.string().nullable(),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.string(),
    pickupTimeEnd: zod.string(),
    unitPrice: zod.number(),
    quantity: zod.number(),
    productAmount: zod.number(),
    feeAmount: zod.number(),
    totalAmount: zod.number(),
    remainingQuantity: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary PortOne 결제 주문 생성
 */
export const PostApiV1GroupBuysGroupBuyIdPaymentOrdersParams = zod.object({
  groupBuyId: zod.number(),
});

export const PostApiV1GroupBuysGroupBuyIdPaymentOrdersBody = zod.object({
  quantity: zod.number().min(1),
  agreedNoCancelAfterGoal: zod.boolean().describe('달성 후 취소 불가 동의'),
  agreedRefundBeforeGoal: zod
    .boolean()
    .describe('달성 전 이탈 시 전액 환불 동의'),
  agreedNoRefundAfterNoShow: zod.boolean().describe('미수령 환불 불가 동의'),
  agreedNoWithdrawal: zod.boolean().describe('청약철회 불가 동의'),
});

export const PostApiV1GroupBuysGroupBuyIdPaymentOrdersResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    paymentId: zod
      .string()
      .describe('PortOne SDK requestPayment에 전달할 paymentId'),
    storeId: zod.string(),
    channelKey: zod.string(),
    orderName: zod.string(),
    amount: zod.number(),
    customerName: zod.string().nullable(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary PortOne 결제 완료 서버 검증
 */
export const PostApiV1PaymentsPortoneCompleteBody = zod
  .object({
    paymentId: zod
      .string()
      .describe('서버가 결제 주문 생성 시 반환한 PortOne paymentId'),
    amount: zod
      .number()
      .describe('결제 요청 금액 — 서버 저장값과 불일치 시 위변조로 처리'),
  })
  .describe(
    '포트원 v2 + 토스페이먼츠 결제 성공 후 서버 검증 요청.\n클라이언트가 PortOne.requestPayment() 완료 시 반환된 paymentId를 전달한다.\n서버는 포트원 API(GET \/payments\/{paymentId})로 위변조 검증 후 확정 처리한다.\n',
  );

export const PostApiV1PaymentsPortoneCompleteResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    paymentId: zod.string(),
    participationId: zod.number(),
    participationStatus: zod.enum(['PAID_WAITING_GOAL', 'CONFIRMED']),
    displayStatus: zod.string(),
    amount: zod.number(),
    method: zod.string().nullish(),
    approvedAt: zod.iso.datetime({ offset: true }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 웹훅 본문만 신뢰하지 않고 서버에서 PortOne 결제 단건 조회 후 상태를 동기화한다.
 * @summary PortOne 결제 웹훅 수신
 */
export const PostApiV1PaymentsPortoneWebhookBody = zod.object({
  type: zod.string().nullish(),
  storeId: zod.string().nullish(),
  paymentId: zod.string().nullish(),
});

export const PostApiV1PaymentsPortoneWebhookResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    received: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 공구 달성 전에만 취소 가능하며 결제 금액이 자동 환불된다.
 * @summary 참여 취소 (달성 전 이탈)
 */
export const PostApiV1ParticipationsParticipationIdCancelParams = zod.object({
  participationId: zod.number(),
});

export const postApiV1ParticipationsParticipationIdCancelBodyReasonDetailMax = 500;

export const PostApiV1ParticipationsParticipationIdCancelBody = zod.object({
  reason: zod
    .enum([
      'TIME_UNAVAILABLE',
      'NO_LONGER_WANTED',
      'PREFER_DIRECT_VISIT',
      'BOUGHT_ELSEWHERE',
      'OTHER',
    ])
    .describe('취소 사유. OTHER 선택 시 reasonDetail 필수.'),
  reasonDetail: zod
    .string()
    .max(postApiV1ParticipationsParticipationIdCancelBodyReasonDetailMax)
    .nullish()
    .describe('기타 상세 사유'),
});

export const PostApiV1ParticipationsParticipationIdCancelResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    participationId: zod.number(),
    status: zod.enum(['REFUNDED']),
    cancelledAt: zod.iso.datetime({ offset: true }),
    refundedAt: zod.iso.datetime({ offset: true }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 내 환불 내역 조회
 */
export const GetApiV1RefundsResponse = zod.object({
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
        .enum(['NOT_ACHIEVED', 'EARLY_EXIT', 'PAYMENT_ERROR', 'OTHER'])
        .describe('취소 사유'),
    }),
  ),
  error: zod.unknown().nullable(),
});
