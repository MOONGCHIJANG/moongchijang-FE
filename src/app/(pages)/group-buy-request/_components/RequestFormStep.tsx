'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { type Store } from './StoreSearchStep';
import { DatePickerBottomSheet } from './DatePickerBottomSheet';

interface RequestFormData {
  store: Store;
  productName: string;
  quantity: string;
  pickupDate: string;
  additionalNote: string;
}

interface RequestFormStepProps {
  selectedStore?: Store | null;
  onSearchStore?: () => void;
  onSubmit?: (data: RequestFormData) => void;
  onBack?: () => void;
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
  className,
}: RequestFormStepProps) => {
  const store = selectedStore ?? null;
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const isSubmittable = Boolean(
    store && productName.trim() && quantity.trim() && pickupDate,
  );

  const handleSubmit = () => {
    if (!isSubmittable || !store) return;
    onSubmit?.({ store, productName, quantity, pickupDate, additionalNote });
  };

  return (
    <div
      className={cn(
        'flex flex-col min-h-screen bg-white font-pretendard',
        className,
      )}
    >
      {/* 헤더 */}
      <header className="flex items-center h-[57px] px-4 border-b border-gray-100 shrink-0 gap-[2px]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 font-pretendard"
          aria-label="뒤로가기"
        >
          <Icon icon="lucide:chevron-left" className="w-6 h-6 text-gray-900" />
        </button>

        <span className="text-body-lg-semibold text-gray-900">
          공구 요청하기
        </span>
      </header>

      {/* 요청 폼 */}
      <div className="flex flex-col gap-4 px-4 pt-5 pb-8">
        {/* 인포 배너 */}
        <div className="flex items-center gap-2 px-2.5 py-2.5 bg-primary-50 rounded-xl">
          <span className="text-heading-md-regular leading-none shrink-0">
            💡
          </span>
          <p className="text-body-sm-regular text-gray-500">
            요청하신 매장·상품을 검토 후 공구를 개설해드려요.
            <br />
            검토에 2~5 영업일이 소요될 수 있어요.
          </p>
        </div>

        {/* 매장 검색 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="text-body-sm-semibold text-gray-700">
              매장 검색
            </span>
            <span className="text-body-sm-semibold text-primary-400">*</span>
          </div>
          <button
            type="button"
            onClick={onSearchStore}
            className={`text-body-sm-regular ${cn(
              store ? 'text-gray-700' : 'text-gray-300',
              'flex items-center gap-1 w-full px-3 py-4 bg-gray-50 rounded-xl text-left font-pretendard',
            )}`}
          >
            <Icon
              icon="lucide:search"
              className="w-4 h-4 text-gray-500 shrink-0"
            />
            {store ? store.storeName : '매장 이름 또는 주소 검색'}
          </button>
        </div>

        {/* 베이커리/상품명 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="text-body-sm-semibold text-gray-700">
              베이커리/상품명
            </span>
            <span className="text-body-sm-semibold text-primary-400">*</span>
          </div>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="원하는 상품명을 정확히 입력해주세요"
            className="w-full px-3 py-4 bg-gray-50 rounded-xl text-body-sm-regular text-gray-700 placeholder:text-gray-300 outline-none font-pretendard"
          />
        </div>

        {/* 희망 참여 수량 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="text-body-sm-semibold text-gray-700">
              희망 참여 수량
            </span>
            <span className="text-body-sm-semibold text-primary-400">*</span>
          </div>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1인 픽업 수량을 입력해주세요"
            className="w-full px-3 py-4 bg-gray-50 rounded-xl text-body-sm-regular text-gray-700 placeholder:text-gray-300 outline-none font-pretendard [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-[2px]">
            <Icon
              icon="lucide:info"
              className="w-3 h-3 text-primary-400 shrink-0"
            />
            <span className="text-caption-sm-regular text-primary-400">
              최소 달성 수량은 운영자가 매장과 협의 후 결정됩니다.
            </span>
          </div>
        </div>

        {/* 희망 픽업 날짜 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <span className="text-body-sm-semibold text-gray-700">
              희망 픽업 날짜
            </span>
            <span className="text-body-sm-semibold text-primary-400">*</span>
          </div>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen(true)}
            className={`text-body-sm-regular ${cn(
              pickupDate ? 'text-gray-700' : 'text-gray-300',
              'flex items-center gap-2 px-3 py-4 bg-gray-50 rounded-xl font-pretendard',
            )}`}
          >
            <Icon
              icon="lucide:calendar-check"
              className="w-4 h-4 text-gray-500 shrink-0"
            />
            {pickupDate ? formatPickupDate(pickupDate) : '날짜 선택'}
          </button>
          <div className="flex items-start gap-[2px]">
            <Icon
              icon="lucide:info"
              className="w-3 h-3 text-primary-400 mt-[3px] shrink-0"
            />
            <span className="text-caption-sm-regular text-primary-400">
              희망하신 날짜에 진행이 불가할 수 있으며, 실제 픽업일은 매장 협의
              후
              <br />
              확정됩니다.
            </span>
          </div>
        </div>

        {/* 추가 요청사항 (선택) */}
        <div className="flex flex-col gap-2">
          <span className="text-body-sm-semibold text-gray-600">
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
            className="w-full px-3 py-4 bg-gray-50 rounded-xl text-body-sm-regular text-gray-700 placeholder:text-gray-300 outline-none font-pretendard resize-none overflow-hidden max-h-[120px]"
          />
        </div>

        {/* 제출 버튼 */}
        <Button
          size="lg"
          fullWidth
          className="text-white font-bold text-[16px] h-12 shadow-none"
          disabled={!isSubmittable}
          onClick={handleSubmit}
        >
          요청 제출하기
        </Button>
      </div>

      <DatePickerBottomSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={pickupDate}
        onSelect={setPickupDate}
      />
    </div>
  );
};
