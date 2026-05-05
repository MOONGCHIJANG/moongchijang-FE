'use client';

import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const Chip = ({
  label,
  className,
  active = false,
  onClick,
  disabled = false,
}: ChipProps) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-[26px] items-center justify-center gap-0.5 px-3 py-1 rounded-2xl transition-colors shrink-0 font-pretendard select-none disabled:cursor-not-allowed disabled:opacity-50 caption-sm-bold',
        active
          ? 'bg-surface-brand text-text-basic-inverse'
          : 'bg-surface-elevated outline outline-1 outline-offset-[-1px] outline-border-subtle text-text-basic',
        className,
      )}
    >
      <span
        className={cn(
          'text-center text-12 leading-4',
          active ? 'font-bold' : 'font-normal',
        )}
      >
        {label}
      </span>
    </button>
  );
};
