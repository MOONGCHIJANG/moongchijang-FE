import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Figma AlertBanner 속성 1
 * - yellowL : 아이콘 + 제목 + 본문 (세로)
 * - yellowS : 아이콘 + 본문 (가운데 정렬)
 * - blue    : 방패 아이콘 + 본문 (가운데 정렬)
 * - red     : 아이콘 + 본문 (위 정렬)
 * - gray    : 본문만, 테두리
 */
export type AlertBannerVariant =
  | 'yellowL'
  | 'yellowS'
  | 'blue'
  | 'red'
  | 'gray';

interface AlertBannerProps {
  variant?: AlertBannerVariant;
  /** yellowL 에서만 표시 */
  headline?: ReactNode;
  /** 본문. 문자열의 \n 은 줄바꿈으로 표시 */
  text: ReactNode;
  className?: string;
}

const ICON: Partial<
  Record<AlertBannerVariant, { src: string; width: number; height: number }>
> = {
  yellowL: { src: '/icons/alert-banner-warning.svg', width: 16, height: 16 },
  yellowS: { src: '/icons/alert-banner-warning.svg', width: 16, height: 16 },
  blue: { src: '/icons/alert-banner-shield.svg', width: 15, height: 18 },
  red: { src: '/icons/alert-banner-danger.svg', width: 16, height: 16 },
};

const VARIANT_STYLE: Record<
  AlertBannerVariant,
  { container: string; text: string }
> = {
  yellowL: {
    container: 'flex-col gap-g1 p-p5 bg-surface-secondary-lighter',
    text: 'text-text-secondary',
  },
  yellowS: {
    container: 'items-center gap-g2 px-p5 py-p4 bg-surface-secondary-lighter',
    text: 'text-text-secondary',
  },
  blue: {
    container: 'items-center gap-g3 px-p5 py-p4 bg-blue-50',
    text: 'text-text-info',
  },
  red: {
    container: 'items-start gap-g3 p-p5 bg-surface-brand-lighter',
    text: 'text-text-brand',
  },
  gray: {
    container:
      'items-start gap-g3 p-p5 bg-surface-elevated border border-border-default',
    text: 'text-text-basic',
  },
};

const BannerIcon = ({ variant }: { variant: AlertBannerVariant }) => {
  const icon = ICON[variant];
  if (!icon) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon.src}
      alt=""
      aria-hidden
      width={icon.width}
      height={icon.height}
      className="shrink-0"
    />
  );
};

/**
 * 안내/주의 배너 공통 컴포넌트 (Figma: 사고뭉치-작업실 AlertBanner)
 */
export const AlertBanner = ({
  variant = 'yellowL',
  headline,
  text,
  className,
}: AlertBannerProps) => {
  const style = VARIANT_STYLE[variant];
  const body = (
    <div
      className={cn(
        'min-w-0 flex-1 caption-sm-regular whitespace-pre-line',
        style.text,
      )}
    >
      {text}
    </div>
  );

  return (
    <div
      role="note"
      className={cn('flex w-full rounded-large', style.container, className)}
    >
      {variant === 'yellowL' ? (
        <>
          <div className="flex items-center gap-g2">
            <BannerIcon variant={variant} />
            {headline && (
              <p className="body-sm-bold text-text-basic">{headline}</p>
            )}
          </div>
          {body}
        </>
      ) : (
        <>
          <BannerIcon variant={variant} />
          {body}
        </>
      )}
    </div>
  );
};
