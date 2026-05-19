'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { DatePickerBottomSheet } from './DatePickerBottomSheet';

interface DatePickerFieldProps {
  value: string;
  onChange: (date: string) => void;
}

export const DatePickerField = ({ value, onChange }: DatePickerFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            'body-md-regular flex items-center gap-2 px-3 py-4 bg-surface-default rounded-2xlarge w-full font-pretendard',
            value ? 'text-text-subtle' : 'text-icon-disabled',
          )}
        >
          <Icon
            icon="lucide:calendar-check"
            className="w-4 h-4 text-icon-subtle shrink-0"
          />
          {value || '날짜 선택'}
        </button>
        <div className="flex items-start gap-[2px]">
          <Icon
            icon="lucide:info"
            className="w-3 h-3 text-icon-primary mt-[3px] shrink-0"
          />
          <span className="caption-sm-regular text-text-brand font-pretendard">
            희망하신 날짜에 진행이 불가할 수 있으며, 실제 픽업일은 매장 협의 후
            확정됩니다.
          </span>
        </div>
      </div>

      <DatePickerBottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedDate={value}
        onSelect={onChange}
      />
    </>
  );
};
