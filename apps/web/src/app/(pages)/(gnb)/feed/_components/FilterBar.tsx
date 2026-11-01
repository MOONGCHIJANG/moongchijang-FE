'use client';

import { Chip } from '@/components/Chip';
import { cn } from '@/lib/utils';

export type FilterId = 'all';

interface FilterBarProps {
  activeFilter?: FilterId;
  onFilterChange?: (filterId: FilterId) => void;
  className?: string;
}

const FILTERS = [{ id: 'all', label: '전체' }] as const;

export const FilterBar = ({
  activeFilter = 'all',
  onFilterChange,
  className = '',
}: FilterBarProps) => {
  return (
    <div className={cn('flex gap-2', className)}>
      {FILTERS.map((filter) => (
        <Chip
          key={filter.id}
          label={filter.label}
          active={activeFilter === filter.id}
          onClick={() => onFilterChange?.(filter.id)}
        />
      ))}
    </div>
  );
};
