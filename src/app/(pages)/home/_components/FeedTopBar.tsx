'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface FeedTopBarProps {
  /**
   * 현재 위치 정보 (기본값: '성수동')
   */
  location?: string;
  /**
   * 위치 클릭 시 실행될 함수 (바텀시트 호출용)
   */
  onLocationClick?: () => void;
  /**
   * 알림 아이콘 클릭 시 실행될 함수
   */
  onNotificationClick?: () => void;
  /**
   * QR 코드 아이콘 클릭 시 실행될 함수
   */
  onQrClick?: () => void;
  /**
   * 추가적인 스타일링 클래스
   */
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
            src="/icons/homeIcon.png"
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
          <span className="text-body-lg-medium text-text-basic">
            {location}
          </span>
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
