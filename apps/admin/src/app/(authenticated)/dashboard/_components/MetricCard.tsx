import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface MetricCardTrend {
  text: string;
  tone: 'positive' | 'negative';
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: string;
  trend?: MetricCardTrend;
}

export function MetricCard({
  label,
  value,
  description,
  icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="flex h-[172px] w-[260px] shrink-0 flex-col justify-between rounded-large bg-bg-white p-p6 shadow-[1px_2px_10px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-g3">
          <span className="body-sm-medium text-text-tertiary">{label}</span>
          <Icon
            icon={icon}
            className="h-[30px] w-[30px] shrink-0 text-text-tertiary"
          />
        </div>
        <span className="title-md-semibold text-text-basic">{value}</span>
      </div>
      <div className="flex flex-col gap-g2">
        <span className="body-lg-regular text-text-tertiary">
          {description}
        </span>
        {trend && (
          <span
            className={cn(
              'body-lg-regular',
              trend.tone === 'positive'
                ? 'text-success-600'
                : 'text-accent-red-500',
            )}
          >
            {trend.text}
          </span>
        )}
      </div>
    </div>
  );
}
