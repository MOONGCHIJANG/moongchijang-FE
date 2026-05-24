'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { GroupBuyRequestDetailStatus } from '@/api/generated/api.schemas';
import { useGetApiV1GroupBuyRequestsRequestId } from '@/api/hooks/group-buy-request/group-buy-request';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

function getStatusConfig(status: GroupBuyRequestDetailStatus): {
  badge: string;
  statusText: string;
  badgeClassName: string;
} {
  if (status === GroupBuyRequestDetailStatus.OPENED) {
    return {
      badge: '검토 완료',
      statusText: '공구 개설 완료',
      badgeClassName: 'bg-surface-default text-text-tertiary',
    };
  }
  if (status === GroupBuyRequestDetailStatus.REJECTED) {
    return {
      badge: '검토 완료',
      statusText: '개설 불가',
      badgeClassName: 'bg-surface-default text-text-tertiary',
    };
  }
  return {
    badge: '검토중',
    statusText:
      status === GroupBuyRequestDetailStatus.IN_CONTACT
        ? '매장 협의 중'
        : '검토 중',
    badgeClassName: 'bg-[#FFEDE9] text-[#FF502E]',
  };
}

interface RequestDetailClientProps {
  requestId: number;
}

export function RequestDetailClient({ requestId }: RequestDetailClientProps) {
  const { data, isLoading } = useGetApiV1GroupBuyRequestsRequestId(requestId);
  const request = data?.status === 200 ? data.data?.data : null;

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <Header text="신청 내역" />
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="rounded-[10px] bg-white p-5 flex flex-col gap-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.04)]">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-10 rounded animate-pulse bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col h-full">
        <Header text="신청 내역" />
        <div className="flex-1 flex items-center justify-center">
          <span className="body-md-regular text-text-tertiary">
            요청 정보를 불러올 수 없어요
          </span>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(request.status);

  return (
    <div className="flex flex-col h-full">
      <Header text="신청 내역" />

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-5">
        <div className="rounded-[10px] bg-white p-5 flex flex-col gap-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.04)]">
          {/* 요청 현황 + 뱃지 */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="body-md-regular text-text-tertiary">
                요청 현황
              </span>
              <span className="heading-lg-bold text-text-basic">
                {statusConfig.statusText}
              </span>
            </div>
            <span
              className={`inline-flex items-center rounded-md px-[7px] py-[5px] caption-xs-bold ${statusConfig.badgeClassName}`}
            >
              {statusConfig.badge}
            </span>
          </div>

          <hr className="border-t border-dashed border-border-subtle" />

          {/* 상세 정보 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="body-md-regular text-text-tertiary">매장</span>
              <span className="heading-sm-bold text-text-basic">
                {request.storeName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="body-md-regular text-text-tertiary">상품</span>
              <span className="body-lg-medium text-text-basic">
                {request.productName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="body-md-regular text-text-tertiary">
                희망 참여 수량
              </span>
              <span className="body-lg-medium text-text-basic">
                {request.desiredQuantity}개
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="body-md-regular text-text-tertiary">
                희망 픽업 날짜
              </span>
              <span className="body-lg-medium text-text-basic">
                {formatDate(request.desiredPickupDate)}
              </span>
            </div>
          </div>

          {/* 추가 요청사항 */}
          {request.additionalNote && (
            <div className="flex flex-col gap-1 bg-bg-white-muted rounded-lg px-4 py-5">
              <span className="body-md-regular text-text-tertiary">
                추가 요청사항
              </span>
              <span className="body-lg-medium text-text-basic">
                {request.additionalNote}
              </span>
            </div>
          )}

          <hr className="border-t border-dashed border-border-subtle" />

          {/* 신청일 */}
          <div className="flex items-center justify-between">
            <span className="body-md-regular text-text-tertiary">신청일</span>
            <span className="heading-sm-bold text-text-basic">
              {formatDate(request.createdAt)}
            </span>
          </div>
        </div>

        <p className="body-sm-regular text-text-disabled text-center">
          신청 완료된 내용은 수정할 수 없어요
        </p>

        {request.status === GroupBuyRequestDetailStatus.REJECTED &&
          request.rejectionReason && (
            <div className="rounded-[10px] bg-white p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.04)]">
              <span className="body-md-regular text-text-tertiary block mb-3">
                개설 불가 사유
              </span>
              <p className="body-md-regular text-text-basic">
                {request.rejectionReason}
              </p>
            </div>
          )}

        {request.status === GroupBuyRequestDetailStatus.OPENED &&
          request.openedGroupBuyId && (
            <Link href={`/item/${request.openedGroupBuyId}`} className="w-full">
              <Button variant="primary" fullWidth>
                공구 바로가기
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
}
