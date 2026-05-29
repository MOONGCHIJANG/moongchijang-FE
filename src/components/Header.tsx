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
    <header className="sticky top-0 z-10 flex flex-col bg-surface-white shrink-0 border-b border-border-subtle">
      <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />
      <div className="flex items-center h-14 px-4 gap-0.5">
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
      </div>
    </header>
  );
};

export default Header;
