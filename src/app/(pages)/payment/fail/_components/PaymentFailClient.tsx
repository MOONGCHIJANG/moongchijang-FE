'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type Props = { errorCode: string };

const PaymentFailClient = ({ errorCode }: Props) => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem('paymentFail');
    if (flag !== errorCode) {
      router.replace('/feed');
      return;
    }
    sessionStorage.removeItem('paymentFail');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVerified(true);
  }, [errorCode, router]);

  // 검증 전엔 아무것도 렌더링하지 않음
  if (!verified) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-g6 px-5 text-center">
      <div className="flex flex-col items-center gap-g4">
        <Icon
          icon="solar:sad-circle-outline"
          className="w-16 h-16 text-primary-400"
        />
        <div className="flex flex-col gap-g2">
          <p className="heading-lg-bold">결제 오류가 발생했어요</p>
          <p className="body-md-medium text-text-tertiary">
            잠시 후 다시 시도해 주세요
          </p>
          {errorCode && (
            <p className="caption-sm-regular text-text-disabled">
              오류 코드: {errorCode}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-g3 w-full max-w-xs">
        <Link
          href="/feed"
          className="w-full py-p4 rounded-2xlarge border border-border-default text-text-secondary body-md-medium cursor-pointer"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailClient;
