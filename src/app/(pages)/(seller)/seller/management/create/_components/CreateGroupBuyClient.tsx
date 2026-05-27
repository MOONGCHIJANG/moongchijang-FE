'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { formatDeadline } from '@/lib/date';
import { DateRangePickerBottomSheet } from './DateRangePickerBottomSheet';
import { usePostApiV1OwnerGroupBuyRequests } from '@/api/hooks/owner/owner';

const MAX_IMAGES = 10;

function isDeadlineValid(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(dateStr + 'T00:00:00');
  const diffDays = Math.ceil(
    (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays >= 7;
}

type ImageItem = { file: File; previewUrl: string };

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-0.5">
        <span className="body-md-semibold text-text-subtle">{label}</span>
        {required && (
          <span className="body-md-semibold text-text-brand">*</span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputBase =
  'w-full px-3 py-4 bg-surface-default rounded-2xlarge body-md-regular text-text-subtle placeholder:text-icon-disabled outline-none';

const numberInputBase = cn(
  inputBase,
  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
);

export function CreateGroupBuyClient() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [deadlineStart, setDeadlineStart] = useState('');
  const [deadline, setDeadline] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [price, setPrice] = useState('');
  const [targetQuantity, setTargetQuantity] = useState('');
  const [perUserLimit, setPerUserLimit] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: submitRequest, isPending } =
    usePostApiV1OwnerGroupBuyRequests();

  const deadlineInvalid = deadline !== '' && !isDeadlineValid(deadline);

  const isSubmittable =
    productName.trim().length > 0 &&
    productDescription.trim().length > 0 &&
    deadline !== '' &&
    isDeadlineValid(deadline) &&
    price !== '' &&
    Number(price) > 0 &&
    targetQuantity !== '' &&
    Number(targetQuantity) > 0 &&
    images.length > 0;

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_IMAGES - images.length;
    const toAdd = files.slice(0, remaining).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    if (!isSubmittable) return;
    submitRequest({
      data: {
        storeId: 1, // TODO: storeId를 seller 프로필 API에서 가져와야 합니다
        productName,
        productDescription,
        deadline: `${deadline}T23:59:59`,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        price: Number(price),
        targetQuantity: Number(targetQuantity),
        maxQuantity: Number(targetQuantity),
        perUserLimit: perUserLimit ? Number(perUserLimit) : null,
        imageUrls: [], // TODO: 이미지 업로드 API 연동 후 URL 목록 전달
        pickupDate: deadline,
        pickupTimeStart: '10:00',
        pickupTimeEnd: '18:00',
        pickupLocation: '',
        pickupContact: null,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-8">
      {/* 공구명 */}
      <FormField label="공구명" required>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="예)겉바속촉 크로아상"
          maxLength={30}
          className={inputBase}
        />
      </FormField>

      {/* 상품 설명 */}
      <FormField label="상품 설명" required>
        <textarea
          value={productDescription}
          onChange={(e) => {
            setProductDescription(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder="상품설명을 입력해주세요"
          rows={1}
          maxLength={30}
          className={cn(inputBase, 'resize-none overflow-hidden')}
        />
      </FormField>

      {/* 희망 공구 기간 */}
      <FormField label="희망 공구 기간" required>
        <button
          type="button"
          onClick={() => setIsDatePickerOpen(true)}
          className={cn(
            'flex items-center gap-2 px-3 py-4 bg-surface-default rounded-2xlarge body-md-regular',
            deadline ? 'text-text-subtle' : 'text-icon-disabled',
          )}
        >
          <Icon
            icon="lucide:calendar"
            className="h-4 w-4 shrink-0 text-icon-subtle"
          />
          {deadline
            ? `${formatDeadline(deadlineStart)} ~ ${formatDeadline(deadline)}`
            : '날짜 선택'}
        </button>
        {deadlineInvalid && (
          <div className="flex items-center gap-1">
            <Icon
              icon="lucide:circle-alert"
              className="h-3 w-3 shrink-0 text-text-error"
            />
            <span className="caption-sm-regular text-text-error">
              최소 일주일 이상으로 설정해주세요
            </span>
          </div>
        )}
      </FormField>

      {/* 정가 + 공구가 */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="정가">
          <input
            type="number"
            inputMode="numeric"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className={numberInputBase}
          />
        </FormField>
        <FormField label="공구가" required>
          <input
            type="number"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={numberInputBase}
          />
        </FormField>
      </div>

      {/* 목표 수량 + 1인 구매 제한 */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="목표 수량" required>
          <input
            type="number"
            inputMode="numeric"
            value={targetQuantity}
            onChange={(e) => setTargetQuantity(e.target.value)}
            className={numberInputBase}
          />
        </FormField>
        <FormField label="1인 구매 제한">
          <input
            type="number"
            inputMode="numeric"
            value={perUserLimit}
            onChange={(e) => setPerUserLimit(e.target.value)}
            className={numberInputBase}
          />
        </FormField>
      </div>

      {/* 대표 이미지 */}
      <FormField label="대표 이미지" required>
        <div className="flex flex-wrap gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative h-[72px] w-[72px] shrink-0">
              <Image
                src={img.previewUrl}
                alt={`이미지 ${i + 1}`}
                fill
                className="rounded-xl object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => handleImageRemove(i)}
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-inverse"
              >
                <Icon
                  icon="lucide:x"
                  className="h-2.5 w-2.5 text-text-basic-inverse"
                />
              </button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-default bg-surface-default"
            >
              <Icon icon="lucide:plus" className="h-5 w-5 text-icon-subtle" />
              <span className="caption-xs-bold text-text-tertiary">추가</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageAdd}
        />
      </FormField>

      {/* 제출 버튼 */}
      <Button
        size="lg"
        fullWidth
        disabled={!isSubmittable || isPending}
        onClick={handleSubmit}
        className="text-text-basic-inverse"
      >
        {isPending ? '제출 중...' : '요청 제출하기'}
      </Button>

      <DateRangePickerBottomSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        startDate={deadlineStart}
        endDate={deadline}
        onSelect={(start, end) => {
          setDeadlineStart(start);
          setDeadline(end);
        }}
      />
    </div>
  );
}
