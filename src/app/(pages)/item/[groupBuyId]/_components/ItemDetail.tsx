'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import DetailTab from './DetailTab';
import GuideLine from './GuideLine';
import { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import { formatPickupDate, formatPickupTime } from '@/lib/date';

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
  useEffect(() => {
    const handleScroll = () => {
      const descTop = descriptionRef.current?.getBoundingClientRect().top ?? 0;
      const guideTop = guidelinesRef.current?.getBoundingClientRect().top ?? 0;

      if (descTop <= 56 && guideTop > 56) {
        setActiveTab('description');
      } else if (guideTop <= 56) {
        setActiveTab('guidelines');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = useCallback((tab: 'description' | 'guidelines') => {
    setActiveTab(tab);
    const yOffset = -56;
    const target =
      tab === 'description' ? descriptionRef.current : guidelinesRef.current;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <DetailTab activeTab={activeTab} onTabClick={handleTabClick} />
      <div
        ref={descriptionRef}
        id="description-section"
        className="pt-8 px-4 scroll-mt-16"
      >
        <div className="flex flex-col gap-g4">
          <div className="flex flex-col gap-1">
            <p className="heading-md-bold">픽업 안내</p>
            <p className="text-text-brand caption-sm-medium">
              수령 일시를 꼭 확인해주세요. 미수령 시 환불이 불가해요.
            </p>
          </div>
          <div className="flex flex-col gap-g5">
            {/* TODO: 지도 컴포넌트 (pickupLatitude, pickupLongitude 활용) */}
            <div className="w-full h-56 rounded-medium bg-gray-200">지도</div>
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
        {/* TODO: 상품 설명 확정 후 수정 적용 예정 */}
        <div className="pt-g9 pb-g10 body-md-regular">
          {data.productDescription}
        </div>
      </div>
      <div ref={guidelinesRef} id="guidelines-section" className="scroll-mt-16">
        <GuideLine />
      </div>
    </>
  );
};

export default ItemDetail;
