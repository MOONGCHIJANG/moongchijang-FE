'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import {
  GroupBuyRequestDetailStatus,
  GroupBuyRequestDetailStatusHistoryItemStatus,
} from '@/api/generated/api.schemas';
import { useGetApiV1GroupBuyRequestsRequestId } from '@/api/hooks/group-buy-request/group-buy-request';
import { formatDate, formatPickupDate } from '@/lib/date';

type StepState = 'completed' | 'current' | 'pending';

function getStepStates(
  status: GroupBuyRequestDetailStatus,
): [StepState, StepState, StepState] {
  switch (status) {
    case GroupBuyRequestDetailStatus.IN_REVIEW:
      return ['current', 'pending', 'pending'];
    case GroupBuyRequestDetailStatus.IN_CONTACT:
      return ['completed', 'current', 'pending'];
    case GroupBuyRequestDetailStatus.OPENED:
    case GroupBuyRequestDetailStatus.REJECTED:
      return ['completed', 'completed', 'current'];
  }
}

const STATUS_MESSAGE: Record<GroupBuyRequestDetailStatus, string> = {
  IN_REVIEW: '요청을 접수했어요',
  IN_CONTACT: '매장과 최소수량과 가능일을 협의하고 있어요',
  OPENED: '공구 결과가 알림으로 발송 되었어요',
  REJECTED: '공구 결과가 알림으로 발송 되었어요',
};

function StepDot({ state }: { state: StepState }) {
  if (state === 'completed') {
    return <div className="w-p6 h-p6 rounded-full bg-surface-brand shrink-0" />;
  }
  if (state === 'current') {
    return (
      <div className="w-p6 h-p6 rounded-full border-2 border-border-brand bg-bg-white shrink-0" />
    );
  }
  return (
    <div className="w-p6 h-p6 rounded-full border border-border-default bg-bg-white shrink-0" />
  );
}

function TimelineStep({
  state,
  label,
  date,
  showConnector,
}: {
  state: StepState;
  label: string;
  date?: string;
  showConnector: boolean;
}) {
  const labelClass =
    state === 'current'
      ? 'heading-sm-bold text-text-brand'
      : state === 'completed'
        ? 'heading-sm-medium text-text-subtle'
        : 'heading-sm-medium text-icon-disabled';

  return (
    <div className="flex gap-g3">
      <div className="flex flex-col items-center">
        <StepDot state={state} />
        {showConnector && (
          <div
            className={`flex-1 min-h-g6 w-0 border-l-2 ${
              state === 'completed'
                ? 'border-border-brand'
                : 'border-dashed border-border-default'
            }`}
          />
        )}
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex h-p6 items-center justify-between">
          <span className={labelClass}>{label}</span>
          {date && (
            <span className="body-md-regular text-icon-disabled">{date}</span>
          )}
        </div>
        {showConnector && <div className="min-h-g6" />}
      </div>
    </div>
  );
}

interface RequestStatusClientProps {
  requestId: number;
}

export function RequestStatusClient({ requestId }: RequestStatusClientProps) {
  const { data, isLoading } = useGetApiV1GroupBuyRequestsRequestId(requestId);
  const request = data?.status === 200 ? data.data?.data : null;

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <Header text="요청 현황" />
        <div className="flex-1 overflow-y-auto px-p6 py-p6">
          <div className="h-24 rounded-large animate-pulse bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col h-full">
        <Header text="요청 현황" />
        <div className="flex-1 flex items-center justify-center">
          <span className="body-md-regular text-text-tertiary">
            요청 정보를 불러올 수 없어요
          </span>
        </div>
      </div>
    );
  }

  const [step1, step2, step3] = getStepStates(request.status);
  const statusMessage = STATUS_MESSAGE[request.status];
  const history = request.statusHistory;

  const step1Date = history.find(
    (h) => h.status === GroupBuyRequestDetailStatusHistoryItemStatus.IN_REVIEW,
  )?.changedAt;
  const step2Date = history.find(
    (h) => h.status === GroupBuyRequestDetailStatusHistoryItemStatus.IN_CONTACT,
  )?.changedAt;
  const step3Date = history.find(
    (h) =>
      h.status === GroupBuyRequestDetailStatusHistoryItemStatus.OPENED ||
      h.status === GroupBuyRequestDetailStatusHistoryItemStatus.REJECTED,
  )?.changedAt;

  return (
    <div className="flex flex-col h-full">
      <Header text="요청 현황" />

      <div className="flex-1 overflow-y-auto">
        {/* 요청 정보 */}
        <div className="bg-bg-white px-p6 py-p6 flex flex-col gap-g2 border-b border-dashed border-border-subtle">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="caption-sm-medium text-text-tertiary">
              {request.storeName}
            </span>
            <span className="caption-sm-medium text-text-tertiary">•</span>
            <span className="caption-sm-medium text-text-tertiary">
              픽업 {formatPickupDate(request.desiredPickupDate)}
            </span>
            <span className="caption-sm-medium text-text-tertiary">•</span>
            <span className="caption-sm-medium text-text-tertiary">
              수량 {request.desiredQuantity}개
            </span>
          </div>
          <span className="heading-1xl-bold text-text-basic">
            {request.productName}
          </span>
          <span className="heading-sm-medium text-text-subtle">
            {statusMessage}
          </span>
        </div>

        {/* 일러스트 + 타임라인 */}
        <div className="flex flex-col items-center gap-g7 px-p6 pt-11 pb-p8">
          <Image
            src="/images/bakery-store.png"
            alt=""
            width={240}
            height={146}
          />

          <div className="w-full rounded-2xlarge border border-border-subtle bg-bg-white p-p6">
            <TimelineStep
              state={step1}
              label="요청 접수"
              date={step1Date ? formatDate(step1Date) : undefined}
              showConnector
            />
            <TimelineStep
              state={step2}
              label="매장 협의 중"
              date={step2Date ? formatDate(step2Date) : undefined}
              showConnector
            />
            <TimelineStep
              state={step3}
              label="공구 결과 안내"
              date={step3Date ? formatDate(step3Date) : undefined}
              showConnector={false}
            />
          </div>

          {request.status === GroupBuyRequestDetailStatus.OPENED &&
            request.openedGroupBuyId && (
              <Link
                href={`/item/${request.openedGroupBuyId}`}
                className="w-full"
              >
                <Button variant="primary" fullWidth>
                  공구 바로가기
                </Button>
              </Link>
            )}
        </div>
      </div>
    </div>
  );
}
