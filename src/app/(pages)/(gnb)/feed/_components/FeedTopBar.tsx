'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface FeedTopBarProps {
  location?: string;
  onLocationClick?: () => void;
  onNotificationClick?: () => void;
  onQrClick?: () => void;
  className?: string;
}

export const FeedTopBar = ({
  location = '성수동',
  onLocationClick,
  onNotificationClick,
  onQrClick,
  className,
}: FeedTopBarProps) => {
  return (
    <div
      className={cn('flex w-full items-center justify-between py-3', className)}
    >
      <div className="flex items-center gap-1.5">
        <div className="flex h-6 w-6 items-center justify-center">
          <Image
            src="/icons/icon.svg"
            alt="Home"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </div>
        <button
          onClick={onLocationClick}
          className="flex items-center gap-0.5"
          type="button"
        >
          <span className="heading-sm-medium text-text-basic">{location}</span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            className="h-5 w-5 text-icon-subtle"
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNotificationClick}
          className="flex h-6 w-6 items-center justify-center"
          type="button"
        >
          <Icon
            icon="iconamoon:notification"
            className="h-6 w-6 text-text-basic"
          />
        </button>
        <button
          onClick={onQrClick}
          className="flex h-6 w-6 items-center justify-center"
          type="button"
        >
          <Icon
            icon="solar:qr-code-outline"
            className="h-6 w-6 text-text-basic"
          />
        </button>
      </div>
    </div>
  );
};
