import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import BackHeader from '../../item/[groupBuyId]/join/_components/BackHeader';

interface Props {
  searchParams: Promise<{ participationId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { participationId } = await searchParams;

  return (
    <>
      <BackHeader text="결제 완료" />
      <div className="flex flex-col items-center justify-center min-h-screen gap-g6 p-4">
        <div className="flex flex-col items-center gap-g4">
          <Icon
            icon="ic:baseline-check-circle"
            className="w-16 h-16 text-icon-primary"
          />
          <p className="heading-lg-bold">결제가 완료되었어요!</p>
          {participationId && (
            <p className="body-md-regular text-text-tertiary">
              참여 번호: {participationId}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-g3 w-full max-w-sm">
          <Link
            href="/"
            className="w-full text-center py-p4 rounded-xlarge bg-button-primary text-text-basic-inverse body-md-bold"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
