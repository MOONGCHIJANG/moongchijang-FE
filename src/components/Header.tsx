'use client';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type HeaderProps = {
  text?: string;
  showBackButton?: boolean;
  onBack?: () => void;
};

const Header = ({ text, showBackButton = true, onBack }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex items-center h-14.25 px-4 border-b border-border-subtle shrink-0 gap-0.5 bg-surface-white">
      {showBackButton && (
        <button
          type="button"
          onClick={onBack || (() => router.back())}
          className="flex items-center justify-center w-8 h-8"
          aria-label="뒤로가기"
        >
          <Icon
            icon="lucide:chevron-left"
            className="w-6 h-6 text-icon-basic"
          />
        </button>
      )}
      <span className="heading-sm-semibold">{text}</span>
    </header>
  );
};

export default Header;
