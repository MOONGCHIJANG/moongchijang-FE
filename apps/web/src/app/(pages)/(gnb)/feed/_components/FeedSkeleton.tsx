export const FeedSkeleton = () => (
  <div className="flex flex-col gap-2 overflow-hidden rounded-xlarge bg-white pb-2 shadow-sm">
    <div className="h-[140px] shrink-0 animate-pulse bg-gray-200" />
    <div className="flex flex-col gap-1.5 px-2">
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
      <div className="h-7 w-20 animate-pulse rounded bg-gray-200" />
    </div>
  </div>
);

export const FeedSkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 gap-x-3.5 gap-y-4">
    {Array.from({ length: count }, (_, i) => (
      <FeedSkeleton key={i} />
    ))}
  </div>
);
