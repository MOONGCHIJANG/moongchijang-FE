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
    <div className="flex flex-col min-h-screen bg-white font-pretendard">
      <header className="flex items-center h-[57px] px-4 border-b border-gray-100 shrink-0 gap-[2px]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8"
          aria-label="뒤로가기"
        >
          <Icon icon="lucide:chevron-left" className="w-6 h-6 text-gray-900" />
        </button>
        <span className="text-body-lg-semibold text-gray-900">주소 상세</span>
      </header>

      <div className="mx-4 mt-3 bg-gray-100 h-[226px]" />

      <div className="flex flex-col px-4 pt-4.5 pb-8">
        <span className="text-heading-md-semibold text-gray-900">
          {store?.roadAddress}
        </span>
        {store?.lotAddress && (
          <span className="text-body-lg-semibold text-gray-500">
            {store.lotAddress}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
        <p className="text-[12px] font-semibold text-gray-500 text-center">
          요청 후 매장 변경이 어려워요. 매장을 한 번 더 확인해주세요
        </p>
        <Button
          size="lg"
          fullWidth
          className="text-white font-bold text-[16px] h-12 shadow-none"
          onClick={onConfirm}
        >
          매장 선택하기
        </Button>
      </div>
    </div>
  );
};
