'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type Props = { participationId: string };

const PaymentCompleteClient = ({ participationId }: Props) => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem('paymentSuccess');
    if (flag !== participationId) {
      router.replace('/feed');
      return;
    }
    sessionStorage.removeItem('paymentSuccess');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVerified(true);
  }, [participationId, router]);

  // 검증 전엔 아무것도 렌더링하지 않음
  if (!verified) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-g6 p-4">
      <div className="flex flex-col items-center gap-g4">
        <Icon
          icon="ic:baseline-check-circle"
          className="w-16 h-16 text-icon-primary"
        />
        <p className="heading-lg-bold">결제가 완료되었어요!</p>
        <p className="body-md-regular text-text-tertiary">
          참여 번호: {participationId}
        </p>
      </div>
      <Link
        href="/feed"
        className="w-full max-w-sm text-center py-p4 rounded-xlarge bg-button-primary text-text-basic-inverse body-md-bold"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default PaymentCompleteClient;
