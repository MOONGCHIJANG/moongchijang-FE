'use client';

import Tooltip from '@/components/Tooltip';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

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
      <div className="rounded-large px-g2 py-g2 gap-g2 flex border border-border-subtle items-center">
        <button
          onClick={() => update(count - 1)}
          disabled={isMin}
          className="disabled:cursor-not-allowed p-g2"
        >
          <Icon
            icon="ic:baseline-minus"
            className={`w-3 h-3 ${isMin ? 'text-icon-disabled' : 'text-icon-basic'}`}
          />
        </button>
        <p className="body-md-bold text-center min-w-7.5">{count}</p>
        <button
          onClick={() => update(count + 1)}
          disabled={isMax}
          className="disabled:cursor-not-allowed p-g2"
        >
          <Icon
            icon="ic:baseline-plus"
            className={`w-3 h-3 ${isMax ? 'text-icon-disabled' : 'text-icon-basic'}`}
          />
        </button>
      </div>
      {showToast && <Tooltip text={`최대 ${max}개 구매 가능해요`} />}
    </div>
  );
};

export default NumStepper;
