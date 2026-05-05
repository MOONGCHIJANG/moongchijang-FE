'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import type { RequestFormData } from './RequestFormStep';

interface RequestConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: RequestFormData;
}

const formatModalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${year}.${month}.${day}`;
};

export const RequestConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: RequestConfirmModalProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-bg-dim-darker px-[21.5px] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'relative w-full max-w-[337px] rounded-3xlarge bg-surface-white px-4 pt-10 pb-4 flex flex-col gap-8 transition-transform duration-300',
          isOpen ? 'scale-100' : 'scale-95',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[10px] right-4"
          aria-label="닫기"
        >
          <Icon icon="lucide:x" className="w-6 h-6 text-icon-basic" />
        </button>

        <div className="flex flex-col items-center">
          <p className="heading-md-semibold text-text-basic text-center">
            잠깐! 요청하시는 내용이 맞나요?
          </p>
          <p className="body-md-semibold text-text-brand text-center">
            제출하면 수정이 어려워요
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <span className="body-lg-medium text-text-tertiary shrink-0">
              매장명
            </span>
            <span className="body-lg-medium text-text-basic text-right ml-4 truncate">
              {data.store.storeName}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <span className="body-lg-medium text-text-tertiary shrink-0">
              상품명
            </span>
            <span className="body-lg-medium text-text-basic text-right ml-4 truncate">
              {data.productName}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <span className="body-lg-medium text-text-tertiary shrink-0">
              희망참여수량
            </span>
            <span className="body-lg-medium text-text-basic text-right ml-4">
              {data.quantity}개
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <span className="body-lg-medium text-text-tertiary shrink-0">
              희망픽업날짜
            </span>
            <span className="body-lg-medium text-text-basic text-right ml-4">
              {formatModalDate(data.pickupDate)}
            </span>
          </div>
          {data.additionalNote && (
            <div className="flex flex-col gap-1 py-1">
              <span className="body-lg-medium text-text-tertiary">
                추가 요청사항
              </span>
              <span className="body-lg-medium text-text-basic">
                {data.additionalNote}
              </span>
            </div>
          )}
        </div>

        <Button
          size="lg"
          fullWidth
          className="w-full text-text-basic-inverse cursor-pointer"
          onClick={onConfirm}
        >
          요청 제출하기
        </Button>
      </div>
    </div>
  );
};
