'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

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
        <Image src="/icons/starpoint.svg" alt="" width={91} height={91} />
        <div className="flex flex-col gap-g2">
          <p className="heading-lg-bold">오류가 발생했어요</p>
          <p className="body-md-medium text-text-tertiary">
            잠시 후 다시 시도해 주세요
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-g3">
        <Button
          size="md"
          variant="outline"
          className="w-[140px]"
          onClick={() => router.push('/')}
        >
          홈으로
        </Button>
        <Button
          size="md"
          variant="primary"
          className="w-[140px]"
          onClick={handleReset}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}
