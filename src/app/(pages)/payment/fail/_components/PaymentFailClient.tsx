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
    <div className="flex flex-col items-center justify-center min-h-screen gap-g6 p-4">
      <div className="flex flex-col items-center gap-g4">
        <Icon
          icon="ic:baseline-cancel"
          className="w-16 h-16 text-text-danger"
        />
        <p className="heading-lg-bold">결제에 실패했어요</p>
        <p className="body-md-regular text-text-tertiary">
          잠시 후 다시 시도해주세요.
        </p>
        {errorCode && (
          <p className="caption-sm-regular text-text-disabled">
            오류 코드: {errorCode}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-g3 w-full max-w-sm">
        <button
          onClick={() => window.history.back()}
          className="w-full text-center py-p4 rounded-xlarge bg-button-primary text-text-basic-inverse body-md-bold"
        >
          다시 시도하기
        </button>
        <Link
          href="/feed"
          className="w-full text-center py-p4 rounded-xlarge border border-border-subtle text-text-basic body-md-regular"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailClient;
