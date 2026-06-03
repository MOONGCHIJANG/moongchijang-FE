/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

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
 * 사장님이 소속된 매장 기준으로 공구 요약 정보를 조회한다.
- 진행 중 공구 건수
- 달성 완료 공구 건수
- 오늘 픽업 예정 인원 수
- 정산 예정 금액

 * @summary 사장님 공구 요약 조회
 */
export const GetApiV1OwnerGroupBuysSummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    ongoingCount: zod.number().describe('진행 중 공구 건수'),
    achievedCount: zod.number().describe('달성 완료 공구 건수'),
    todayPickupUserCount: zod.number().describe('오늘 픽업 예정 인원 수'),
    settlementExpectedAmount: zod.number().describe('정산 예정 금액'),
    isEmpty: zod.boolean().describe('공구 요약 데이터 비어있는지 여부'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 공구 관리 목록 조회
 */
export const getApiV1OwnerGroupBuysManageQueryFilterDefault = `ALL`;

export const GetApiV1OwnerGroupBuysManageQueryParams = zod.object({
  filter: zod
    .enum(['ALL', 'IN_PROGRESS', 'ACHIEVED', 'ENDED', 'PENDING_APPROVAL'])
    .default(getApiV1OwnerGroupBuysManageQueryFilterDefault)
    .describe('상태 필터 (기본값 ALL)'),
});

export const GetApiV1OwnerGroupBuysManageResponse = zod.object({
  success: zod.boolean(),
  data: zod.array(
    zod.object({
      groupBuyId: zod
        .number()
        .nullish()
        .describe(
          '실제 공구 항목일 때 사용하는 공구 ID. PENDING_APPROVAL 항목에서는 null',
        ),
      requestId: zod
        .number()
        .nullish()
        .describe(
          '승인대기(PENDING_APPROVAL) 항목일 때 사용하는 공구 개설 요청 ID. 실제 공구 항목에서는 null',
        ),
      productName: zod.string(),
      price: zod.number(),
      pickupDate: zod.iso.date(),
      deadlineDday: zod.number().nullish(),
      achievementRate: zod.number().nullish(),
      currentQuantity: zod.number().nullish(),
      targetQuantity: zod.number().nullish(),
      status: zod.enum([
        'ALL',
        'IN_PROGRESS',
        'ACHIEVED',
        'ENDED',
        'PENDING_APPROVAL',
      ]),
    }),
  ),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 모집중 공구 상세 조회
 */
export const GetApiV1OwnerGroupBuysGroupBuyIdManageInProgressParams =
  zod.object({
    groupBuyId: zod.number(),
  });

export const GetApiV1OwnerGroupBuysGroupBuyIdManageInProgressResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.object({
      groupBuyId: zod.number(),
      status: zod.enum([
        'ALL',
        'IN_PROGRESS',
        'ACHIEVED',
        'ENDED',
        'PENDING_APPROVAL',
      ]),
      recruitmentStartDate: zod.iso.date(),
      recruitmentEndDate: zod.iso.date(),
      participantSummary: zod.object({
        totalCount: zod.number(),
        completedCount: zod.number(),
        waitingCount: zod.number(),
      }),
      participants: zod.array(
        zod.object({
          name: zod.string(),
          phoneNumber: zod.string(),
          productName: zod.string(),
          quantity: zod.number(),
          paymentMethod: zod.string(),
          paymentStatus: zod.string(),
          pickupTime: zod.iso.time({}),
        }),
      ),
    }),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 사장님 달성 공구 상세 조회
 */
export const GetApiV1OwnerGroupBuysGroupBuyIdManageAchievedParams = zod.object({
  groupBuyId: zod.number(),
});

export const GetApiV1OwnerGroupBuysGroupBuyIdManageAchievedResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.object({
      groupBuyId: zod.number(),
      status: zod.enum([
        'ALL',
        'IN_PROGRESS',
        'ACHIEVED',
        'ENDED',
        'PENDING_APPROVAL',
      ]),
      recruitmentStartDate: zod.iso.date(),
      recruitmentEndDate: zod.iso.date(),
      participantSummary: zod.object({
        totalCount: zod.number(),
        completedCount: zod.number(),
        waitingCount: zod.number(),
      }),
      participants: zod.array(
        zod.object({
          name: zod.string(),
          phoneNumber: zod.string(),
          productName: zod.string(),
          quantity: zod.number(),
          paymentMethod: zod.string(),
          paymentStatus: zod.string(),
          pickupTime: zod.iso.time({}),
        }),
      ),
    }),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 사장님 공구 기간 연장 요청
 */
export const PostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsParams =
  zod.object({
    groupBuyId: zod.number(),
  });

export const PostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsBody =
  zod.object({
    extendedDeadline: zod.iso
      .datetime({ offset: true })
      .describe('연장 희망 마감일시 (기존 마감일 이후)'),
  });

export const PostApiV1OwnerGroupBuysGroupBuyIdExtensionRequestsResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.unknown().nullable(),
    error: zod.unknown().nullable(),
  });

/**
 * 사장님 공구 마감 요청을 접수한다.
`SOLD_OUT`, `STORE_CONDITION`은 즉시 마감 처리되며, `OTHER`는 즉시 마감되지 않고 운영자 검토 대기 상태로 저장된다.

 * @summary 사장님 공구 마감 요청
 */
export const PostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsParams = zod.object({
  groupBuyId: zod.number(),
});

export const postApiV1OwnerGroupBuysGroupBuyIdCloseRequestsBodyReasonDetailMax = 100;

export const PostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsBody = zod.object({
  reason: zod.enum(['SOLD_OUT', 'STORE_CONDITION', 'OTHER']),
  reasonDetail: zod
    .string()
    .max(postApiV1OwnerGroupBuysGroupBuyIdCloseRequestsBodyReasonDetailMax)
    .nullish()
    .describe('reason이 OTHER일 때 필수'),
});

export const PostApiV1OwnerGroupBuysGroupBuyIdCloseRequestsResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.unknown().nullable(),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 사장님 월별 정산 예정 조회
 */
export const getApiV1OwnerSettlementsMonthlySummaryQueryMonthMax = 12;

export const GetApiV1OwnerSettlementsMonthlySummaryQueryParams = zod.object({
  year: zod.number(),
  month: zod
    .number()
    .min(1)
    .max(getApiV1OwnerSettlementsMonthlySummaryQueryMonthMax),
});

export const GetApiV1OwnerSettlementsMonthlySummaryResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    year: zod.number(),
    month: zod.number(),
    settlementExpectedAmount: zod.number(),
    grossRevenueAmount: zod.number(),
    refundFeeAmount: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 정산 월 칩 조회
 */
export const GetApiV1OwnerSettlementsMonthChipsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    chips: zod.array(
      zod.object({
        year: zod.number(),
        month: zod.number(),
        label: zod.string(),
      }),
    ),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 정산 공구 카드 목록 조회
 */
export const getApiV1OwnerSettlementsItemsQueryYearMin = 2000;
export const getApiV1OwnerSettlementsItemsQueryYearMax = 2100;

export const getApiV1OwnerSettlementsItemsQueryMonthMax = 12;

export const GetApiV1OwnerSettlementsItemsQueryParams = zod.object({
  year: zod
    .number()
    .min(getApiV1OwnerSettlementsItemsQueryYearMin)
    .max(getApiV1OwnerSettlementsItemsQueryYearMax),
  month: zod.number().min(1).max(getApiV1OwnerSettlementsItemsQueryMonthMax),
});

export const GetApiV1OwnerSettlementsItemsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    year: zod.number(),
    month: zod.number(),
    items: zod.array(
      zod.object({
        groupBuyId: zod.number(),
        productName: zod.string(),
        participantCount: zod.number(),
        pickupDate: zod.iso.date(),
        amount: zod.number(),
        settlementStatus: zod
          .enum([
            'SETTLEMENT_COMPLETED',
            'SETTLEMENT_PENDING',
            'REFUND_PROCESSING',
          ])
          .describe('사장님 공구 정산 상태'),
      }),
    ),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 환불 요청 목록 조회
 */
export const getApiV1OwnerSettlementsRefundRequestsQueryTabDefault = `ALL`;

export const GetApiV1OwnerSettlementsRefundRequestsQueryParams = zod.object({
  tab: zod
    .enum(['ALL', 'PENDING', 'COMPLETED'])
    .default(getApiV1OwnerSettlementsRefundRequestsQueryTabDefault),
});

export const GetApiV1OwnerSettlementsRefundRequestsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    pendingCount: zod.number(),
    completedCount: zod.number(),
    hasPendingItems: zod.boolean(),
    items: zod.array(
      zod.object({
        participationId: zod.number(),
        groupBuyId: zod.number(),
        productName: zod.string(),
        paymentAmount: zod.number(),
        requesterName: zod.string(),
        requesterCode: zod.string(),
        refundReasonLabel: zod.string(),
        requestedDate: zod.iso.date(),
        status: zod.enum(['PENDING', 'COMPLETED']),
        exceeded24Hours: zod.boolean(),
      }),
    ),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 사장님 환불 요청 상세 조회
 */
export const GetApiV1OwnerSettlementsRefundRequestsParticipationIdParams =
  zod.object({
    participationId: zod.number(),
  });

export const GetApiV1OwnerSettlementsRefundRequestsParticipationIdResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.object({
      participationId: zod.number(),
      groupBuyId: zod.number(),
      productName: zod.string(),
      requesterName: zod.string(),
      requestedDate: zod.iso.date(),
      paymentAmount: zod.number(),
      penaltyAmount: zod.number(),
      refundExpectedAmount: zod.number(),
      refundReasonDetail: zod.string().nullish(),
      status: zod.enum(['PENDING', 'COMPLETED']),
    }),
    error: zod.unknown().nullable(),
  });

/**
 * @summary 사장님 환불 요청 검토 제출
 */
export const PostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsParams =
  zod.object({
    participationId: zod.number(),
  });

export const postApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsBodyDisputeReasonMax = 500;

export const PostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsBody =
  zod.object({
    action: zod.enum(['APPROVE', 'DISPUTE']),
    disputeReason: zod
      .string()
      .max(
        postApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsBodyDisputeReasonMax,
      )
      .nullish()
      .describe('action이 DISPUTE일 때 입력'),
  });

export const PostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissionsResponse =
  zod.object({
    success: zod.boolean(),
    data: zod.object({
      participationId: zod.number(),
      processed: zod.boolean(),
    }),
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
- imageUrls의 첫 번째 key를 대표 이미지(thumbnailKey)로 저장한다.
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
    .describe('상품 이미지 S3 key 목록. 첫 번째 key를 대표 이미지로 사용한다.'),
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
