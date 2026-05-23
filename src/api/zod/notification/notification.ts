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
        deeplinkParams: zod
          .record(zod.string(), zod.string())
          .describe(
            '딥링크 파라미터. PICKUP_GUIDE\/GROUPBUY_DETAIL\/MY_APPLYING은 groupBuyId, REQUEST_STATUS는 targetId를 사용합니다.',
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
