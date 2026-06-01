'use client';

import { OwnerSettlementMonthChip } from '@/api/hooks/api.schemas';
import { Chip } from '@/components/Chip';

type Props = {
  chips: OwnerSettlementMonthChip[];
  selectedYear: number;
  selectedMonth: number;
  onSelect: (year: number, month: number) => void;
};

export function MonthChipList({
  chips,
  selectedYear,
  selectedMonth,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-2">
      {chips.map((chip) => (
        <Chip
          key={`${chip.year}-${chip.month}`}
          label={chip.label}
          active={chip.year === selectedYear && chip.month === selectedMonth}
          onClick={() => onSelect(chip.year, chip.month)}
        />
      ))}
    </div>
  );
}
