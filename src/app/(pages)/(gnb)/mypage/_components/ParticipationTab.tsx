'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetApiV1UsersMeParticipations,
  useGetApiV1UsersMeRefunds,
} from '@/api/hooks/my-page/my-page';
import {
  ApiResponseMypageParticipationListDataItem,
  ApiResponseRefundListDataItem,
} from '@/api/generated/api.schemas';
import { ParticipationCard } from './ParticipationCard';

type TabType = 'active' | 'waiting' | 'completed' | 'refunded';

interface ParticipationTabProps {
  tabType: TabType;
  onQrClick: (id: number, meta: { storeName: string; dDay: number }) => void;
}

const EMPTY_MESSAGES: Record<TabType, string> = {
  active: '진행 중인 공구가 없어요',
  waiting: '픽업 대기 중인 공구가 없어요',
  completed: '픽업 완료된 공구가 없어요',
  refunded: '환불/취소 내역이 없어요',
};

export function ParticipationTab({
  tabType,
  onQrClick,
}: ParticipationTabProps) {
  const router = useRouter();

  const isRefunded = tabType === 'refunded';

  const statusByTab = {
    active: 'IN_PROGRESS',
    waiting: 'PICKUP_WAITING',
    completed: 'PICKUP_COMPLETED',
    refunded: 'IN_PROGRESS',
  } as const;

  const { data: participationData } = useGetApiV1UsersMeParticipations(
    { status: statusByTab[tabType] },
    { query: { enabled: !isRefunded } },
  );

  const { data: refundData } = useGetApiV1UsersMeRefunds({
    query: { enabled: isRefunded },
  });

  const handlePickupClick = useCallback(
    (id: number) => {
      router.push(`/mypage/pickup/${id}`);
    },
    [router],
  );

  const items: ApiResponseMypageParticipationListDataItem[] =
    participationData?.status === 200
      ? (participationData.data?.data ?? [])
      : [];

  const refundItems: ApiResponseRefundListDataItem[] =
    refundData?.status === 200 ? (refundData.data?.data ?? []) : [];

  const isEmpty = isRefunded ? refundItems.length === 0 : items.length === 0;

  return (
    <div className="flex flex-col gap-g4">
      {isEmpty ? (
        <div className="flex items-center justify-center py-20 body-md-regular text-text-tertiary">
          {EMPTY_MESSAGES[tabType]}
        </div>
      ) : isRefunded ? (
        refundItems.map((item) => (
          <ParticipationCard
            key={item.participationId}
            variant="refunded"
            participationId={item.participationId}
            productName={item.productName}
            storeName={item.storeName}
            imageUrl={item.thumbnailUrl}
            pickupDate={item.pickupDate}
            quantity={item.quantity}
            paymentAmount={item.paymentAmount}
            refundStatus={item.refundStatus}
          />
        ))
      ) : tabType === 'active' ? (
        items.map((item: ApiResponseMypageParticipationListDataItem) => (
          <ParticipationCard
            key={item.participationId}
            variant="active"
            participationId={item.participationId}
            productName={item.productName}
            storeName={item.storeName}
            pickupDate={item.pickupDate}
            quantity={item.quantity}
            paymentAmount={item.paymentAmount}
            imageUrl={item.thumbnailUrl}
            achievementRate={item.achievementRate}
            dDay={item.dDay}
          />
        ))
      ) : tabType === 'waiting' ? (
        items.map((item: ApiResponseMypageParticipationListDataItem) => (
          <ParticipationCard
            key={item.participationId}
            variant="pickup"
            participationId={item.participationId}
            productName={item.productName}
            storeName={item.storeName}
            pickupDate={item.pickupDate}
            quantity={item.quantity}
            paymentAmount={item.paymentAmount}
            imageUrl={item.thumbnailUrl}
            onQrClick={() =>
              onQrClick(item.participationId, {
                storeName: item.storeName,
                dDay: item.dDay,
              })
            }
            onPickupClick={() => handlePickupClick(item.participationId)}
          />
        ))
      ) : (
        items.map((item: ApiResponseMypageParticipationListDataItem) => (
          <ParticipationCard
            key={item.participationId}
            variant="completed"
            participationId={item.participationId}
            productName={item.productName}
            storeName={item.storeName}
            pickupDate={item.pickupDate}
            quantity={item.quantity}
            paymentAmount={item.paymentAmount}
            imageUrl={item.thumbnailUrl}
          />
        ))
      )}
    </div>
  );
}
