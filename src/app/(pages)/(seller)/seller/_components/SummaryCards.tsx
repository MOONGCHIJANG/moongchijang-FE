import type { ApiResponseOwnerGroupBuySummaryData } from '@/api/generated/api.schemas';

type Props = { summary: ApiResponseOwnerGroupBuySummaryData };

const CARDS = [
  {
    key: 'ongoingCount' as const,
    label: '진행 중 공구',
    format: (v: number) => `${v}건`,
  },
  {
    key: 'achievedCount' as const,
    label: '달성 완료',
    format: (v: number) => `${v}건`,
  },
  {
    key: 'todayPickupUserCount' as const,
    label: '오늘 픽업',
    format: (v: number) => `${v}명`,
  },
  {
    key: 'settlementExpectedAmount' as const,
    label: '정산 예정',
    format: (v: number) => `${v.toLocaleString('ko-KR')}원`,
  },
] as const;

export function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CARDS.map(({ key, label, format }) => (
        <div
          key={key}
          className="flex flex-col gap-1 rounded-2xl bg-white px-4 py-4 shadow-sm"
        >
          <p className="body-sm-medium text-text-secondary">{label}</p>
          <p className="heading-sm-bold text-text-basic">
            {format(summary[key])}
          </p>
        </div>
      ))}
    </div>
  );
}
