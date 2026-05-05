'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';

type Props = { participationId: string };

const PaymentCompleteClient = ({ participationId }: Props) => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  const onClick = () => {
    router.push('/feed');
  };

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
    <div className="flex flex-col items-center justify-center min-h-svh gap-g6 px-5 text-center">
      <div className="flex flex-col items-center gap-g4">
        <Image
          src="/images/PaySuccess.svg"
          alt="결제 성공"
          width={130}
          height={86}
        />
        <div className="flex flex-col gap-g5 items-center">
          <div className="flex flex-col gap-g3">
            <p className="text-text-subtle heading-md-semibold">결제 완료</p>
            <p className="text-black heading-1xl-bold whitespace-break-spaces">{`공구가 달성되면\n알림톡을 보내드릴게요`}</p>
          </div>
          {/* TODO: 경로 확정 시 수정 */}
          <Link
            href="/feed"
            className="flex gap-g2 items-center text-text-brand caption-sm-bold"
          >
            <p>공구 참여 목록 보기</p>
            <Icon icon="lucide:chevron-right" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-5 w-full max-w-md mx-auto z-10 flex flex-col gap-10">
        <div className="mx-4 rounded-2xlarge flex flex-col gap-g4 h-28 justify-center items-center bg-surface-secondary-lighter">
          <div className="flex gap-g2 items-center">
            <Icon
              icon="ph:seal-question-fill"
              className="w-4 h-4 text-icon-secondary"
            />
            <p className="body-md-bold text-text-subtle">
              공구가 달성되지 않으면 어떻게 되나요?
            </p>
          </div>
          <p className="caption-sm-medium text-text-disabled whitespace-break-spaces">
            {`목표수량 미달성 시 마감일 기준 영업일 1일 이내 \n 결제 수단으로 `}
            <span className="caption-sm-bold">전액 자동 환불</span>
            {`돼요.`}
          </p>
        </div>
        <Button
          className="bg-button-natural"
          size="lg"
          onClick={onClick}
          fullWidth
        >
          다른 상품 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default PaymentCompleteClient;
