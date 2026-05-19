'use client';
import { useEffect } from 'react';
import { postApiV1PaymentsPortoneComplete } from '@/api/generated/participation/participation';

type Props = {
  paymentId?: string;
  amount?: string;
  groupBuyId?: string;
  code?: string;
  message?: string;
};

const PaymentRedirectClient = ({
  paymentId,
  amount,
  groupBuyId,
  code,
  message,
}: Props) => {
  useEffect(() => {
    const process = async () => {
      // 포트원 실패 콜백 (code 있음)
      if (code) {
        sessionStorage.setItem('paymentFail', code);
        window.location.replace(
          `/payment/fail?errorCode=${encodeURIComponent(code)}&groupBuyId=${groupBuyId ?? ''}`,
        );
        return;
      }

      try {
        const completeRes = await postApiV1PaymentsPortoneComplete({
          paymentId: paymentId!,
          amount: Number(amount),
        });

        if (completeRes.status !== 200) throw new Error('결제 확인 실패');

        const { participationId } = completeRes.data.data;

        sessionStorage.setItem('paymentSuccess', participationId.toString());
        await new Promise((resolve) => setTimeout(resolve, 50));
        window.location.replace(
          `/payment/complete?participationId=${participationId}&groupBuyId=${groupBuyId}`,
        );
      } catch (error) {
        const errorCode = error instanceof Error ? error.message : 'UNKNOWN';
        sessionStorage.setItem('paymentFail', errorCode);
        window.location.replace(
          `/payment/fail?errorCode=${encodeURIComponent(errorCode)}&groupBuyId=${groupBuyId ?? ''}`,
        );
      }
    };

    process();
  }, [amount, code, groupBuyId, message, paymentId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-g4">
        <div className="w-8 h-8 border-4 border-border-brand border-t-transparent rounded-full animate-spin" />
        <p className="body-md-semibold text-text-basic">결제 처리 중...</p>
      </div>
    </div>
  );
};

export default PaymentRedirectClient;
