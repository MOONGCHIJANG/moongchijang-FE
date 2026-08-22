'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPassword?: boolean;
  helperText?: string;
  helperTextClassName?: string;
  leftIcon?: string;
  isError?: boolean;
  focusVariant?: 'default' | 'brand';
  rightButton?: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  helperAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  noHelperSpace?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      isPassword = false,
      helperText,
      helperTextClassName,
      leftIcon,
      isError = false,
      focusVariant = 'default',
      rightButton,
      helperAction,
      onChange,
      value,
      noHelperSpace,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const currentValue = (value as string) ?? '';
    const showClear = currentValue.length > 0;
    const inputType = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : 'text';

    const borderClass = isError
      ? 'border-border-error'
      : focusVariant === 'brand'
        ? 'border-border-subtle focus:border-border-brand'
        : 'border-border-subtle focus:border-text-basic';

    return (
      <div className="flex flex-col gap-g2 w-full">
        {label && (
          <p className="caption-sm-medium text-text-tertiary">{label}</p>
        )}
        <div className="flex items-center gap-g3 w-full">
          <div className="relative flex-1">
            {leftIcon && (
              <div className="absolute left-g4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon icon={leftIcon} className="w-4 h-4 text-icon-subtle" />
              </div>
            )}
            <input
              ref={ref}
              type={inputType}
              value={value}
              onChange={onChange}
              onBlur={(e) => {
                rest.onBlur?.(e);
              }}
              className={`w-full py-g5 border rounded-2xlarge body-md-regular focus:outline-none text-icon-basic placeholder:text-text-subtle-inverse pr-10 transition-colors duration-200 ${leftIcon ? 'pl-8' : 'px-g4'} ${borderClass}`}
              {...rest}
            />
            <div className="absolute right-g4 top-1/2 -translate-y-1/2 flex items-center gap-g4">
              {showClear && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    onChange?.({
                      target: { name: rest.name, value: '' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
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
          {rightButton && (
            <button
              type="button"
              onClick={rightButton.onClick}
              disabled={rightButton.disabled}
              className="shrink-0 px-g3 h-10 rounded-large caption-sm-bold text-text-basic-inverse bg-button-primary-fill disabled:bg-button-tertiary-fill-pressed min-w-14.5"
            >
              {rightButton.label}
            </button>
          )}
        </div>
        {helperText || helperAction ? (
          <div className="flex items-center gap-g3">
            <p
              className={`caption-sm-medium ${helperTextClassName ?? (isError ? 'text-text-error' : 'text-text-subtle-inverse')}`}
            >
              {helperText}
            </p>
            {helperAction && (
              <button
                type="button"
                onClick={helperAction.onClick}
                disabled={helperAction.disabled}
                className="caption-sm-medium text-text-subtle-inverse underline"
              >
                {helperAction.label}
              </button>
            )}
          </div>
        ) : noHelperSpace ? null : (
          <div className="h-4.5" />
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
