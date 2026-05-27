'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  onDelete?: () => void;
  className?: string;
  textClassName?: string;
}

/**
 * 선택된 정보나 상태를 보여주기 위한 뱃지 컴포넌트
 */
export const Badge = ({
  label,
  onDelete,
  className,
  textClassName,
}: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-8 items-center justify-center gap-3 rounded-lg bg-surface-default px-2 py-1 transition-colors shrink-0 font-pretendard',
        className,
      )}
    >
      <span
        className={cn(
          'text-center body-md-regular text-text-tertiary',
          textClassName,
        )}
      >
        {label}
      </span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex h-5 w-5 items-center justify-center hover:opacity-70 transition-opacity"
        >
          <Icon
            icon="material-symbols-light:close"
            className="h-5 w-5 text-icon-subtle"
          />
        </button>
      )}
    </div>
  );
};
