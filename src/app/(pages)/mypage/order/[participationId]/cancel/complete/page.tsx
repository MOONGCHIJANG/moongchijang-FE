'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@/components/Button';

export default function CancelCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-bg-white-muted flex flex-col items-center">
      {/* 완료 아이콘 + 메시지 */}
      <div className="flex flex-col items-center gap-5 mt-[210px]">
        <Image src="/icons/complete.svg" width={80} height={80} alt="" />
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <p className="heading-md-semibold text-text-subtle text-center">
              취소 요청 완료
            </p>
            <p className="heading-1xl-bold text-text-basic text-center">
              공구 참여가 취소됐어요
            </p>
          </div>
          <Link
            href="/mypage"
            className="flex items-center gap-1 caption-sm-bold text-text-brand"
          >
            공구 참여 목록 보기
            <Icon icon="lucide:chevron-right" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 환불 안내 카드 */}
      <div className="mt-auto mb-28 w-full max-w-[329px] rounded-2xlarge bg-surface-secondary-lighter px-g4 py-g6">
        <div className="flex flex-col items-center gap-g3">
          <div className="flex items-center gap-1">
            <Image src="/icons/question.svg" width={16} height={16} alt="" />
            <p className="body-md-bold text-text-subtle">
              환불은 언제 완료되나요?
            </p>
          </div>
          <p className="caption-sm-medium text-text-disabled text-center whitespace-pre-line">
            카드사에 따라 환불까지{'\n'}영업일 기준{' '}
            <span className="font-bold">3~7일</span> 정도 소요될 수 있어요.
          </p>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-g5 pb-g5 pt-g3">
        <Button
          variant="black"
          size="lg"
          fullWidth
          onClick={() => router.push('/feed')}
        >
          다른 상품 둘러보기
        </Button>
      </div>
    </div>
  );
}
