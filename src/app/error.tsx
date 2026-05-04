'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: Props) {
  const router = useRouter();

  const handleReset = () => {
    router.refresh();
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-g6 px-5 text-center">
      <div className="flex flex-col items-center gap-g4">
        <Icon
          icon="solar:sad-circle-outline"
          className="w-16 h-16 text-primary-400"
        />
        <div className="flex flex-col gap-g2">
          <p className="heading-lg-bold">오류가 발생했어요</p>
          <p className="body-md-medium text-text-tertiary">
            잠시 후 다시 시도해 주세요
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-g3 w-full max-w-xs">
        <button
          onClick={handleReset}
          className="w-full py-p4 rounded-2xlarge bg-primary-400 text-white body-md-semibold cursor-pointer"
        >
          다시 시도
        </button>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
          className="w-full py-p4 rounded-2xlarge border border-border-default text-text-secondary body-md-medium cursor-pointer"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
