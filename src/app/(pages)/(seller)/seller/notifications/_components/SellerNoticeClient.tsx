'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Chip } from '@/components/Chip';
import Image from 'next/image';
import SellerNoticeItem from './SellerNoticeItem';
import NoticeSkeleton from '@/app/(pages)/notifications/_components/NoticeSkeleton';
import { useNotificationList } from '@/app/(pages)/notifications/_hooks/useNotificationList';
import {
  GetApiV1NotificationsCategory,
  NotificationItemResponse,
  NotificationListResponse,
  NotificationSection,
  NotificationTriggerType,
} from '@/api/generated/api.schemas';
import {
  QrScannerModal,
  type ScanToastItem,
} from '../../_components/QrScannerModal';
import { usePostApiV1PickupsQrCodeVerify } from '@/api/hooks/pickup/pickup';

type SellerTabConfig = {
  label: string;
  category: GetApiV1NotificationsCategory;
  triggerTypes?: NotificationTriggerType[];
};

const SELLER_TABS: SellerTabConfig[] = [
  { label: '전체', category: GetApiV1NotificationsCategory.ALL },
  {
    label: '오늘 픽업',
    category: GetApiV1NotificationsCategory.PICKUP,
    triggerTypes: [NotificationTriggerType.PICKUP_SAME_DAY_MORNING],
  },
  {
    label: '리마인더',
    category: GetApiV1NotificationsCategory.ALL,
    triggerTypes: [
      NotificationTriggerType.PICKUP_DAY_BEFORE_MORNING,
      NotificationTriggerType.REQUEST_DEADLINE_MINUS_3_DAYS,
    ],
  },
  {
    label: '확정',
    category: GetApiV1NotificationsCategory.REQUEST,
    triggerTypes: [
      NotificationTriggerType.REQUEST_OPENED_IMMEDIATE,
      NotificationTriggerType.REQUEST_TARGET_ACHIEVED_IMMEDIATE,
    ],
  },
  {
    label: '취소',
    category: GetApiV1NotificationsCategory.REQUEST,
    triggerTypes: [NotificationTriggerType.REQUEST_REJECTED_IMMEDIATE],
  },
];

function groupBySection(items: NotificationItemResponse[]) {
  return {
    today: items.filter((i) => i.section === NotificationSection.TODAY),
    yesterday: items.filter((i) => i.section === NotificationSection.YESTERDAY),
    older: items.filter((i) => i.section === NotificationSection.OLDER),
  };
}

type Props = { initialData: NotificationListResponse };

const TOAST_VISIBLE_MS = 2700;
const TOAST_REMOVE_MS = 3000;

export function SellerNoticeClient({ initialData }: Props) {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const activeTab = SELLER_TABS[tabIndex];
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toasts, setToasts] = useState<ScanToastItem[]>([]);

  const { mutate: verifyQr } = usePostApiV1PickupsQrCodeVerify();

  const addToast = useCallback(
    (type: ScanToastItem['type'], title: string, subtitle: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, subtitle, visible: true }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
        );
      }, TOAST_VISIBLE_MS);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_REMOVE_MS);
    },
    [],
  );

  const handleScan = (qrCode: string) => {
    verifyQr(
      { qrCode },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const d = res.data.data;
            addToast(
              'success',
              '픽업 완료',
              `${d.userName ?? '익명'} · ${d.productName} · ${d.quantity}개`,
            );
          } else if (res.status === 409) {
            addToast('error', '이미 처리된 픽업입니다.', '');
          } else if (res.status === 403) {
            addToast('error', '권한이 없는 QR 코드입니다.', '');
          } else {
            addToast('error', '유효하지 않은 QR 코드입니다.', '');
          }
        },
      },
    );
  };

  const {
    items,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotificationList(activeTab.category);

  const scrollStateRef = useRef({ hasNextPage, isFetchingNextPage });
  useLayoutEffect(() => {
    scrollStateRef.current = { hasNextPage, isFetchingNextPage };
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNextPage, isFetchingNextPage } = scrollStateRef.current;
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  const isAllTab =
    !activeTab.triggerTypes &&
    activeTab.category === GetApiV1NotificationsCategory.ALL;
  const rawItems = isAllTab && isLoading ? initialData.items : items;

  const filteredItems = activeTab.triggerTypes
    ? rawItems.filter(
        (item) =>
          item.triggerType &&
          (activeTab.triggerTypes as NotificationTriggerType[]).includes(
            item.triggerType,
          ),
      )
    : rawItems;

  const { today, yesterday, older } = groupBySection(filteredItems);
  const isEmpty = filteredItems.length === 0 && !isLoading;
  const showSkeleton = isLoading || (isFetching && !isFetchingNextPage);

  const SECTIONS = [
    { label: '오늘', items: today },
    { label: '어제', items: yesterday },
    { label: '이전', items: older },
  ] as const;

  return (
    <div>
      <Header text="알림" onBack={() => router.push('/seller')} />
      <div className="flex gap-g3 px-p6 py-p3">
        {SELLER_TABS.map(({ label }, i) => (
          <Chip
            key={label}
            label={label}
            active={tabIndex === i}
            onClick={() => setTabIndex(i)}
          />
        ))}
      </div>

      {showSkeleton ? (
        <NoticeSkeleton />
      ) : isEmpty ? (
        <div className="px-7 flex flex-col gap-g9 items-center w-full pt-30">
          <div className="flex flex-col gap-3.25 items-center">
            <Image
              src="/images/group-buy-request-complete.svg"
              alt="알림 없음"
              width={110}
              height={72.5}
            />
            <p className="text-center heading-md-bold">아직 알림이 없어요</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-bg-white-muted gap-g5">
          {SECTIONS.filter(({ items }) => items.length > 0).map(
            ({ label, items }) => (
              <div
                key={label}
                className="flex flex-col gap-1.25 pt-p5 bg-surface-white"
              >
                <p className="px-p6 caption-sm-regular text-text-subtle-inverse">
                  {label}
                </p>
                <div>
                  {items.map((item) => (
                    <SellerNoticeItem
                      key={item.id}
                      item={item}
                      onQrOpen={() => setIsQrOpen(true)}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}

      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && <NoticeSkeleton count={3} />}

      <QrScannerModal
        isOpen={isQrOpen}
        onClose={() => {
          setIsQrOpen(false);
          setToasts([]);
        }}
        onScan={handleScan}
        toasts={toasts}
      />
    </div>
  );
}
