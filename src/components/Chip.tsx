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
        'inline-flex h-6 items-center justify-center gap-0.5 px-3 py-1 rounded-2xl transition-colors shrink-0 font-pretendard select-none disabled:cursor-not-allowed disabled:opacity-50',
        active
          ? 'bg-primary-400 text-white'
          : 'bg-gray-25 outline outline-1 outline-offset-[-1px] outline-gray-100 text-gray-900',
        className,
      )}
    >
      <span
        className={cn(
          'text-center text-xs leading-4',
          active ? 'font-bold' : 'font-normal',
        )}
      >
        {label}
      </span>
    </button>
  );
};
