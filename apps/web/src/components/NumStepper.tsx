'use client';

import Tooltip from '@/components/Tooltip';
import { SvgIcon } from '@/components/SvgIcon';
import { useState } from 'react';

type NumStepperProps = {
  max?: number | null;
  value?: number;
  onChange?: (value: number) => void;
};

const NumStepper = ({ max, value, onChange }: NumStepperProps) => {
  const [internalCount, setInternalCount] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const count = value ?? internalCount;
  const isMin = count <= 1;
  const isMax = max != null && count >= max;

  const update = (next: number) => {
    if (next < 1) return;
    if (max != null && next > max) return;
    if (onChange) {
      onChange(next);
    } else {
      setInternalCount(next);
    }

    if (max != null && next === max) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      setShowToast(false);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="rounded-large px-g4 py-g2 gap-g4 flex border border-border-subtle items-center">
        <button
          onClick={() => update(count - 1)}
          disabled={isMin}
          className="disabled:cursor-not-allowed"
        >
          <SvgIcon
            src="/icons/minus.svg"
            size={12}
            className={isMin ? 'text-icon-disabled' : 'text-icon-basic'}
          />
        </button>
        <input
          type="number"
          className="body-md-bold text-center min-w-7.5 bg-transparent outline-none w-12 hide-arrows"
          value={count}
          min={1}
          max={max ?? undefined}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            if (max != null && val > max) {
              val = max;
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
            } else {
              setShowToast(false);
            }
            if (onChange) {
              onChange(val);
            } else {
              setInternalCount(val);
            }
          }}
        />
        <button
          onClick={() => update(count + 1)}
          disabled={isMax}
          className="disabled:cursor-not-allowed"
        >
          <SvgIcon
            src="/icons/plus.svg"
            size={12}
            className={isMax ? 'text-icon-disabled' : 'text-icon-basic'}
          />
        </button>
      </div>
      {showToast && <Tooltip text={`최대 ${max}개 구매 가능해요`} />}
    </div>
  );
};

export default NumStepper;
