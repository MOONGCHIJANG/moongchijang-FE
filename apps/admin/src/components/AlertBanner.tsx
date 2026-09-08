import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export type AlertBannerTone = 'danger' | 'info' | 'success';
export type AlertBannerSize = 'lg' | 'md' | 'sm';

interface AlertBannerProps {
  tone?: AlertBannerTone;
  size?: AlertBannerSize;
  title: string;
  description?: string;
  className?: string;
}

const BG_CLASS: Record<AlertBannerTone, string> = {
  danger: 'bg-primary-50',
  info: 'bg-[#E8F1FF]',
  success: 'bg-success-50',
};

const TITLE_COLOR_CLASS: Record<AlertBannerTone, string> = {
  danger: 'text-accent-red-500',
  info: 'text-text-info',
  success: 'text-success-600',
};

const TITLE_STYLE_CLASS: Record<AlertBannerSize, string> = {
  lg: 'heading-lg-semibold',
  md: 'heading-sm-semibold',
  sm: 'heading-sm-medium',
};

function DangerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 21"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <mask
        id="alert-banner-danger-mask"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="21"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1L1 20H23L12 1Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 16V16.5M12 8L12.004 13"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </mask>
      <g mask="url(#alert-banner-danger-mask)">
        <path d="M0 -1.5H24V22.5H0V-1.5Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export function AlertBanner({
  tone = 'danger',
  size = 'lg',
  title,
  description,
  className,
}: AlertBannerProps) {
  const showDescription = size !== 'sm' && !!description;
  const iconSizeClass = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
  const descriptionColorClass =
    size === 'lg' ? TITLE_COLOR_CLASS[tone] : 'text-gray-400';
  const descriptionStyleClass =
    size === 'lg' ? 'heading-sm-medium' : 'body-md-regular';

  return (
    <div
      className={cn(
        'flex items-start gap-g6 rounded-large p-p6',
        BG_CLASS[tone],
        className,
      )}
    >
      <span className={cn('shrink-0', TITLE_COLOR_CLASS[tone])}>
        {tone === 'danger' && <DangerIcon className={iconSizeClass} />}
        {tone === 'info' && (
          <Icon
            icon="material-symbols:info-outline"
            className={iconSizeClass}
          />
        )}
        {tone === 'success' && (
          <Icon icon="figma:check-circle" className={iconSizeClass} />
        )}
      </span>
      <div className="flex flex-col gap-g2">
        <h2 className={cn(TITLE_STYLE_CLASS[size], TITLE_COLOR_CLASS[tone])}>
          {title}
        </h2>
        {showDescription && (
          <p className={cn(descriptionStyleClass, descriptionColorClass)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
