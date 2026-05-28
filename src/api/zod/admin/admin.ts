/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 운영 관리 요약 영역에 노출되는 환불 금액, 개설승인 대기, 발주 미확정, 오늘 처리 완료 요약을 반환한다.
 * @summary 운영자 대시보드 요약 정보
 */
export const GetApiV1AdminSummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    pendingRefundAmount: zod
      .number()
      .describe(
        '검토 대기 환불 총 금액. 현재는 REFUND_PENDING 참여의 결제 주문 총액 기준',
      ),
    pendingRefundAmountChangeRate: zod
      .number()
      .describe('전일 대비 검토 대기 환불 금액 증감률(%)'),
    pendingApprovalCount: zod.number().describe('개설승인 대기 건수'),
    averageReviewMinutes: zod
      .number()
      .describe('개설승인 대기 요청의 평균 검토 시간(분)'),
    pendingApprovalChangeRate: zod
      .number()
      .describe('전일 대비 개설승인 대기 요청 생성 건수 증감률(%)'),
    unconfirmedOrderCount: zod
      .number()
      .describe('달성된 공구 중 발주 확정 대기 건수'),
    unconfirmedOrderOver48hCount: zod
      .number()
      .describe('달성 후 48시간을 초과한 발주 확정 대기 건수'),
    todayCompletedRefundCount: zod
      .number()
      .describe('오늘 환불 처리 완료 건수'),
    todayCompletedApprovalCount: zod
      .number()
      .describe('오늘 개설 승인\/반려 처리 완료 건수'),
    hasOrderOver48h: zod
      .boolean()
      .describe('48시간 초과 발주 미확정 경고 노출 여부'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 달성된 공구의 발주 확정 대기, 48시간 초과, 확정 완료, 전체 목록을 조회한다.
 * @summary 발주 관리 목록 조회 (운영자)
 */
export const getApiV1AdminOrdersQueryStatusDefault = `ALL`;
export const getApiV1AdminOrdersQueryPageDefault = 0;
export const getApiV1AdminOrdersQuerySizeDefault = 20;
export const getApiV1AdminOrdersQuerySizeMax = 100;

export const GetApiV1AdminOrdersQueryParams = zod.object({
  status: zod
    .enum(['OVERDUE_48H', 'PENDING', 'CONFIRMED', 'ALL'])
    .default(getApiV1AdminOrdersQueryStatusDefault)
    .describe(
      'OVERDUE_48H=48시간 초과, PENDING=확정 대기, CONFIRMED=확정 완료, ALL=전체',
    ),
  page: zod.number().default(getApiV1AdminOrdersQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1AdminOrdersQuerySizeMax)
    .default(getApiV1AdminOrdersQuerySizeDefault),
});

export const GetApiV1AdminOrdersResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        orderId: zod
          .number()
          .describe('발주 관리 식별자. 현재는 groupBuyId와 동일'),
        groupBuyId: zod.number(),
        productName: zod.string(),
        storeName: zod.string(),
        achievedAt: zod.iso
          .datetime({ offset: true })
          .nullish()
          .describe('공구 달성 일시'),
        finalQuantity: zod.number().describe('최종 참여 수량'),
        pendingRefundCount: zod.number().describe('해당 공구의 환불 대기 건수'),
        pickupDate: zod.iso.date(),
        elapsedHours: zod.number().describe('달성 후 경과 시간'),
        progressRate: zod.number().describe('목표 수량 대비 달성률(%)'),
        orderStatus: zod.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
        ownerContactedAt: zod.iso.datetime({ offset: true }).nullish(),
        orderConfirmedAt: zod.iso.datetime({ offset: true }).nullish(),
        actionable: zod
          .boolean()
          .describe('발주 확정\/연락 등 운영 작업 가능 여부'),
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
  keyword: zod
    .string()
    .optional()
    .describe(
      '요청 ID, 상품명, 가게명, 요청자 닉네임\/이메일\/전화번호 검색어',
    ),
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
        requesterId: zod.number(),
        requesterName: zod.string().nullish(),
        originalPrice: zod
          .number()
          .nullish()
          .describe('승인 후 생성된 공구 정가. 승인 전 요청은 null'),
        price: zod
          .number()
          .nullish()
          .describe('승인 후 생성된 공구가. 승인 전 요청은 null'),
        reviewElapsedMinutes: zod
          .number()
          .nullish()
          .describe('요청 생성 후 경과한 검토 시간(분)'),
        actionable: zod
          .boolean()
          .describe('운영자가 승인\/반려 등 후속 작업을 할 수 있는 상태 여부'),
        createdAt: zod.iso.datetime({ offset: true }).nullable(),
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
 * @summary 공구 요청 상세 조회 (운영자)
 */
export const GetApiV1AdminGroupBuyRequestsRequestIdParams = zod.object({
  requestId: zod.number(),
});

export const GetApiV1AdminGroupBuyRequestsRequestIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    requestId: zod.number(),
    requester: zod.object({
      userId: zod.number(),
      nickname: zod.string().nullish(),
      phoneNumber: zod.string().nullish(),
      email: zod.string().nullish(),
      provider: zod.enum(['KAKAO', 'EMAIL']).nullish(),
    }),
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
    status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
    rejectionReason: zod.string().nullish(),
    openedGroupBuyId: zod.number().nullish(),
    statusHistory: zod.array(
      zod.object({
        status: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
        changedAt: zod.iso.datetime({ offset: true }),
      }),
    ),
    createdAt: zod.iso.datetime({ offset: true }).nullable(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 공구 요청 상태 변경
 */
export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusParams = zod.object({
  requestId: zod.number(),
});

export const patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyRejectionReasonMax = 500;

export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusBody = zod.object({
  targetStatus: zod.enum(['IN_REVIEW', 'IN_CONTACT', 'OPENED', 'REJECTED']),
  rejectionReason: zod
    .string()
    .max(patchApiV1AdminGroupBuyRequestsRequestIdStatusBodyRejectionReasonMax)
    .nullish()
    .describe('targetStatus=REJECTED 시 필수'),
  openedGroupBuyId: zod
    .number()
    .nullish()
    .describe(
      'targetStatus=OPENED 시 필수. 실제 개설된 공구 id이며 존재 검증 후 개설 알림 발송에 사용',
    ),
});

export const PatchApiV1AdminGroupBuyRequestsRequestIdStatusResponse =
  zod.object({
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
          changedAt: zod.iso.datetime({ offset: true }),
        }),
      ),
      createdAt: zod.iso.datetime({ offset: true }),
    }),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 소비자 공구 개설 요청 승인 및 공구 생성
 */
export const PostApiV1AdminGroupBuyRequestsRequestIdApproveParams = zod.object({
  requestId: zod.number(),
});

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStoreNameMax = 100;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStoreAddressMax = 200;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStorePhoneNumberMax = 20;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyProductNameMax = 100;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyProductDescriptionMax = 1000;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyImageUrlsMax = 5;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyPickupLocationMax = 200;

export const postApiV1AdminGroupBuyRequestsRequestIdApproveBodyPickupContactMax = 20;

export const PostApiV1AdminGroupBuyRequestsRequestIdApproveBody = zod.object({
  storeId: zod
    .number()
    .nullish()
    .describe(
      '기존 등록 매장을 사용할 때 입력. 없으면 매장명\/주소\/지역 정보로 신규 매장을 생성',
    ),
  storeName: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStoreNameMax)
    .nullish(),
  storeAddress: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStoreAddressMax)
    .nullish(),
  storePhoneNumber: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyStorePhoneNumberMax)
    .nullish(),
  region: zod.string().nullish().describe('신규 매장 생성 시 필수'),
  district: zod.string().nullish().describe('신규 매장 생성 시 필수'),
  latitude: zod.number().nullish(),
  longitude: zod.number().nullish(),
  productName: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyProductNameMax)
    .describe('공구 제목'),
  productDescription: zod
    .string()
    .max(
      postApiV1AdminGroupBuyRequestsRequestIdApproveBodyProductDescriptionMax,
    )
    .describe('공구 내용'),
  originalPrice: zod.number().min(1).nullish().describe('정가'),
  price: zod.number().min(1).describe('공구가'),
  targetQuantity: zod.number().min(1).describe('목표 수량'),
  maxQuantity: zod
    .number()
    .min(1)
    .nullish()
    .describe('최대 수량. 생략 시 목표 수량과 동일하게 저장'),
  perUserLimit: zod.number().min(1).nullish().describe('1인 구매 제한'),
  imageUrls: zod
    .array(zod.string())
    .min(1)
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyImageUrlsMax),
  recruitmentStartAt: zod.iso.datetime({ offset: true }),
  deadline: zod.iso.datetime({ offset: true }).describe('모집 마감일시'),
  pickupDate: zod.iso.date(),
  pickupTimeStart: zod.iso.time({}),
  pickupTimeEnd: zod.iso.time({}),
  pickupLocation: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyPickupLocationMax),
  pickupContact: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdApproveBodyPickupContactMax)
    .nullish(),
});

/**
 * @summary 소비자 공구 개설 요청 반려
 */
export const PostApiV1AdminGroupBuyRequestsRequestIdRejectParams = zod.object({
  requestId: zod.number(),
});

export const postApiV1AdminGroupBuyRequestsRequestIdRejectBodyRejectionReasonMax = 200;

export const PostApiV1AdminGroupBuyRequestsRequestIdRejectBody = zod.object({
  rejectionReason: zod
    .string()
    .max(postApiV1AdminGroupBuyRequestsRequestIdRejectBodyRejectionReasonMax),
});

export const PostApiV1AdminGroupBuyRequestsRequestIdRejectResponse = zod.object(
  {
    success: zod.boolean(),
    data: zod.object({
      requestId: zod.number(),
      status: zod.enum(['OPENED', 'REJECTED']),
      groupBuyId: zod.number().nullish(),
    }),
    error: zod.unknown().nullable(),
  },
);

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
