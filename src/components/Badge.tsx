'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  onDelete?: () => void;
  className?: string;
}

/**
 * 선택된 정보나 상태를 보여주기 위한 뱃지 컴포넌트
 */
export const Badge = ({ label, onDelete, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-8 items-center justify-center gap-3 rounded-lg bg-gray-50 px-2 py-1 transition-colors shrink-0 font-pretendard',
        className,
      )}
    >
      <span className="text-center text-sm font-normal text-gray-500 leading-5">
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
          {/* 아이콘 영역 20px */}
          <Icon
            icon="material-symbols-light:close"
            className="h-4 w-4 text-gray-500"
          />
        </button>
      )}
    </div>
  );
};
