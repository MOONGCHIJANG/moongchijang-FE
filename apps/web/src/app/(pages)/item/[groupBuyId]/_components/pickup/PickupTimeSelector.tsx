'use client';

import { cn } from '@/lib/utils';

interface Props {
  times: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

const PickupTimeSelector = ({ times, selectedTime, onSelect }: Props) => {
  return (
    <section className="flex flex-col gap-g4">
      <p className="body-md-bold text-text-basic">픽업 시간</p>
      <div className="grid grid-cols-4 gap-g3">
        {times.map((time) => {
          const isSelected = time === selectedTime;
          return (
            <button
              key={time}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(time)}
              className={cn(
                'flex items-center justify-center py-p4 rounded-large border caption-sm-medium cursor-pointer',
                isSelected
                  ? 'bg-surface-brand-lighter border-border-brand text-text-brand'
                  : 'bg-surface-white border-border-subtle text-text-basic',
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PickupTimeSelector;
