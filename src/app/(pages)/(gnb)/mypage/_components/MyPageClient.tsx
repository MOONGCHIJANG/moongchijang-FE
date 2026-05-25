'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import {
  useGetApiV1ParticipationsParticipationIdPickup,
  useGetApiV1ParticipationsParticipationIdQr,
} from '@/api/hooks/pickup/pickup';
import { useShake } from '@/hooks/useShake';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileSection } from './ProfileSection';
import { ParticipationTab } from './ParticipationTab';
import { QrModal } from '@/app/(pages)/(gnb)/feed/_components/QrModal';

type TabKey = 'active' | 'waiting' | 'completed' | 'refunded';

const TAB_LABELS: Record<TabKey, string> = {
  active: '진행 중',
  waiting: '픽업 대기',
  completed: '픽업 완료',
  refunded: '환불/취소',
};

// TODO: 백엔드에서 beforeAchievedCount / achievedCount 분리되면 active·waiting 카운트 연결

function formatPickupTime(start: string | null, end: string | null): string {
  if (!start || !end) return '-';
  return `${start} ~ ${end}`;
}

function formatDDay(dDay: number): string {
  if (dDay === 0) return 'D-day';
  if (dDay < 0) return `D${dDay}`;
  return `D-${dDay}`;
}

const MyPageClient = ({ tab }: { tab: TabKey }) => {
  const router = useRouter();
  const { isLoggedIn, isInitialized } = useAuthStore();

  const [qrParticipationId, setQrParticipationId] = useState<number | null>(
    null,
  );
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrMeta, setQrMeta] = useState<{
    storeName: string;
    dDay: number;
  } | null>(null);

  const { data: qrData } = useGetApiV1ParticipationsParticipationIdQr(
    qrParticipationId ?? 0,
    { query: { enabled: isQrOpen && qrParticipationId !== null } },
  );
  const { data: pickupData } = useGetApiV1ParticipationsParticipationIdPickup(
    qrParticipationId ?? 0,
    { query: { enabled: isQrOpen && qrParticipationId !== null } },
  );

  const handleQrClose = useCallback(() => setIsQrOpen(false), []);
  const handleShake = useCallback(() => setIsQrOpen(true), []);
  const { isEnabled, toggleShake } = useShake(handleShake);

  const handleQrClick = useCallback(
    (id: number, meta: { storeName: string; dDay: number }) => {
      setQrParticipationId(id);
      setQrMeta(meta);
      setIsQrOpen(true);
    },
    [],
  );

  const qrValue =
    qrData?.status === 200 ? (qrData.data?.data?.qrCode ?? '') : '';
  const pickup = pickupData?.status === 200 ? pickupData.data?.data : null;

  const handleTabChange = useCallback(
    (next: TabKey) => {
      router.push(`/mypage?tab=${next}`);
    },
    [router],
  );

  if (!isInitialized) return null;

  if (!isLoggedIn) {
    return (
      <div className="h-dvh bg-surface-white no-scroll">
        <div className="py-4 bg-bg-white-muted">
          <Link
            href="/login"
            className="flex justify-between w-full items-center p-g5 bg-surface-white"
          >
            <p className="heading-sm-semibold">로그인하고 뭉치장 이용하기</p>
            <Icon
              icon="lucide:chevron-right"
              className="w-8 h-8 text-icon-basic"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-g5 items-center pt-25">
          <Image src="/icons/starpoint.svg" width={91} height={91} alt="" />
          <p className="whitespace-pre-line heading-sm-medium text-center">{`로그인 후\n이용 가능해요`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-bg-white-muted min-h-full">
      <ProfileSection />
      <div className="mt-g4 bg-surface">
        <div className="flex overflow-x-auto scrollbar-hide">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`flex-1 bg-bg-white min-w-max px-g3 pt-g4 pb-g3 whitespace-nowrap transition-colors ${
                tab === key
                  ? 'text-text-basic caption-sm-bold border-b-2 border-button-natural'
                  : 'text-text-tertiary caption-sm-medium'
              }`}
              onClick={() => handleTabChange(key)}
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>
        <ParticipationTab tabType={tab} onQrClick={handleQrClick} />
      </div>

      <QrModal
        isOpen={isQrOpen}
        onClose={handleQrClose}
        isPickupDay={qrMeta?.dDay === 0}
        orderNumber={String(qrParticipationId ?? '')}
        pickupLocation={pickup?.storeAddress ?? ''}
        pickupTime={formatPickupTime(
          pickup?.pickupTimeStart ?? null,
          pickup?.pickupTimeEnd ?? null,
        )}
        storeName={pickup?.storeName ?? qrMeta?.storeName ?? ''}
        qrValue={qrValue}
        dDayText={formatDDay(qrMeta?.dDay ?? 0)}
        shakeEnabled={isEnabled}
        onShakeToggle={toggleShake}
      />
    </div>
  );
};

export default MyPageClient;
