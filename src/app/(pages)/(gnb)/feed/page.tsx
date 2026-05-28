import { Suspense } from 'react';
import { FeedClient } from './_components/FeedClient';
import { FeedSkeletonList } from './_components/FeedSkeleton';
import Footer from '@/components/Footer';

export default function FeedPage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<FeedSkeletonList />}>
        <FeedClient />
      </Suspense>
      <Footer hasBottomSticky={false} />
    </div>
  );
}
