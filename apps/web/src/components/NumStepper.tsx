'use client';

import Tooltip from '@/components/Tooltip';
import { SvgIcon } from '@/components/SvgIcon';
import { useEffect, useRef, useState } from 'react';

const TOAST_DURATION = 2000;

type NumStepperProps = {
  /** 최소 수량 (기본 1) */
  min?: number;
  max?: number | null;
  value?: number;
  onChange?: (value: number) => void;
  /** 처음 렌더될 때 한 번 띄울 안내 (예: '최소 구매 수량으로 자동 설정되었어요') */
  initialNotice?: string;
};

const NumStepper = ({
  min = 1,
  max,
  value,
  onChange,
  initialNotice,
}: NumStepperProps) => {
  const [internalCount, setInternalCount] = useState(min);
  const [toast, setToast] = useState<string | null>(initialNotice ?? null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const count = value ?? internalCount;
  const isMin = count <= min;
  const isMax = max != null && count >= max;

  const showToast = (message: string | null) => {
    clearTimeout(timerRef.current);
    setToast(message);
    if (message) {
      timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION);
    }
  };

  // initialNotice 자동 숨김 + 언마운트 시 타이머 정리
  useEffect(() => {
    if (initialNotice) {
      timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION);
    }
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commit = (next: number) => {
    if (onChange) {
      onChange(next);
    } else {
      setInternalCount(next);
    }
    showToast(
      max != null && next === max ? `최대 ${max}개 구매 가능해요` : null,
    );
  };

  const update = (next: number) => {
    if (next < min) return;
    if (max != null && next > max) return;
    commit(next);
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
          min={min}
          max={max ?? undefined}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (isNaN(val) || val < min) val = min;
            if (max != null && val > max) val = max;
            commit(val);
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
      {toast && <Tooltip text={toast} />}
    </div>
  );
};

export default NumStepper;
