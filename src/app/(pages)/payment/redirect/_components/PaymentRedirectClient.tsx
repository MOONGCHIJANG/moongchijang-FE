'use client';
import { useEffect } from 'react';
import {
  postApiV1PaymentsConfirm,
  postApiV1PaymentsFail,
} from '@/api/generated/participation/participation';

type Props = {
  paymentId?: string;
  participationId?: string;
  amount?: string;
  groupBuyId?: string;
  code?: string;
  message?: string;
};

const PaymentRedirectClient = ({
  paymentId,
  participationId,
  amount,
  groupBuyId,
  code,
  message,
}: Props) => {
  useEffect(() => {
    const process = async () => {
      if (code) {
        await postApiV1PaymentsFail({
          paymentId: paymentId!,
          participationId: Number(participationId ?? 0),
          errorCode: code,
          message: message ?? null,
        }).catch(() => {});

        sessionStorage.setItem('paymentFail', code);
        window.location.replace(
          `/payment/fail?errorCode=${encodeURIComponent(code)}&groupBuyId=${groupBuyId ?? ''}`,
        );
        return;
      }

      // 결제 성공
      try {
        const confirmRes = await postApiV1PaymentsConfirm({
          paymentId: paymentId!,
          participationId: Number(participationId),
          amount: Number(amount),
        });

        if (confirmRes.status !== 200 || !confirmRes.data.success) {
          throw new Error('결제 확인 실패');
        }

        sessionStorage.setItem('paymentSuccess', participationId!);
        await new Promise((resolve) => setTimeout(resolve, 50));
        window.location.replace(
          `/payment/complete?participationId=${participationId}&groupBuyId=${groupBuyId}`,
        );
      } catch (error) {
        const errorCode = error instanceof Error ? error.message : 'UNKNOWN';

        await postApiV1PaymentsFail({
          paymentId: paymentId!,
          participationId: Number(participationId ?? 0),
          errorCode,
          message: errorCode,
        }).catch(() => {});

        sessionStorage.setItem('paymentFail', errorCode);
        window.location.replace(
          `/payment/fail?errorCode=${encodeURIComponent(errorCode)}&groupBuyId=${groupBuyId ?? ''}`,
        );
      }
    };

    process();
  }, [amount, code, groupBuyId, message, participationId, paymentId]);

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
