'use client';

import React from 'react';

/**
 * Figma button_L 스펙(56px 높이, 8px radius) 전용 admin 데스크톱 버튼.
 * 1920x1080 캔버스 기준 값을 vw/vh로 환산해 실제 브라우저 크기에 비례한다.
 */
export function PcButton({
  className = '',
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex w-full items-center justify-center gap-1 caption-sm-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed bg-button-primary-fill disabled:bg-button-disabled-fill h-14 rounded-lg py-[10px] px-6 lg:h-[5.185vh] lg:rounded-[0.741vh] lg:py-[0.926vh] lg:px-[1.25vw] ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
