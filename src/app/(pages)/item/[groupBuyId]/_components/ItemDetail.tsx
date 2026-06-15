'use client';
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import DetailTab from './DetailTab';
import GuideLine from './GuideLine';
import { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import { formatPickupDate, formatPickupTime } from '@/lib/date';
import NaverMap from '@/components/NaverMap';
import Image from 'next/image';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

const ItemDetail = ({ data }: Props) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const guidelinesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'guidelines'>(
    'description',
  );

  // 스크롤 위치에 따라 탭 변경
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const THRESHOLD = 112;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const guideTop = guidelinesRef.current?.getBoundingClientRect().top ?? 0;

      if (guideTop <= THRESHOLD) {
        setActiveTab('guidelines');
      } else {
        setActiveTab('description');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markers = useMemo(
    () =>
      data.pickupLatitude && data.pickupLongitude
        ? [
            {
              lat: data.pickupLatitude,
              lng: data.pickupLongitude,
              title: data.storeName,
            },
          ]
        : [],
    [data],
  );

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = useCallback((tab: 'description' | 'guidelines') => {
    setActiveTab(tab);
    isScrollingRef.current = true;

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

    const OFFSET = 112;
    const target =
      tab === 'description' ? descriptionRef.current : guidelinesRef.current;

    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });

      // 스크롤 완료 후 감지 재활성화
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  return (
    <>
      <DetailTab activeTab={activeTab} onTabClick={handleTabClick} />
      <div
        ref={descriptionRef}
        id="description-section"
        className="pt-8 px-4 scroll-mt-28"
      >
        <div className="flex flex-col gap-g4">
          <div className="flex flex-col gap-1">
            <p className="heading-md-bold">픽업 안내</p>
            <p className="text-text-brand caption-sm-medium">
              수령 일시를 꼭 확인해주세요. 미수령 시 환불이 불가해요.
            </p>
          </div>
          <div className="flex flex-col gap-g5">
            <div className="w-full h-56 rounded-medium overflow-hidden isolate">
              {data.pickupLatitude && data.pickupLongitude && (
                <NaverMap
                  center={{
                    lat: data.pickupLatitude,
                    lng: data.pickupLongitude,
                  }}
                  zoom={16}
                  markers={markers}
                  height="226px"
                />
              )}
            </div>
            <div className="flex gap-g5 items-start">
              <div className="shrink-0 px-g3 py-g2 rounded-large bg-surface-brand-lighter text-text-brand caption-sm-bold">
                픽업 장소
              </div>
              <div className="flex flex-col gap-g2 heading-sm-semibold">
                <p>{data.pickupLocation}</p>
              </div>
            </div>
            <div className="flex gap-g5 items-center">
              <div className="shrink-0 px-g3 py-g2 rounded-large bg-surface-brand-lighter text-text-brand caption-sm-bold">
                픽업 일시
              </div>
              <p className="heading-sm-semibold">
                {formatPickupDate(data.pickupDate)}
                {formatPickupTime(data.pickupTimeStart)}~
                {formatPickupTime(data.pickupTimeEnd)}
              </p>
            </div>
          </div>
        </div>
        {data.imageUrls && data.imageUrls.length > 0 && (
          <div className="flex flex-col gap-g4 pt-g9">
            {data.imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`상품 이미지 ${index + 1}`}
                width={400}
                height={260}
                className="h-65 w-auto rounded-3xlarge bg-gray-100 object-cover"
                style={{ width: 'auto' }}
              />
            ))}
          </div>
        )}

        <div className="pt-g9 pb-g10 body-md-regular">
          {data.productDescription}
        </div>
      </div>
      <div
        ref={guidelinesRef}
        id="guidelines-section"
        className="scroll-mt-28 -mt-0"
      >
        <GuideLine />
      </div>
    </>
  );
};

export default ItemDetail;
