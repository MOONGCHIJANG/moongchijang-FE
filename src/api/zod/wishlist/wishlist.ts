/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 찜 추가
 */
export const PostApiV1GroupBuysGroupBuyIdWishlistParams = zod.object({
  groupBuyId: zod.number(),
});

/**
 * @summary 찜 해제
 */
export const DeleteApiV1GroupBuysGroupBuyIdWishlistParams = zod.object({
  groupBuyId: zod.number(),
});

export const DeleteApiV1GroupBuysGroupBuyIdWishlistResponse = zod.object({
  success: zod.boolean(),
  data: zod.unknown().nullable(),
  error: zod.unknown().nullable(),
});

/**
 * @summary 찜 목록 조회
 */
export const getApiV1WishlistsQueryFilterDefault = `ALL`;
export const getApiV1WishlistsQueryExcludeClosedDefault = false;
export const getApiV1WishlistsQuerySortDefault = `LATEST`;
export const getApiV1WishlistsQueryPageDefault = 0;
export const getApiV1WishlistsQuerySizeDefault = 20;
export const getApiV1WishlistsQuerySizeMax = 100;

export const GetApiV1WishlistsQueryParams = zod.object({
  filter: zod
    .enum(['ALL', 'CLOSING_SOON', 'OPEN'])
    .default(getApiV1WishlistsQueryFilterDefault)
    .describe('ALL=전체 \/ CLOSING_SOON=마감임박(D-3) \/ OPEN=모집중'),
  excludeClosed: zod
    .boolean()
    .default(getApiV1WishlistsQueryExcludeClosedDefault)
    .describe('true면 마감 공고 제외, false면 마감 포함'),
  sort: zod
    .enum(['LATEST', 'DEADLINE'])
    .default(getApiV1WishlistsQuerySortDefault),
  page: zod.number().default(getApiV1WishlistsQueryPageDefault),
  size: zod
    .number()
    .max(getApiV1WishlistsQuerySizeMax)
    .default(getApiV1WishlistsQuerySizeDefault),
});

export const GetApiV1WishlistsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    content: zod.array(
      zod.object({
        groupBuyId: zod.number(),
        thumbnailUrl: zod.string().nullable().describe('대표 썸네일 URL'),
        dDay: zod.number().describe('마감 D-day (예: D-3 -> 3)'),
        dDayLabel: zod.string().describe('마감 뱃지 문자열 (예: D-3)'),
        storeName: zod.string(),
        regionLabel: zod.string().describe('시\/도 한글 라벨'),
        productName: zod.string(),
        pickupDate: zod.iso.date().describe('픽업 날짜 원본 값'),
        pickupDateLabel: zod.string().describe('픽업 날짜 표시 문자열'),
        deadline: zod.iso
          .datetime({ offset: true })
          .describe('마감 일시 원본 값'),
        deadlineLabel: zod.string().describe('마감 날짜 표시 문자열'),
        achievementRate: zod.number().describe('달성률 % (0~100)'),
        price: zod.number(),
        currentParticipantCount: zod.number().describe('현재 참여 인원 수'),
        targetParticipantCount: zod.number().describe('목표 참여 인원 수'),
        isWishlisted: zod.boolean().describe('찜 여부'),
      }),
    ),
    totalElements: zod.number(),
    totalPages: zod.number(),
    number: zod.number(),
    size: zod.number(),
    urgentCount: zod
      .number()
      .describe('마감 24시간 이내 건수 (0이면 배너 미노출)'),
  }),
  error: zod.unknown().nullable(),
});
