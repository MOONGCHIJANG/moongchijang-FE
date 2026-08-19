export const FeedSkeleton = () => (
  <div className="flex h-[272px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="h-[140px] shrink-0 animate-pulse bg-gray-200" />
    <div className="flex flex-1 flex-col justify-between p-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

export const FeedSkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }, (_, i) => (
      <FeedSkeleton key={i} />
    ))}
  </div>
);
