import React from 'react';

type NoticeSkeletonProps = {
  count?: number;
};

const NoticeSkeletonItem = () => (
  <div className="px-p7 py-g4 flex gap-5.5 items-center animate-pulse h-22">
    <div className="w-5 h-5 rounded-full bg-bg-white-muted shrink-0" />
    <div className="flex flex-1 justify-between">
      <div className="flex flex-col gap-g3 flex-1">
        <div className="h-4 w-2/5 rounded bg-bg-white-muted" />
        <div className="h-3 w-4/5 rounded bg-bg-white-muted" />
      </div>
      <div className="h-3 w-10 rounded bg-bg-white-muted" />
    </div>
  </div>
);

const NoticeSkeleton = ({ count = 10 }: NoticeSkeletonProps) => (
  <div className="bg-surface-white">
    {Array.from({ length: count }).map((_, i) => (
      <NoticeSkeletonItem key={i} />
    ))}
  </div>
);

export default NoticeSkeleton;
