import { Button } from '@moongchijang/ui';
import type { ApiResponseAdminRefundPageDataContentItem } from '@moongchijang/api-client/generated/api.schemas';
import { Chip } from './Chip';

interface RefundsTableProps {
  rows: ApiResponseAdminRefundPageDataContentItem[];
  isLoading: boolean;
  onSelectRow: (participationId: number) => void;
}

const HEADERS = [
  '참여 ID',
  '소비자',
  '공구명',
  '매장명',
  '결제 금액',
  '환불 사유',
  '요청 일시',
  '상태',
  '작업',
];

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

export function RefundsTable({
  rows,
  isLoading,
  onSelectRow,
}: RefundsTableProps) {
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
          {isLoading ? (
            <tr>
              <td
                colSpan={HEADERS.length}
                className="p-p8 text-center heading-sm-regular text-text-tertiary"
              >
                불러오는 중...
              </td>
            </tr>
          ) : rows.length === 0 ? (
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
                key={row.participationId}
                onClick={() => onSelectRow(row.participationId)}
                className="cursor-pointer border-b border-border-default hover:bg-gray-25"
              >
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.participationId}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-semibold text-text-basic">
                  {row.userName}
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
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.refundReason ?? '-'}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.createdAt}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <Chip tone={row.refundStatus === 'COMPLETED' ? 'success' : 'outline'}>
                    {row.refundStatus === 'COMPLETED' ? '완료' : '대기중'}
                  </Chip>
                </td>
                <td className="whitespace-nowrap p-p6">
                  {row.refundStatus === 'WAITING' ? (
                    <Button
                      variant="brand-soft"
                      size="admin"
                      className="border border-primary-400"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectRow(row.participationId);
                      }}
                    >
                      처리하기
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
