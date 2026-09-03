import { cn } from '@/lib/utils';

type ChipTone = 'outline' | 'success';

const TONE_CLASS: Record<ChipTone, string> = {
  outline:
    'rounded-full border border-border-default bg-bg-white px-g4 py-g2 text-text-subtle caption-sm-regular',
  success:
    'rounded-medium bg-success-50 px-g4 py-g1 text-success-600 body-md-semibold',
};

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  className?: string;
}

export function Chip({ children, tone = 'outline', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
