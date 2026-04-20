'use client';

import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  className?: string;
  active?: boolean;
}

export const Chip = ({ label, className, active = false }: ChipProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-6 items-center justify-center gap-0.5 px-3 py-1 rounded-2xl transition-colors shrink-0 font-pretendard cursor-pointer select-none',
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
    </div>
  );
};
