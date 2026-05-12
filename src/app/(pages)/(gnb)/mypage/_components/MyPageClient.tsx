import { Icon } from '@iconify/react';
import Image from 'next/image';
import React from 'react';

const MyPageClient = () => {
  return (
    <>
      {/* 비로그인 상태일 때 */}
      <div className="h-dvh bg-surface-white no-scroll">
        <div className="py-4 bg-bg-white-muted">
          <button className="flex justify-between w-full items-center p-g5 bg-surface-white">
            <p className="heading-sm-semibold">로그인하고 뭉치장 이용하기</p>
            <Icon
              icon="lucide:chevron-right"
              className="w-8 h-8 text-icon-basic"
            />
          </button>
        </div>
        <div className="flex flex-col gap-g5 items-center pt-25">
          <Image src="/icons/starpoint.svg" width={91} height={91} alt="" />
          <p className="whitespace-pre-line heading-sm-medium text-center">{`로그인 후\n이용 가능해요`}</p>
        </div>
      </div>
    </>
  );
};

export default MyPageClient;
