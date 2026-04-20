'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'bg-primary-400 text-white shadow-sm active:scale-[0.98] disabled:bg-gray-200 disabled:text-white',
    outline: 'border border-gray-200 bg-white text-gray-500 active:bg-gray-50',
    ghost: 'bg-transparent text-gray-400 hover:text-gray-600',
  };

  const sizes = {
    sm: 'h-8 px-3 text-caption-md-medium rounded-full',
    // 버튼 M 규격: h-11, w-80(옵션), rounded-xl, text-base(16px), font-bold, gap-2.5
    md: 'h-11 px-6 text-body-lg-bold rounded-xl gap-2.5',
    // 버튼 L 규격: h-14, rounded-lg, text-base(16px), font-semibold, leading-6
    lg: 'h-14 px-6 text-body-lg-semibold leading-6 rounded-lg gap-1',
    xl: 'h-[52px] px-6 text-heading-sm-bold rounded-xl',
  };

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
