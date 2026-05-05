'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { type Store } from './StoreSearchStep';
import { DatePickerBottomSheet } from './DatePickerBottomSheet';
import { RequestConfirmModal } from './RequestConfirmModal';

export interface RequestFormData {
  store: Store;
  productName: string;
  quantity: number;
  pickupDate: string;
  additionalNote: string;
}

interface RequestFormStepProps {
  selectedStore?: Store | null;
  onSearchStore?: () => void;
  onSubmit?: (data: RequestFormData) => void;
  onBack?: () => void;
  isLoading?: boolean;
  className?: string;
}

const formatPickupDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export const RequestFormStep = ({
  selectedStore,
  onSearchStore,
  onSubmit,
  onBack,
  isLoading = false,
  className,
}: RequestFormStepProps) => {
  const store = selectedStore ?? null;
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const quantityNum = Number(quantity);

  const isSubmittable = Boolean(
    store && productName.trim() && quantityNum > 0 && pickupDate,
  );

  const handleConfirm = () => {
    if (!isSubmittable || !store) return;
    setIsConfirmModalOpen(false);
    onSubmit?.({
      store,
      productName,
      quantity: quantityNum,
      pickupDate,
      additionalNote,
    });
  };

  return (
    <div className={cn('flex flex-col bg-white', className)}>
      {/* 헤더 */}
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

        <span className="heading-sm-semibold text-text-basic">
          공구 요청하기
        </span>
      </header>

      {/* 요청 폼 */}
      <div className="flex flex-col gap-4 px-4 pt-5 pb-8">
        {/* 인포 배너 */}
        <div className="flex items-center gap-2 px-2.5 py-2.5 bg-primary-50 rounded-2xlarge">
          <span className="heading-lg-regular leading-none shrink-0">💡</span>
          <p className="body-md-regular text-text-tertiary">
            요청하신 매장·상품을 검토 후 공구를 개설해드려요.
            <br />
            검토에 2~5 영업일이 소요될 수 있어요.
          </p>
        </div>

        {/* 매장 검색 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="body-md-semibold text-subtle">매장 검색</span>
            <span className="body-md-semibold text-text-brand">*</span>
          </div>
          <button
            type="button"
            onClick={onSearchStore}
            className={`body-md-regular ${cn(
              store ? 'text-icon-basic' : 'text-icon-disabled',
              'flex items-center gap-1 w-full px-3 py-4 bg-surface-default rounded-2xlarge text-left',
            )}`}
          >
            <Icon
              icon="lucide:search"
              className="w-4 h-4 text-icon-subtle shrink-0"
            />
            {store ? store.storeName : '매장 이름 또는 주소 검색'}
          </button>
        </div>

        {/* 베이커리/상품명 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="body-md-semibold text-text-subtle">
              베이커리/상품명
            </span>
            <span className="body-md-semibold text-text-brand">*</span>
          </div>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="원하는 상품명을 정확히 입력해주세요"
            className="w-full px-3 py-4 bg-surface-default rounded-2xlarge body-md-regular text-text-subtle placeholder:text-icon-disabled outline-none"
          />
          <div className="flex items-center gap-[2px]">
            <Icon
              icon="lucide:info"
              className="w-3 h-3 text-icon-primary shrink-0"
            />
            <span className="caption-sm-regular text-text-brand">
              1자 이상 20자 이내로 작성해주세요.
            </span>
          </div>
        </div>

        {/* 희망 참여 수량 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="body-md-semibold text-text-subtle">
              희망 참여 수량
            </span>
            <span className="body-md-semibold text-text-brand">*</span>
          </div>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1인 픽업 수량을 입력해주세요"
            className="w-full px-3 py-4 bg-gray-50 rounded-2xlarge body-md-regular text-text-subtle placeholder:text-icon-disabled outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-[2px]">
            <Icon
              icon="lucide:info"
              className="w-3 h-3 text-icon-primary shrink-0"
            />
            <span className="caption-sm-regular text-text-brand">
              최소 달성 수량은 운영자가 매장과 협의 후 결정됩니다.
            </span>
          </div>
        </div>

        {/* 희망 픽업 날짜 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="body-md-semibold text-text-subtle">
              희망 픽업 날짜
            </span>
            <span className="body-md-semibold text-primary-400">*</span>
          </div>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen(true)}
            className={`body-md-regular ${cn(
              pickupDate ? 'text-text-subtle' : 'text-icon-disabled',
              'flex items-center gap-2 px-3 py-4 bg-surface-default rounded-2xlarge',
            )}`}
          >
            <Icon
              icon="lucide:calendar-check"
              className="w-4 h-4 text-icon-subtle shrink-0"
            />
            {pickupDate ? formatPickupDate(pickupDate) : '날짜 선택'}
          </button>
          <div className="flex items-start gap-[2px]">
            <Icon
              icon="lucide:info"
              className="w-3 h-3 text-icon-primary mt-[3px] shrink-0"
            />
            <span className="caption-sm-regular text-text-brand">
              희망하신 날짜에 진행이 불가할 수 있으며, 실제 픽업일은 매장 협의
              후
              <br />
              확정됩니다.
            </span>
          </div>
        </div>

        {/* 추가 요청사항 (선택) */}
        <div className="flex flex-col gap-2">
          <span className="body-md-semibold text-text-subtle">
            추가 요청사항 (선택)
          </span>
          <textarea
            value={additionalNote}
            onChange={(e) => {
              setAdditionalNote(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder="자유롭게 입력해주세요"
            rows={1}
            className="w-full px-3 py-4 bg-surface-default rounded-2xlarge body-sm-regular text-text-subtle placeholder:text-icon-disabled outline-none resize-none overflow-hidden max-h-[120px]"
          />
        </div>

        {/* 제출 버튼 */}
        <Button
          size="lg"
          fullWidth
          className="w-full text-text-basic-inverse cursor-pointer"
          disabled={!isSubmittable || isLoading}
          onClick={() => setIsConfirmModalOpen(true)}
        >
          {isLoading ? '제출 중...' : '요청 제출하기'}
        </Button>
      </div>

      <DatePickerBottomSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={pickupDate}
        onSelect={setPickupDate}
      />

      {store && (
        <RequestConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirm}
          data={{
            store,
            productName,
            quantity: quantityNum,
            pickupDate,
            additionalNote,
          }}
        />
      )}
    </div>
  );
};
