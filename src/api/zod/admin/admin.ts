/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 헤더에 항상 노출되는 대기중 요청 / 진행 중 공구 / 달성률 / 대기 환불 요약을 반환한다.
 * @summary 운영자 대시보드 요약 정보
 */
export const GetApiV1AdminSummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    pendingRequestCount: zod.number().describe('대기중 요청 건수 (처리 필요)'),
    activeGroupBuyCount: zod.number().describe('진행 중 공구 개수'),
    achievementRate: zod
      .number()
      .describe('최근 30일 공구 달성률 (%). 달성완료 \/ 마감된 전체 공구 기준'),
    pendingRefundCount: zod.number().describe('대기 환불 건수 (처리 필요)'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 요청 목록 조회 (운영자)
 */
export const getApiV1AdminGroupBuyRequestsQueryStatusDefault = `ALL`;
export const getApiV1AdminGroupBuyRequestsQueryPageDefault = 0;
export const getApiV1AdminGroupBuyRequestsQuerySizeDefault = 20;
export const getApiV1AdminGroupBuyRequestsQuerySizeMax = 100;

export const GetApiV1AdminGroupBuyRequestsQueryParams = zod.object({
  status: zod
    .enum(['ALL', 'IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED'])
    .default(getApiV1AdminGroupBuyRequestsQueryStatusDefault),
  page: zod.number().default(getApiV1AdminGroupBuyRequestsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1AdminGroupBuyRequestsQuerySizeMax)
    .default(getApiV1AdminGroupBuyRequestsQuerySizeDefault),
});

export const GetApiV1AdminGroupBuyRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        requestId: zod.number(),
        storeName: zod.string(),
        productName: zod.string(),
        desiredQuantity: zod.number(),
        desiredPickupDate: zod.iso.date(),
        status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
        requesterName: zod.string(),
        createdAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 요청 상세 조회 (운영자)
 */
export const GetApiV1AdminGroupBuyRequestsRequestIdParams = zod.object({
  requestId: zod.number(),
});

export const GetApiV1AdminGroupBuyRequestsRequestIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    requestId: zod.number(),
    storeName: zod.string(),
    productName: zod.string(),
    desiredQuantity: zod.number(),
    desiredPickupDate: zod.iso.date(),
    additionalNote: zod.string().nullable(),
    status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
    contactPhone: zod.string().nullable(),
    contactInstagram: zod.string().nullable(),
    rejectionReason: zod.string().nullable(),
    requesterName: zod.string(),
    createdAt: zod.iso.datetime({ offset: true }),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 요청 상태 변경
 */
export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusParams = zod.object({
  requestId: zod.number(),
});

export const patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyContactPhoneRegExp =
  new RegExp('^\\d{3}-\\d{3,4}-\\d{4}$');
export const patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyContactInstagramRegExp =
  new RegExp('^@.+');
export const patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyRejectionReasonMax = 100;

export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusBody = zod.object({
  status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
  contactPhone: zod
    .string()
    .regex(patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyContactPhoneRegExp)
    .nullish(),
  contactInstagram: zod
    .string()
    .regex(
      patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyContactInstagramRegExp,
    )
    .nullish(),
  rejectionReason: zod
    .string()
    .max(patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyRejectionReasonMax)
    .nullish()
    .describe('status=REJECTED 시 필수'),
});

export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.unknown().nullable(),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 진행 중인 공구 현황 목록 (운영자)
 */
export const getApiV1AdminGroupBuysQueryStatusDefault = `ALL`;

export const GetApiV1AdminGroupBuysQueryParams = zod.object({
  status: zod
    .enum(['ALL', 'IN_PROGRESS', 'ACHIEVED'])
    .default(getApiV1AdminGroupBuysQueryStatusDefault),
});

export const GetApiV1AdminGroupBuysResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      groupBuyId: zod.number(),
      storeName: zod.string(),
      productName: zod.string(),
      status: zod.enum(['IN_PROGRESS', 'ACHIEVED']),
      deadline: zod.iso.date(),
      achievementRate: zod.number(),
      currentQuantity: zod.number(),
      targetQuantity: zod.number(),
      remainingQuantity: zod.number(),
      isOrderConfirmed: zod.boolean(),
      isOrderSheetSent: zod.boolean(),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 개설 (운영자)
 */
export const postApiV1AdminGroupBuysBodyProductNameMax = 100;

export const PostApiV1AdminGroupBuysBody = zod.object({
  requestId: zod.number().nullish(),
  storeId: zod.number(),
  productName: zod.string().max(postApiV1AdminGroupBuysBodyProductNameMax),
  productDescription: zod.string(),
  price: zod.number().min(1),
  targetQuantity: zod.number().min(1).describe('목표 수량'),
  maxQuantity: zod.number().min(1).describe('최대 수량 (선착순 마감 기준)'),
  notice: zod.string().nullish().describe('유의사항'),
  deadline: zod.iso.datetime({ offset: true }),
  pickupDate: zod.iso.date(),
  pickupTimeStart: zod.iso.time({}),
  pickupTimeEnd: zod.iso.time({}),
  pickupLocation: zod.string(),
  pickupAddress: zod
    .string()
    .nullish()
    .describe('픽업 장소 주소 (매장 주소와 다를 경우 입력)'),
});

/**
 * @summary 공구 상세 조회 (운영자)
 */
export const GetApiV1AdminGroupBuysGroupBuyIdParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1AdminGroupBuysGroupBuyIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    groupBuyId: zod.number(),
    requestId: zod.number().nullable(),
    storeId: zod.number(),
    storeName: zod.string(),
    productName: zod.string(),
    productDescription: zod.string(),
    price: zod.number(),
    targetQuantity: zod.number(),
    maxQuantity: zod.number().nullable(),
    currentQuantity: zod.number(),
    remainingQuantity: zod.number(),
    achievementRate: zod.number(),
    notice: zod.string().nullable(),
    status: zod.enum(['IN_PROGRESS', 'ACHIEVED', 'FAILED']),
    deadline: zod.iso.datetime({ offset: true }),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    pickupLocation: zod.string(),
    isOrderConfirmed: zod.boolean(),
    isOrderSheetSent: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 정보 수정 (운영자)
 */
export const PatchApiV1AdminGroupBuysGroupBuyIdParams = zod.object({
  groupBuyId: zod.number(),
});

export const PatchApiV1AdminGroupBuysGroupBuyIdBody = zod.object({
  productName: zod.string().optional(),
  productDescription: zod.string().optional(),
  price: zod.number().min(1).optional(),
  targetQuantity: zod.number().min(1).optional(),
  maxQuantity: zod.number().min(1).optional(),
  deadline: zod.iso.datetime({ offset: true }).optional(),
  pickupDate: zod.iso.date().optional(),
  pickupTimeStart: zod.iso.time({}).optional(),
  pickupTimeEnd: zod.iso.time({}).optional(),
  pickupLocation: zod.string().optional(),
});

export const PatchApiV1AdminGroupBuysGroupBuyIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * ACHIEVED 상태 공구에 대해 발주를 확정한다.
 * @summary 발주 확정 처리
 */
export const PostApiV1AdminGroupBuysGroupBuyIdOrderConfirmParams = zod.object({
  groupBuyId: zod.number(),
});

export const PostApiV1AdminGroupBuysGroupBuyIdOrderConfirmResponse = zod.object(
  {
    success: zod.boolean(),
    data: zod.unknown().nullable(),
    error: zod.unknown().nullable(),
  },
);

/**
 * @summary 발주서 발송
 */
export const PostApiV1AdminGroupBuysGroupBuyIdOrderSheetParams = zod.object({
  groupBuyId: zod.number(),
});

export const PostApiV1AdminGroupBuysGroupBuyIdOrderSheetResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 환불 처리 현황 목록 (운영자)
 */
export const getApiV1AdminRefundsQueryStatusDefault = `ALL`;
export const getApiV1AdminRefundsQueryPageDefault = 0;
export const getApiV1AdminRefundsQuerySizeDefault = 20;
export const getApiV1AdminRefundsQuerySizeMax = 100;

export const GetApiV1AdminRefundsQueryParams = zod.object({
  status: zod
    .enum(['ALL', 'WAITING', 'COMPLETED'])
    .default(getApiV1AdminRefundsQueryStatusDefault),
  page: zod.number().default(getApiV1AdminRefundsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1AdminRefundsQuerySizeMax)
    .default(getApiV1AdminRefundsQuerySizeDefault),
});

export const GetApiV1AdminRefundsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        participationId: zod.number(),
        userName: zod.string(),
        productName: zod.string(),
        storeName: zod.string(),
        paymentAmount: zod.number(),
        refundStatus: zod.enum(['WAITING', 'COMPLETED']),
        refundReason: zod.string().nullable(),
        createdAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 수동 환불 처리
 */
export const PostApiV1AdminRefundsParticipationIdManualParams = zod.object({
  participationId: zod.number(),
});

export const postApiV1AdminRefundsParticipationIdManualBodyDetailReasonMax = 100;

export const PostApiV1AdminRefundsParticipationIdManualBody = zod.object({
  refundReason: zod.enum([
    'NOT_ACHIEVED',
    'EARLY_EXIT',
    'PAYMENT_ERROR',
    'OTHER',
  ]),
  detailReason: zod
    .string()
    .max(postApiV1AdminRefundsParticipationIdManualBodyDetailReasonMax)
    .nullish(),
});

export const PostApiV1AdminRefundsParticipationIdManualResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 정산 내역 목록 (운영자)
 */
export const getApiV1AdminSettlementsQueryEscrowStatusDefault = `ALL`;
export const getApiV1AdminSettlementsQueryPageDefault = 0;
export const getApiV1AdminSettlementsQuerySizeDefault = 20;
export const getApiV1AdminSettlementsQuerySizeMax = 100;

export const GetApiV1AdminSettlementsQueryParams = zod.object({
  escrowStatus: zod
    .enum(['ALL', 'HOLDING', 'RELEASED'])
    .default(getApiV1AdminSettlementsQueryEscrowStatusDefault),
  page: zod.number().default(getApiV1AdminSettlementsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1AdminSettlementsQuerySizeMax)
    .default(getApiV1AdminSettlementsQuerySizeDefault),
});

export const GetApiV1AdminSettlementsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        settlementId: zod.number(),
        storeName: zod.string(),
        productName: zod.string(),
        totalAmount: zod.number(),
        escrowStatus: zod.enum(['HOLDING', 'RELEASED']),
        scheduledPaymentDate: zod.iso.date().nullable(),
        settlementMethod: zod.string().nullable(),
        memo: zod.string().nullable(),
        createdAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 정산 생성 및 처리
 */
export const postApiV1AdminSettlementsBodyMemoMax = 100;

export const PostApiV1AdminSettlementsBody = zod.object({
  groupBuyId: zod.number(),
  scheduledPaymentDate: zod.iso.date(),
  settlementMethod: zod.enum(['BANK_TRANSFER', 'ESCROW_AUTO']),
  memo: zod.string().max(postApiV1AdminSettlementsBodyMemoMax).nullish(),
});

/**
 * @summary 에스크로 해제
 */
export const PostApiV1AdminSettlementsSettlementIdReleaseParams = zod.object({
  settlementId: zod.number(),
});

export const PostApiV1AdminSettlementsSettlementIdReleaseResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});
