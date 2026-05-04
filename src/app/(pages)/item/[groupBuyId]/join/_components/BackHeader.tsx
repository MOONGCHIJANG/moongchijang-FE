'use client';
import { Icon } from '@iconify/react';
import React from 'react';

type BackHeaderProps = {
  text?: string;
};

const BackHeader = ({ text }: BackHeaderProps) => {
  return (
    <header className="flex items-center h-14.25 px-4 border-b border-border-subtle shrink-0 gap-0.5">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center justify-center w-8 h-8"
        aria-label="뒤로가기"
      >
        <Icon icon="lucide:chevron-left" className="w-6 h-6 text-icon-basic" />
      </button>
      <span className="heading-sm-semibold">{text}</span>
    </header>
  );
};

export default BackHeader;
