import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface SvgIconProps {
  /** public 기준 경로 (예: '/icons/bolt.svg') */
  src: string;
  /** px 숫자 또는 CSS 길이 (기본 24) */
  size?: number | string;
  /** 색은 text-* 클래스로 지정 (currentColor) */
  className?: string;
}

/**
 * public 의 단색 SVG 를 CSS mask 로 그려, text-* 클래스로 색을 바꿀 수 있게 하는 아이콘
 */
export const SvgIcon = ({ src, size = 24, className }: SvgIconProps) => {
  const style: CSSProperties = {
    width: size,
    height: size,
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  };

  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={style}
    />
  );
};
