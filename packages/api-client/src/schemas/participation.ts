import * as zod from 'zod';

/**
 * Orval 자동생성 zod 스키마가 커버하지 못하는 결제 관련 응답 스키마.
 * 수동으로 관리하며, 타입 안정성과 런타임 검증을 위해 사용합니다.
 */

// GET /api/v1/group-buys/:groupBuyId/checkout
export const CheckoutInfoData = zod.object({
  groupBuyId: zod.number().int().positive(),
  storeName: zod.string().min(1),
  productName: zod.string().min(1),
  thumbnailUrl: zod.string().nullable(),
  pickupDate: zod.string(),
  pickupTimeStart: zod.string(),
  pickupTimeEnd: zod.string(),
  unitPrice: zod.number().int().positive(),
  quantity: zod.number().int().positive(),
  productAmount: zod.number().int().nonnegative(),
  feeAmount: zod.number().int().nonnegative(),
  totalAmount: zod.number().int().positive(),
  remainingQuantity: zod.number().int().nonnegative(),
});

export const CheckoutInfoResponse = zod.object({
  success: zod.literal(true),
  data: CheckoutInfoData,
  error: zod.null(),
});

// POST /api/v1/group-buys/:groupBuyId/payment-orders
export const PaymentOrderCreatedData = zod.object({
  paymentId: zod.string().min(1),
  storeId: zod.string().min(1),
  channelKey: zod.string().min(1),
  orderName: zod.string().min(1),
  amount: zod.number().int().positive(),
  customerName: zod.string().nullable(),
});

export const PaymentOrderCreatedResponse = zod.object({
  success: zod.literal(true),
  data: PaymentOrderCreatedData,
  error: zod.null(),
});

// POST /api/v1/payments/portone/complete
export const PaymentConfirmedData = zod.object({
  paymentId: zod.string().min(1),
  participationId: zod.number().int().positive(),
  participationStatus: zod.enum(['PAID_WAITING_GOAL', 'CONFIRMED']),
  displayStatus: zod.string(),
  amount: zod.number().int().positive(),
  method: zod.string().nullable().optional(),
  approvedAt: zod.string(),
});

export const PaymentConfirmedResponse = zod.object({
  success: zod.literal(true),
  data: PaymentConfirmedData,
  error: zod.null(),
});

// 타입 추출
export type CheckoutInfoData = zod.infer<typeof CheckoutInfoData>;
export type CheckoutInfoResponse = zod.infer<typeof CheckoutInfoResponse>;
export type PaymentOrderCreatedData = zod.infer<typeof PaymentOrderCreatedData>;
export type PaymentOrderCreatedResponse = zod.infer<
  typeof PaymentOrderCreatedResponse
>;
export type PaymentConfirmedData = zod.infer<typeof PaymentConfirmedData>;
export type PaymentConfirmedResponse = zod.infer<
  typeof PaymentConfirmedResponse
>;
