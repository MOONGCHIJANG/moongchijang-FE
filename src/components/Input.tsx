'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface InputProps {
  label?: string;
  isPassword?: boolean;
  helperText?: string;
  helperTextClassName?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  leftIcon?: string;
  isError?: boolean;
  focusVariant?: 'default' | 'brand';
}

const Input = ({
  label,
  isPassword = false,
  helperText,
  helperTextClassName,
  placeholder,
  value: externalValue,
  onChange,
  leftIcon,
  isError = false,
  focusVariant = 'default',
}: InputProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (externalValue !== undefined) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const showClear = (isFocused || value.length > 0) && value.length > 0;
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : 'text';

  return (
    <div className="flex flex-col gap-g3 w-full">
      {label && <p className="caption-sm-medium text-text-tertiary">{label}</p>}
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-g4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon icon={leftIcon} className="w-4 h-4 text-icon-subtle" />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full py-g5 border rounded-2xlarge body-md-regular focus:outline-none text-icon-basic placeholder:text-text-subtle-inverse pr-10 transition-colors duration-200 ${leftIcon ? 'pl-8' : 'px-g4'} ${isError ? 'border-border-error' : focusVariant === 'brand' ? 'border-border-subtle focus:border-border-brand' : 'border-border-subtle focus:border-text-basic'}`}
        />
        <div className="absolute right-g4 top-1/2 -translate-y-1/2 flex items-center gap-g4">
          {showClear && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (externalValue !== undefined) {
                  onChange?.('');
                } else {
                  setInternalValue('');
                }
              }}
            >
              <Icon
                icon="lucide:x"
                className="w-4 h-4 bg-icon-tertiary text-icon-inverse rounded-full"
              />
            </button>
          )}
          {isPassword && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon
                icon={showPassword ? 'lucide:eye' : 'lucide:eye-off'}
                className="w-4 h-4 text-icon-subtle"
              />
            </button>
          )}
        </div>
      </div>
      {helperText ? (
        <p
          className={`caption-sm-medium ${helperTextClassName ?? (isError ? 'text-text-error' : 'text-text-subtle-inverse')}`}
        >
          {helperText}
        </p>
      ) : (
        <div className="h-4.5" />
      )}
    </div>
  );
};

export default Input;
