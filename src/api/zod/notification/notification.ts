/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 알림 목록 조회 (폴링용)
 */
export const getApiV1NotificationsQueryCategoryDefault = `ALL`;
export const getApiV1NotificationsQueryLimitDefault = 20;
export const getApiV1NotificationsQueryLimitMax = 100;

export const GetApiV1NotificationsQueryParams = zod.object({
  category: zod
    .enum(['ALL', 'WISH', 'APPLY', 'PICKUP', 'REQUEST'])
    .default(getApiV1NotificationsQueryCategoryDefault)
    .describe('알림 카테고리 필터'),
  cursor: zod
    .string()
    .optional()
    .describe('다음 페이지 조회 커서. 형식: `{occurredAt}|{id}`'),
  limit: zod
    .number()
    .min(1)
    .max(getApiV1NotificationsQueryLimitMax)
    .default(getApiV1NotificationsQueryLimitDefault)
    .describe('조회 개수 (1~100, 기본 20)'),
});

export const GetApiV1NotificationsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    items: zod.array(
      zod.object({
        id: zod.number(),
        type: zod.enum(['PICKUP', 'WISH', 'APPLY', 'REQUEST']),
        title: zod.string(),
        body: zod.string().describe('알림 본문 요약'),
        isRead: zod.boolean(),
        occurredAt: zod.iso.datetime({ offset: true }),
        targetId: zod.number().nullish(),
        deeplinkType: zod.enum([
          'PICKUP_GUIDE',
          'GROUPBUY_DETAIL',
          'MY_APPLYING',
          'REQUEST_STATUS',
        ]),
        triggerType: zod
          .enum([
            'PICKUP_SAME_DAY_MORNING',
            'PICKUP_DAY_BEFORE_MORNING',
            'PICKUP_NOT_COMPLETED_AFTER_CUTOFF',
            'WISH_DEADLINE_MINUS_3_DAYS',
            'WISH_DEADLINE_MINUS_1_DAY',
            'WISH_TARGET_ACHIEVED_IMMEDIATE',
            'APPLY_PAYMENT_SUCCESS_IMMEDIATE',
            'APPLY_GROUPBUY_ACHIEVED_IMMEDIATE',
            'APPLY_GROUPBUY_FAILED_IMMEDIATE',
            'REQUEST_OPENED_IMMEDIATE',
            'REQUEST_REJECTED_IMMEDIATE',
            'REQUEST_NEW_PARTICIPANT_IMMEDIATE',
            'REQUEST_TARGET_ACHIEVED_IMMEDIATE',
            'REQUEST_DEADLINE_MINUS_3_DAYS',
          ])
          .describe(
            '알림 시나리오 식별자입니다.\n1=PICKUP_SAME_DAY_MORNING\n2=PICKUP_DAY_BEFORE_MORNING\n3=PICKUP_NOT_COMPLETED_AFTER_CUTOFF\n4=WISH_DEADLINE_MINUS_3_DAYS\n5=WISH_DEADLINE_MINUS_1_DAY\n6=WISH_TARGET_ACHIEVED_IMMEDIATE\n7=APPLY_PAYMENT_SUCCESS_IMMEDIATE\n8=APPLY_GROUPBUY_ACHIEVED_IMMEDIATE\n9=APPLY_GROUPBUY_FAILED_IMMEDIATE\n10=REQUEST_OPENED_IMMEDIATE\n11=REQUEST_REJECTED_IMMEDIATE\n12=REQUEST_NEW_PARTICIPANT_IMMEDIATE\n13=REQUEST_TARGET_ACHIEVED_IMMEDIATE\n14=REQUEST_DEADLINE_MINUS_3_DAYS\n',
          )
          .nullish()
          .describe(
            '알림 트리거 타입(1~14 시나리오 식별). 기존 데이터는 null일 수 있습니다.',
          ),
        deeplinkParams: zod
          .record(zod.string(), zod.string())
          .describe(
            '딥링크 파라미터. PICKUP_GUIDE는 participationId, GROUPBUY_DETAIL\/MY_APPLYING은 groupBuyId, REQUEST_STATUS는 requestId를 사용합니다.',
          ),
        section: zod.enum(['TODAY', 'YESTERDAY', 'OLDER']),
      }),
    ),
    nextCursor: zod.string().nullish(),
    hasNext: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 미읽음 알림 개수 조회
 */
export const GetApiV1NotificationsUnreadCountResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    count: zod.number(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 전체 알림 읽음 처리
 */
export const PatchApiV1NotificationsReadAllResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 알림 단건 읽음 처리
 */
export const PatchApiV1NotificationsNotificationIdReadParams = zod.object({
  notificationId: zod.number(),
});

export const PatchApiV1NotificationsNotificationIdReadResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});
