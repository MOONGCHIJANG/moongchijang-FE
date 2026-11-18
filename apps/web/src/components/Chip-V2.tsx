import { cn } from '@/lib/utils';

export type ChipV2Variant =
  | 'yellow'
  | 'brandLighter'
  | 'blue'
  | 'brand'
  | 'disabled';

export type ChipV2Size = 's' | 'm';

interface ChipV2Props {
  label: string;
  variant?: ChipV2Variant;
  size?: ChipV2Size;
  className?: string;
}

const VARIANT_CLASS: Record<ChipV2Variant, string> = {
  yellow:
    'bg-surface-secondary-lighter border-brand-secondary text-text-secondary',
  brandLighter: 'bg-surface-brand-lighter border-border-brand text-text-brand',
  blue: 'bg-surface-white border-button-blue text-text-info',
  brand: 'bg-surface-brand border-border-brand text-text-basic-inverse',
  disabled: 'bg-surface-white border-border-default text-text-subtle-inverse',
};

const SIZE_CLASS: Record<ChipV2Size, string> = {
  s: 'px-p3 py-p1 rounded-max caption-xs-bold',
  m: 'px-p5 py-p2 rounded-xlarge caption-sm-bold',
};

export const ChipV2 = ({
  label,
  variant = 'yellow',
  size = 's',
  className,
}: ChipV2Props) => {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-g2 border font-pretendard whitespace-nowrap text-center',
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        className,
      )}
    >
      {label}
    </span>
  );
};
