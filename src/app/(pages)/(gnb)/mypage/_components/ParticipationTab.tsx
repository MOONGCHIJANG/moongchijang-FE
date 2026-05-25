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

function formatPickupTime(start: string | null, end: string | null): string {
  if (!start || !end) return '-';
  return `${start} ~ ${end}`;
}

function formatDDay(dDay: number): string {
  if (dDay === 0) return 'D-day';
  if (dDay < 0) return `D${dDay}`;
  return `D-${dDay}`;
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
  const isActive = tabType === 'active' || tabType === 'waiting';

  const { data: participationData } = useGetApiV1UsersMeParticipations(
    { status: isActive ? 'ACTIVE' : 'COMPLETED' },
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

  const allActiveOrCompleted: ApiResponseMypageParticipationListDataItem[] =
    participationData?.status === 200
      ? (participationData.data?.data ?? [])
      : [];

  const items =
    tabType === 'active'
      ? allActiveOrCompleted.filter(
          (i: ApiResponseMypageParticipationListDataItem) =>
            i.achievementStatus === 'BEFORE_ACHIEVED',
        )
      : tabType === 'waiting'
        ? allActiveOrCompleted.filter(
            (i: ApiResponseMypageParticipationListDataItem) =>
              i.achievementStatus === 'ACHIEVED',
          )
        : allActiveOrCompleted;

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
        refundItems.map((item: ApiResponseRefundListDataItem) => (
          <ParticipationCard
            key={item.participationId}
            variant="refunded"
            participationId={item.participationId}
            productName={item.productName}
            storeName={item.storeName}
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
          />
        ))
      )}
    </div>
  );
}
