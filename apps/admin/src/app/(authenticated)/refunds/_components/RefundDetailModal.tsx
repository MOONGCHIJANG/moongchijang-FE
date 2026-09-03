'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Input } from '@moongchijang/ui';
import { Modal } from '@/components/Modal';
import { AlertBanner } from '@/components/AlertBanner';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { Chip } from './Chip';
import type { RefundHistoryEntry, RefundMockRow, RefundStatus } from '../types';

interface RefundDetailModalProps {
  row: RefundMockRow | null;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const CAN_DECIDE: RefundStatus[] = ['검토대기', '처리중'];

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

function formatWon(amount: number) {
  return `${amount.toLocaleString('ko-KR')} 원`;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-g5 rounded-large border border-border-subtle bg-bg-white p-g7">
      <h3 className="heading-lg-bold text-text-subtle">{title}</h3>
      <div className="h-px bg-border-default" />
      {children}
    </section>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value: React.ReactNode }[];
}) {
  return (
    <div className="flex items-start justify-between gap-g8">
      <div className="flex shrink-0 flex-col gap-g6">
        {items.map((item) => (
          <span
            key={item.label}
            className="heading-sm-bold whitespace-nowrap text-text-basic"
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-end gap-g6">
        {items.map((item) => (
          <div key={item.label} className="heading-sm-regular text-text-basic">
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryItem({ entry }: { entry: RefundHistoryEntry }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-g2 self-stretch rounded-large border-l-2 p-g6',
        entry.tone === 'warning'
          ? 'border-secondary-400 bg-secondary-25'
          : 'border-gray-400 bg-gray-25',
      )}
    >
      <p className="heading-md-bold text-text-basic">{entry.title}</p>
      <div className="flex flex-col">
        <span className="body-lg-regular text-text-subtle">
          {entry.datetime}
        </span>
        <span className="body-lg-regular text-text-subtle">
          {entry.description}
        </span>
      </div>
    </div>
  );
}

function RefundDetailContent({
  row,
  onClose,
  onApprove,
  onReject,
}: {
  row: RefundMockRow;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}) {
  const [refundAmountInput, setRefundAmountInput] = useState(
    String(row.refundAmount),
  );
  const { detail } = row;
  // G-분쟁 케이스만 CS 티켓 중재·부분 환불 안내를 노출한다 (Figma node-id=6402-28543 기준).
  const isDispute = row.caseLabel.startsWith('G');
  const canDecide = CAN_DECIDE.includes(row.status);

  return (
    <>
      <div className="flex items-start justify-between gap-g6 border-b border-border-subtle p-g7">
        <div className="flex flex-col gap-g3">
          <div className="flex flex-wrap items-center gap-g4">
            <h2 className="heading-1xl-bold text-text-basic">
              환불 요청 상세 - {row.requestId}
            </h2>
            <Chip tone="brand">{row.caseLabel}</Chip>
            {row.slaLabel && (
              <div className="inline-flex items-center gap-3.5 rounded-3xlarge bg-[#E8F1FF] px-g4 py-g2">
                <span className="body-md-bold text-text-info">SLA</span>
                <span className="body-md-regular text-text-info">
                  {row.slaLabel}
                </span>
              </div>
            )}
          </div>
          <p className="body-md-regular text-text-tertiary">
            {row.storeName} · {row.productName}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="shrink-0 rounded-full p-g3 text-icon-subtle hover:bg-gray-50"
        >
          <Icon icon="lucide:x" width={20} height={20} />
        </button>
      </div>

      <div className="flex flex-col gap-g5 p-g7">
        {isDispute && detail.csTicketId && (
          <AlertBanner
            tone="danger"
            size="lg"
            title="사장님이 이의를 제기했습니다."
            description={`CS 티켓(${detail.csTicketId})이 생성되었으며, 중재가 필요합니다.`}
          />
        )}

        <div className="grid grid-cols-1 gap-g5 lg:grid-cols-2">
          <Section title="소비자 정보">
            <InfoGrid
              items={[
                { label: '닉네임', value: row.customerName },
                { label: '전화번호', value: row.customerPhone },
                { label: '이메일', value: detail.customerEmail },
                {
                  label: '가입 방식',
                  value: (
                    <Chip tone="outline">{detail.customerJoinMethod}</Chip>
                  ),
                },
              ]}
            />
          </Section>

          <Section title="공구 정보">
            <InfoGrid
              items={[
                { label: '공구명', value: row.productName },
                {
                  label: '매장명',
                  value: `${row.storeName}(${row.storePhone})`,
                },
                {
                  label: '달성 여부',
                  value: (
                    <Chip tone={detail.achieved ? 'success' : 'gray'}>
                      {detail.achieved ? '달성' : '미달성'}
                    </Chip>
                  ),
                },
                { label: '픽업일', value: detail.pickupDate },
                { label: '픽업 장소', value: detail.pickupLocation },
              ]}
            />
          </Section>
        </div>

        <Section title="환불 요청 정보">
          <InfoGrid
            items={[
              {
                label: '환불 사유',
                value: <Chip tone="gray">{detail.refundReason}</Chip>,
              },
              { label: '요청 일시', value: row.requestedAt },
              {
                label: '상세 설명',
                value: <p className="max-w-sm">{detail.refundDescription}</p>,
              },
            ]}
          />
        </Section>

        <Section title="결제 정보">
          <InfoGrid
            items={[
              {
                label: '결제 금액',
                value: formatCurrency(row.paymentAmount),
              },
              { label: '결제 수단', value: detail.paymentMethod },
              { label: '승인 번호', value: detail.approvalNumber },
              { label: '결제 일시', value: detail.paidAt },
            ]}
          />
        </Section>

        <Section title="매장 의견">
          {detail.storeOpinionContent ? (
            <InfoGrid
              items={[
                {
                  label: '의견 제출 일시',
                  value: detail.storeOpinionSubmittedAt,
                },
                {
                  label: '의견 내용',
                  value: (
                    <p className="max-w-sm">{detail.storeOpinionContent}</p>
                  ),
                },
              ]}
            />
          ) : (
            <p className="heading-sm-regular text-text-tertiary">
              아직 매장 의견이 제출되지 않았습니다.
            </p>
          )}
        </Section>

        <Section title="처리 이력">
          <div className="flex flex-col gap-g4">
            {detail.history.map((entry) => (
              <HistoryItem
                key={`${entry.title}-${entry.datetime}`}
                entry={entry}
              />
            ))}
          </div>
        </Section>

        <Section title="환불 금액 신청">
          <div className="flex flex-col gap-g6">
            <div className="flex items-start justify-between gap-g6">
              <div className="flex flex-col gap-g6">
                <span className="heading-sm-medium text-text-basic">
                  결제 금액
                </span>
                <span className="heading-1xl-bold text-text-subtle">
                  환불 예정 금액
                </span>
              </div>
              <div className="flex flex-col items-end gap-g6">
                <span className="heading-sm-regular text-text-subtle">
                  {formatWon(row.paymentAmount)}
                </span>
                <span className="heading-1xl-bold text-text-info">
                  {formatWon(row.refundAmount)}
                </span>
              </div>
            </div>

            {isDispute && (
              <AlertBanner
                tone="info"
                size="sm"
                title="케이스 G는 부분 환불이 가능합니다. 아래에서 금액을 수정할 수 있습니다."
              />
            )}

            <div className="rounded-large border border-border-default p-g7">
              <div className="flex items-center justify-end gap-g4">
                <label htmlFor="refund-amount-input" className="sr-only">
                  환불 금액
                </label>
                <Input
                  id="refund-amount-input"
                  variant="admin"
                  noHelperSpace
                  inputMode="numeric"
                  className="max-w-32 text-right"
                  value={refundAmountInput}
                  onChange={(event) =>
                    setRefundAmountInput(
                      event.target.value.replace(/[^0-9]/g, ''),
                    )
                  }
                />
                <span className="heading-lg-regular text-text-tertiary">
                  원
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-border-default" />

            {canDecide ? (
              <div className="flex flex-col items-center gap-g3">
                <div className="flex w-full flex-col gap-g4 sm:flex-row">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="gap-g4 bg-info"
                    onClick={() => onApprove(row.requestId)}
                  >
                    <Icon icon="lucide:check" width={22} height={22} />
                    환불 승인
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    className="gap-g4 border-accent-red-500 bg-bg-white text-accent-red-500"
                    onClick={() => onReject(row.requestId)}
                  >
                    <Icon icon="lucide:circle-x" width={22} height={22} />
                    환불 거절
                  </Button>
                </div>
                <p className="heading-sm-medium text-text-subtle-inverse">
                  승인 시 에스크로가 해제되고 PG 환불이 실행됩니다. 신중하게
                  처리해주세요.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-large bg-gray-50 p-g6">
                <StatusBadge label={row.status} />
              </div>
            )}
          </div>
        </Section>
      </div>
    </>
  );
}

export function RefundDetailModal({
  row,
  onClose,
  onApprove,
  onReject,
}: RefundDetailModalProps) {
  return (
    <Modal open={row !== null} onClose={onClose} className="max-w-4xl">
      {row && (
        <RefundDetailContent
          key={row.requestId}
          row={row}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </Modal>
  );
}
