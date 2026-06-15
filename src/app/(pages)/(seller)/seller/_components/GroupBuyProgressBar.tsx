type Props = {
  achievementRate: number;
};

export function GroupBuyProgressBar({ achievementRate }: Props) {
  const clamped = Math.min(Math.max(achievementRate, 0), 100);

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-gray-100">
        <div
          className="h-full rounded-full bg-brand-primary transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-9 shrink-0 text-right caption-sm-semibold text-text-brand">
        {achievementRate}%
      </span>
    </div>
  );
}
