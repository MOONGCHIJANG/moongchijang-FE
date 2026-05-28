import { Suspense } from 'react';
import { FeedClient } from './_components/FeedClient';
import { FeedSkeletonList } from './_components/FeedSkeleton';

export default function FeedPage() {
  return (
    <Suspense fallback={<FeedSkeletonList />}>
      <FeedClient />
    </Suspense>
  );
}
