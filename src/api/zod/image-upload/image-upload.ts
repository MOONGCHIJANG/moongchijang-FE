/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * 인증된 사용자의 현재 역할이 BUYER, SELLER, ADMIN 중 하나이면 호출할 수 있다.
썸네일(최대 1장), 상품 이미지(최대 10장)에 대한 업로드 URL을 발급한다.

 * @summary S3 이미지 업로드용 Presigned URL 발급
 */
export const PostApiV1ImagesPresignedUrlsBody = zod.object({
  groupBuyId: zod.number().nullish().describe('공구 ID. 생성 전 단계면 null'),
  files: zod
    .array(
      zod.object({
        category: zod
          .enum(['THUMBNAIL', 'PRODUCT'])
          .describe('이미지 업로드 카테고리'),
        fileName: zod.string().describe('원본 파일명'),
        contentType: zod.string().describe('파일 Content-Type'),
      }),
    )
    .describe('발급 대상 파일 목록'),
});

export const PostApiV1ImagesPresignedUrlsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    items: zod
      .array(
        zod.object({
          category: zod
            .enum(['THUMBNAIL', 'PRODUCT'])
            .describe('이미지 업로드 카테고리'),
          key: zod.string().describe('S3 Object Key'),
          uploadUrl: zod.string().describe('S3 업로드용 Presigned URL'),
          method: zod.string(),
        }),
      )
      .describe('발급 결과 목록'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 인증된 사용자의 현재 역할이 BUYER, SELLER, ADMIN 중 하나이면 호출할 수 있다.
요청한 S3 key 목록을 삭제한다. 허용된 prefix 범위의 key만 삭제 가능하다.

 * @summary S3 업로드 이미지 삭제
 */
export const DeleteApiV1ImagesBody = zod.object({
  keys: zod.array(zod.string()).describe('삭제할 S3 key 목록'),
});

export const DeleteApiV1ImagesResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    deletedKeys: zod.array(zod.string()).describe('삭제 완료 key 목록'),
    failedKeys: zod.array(zod.string()).describe('삭제 실패 key 목록'),
  }),
  error: zod.unknown().nullable(),
});
