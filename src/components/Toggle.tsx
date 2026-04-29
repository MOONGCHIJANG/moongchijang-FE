'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ToggleSize = 'sm' | 'md';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
}

const SIZE_STYLES = {
  md: {
    container: 'w-12 h-6',
    thumb: 'w-5 h-5 top-[2px] left-[2px]',
    translate: 'translate-x-6',
  },
  sm: {
    container: 'w-6 h-3.5',
    thumb: 'w-2.5 h-2.5 top-[2px] left-[2px]',
    translate: 'translate-x-2.5',
  },
} as const;

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className,
}: ToggleProps) => {
  const styles = SIZE_STYLES[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative shrink-0',
        styles.container,
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <span
        className={cn(
          'left-0 top-0 absolute rounded-full transition-colors duration-200',
          styles.container,
          checked ? 'bg-primary-400' : 'bg-gray-200',
        )}
      />
      <span
        className={cn(
          'absolute bg-white rounded-full transition-transform duration-200',
          styles.thumb,
          checked ? styles.translate : 'translate-x-0',
        )}
      />
    </button>
  );
};
