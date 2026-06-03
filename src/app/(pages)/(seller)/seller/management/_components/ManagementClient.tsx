'use client';

import { useState, useCallback } from 'react';
import { useGetApiV1OwnerGroupBuysManage } from '@/api/hooks/owner/owner';
import { usePostApiV1PickupsQrCodeVerify } from '@/api/hooks/pickup/pickup';
import { GetApiV1OwnerGroupBuysManageFilter as Filter } from '@/api/generated/api.schemas';
import {
  QrScannerModal,
  type ScanToastItem,
} from '../../_components/QrScannerModal';
import { ManageGroupBuyItem } from './ManageGroupBuyItem';

const TABS: { label: string; filter: Filter }[] = [
  { label: '전체', filter: Filter.ALL },
  { label: '진행중', filter: Filter.IN_PROGRESS },
  { label: '달성', filter: Filter.ACHIEVED },
  { label: '종료', filter: Filter.ENDED },
  { label: '승인대기', filter: Filter.PENDING_APPROVAL },
];

const TOAST_VISIBLE_MS = 2700;
const TOAST_REMOVE_MS = 3000;

export function ManagementClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.ALL);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toasts, setToasts] = useState<ScanToastItem[]>([]);

  const { data: response, isLoading } = useGetApiV1OwnerGroupBuysManage(
    { filter: activeFilter },
    { query: { queryKey: ['ownerGroupBuysManage', activeFilter] } },
  );

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

  const items = response?.status === 200 ? response.data.data : [];

  return (
    <>
      {/* 탭 */}
      <div className="flex gap-0 bg-surface-white px-5">
        {TABS.map(({ label, filter }) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`body-sm-medium px-3 py-3 transition-colors ${
              activeFilter === filter
                ? 'border-b-2 border-text-brand text-text-brand'
                : 'text-text-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="flex flex-col gap-3 px-5 py-4">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-bg-gray-100"
            />
          ))
        ) : items.length === 0 ? (
          <p className="body-sm-regular py-12 text-center text-text-secondary">
            공구가 없어요
          </p>
        ) : (
          items.map((item) => (
            <ManageGroupBuyItem
              key={item.requestId ?? item.groupBuyId}
              item={item}
              onScanClick={() => setIsQrOpen(true)}
            />
          ))
        )}
      </div>

      <QrScannerModal
        isOpen={isQrOpen}
        onClose={() => {
          setIsQrOpen(false);
          setToasts([]);
        }}
        onScan={handleScan}
        toasts={toasts}
      />
    </>
  );
}
