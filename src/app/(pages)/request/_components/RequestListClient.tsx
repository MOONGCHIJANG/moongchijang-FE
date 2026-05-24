'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { RequestCard } from './RequestCard';
import { useGetApiV1GroupBuyRequests } from '@/api/hooks/group-buy-request/group-buy-request';

function RequestListSkeleton() {
  return (
    <div className="bg-bg-white px-p6 py-p6">
      <div className="flex items-center justify-between mb-g3">
        <div className="h-5 w-20 rounded-small animate-pulse bg-gray-200" />
        <div className="h-6 w-12 rounded-medium animate-pulse bg-gray-200" />
      </div>
      <div className="border border-border-subtle rounded-2xlarge p-p3">
        <div className="h-6 w-40 rounded-small animate-pulse bg-gray-200 mt-g2 mx-g2 mb-g2" />
        <div className="h-4 w-56 rounded-small animate-pulse bg-gray-200 mb-g4 mx-g2" />
        <div className="flex flex-col gap-g3">
          <div className="h-10 rounded-large animate-pulse bg-gray-200" />
          <div className="h-10 rounded-large animate-pulse bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function RequestListClient() {
  const { data, isLoading } = useGetApiV1GroupBuyRequests();
  const requests = data?.status === 200 ? (data.data?.data ?? []) : [];

  return (
    <div className="flex flex-col h-full">
      <Header text="공구 요청하기" showBackButton={false} />

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-g4 pt-g4">
            {Array.from({ length: 3 }, (_, i) => (
              <RequestListSkeleton key={i} />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pb-[74px]">
            <div className="flex flex-col items-center gap-g4">
              <Image
                src="/images/bakery-store.png"
                alt=""
                width={175}
                height={95}
              />
              <span className="heading-md-semibold text-text-basic">
                요청한 공구가 아직 없어요
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-g2 pt-p2 pb-[calc(74px+16px)]">
            {requests.map((request) => (
              <RequestCard key={request.requestId} request={request} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px]">
        <Link href="/request/new">
          <Button size="lg" variant="primary" fullWidth>
            <Icon icon="lucide:plus" className="w-6 h-6" />
            공구 요청하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
