import * as zod from 'zod';

/**
 * Orval 자동생성 zod 스키마가 커버하지 못하는 결제 관련 응답 스키마.
 * 수동으로 관리하며, 타입 안정성과 런타임 검증을 위해 사용합니다.
 */

// POST /api/v1/group-buys/:groupBuyId/participations
export const ParticipationCreatedData = zod.object({
  participationId: zod.number().int().positive(),
  orderName: zod.string().min(1),
  totalAmount: zod.number().int().positive(),
  productAmount: zod.number().int().nonnegative(),
  feeAmount: zod.number().int().nonnegative(),
});

export const ParticipationCreatedResponse = zod.object({
  success: zod.literal(true),
  data: ParticipationCreatedData,
  error: zod.null(),
});

// POST /api/v1/payments/confirm
export const PaymentConfirmResponse = zod.object({
  success: zod.literal(true),
  data: zod.object({}).passthrough(),
  error: zod.null(),
});

// POST /api/v1/payments/fail
export const PaymentFailResponse = zod.object({
  success: zod.literal(true),
  data: zod.object({}).passthrough(),
  error: zod.null(),
});

// 타입 추출
export type ParticipationCreatedData = zod.infer<
  typeof ParticipationCreatedData
>;
export type ParticipationCreatedResponse = zod.infer<
  typeof ParticipationCreatedResponse
>;
