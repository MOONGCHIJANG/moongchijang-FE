'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { QrModal } from '@/app/(pages)/(gnb)/feed/_components/QrModal';
import {
  useGetApiV1ParticipationsParticipationIdPickup,
  useGetApiV1ParticipationsParticipationIdQr,
} from '@/api/hooks/pickup/pickup';
import { useShake } from '@/hooks/useShake';
import {
  formatPickupDate,
  formatPickupDateTime as formatPickupDateTimeLib,
  formatTime,
} from '@/lib/date';

const NaverMap = dynamic(() => import('@/components/NaverMap'), { ssr: false });

function formatPickupDateTime(
  date: string,
  timeStart: string,
  timeEnd: string,
): string {
  const d = new Date(date + 'T00:00:00');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}(${days[d.getDay()]}) ${timeStart} ~ ${timeEnd}`;
}

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

function getRecommendedHour(pickupTimeEnd: string): string {
  const [h] = pickupTimeEnd.split(':').map(Number);
  return String(Math.max(0, h - 2)).padStart(2, '0');
}

export default function PickupPage() {
  const params = useParams();
  const participationId = Number(params.participationId);

  const [isQrOpen, setIsQrOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const { data: pickupData } =
    useGetApiV1ParticipationsParticipationIdPickup(participationId);
  const { data: qrData } = useGetApiV1ParticipationsParticipationIdQr(
    participationId,
    { query: { enabled: isQrOpen } },
  );

  const handleQrClose = useCallback(() => setIsQrOpen(false), []);
  const handleShake = useCallback(() => setIsQrOpen(true), []);
  const { isEnabled, toggleShake } = useShake(handleShake);

  const pickup = pickupData?.status === 200 ? pickupData.data?.data : null;
  const qrItem = qrData?.status === 200 ? qrData.data?.data : null;
  const isPickupDay = pickup?.remainingMinutes != null;

  const mapMarkers = useMemo(
    () =>
      pickup?.latitude && pickup?.longitude
        ? [
            {
              lat: pickup.latitude,
              lng: pickup.longitude,
              title: pickup.storeName,
            },
          ]
        : [],
    [pickup],
  );

  useEffect(() => {
    if (!pickup?.remainingMinutes) return;

    const initialSeconds = pickup.remainingMinutes * 60;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const current = prev ?? initialSeconds;
        if (current <= 0) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pickup?.remainingMinutes]);

  const displayCountdown =
    countdown ??
    (pickup?.remainingMinutes != null ? pickup.remainingMinutes * 60 : null);

  const handleNaverMap = useCallback(() => {
    if (!pickup) return;
    const { latitude, longitude, storeName, storeAddress } = pickup;

    if (latitude && longitude) {
      window.open(
        `https://map.naver.com/v5/directions/-/-/${longitude},${latitude},${encodeURIComponent(storeName)}/-/walk`,
        '_blank',
      );
    } else {
      window.open(
        `https://map.naver.com/v5/search/${encodeURIComponent(storeAddress)}`,
        '_blank',
      );
    }
  }, [pickup]);

  if (!pickup) {
    return (
      <div className="min-h-dvh bg-bg-white flex flex-col">
        <Header text="픽업 안내" showBackButton />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const pickupDateTime = formatPickupDateTime(
    pickup.pickupDate,
    pickup.pickupTimeStart,
    pickup.pickupTimeEnd,
  );
  const pickupDateFormatted = formatPickupDate(pickup.pickupDate);
  const recommendedHour = getRecommendedHour(pickup.pickupTimeEnd);
  const hasLotAddress =
    pickup.pickupLocation && pickup.pickupLocation !== pickup.storeAddress;

  return (
    <div className="relative h-dvh bg-bg-white flex flex-col">
      <Header text="픽업 안내" showBackButton />

      <div
        className={`flex-1 min-h-0 ${isQrOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}
      >
        <div className="flex flex-col gap-g8 px-4 py-g8">
          {/* 상단 카드 + QR 버튼 */}
          <div className="flex flex-col gap-g3">
            <div className="flex border border-border-subtle rounded-3xlarge overflow-hidden">
              <div className="w-[116px] h-[107px] shrink-0 bg-surface-muted" />
              <div className="flex-1 flex flex-col justify-center gap-g1 px-p5 py-p3 min-w-0">
                <span className="body-sm-medium text-text-tertiary">
                  {pickupDateTime}
                </span>
                <p className="heading-lg-bold text-text-basic truncate">
                  {pickup.productName}
                </p>
                {isPickupDay && displayCountdown !== null && (
                  <div className="flex items-center gap-g2">
                    <span className="heading-sm-regular text-text-tertiary">
                      픽업 종료까지
                    </span>
                    <span className="heading-sm-bold text-text-brand">
                      {formatCountdown(displayCountdown)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setIsQrOpen(true)}
            >
              QR 보기
            </Button>
          </div>

          {/* 픽업 위치 */}
          <div className="flex flex-col gap-g4">
            <div className="flex flex-col gap-g3">
              <span className="body-md-semibold text-text-tertiary">
                픽업 위치
              </span>

              <div className="border border-border-subtle rounded-medium overflow-hidden isolate">
                <NaverMap
                  height="226px"
                  center={{
                    lat: pickup.latitude ?? 37.5665,
                    lng: pickup.longitude ?? 126.978,
                  }}
                  markers={mapMarkers}
                />
              </div>

              <div className="flex flex-col gap-g2">
                <p className="heading-md-semibold text-text-basic">
                  {pickup.storeAddress}
                </p>
                {hasLotAddress && (
                  <p className="body-md-bold text-text-subtle">
                    {pickup.pickupLocation}
                  </p>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleNaverMap}
              className="border-border-brand text-text-brand bg-surface-brand-lighter active:bg-surface-brand-lighter"
            >
              네이버 지도로 길찾기
            </Button>
          </div>

          {/* 픽업 가능 시간대 */}
          <div className="flex flex-col gap-g3">
            <span className="body-md-semibold text-text-subtle">
              픽업 가능 시간대
            </span>

            <div className="border border-border-subtle rounded-2xlarge overflow-hidden">
              <div className="flex items-center gap-g3 px-p5 py-p6 bg-surface-white">
                <span className="text-2xl leading-none">⏰</span>
                <div className="flex flex-col">
                  <span className="heading-sm-bold text-text-basic">
                    {pickup.pickupTimeStart} ~ {pickup.pickupTimeEnd}
                  </span>
                  <span className="body-sm-regular text-text-tertiary">
                    마감 {recommendedHour}시 이전 방문 권장
                  </span>
                </div>
              </div>
              <div className="bg-surface-default px-p6 py-p4">
                <span className="body-md-regular text-accent-red-600">
                  ⚠️ 픽업 시간 내 미방문 시 환불이 불가합니다.
                </span>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="flex flex-col border-t border-border-subtle py-p3">
            <div className="flex justify-between items-center py-p2">
              <span className="body-lg-medium text-text-tertiary">매장명</span>
              <span className="body-lg-medium text-text-basic">
                {pickup.storeName}
              </span>
            </div>
            {pickup.storePhone && (
              <div className="flex justify-between items-center py-p2">
                <span className="body-lg-medium text-text-tertiary">
                  전화번호
                </span>
                <a
                  href={`tel:${pickup.storePhone}`}
                  className="body-lg-medium text-text-info"
                >
                  {pickup.storePhone}
                </a>
              </div>
            )}
            <div className="flex justify-between items-center py-p2">
              <span className="body-lg-medium text-text-tertiary">
                픽업 날짜
              </span>
              <span className="body-lg-medium text-text-basic">
                {pickupDateFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>

      <QrModal
        isOpen={isQrOpen}
        onClose={handleQrClose}
        isPickupDay={isPickupDay}
        hasCandidate={true}
        hasMultipleToday={false}
        productName={qrItem?.productName ?? pickup.productName ?? ''}
        reservationNumber={qrItem?.reservationNumber ?? ''}
        pickupAddress={pickup.pickupLocation || pickup.storeAddress}
        pickupTimeStart={
          qrItem
            ? formatPickupDateTimeLib(qrItem.pickupDate, qrItem.pickupTimeStart)
            : formatPickupDateTimeLib(pickup.pickupDate, pickup.pickupTimeStart)
        }
        pickupTimeEnd={formatTime(pickup.pickupTimeEnd)}
        qrCode={qrItem?.qrCode ?? ''}
        dDayText={isPickupDay ? 'D-day' : 'D-?'}
        shakeEnabled={isEnabled}
        onShakeToggle={toggleShake}
        onDetailClick={() => {}}
      />
    </div>
  );
}
