'use client';

import { Chip } from '@/components/Chip';
import { cn } from '@/lib/utils';

export type FilterId = 'all' | 'thisWeekPickup' | 'smallQuantity' | 'new';

interface FilterBarProps {
  activeFilter?: FilterId;
  onFilterChange?: (filterId: FilterId) => void;
  className?: string;
}

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'thisWeekPickup', label: '이번 주 픽업' },
  { id: 'smallQuantity', label: '적게 사도 OK' },
  { id: 'new', label: '새로 들어왔어요' },
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
              !active && 'border border-border-default bg-button-white',
            )}
          />
        );
      })}
    </div>
  );
};
