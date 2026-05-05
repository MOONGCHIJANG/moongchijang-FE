'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface ToastBlackProps {
  message: string;
  isVisible: boolean;
  icon?: string;
}

export const ToastBlack = ({ message, isVisible, icon }: ToastBlackProps) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center h-14 px-5 bg-surface-info rounded-lg',
        'transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none',
      )}
    >
      {icon && (
        <div className="flex items-center pr-2">
          <Icon icon={icon} width={20} height={20} className="text-white" />
        </div>
      )}
      <span className="text-body-md-medium text-white">{message}</span>
    </div>
  );
};
