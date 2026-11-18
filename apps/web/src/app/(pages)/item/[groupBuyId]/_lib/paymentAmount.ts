// 수수료 변경 시 해당 값 수정 → 30% 라면 30
export const FEE_RATE = 0;

/** 표시용 결제 금액 (checkout 응답 전, 공구가 기준) */
export const getPaymentAmounts = (price: number, quantity: number) => {
  const productAmount = price * quantity;
  const feeAmount = Math.floor((productAmount * FEE_RATE) / 100);
  return { productAmount, feeAmount, totalAmount: productAmount + feeAmount };
};
