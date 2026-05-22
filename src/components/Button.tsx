'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'tertiary' | 'black';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-button-primary-fill text-white shadow-sm active:scale-[0.98] disabled:bg-button-disabled-fill disabled:text-button-white',
  outline:
    'border border-border-default bg-button-white text-text-tertiary active:bg-surface-default',
  ghost: 'bg-transparent text-text-disabled hover:text-gray-600',
  tertiary: 'bg-surface-default text-text-tertiary active:brightness-95',
  black: 'bg-button-natural text-text-basic-inverse active:brightness-90',
};

const sizes = {
  md: 'h-11 heading-sm-bold rounded-xl gap-2.5',
  lg: 'h-14 px-6 py-2.5 heading-md-semibold rounded-lg gap-1',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed font-pretendard',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
