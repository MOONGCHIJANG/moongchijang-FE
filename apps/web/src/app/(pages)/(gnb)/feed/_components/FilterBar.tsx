'use client';

import { Chip } from '@/components/Chip';
import { cn } from '@/lib/utils';

export type FilterId = 'all' | 'thisWeekPickup' | 'smallQuantity' | 'new';

interface FilterBarProps {
  activeFilter?: FilterId;
  onFilterChange?: (filterId: FilterId) => void;
  className?: string;
}

const isDev = process.env.NODE_ENV !== 'production';

// v2 필터 API 전까지 신규 칩은 목록이 바뀌지 않으므로 운영에는 노출하지 않음
export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: '전체' },
  ...(isDev
    ? ([
        { id: 'thisWeekPickup', label: '이번 주 픽업' },
        { id: 'smallQuantity', label: '적게 사도 OK' },
        { id: 'new', label: '새로 들어왔어요' },
      ] as const)
    : []),
];

export const FilterBar = ({
  activeFilter = 'all',
  onFilterChange,
  className = '',
}: FilterBarProps) => {
  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide', className)}>
      {FILTERS.map((filter) => {
        const active = activeFilter === filter.id;
        return (
          <Chip
            key={filter.id}
            label={filter.label}
            active={active}
            onClick={() => onFilterChange?.(filter.id)}
            className={cn(
              !active &&
                'border border-border-default bg-button-white px-[11px]',
            )}
          />
        );
      })}
    </div>
  );
};
