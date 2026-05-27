'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/Button';
import { logEvent } from '@/lib/analytics';

export const SubmitCompleteStep = () => {
  const router = useRouter();

  useEffect(() => {
    logEvent('screen_view', { screen_name: 'group_request_complete' });
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-white">
      <header className="flex items-center h-[57px] px-4 border-b border-border-subtle shrink-0 gap-[2px]">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-8 h-8"
          aria-label="뒤로가기"
        >
          <Icon
            icon="lucide:chevron-left"
            className="w-6 h-6 text-icon-basic"
          />
        </button>
        <span className="heading-sm-semibold text-text-basic">
          공구 요청하기
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/images/group-buy-request-complete.svg"
            alt="공구 요청 완료 일러스트"
            width={153}
            height={101}
            style={{ width: 'auto' }}
          />
          <div className="flex flex-col items-center gap-2 text-center w-full">
            <span className="heading-md-bold text-text-basic">
              뭉치장 공동구매 요청이
              <br />
              완료되었어요!
            </span>
            <p className="body-md-bold text-text-tertiary w-full">
              요청하신 매장 및 상품을 검토하는 데에
              <br />
              2~5 영업일이 소요될 수 있어요.
            </p>
          </div>
        </div>

        <Button
          size="md"
          fullWidth
          className="w-full text-text-basic-inverse cursor-pointer"
          onClick={() => router.push('/feed')}
        >
          다른 공구 상품 보러가기 →
        </Button>
      </div>
    </div>
  );
};
