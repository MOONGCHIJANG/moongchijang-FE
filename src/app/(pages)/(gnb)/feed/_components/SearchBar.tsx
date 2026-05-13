'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onEnter?: (value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = '매장명 또는 상품명 검색',
  value = '',
  onChange,
  onClear,
  onEnter,
  className,
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center gap-2 rounded-full border border-border-brand bg-bg-white px-4 shadow-sm',
        className,
      )}
    >
      <Icon
        icon="solar:magnifer-linear"
        className="h-5 w-5 text-icon-primary"
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full bg-transparent body-sm-regular text-text-basic outline-none placeholder:text-text-disabled font-pretendard"
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter?.(value);
        }}
        readOnly={!onChange}
      />
      {value && (onChange || onClear) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange?.('');
            onClear?.();
          }}
          className="flex-shrink-0"
          type="button"
        >
          <Icon
            icon="solar:close-circle-bold"
            className="h-5 w-5 text-icon-tertiary"
          />
        </button>
      )}
    </div>
  );
};
