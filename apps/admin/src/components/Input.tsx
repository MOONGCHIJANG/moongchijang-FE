'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  isPassword?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, isPassword = false, className = '', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : 'text';

    return (
      <label className="flex flex-col gap-1">
        {label && (
          <span className="body-md-semibold text-text-subtle">{label}</span>
        )}
        <div className="flex h-10 items-center gap-1 rounded-xl border border-border-default px-3 py-3.5">
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

Input.displayName = 'Input';
