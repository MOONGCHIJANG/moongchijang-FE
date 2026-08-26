'use client';

import React from 'react';

export function Button({
  className = '',
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex h-11 w-full items-center justify-center gap-1 rounded-lg bg-button-primary-fill px-6 py-2 caption-sm-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-button-disabled-fill ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
