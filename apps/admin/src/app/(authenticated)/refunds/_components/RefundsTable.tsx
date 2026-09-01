import { Button } from '@moongchijang/ui';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import type { RefundMockRow } from '../types';

interface RefundsTableProps {
  rows: RefundMockRow[];
  onProcess: (requestId: string) => void;
}

const HEADERS = [
  '요청 ID',
  '케이스',
  '소비자',
  '공구명',
  '매장명',
  '결제 금액',
  '환불 금액',
  '매장 의견',
  '요청 일시',
  'SLA',
  '상태',
  '작업',
];

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'brand';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-g4 py-g2',
        tone === 'brand'
          ? 'bg-primary-50 text-primary-400 body-md-bold'
          : 'border border-border-default text-text-subtle body-md-regular',
      )}
    >
      {children}
    </span>
  );
}

const CAN_PROCESS: RefundMockRow['status'][] = ['검토대기', '처리중'];

export function RefundsTable({ rows, onProcess }: RefundsTableProps) {
  return (
    <div className="overflow-x-auto rounded-large border border-border-subtle">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {HEADERS.map((header) => (
              <th
                key={header}
                scope="col"
                className="whitespace-nowrap p-p6 text-left body-md-semibold text-text-subtle"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={HEADERS.length}
                className="p-p8 text-center heading-sm-regular text-text-tertiary"
              >
                표시할 환불 요청이 없습니다.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.requestId}
                className="border-b border-border-default"
              >
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.requestId}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <div className="flex flex-col items-start gap-g2">
                    <Pill tone="brand">{row.caseLabel}</Pill>
                    <span className="heading-sm-regular text-text-basic">
                      {row.caseDescription}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap p-p6">
                  <div className="flex flex-col">
                    <span className="heading-sm-semibold text-text-basic">
                      {row.customerName}
                    </span>
                    <span className="body-md-regular text-text-tertiary">
                      {row.customerPhone}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.productName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.storeName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {formatCurrency(row.paymentAmount)}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <div className="flex flex-col">
                    <span className="heading-sm-semibold text-text-basic">
                      {formatCurrency(row.refundAmount)}
                    </span>
                    <span className="caption-sm-regular text-accent-red-500">
                      {row.penaltyLabel}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap p-p6">
                  <Pill>{row.storeOpinion}</Pill>
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.requestedAt}
                </td>
                <td className="whitespace-nowrap p-p6">
                  {row.slaLabel ? (
                    <StatusBadge label={row.slaLabel} />
                  ) : (
                    <span className="heading-sm-regular text-text-tertiary">
                      -
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <Pill>{row.status}</Pill>
                </td>
                <td className="whitespace-nowrap p-p6">
                  {CAN_PROCESS.includes(row.status) ? (
                    <Button
                      variant="brand-soft"
                      size="admin"
                      className="border border-primary-400"
                      onClick={() => onProcess(row.requestId)}
                    >
                      처리 전
                    </Button>
                  ) : (
                    <span className="inline-flex h-11 items-center justify-center rounded-lg bg-gray-100 px-g6 caption-sm-semibold text-text-tertiary">
                      처리 완료
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
