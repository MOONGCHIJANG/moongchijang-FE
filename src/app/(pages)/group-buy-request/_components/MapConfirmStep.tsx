'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/components/Button';
import { type Store } from './StoreSearchStep';

interface MapConfirmStepProps {
  store?: Store | null;
  onBack: () => void;
  onConfirm: () => void;
}

export const MapConfirmStep = ({
  store,
  onBack,
  onConfirm,
}: MapConfirmStepProps) => {
  return (
    <div className="flex flex-col min-h-full bg-white">
      <header className="flex items-center h-[57px] px-4 border-b border-border-subtle shrink-0 gap-[2px]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8"
          aria-label="뒤로가기"
        >
          <Icon
            icon="lucide:chevron-left"
            className="w-6 h-6 text-icon-basic"
          />
        </button>
        <span className="heading-sm-semibold text-text-basic">주소 상세</span>
      </header>

      <div className="mx-4 mt-3 bg-surface-muted h-[226px]" />

      <div className="flex flex-col px-4 pt-4.5 pb-8">
        <span className="heading-md-semibold text-text-basic">
          {store?.roadAddress}
        </span>
        {store?.lotAddress && (
          <span className="body-md-bold text-text-tertiary mt-1">
            {store.lotAddress}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
        <p className="caption-sm-bold text-icon-subtle text-center">
          요청 후 매장 변경이 어려워요. 매장을 한 번 더 확인해주세요
        </p>
        <Button
          size="lg"
          fullWidth
          className="w-full text-text-basic-inverse cursor-pointer"
          onClick={onConfirm}
        >
          매장 선택하기
        </Button>
      </div>
    </div>
  );
};
