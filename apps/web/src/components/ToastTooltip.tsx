'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export type ToastTooltipVariant = 'default' | 'dark' | 'brand';

interface ToastTooltipProps {
  message: string;
  /** 기본 노출 여부 (false면 페이드 아웃) */
  isVisible?: boolean;
  variant?: ToastTooltipVariant;
  /** iconify 아이콘 이름. 기본값: 번개(material-symbols-light:bolt-rounded) */
  icon?: string;
  /** 아이콘 색상 등 덮어쓰기용 */
  iconClassName?: string;
  className?: string;
}

const DEFAULT_ICON = 'material-symbols-light:bolt-rounded';

const VARIANT_STYLE: Record<
  ToastTooltipVariant,
  { wrapper: string; bubble: string; text: string; icon: string; arrow: string }
> = {
  default: {
    wrapper: 'drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)]',
    bubble: 'bg-surface-white',
    text: 'text-text-subtle',
    icon: 'text-icon-primary',
    arrow: '/icons/tooltip-arrow-white.svg',
  },
  dark: {
    wrapper: '',
    bubble: 'bg-surface-inverse',
    text: 'text-text-basic-inverse',
    icon: 'text-icon-primary',
    arrow: '/icons/tooltip-arrow-dark.svg',
  },
  brand: {
    wrapper: '',
    bubble: 'bg-surface-brand',
    text: 'text-text-basic-inverse',
    icon: 'text-icon-inverse',
    arrow: '/icons/tooltip-arrow-brand.svg',
  },
};

/**
 * 아래 화살표가 달린 말풍선형 토스트 (PDP-Toast tooltip / tooltip-dark / tooltip-brand)
 */
export const ToastTooltip = ({
  message,
  isVisible = true,
  variant = 'default',
  icon = DEFAULT_ICON,
  iconClassName,
  className,
}: ToastTooltipProps) => {
  const style = VARIANT_STYLE[variant];

  return (
    <div
      role="status"
      aria-hidden={!isVisible}
      className={cn(
        'flex flex-col items-center',
        'transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none',
        style.wrapper,
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-g1 px-g4 py-p3 rounded-max',
          style.bubble,
        )}
      >
        {/* 아이콘 영역 24px, 내부 여백 상하 1px / 좌우 1.25px */}
        <span className="flex size-6 shrink-0 items-center justify-center px-[1.25px] py-px">
          <Icon
            icon={icon}
            width="100%"
            height="100%"
            className={cn(style.icon, iconClassName)}
          />
        </span>
        <span className={cn('caption-sm-medium whitespace-nowrap', style.text)}>
          {message}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={style.arrow}
        alt=""
        width={14}
        height={8}
        className="shrink-0"
      />
    </div>
  );
};
