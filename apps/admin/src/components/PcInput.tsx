'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface PcInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  isPassword?: boolean;
}

/**
 * Figma PC_input 스펙(50px 높이, 12px radius, 16/12px padding) 전용
 * admin 데스크톱 입력창. 1920x1080 캔버스 기준 값을 vw/vh로 환산했다.
 */
export const PcInput = React.forwardRef<HTMLInputElement, PcInputProps>(
  ({ label, isPassword = false, className = '', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : 'text';

    return (
      <label className="flex flex-col gap-1 lg:gap-[0.37vh]">
        {label && (
          <span className="body-md-semibold text-text-subtle">{label}</span>
        )}
        <div className="flex h-11 items-center gap-1 rounded-xl border border-border-default px-3 py-4 lg:h-[4.63vh] lg:gap-[0.37vh] lg:rounded-[1.111vh] lg:px-[0.625vw] lg:py-[1.481vh]">
          <input
            ref={ref}
            type={inputType}
            className={`body-md-regular w-full text-text-basic placeholder:text-gray-400 focus:outline-none ${className}`}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <Icon
                icon={showPassword ? 'lucide:eye' : 'lucide:eye-off'}
                className="h-4 w-4 text-gray-500"
              />
            </button>
          )}
        </div>
      </label>
    );
  },
);

PcInput.displayName = 'PcInput';
