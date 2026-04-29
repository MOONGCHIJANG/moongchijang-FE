'use client';

import { Chip } from '@/components/Chip';
import { cn } from '@/lib/utils';

export type FilterId = 'all' | 'due' | 'target';

interface FilterBarProps {
  activeFilter?: FilterId;
  onFilterChange?: (filterId: FilterId) => void;
  className?: string;
}

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'due', label: '마감임박' },
  { id: 'target', label: '달성임박' },
] as const;

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
