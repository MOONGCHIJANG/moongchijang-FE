'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useGetApiV1OwnerGroupBuysManage } from '@/api/hooks/owner/owner';
import { usePostApiV1PickupsQrCodeVerify } from '@/api/hooks/pickup/pickup';
import { GetApiV1OwnerGroupBuysManageFilter as Filter } from '@/api/generated/api.schemas';
import type { ApiResponsePickupVerifyData } from '@/api/generated/api.schemas';
import { BottomSheet } from '@/components/BottomSheet';
import { ToastBlack } from '@/components/ToastBlack';
import { Button } from '@/components/Button';
import { QrScannerModal } from '../../_components/QrScannerModal';
import { ManageGroupBuyItem } from './ManageGroupBuyItem';

const TABS: { label: string; filter: Filter }[] = [
  { label: '전체', filter: Filter.ALL },
  { label: '진행중', filter: Filter.IN_PROGRESS },
  { label: '달성', filter: Filter.ACHIEVED },
  { label: '종료', filter: Filter.ENDED },
  { label: '승인대기', filter: Filter.PENDING_APPROVAL },
];

function PickupInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className="body-sm-regular text-text-tertiary">{label}</span>
      <span className="body-sm-bold text-text-basic">{value}</span>
    </div>
  );
}

export function ManagementClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.ALL);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [pickupResult, setPickupResult] =
    useState<ApiResponsePickupVerifyData | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const { data: response, isLoading } = useGetApiV1OwnerGroupBuysManage(
    { filter: activeFilter },
    { query: { queryKey: ['ownerGroupBuysManage', activeFilter] } },
  );

  const { mutate: verifyQr } = usePostApiV1PickupsQrCodeVerify();

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const handleScan = (qrCode: string) => {
    verifyQr(
      { qrCode },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            setPickupResult(res.data.data);
          } else if (res.status === 409) {
            showToast('이미 처리된 픽업입니다.');
          } else if (res.status === 403) {
            showToast('권한이 없는 QR 코드입니다.');
          } else {
            showToast('유효하지 않은 QR 코드입니다.');
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
        onClose={() => setIsQrOpen(false)}
        onScan={handleScan}
      />

      <BottomSheet
        isOpen={pickupResult !== null}
        onClose={() => setPickupResult(null)}
      >
        {pickupResult && (
          <div className="flex flex-col gap-6 px-5 pb-8 pt-2">
            <div className="flex flex-col items-center gap-3 py-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-brand-lighter">
                <Icon
                  icon="ic:round-check-circle"
                  className="h-9 w-9 text-primary-400"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="heading-md-bold text-text-basic">
                  픽업 완료!
                </span>
                <span className="body-sm-regular text-text-tertiary">
                  수령이 정상 처리됐어요
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border-brand-lighter">
              <div className="bg-surface-brand-lighter px-4 py-2.5">
                <span className="caption-xs-bold text-text-brand">
                  픽업 정보
                </span>
              </div>
              <div className="flex flex-col divide-y divide-border-default bg-white px-4">
                <PickupInfoRow
                  label="구매자"
                  value={pickupResult.userName ?? '-'}
                />
                <PickupInfoRow
                  label="상품명"
                  value={pickupResult.productName}
                />
                <PickupInfoRow
                  label="수량"
                  value={`${pickupResult.quantity}개`}
                />
              </div>
            </div>
            <Button size="lg" fullWidth onClick={() => setPickupResult(null)}>
              확인
            </Button>
          </div>
        )}
      </BottomSheet>

      <div className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2">
        <ToastBlack message={toastMessage} isVisible={isToastVisible} />
      </div>
    </>
  );
}
