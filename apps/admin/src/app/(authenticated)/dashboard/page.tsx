import { MetricCard } from './_components/MetricCard';
import { AlertBanner } from '@/components/AlertBanner';
import { UrgentRefundsTable } from './_components/UrgentRefundsTable';
import { PendingOrdersTable } from './_components/PendingOrdersTable';

const METRICS = [
  {
    label: '검토 대기 환불',
    value: '12건',
    description: '총 환불 금액: ₩1,240,000',
    icon: 'figma:refund-refresh',
    trend: { text: '전일 대비 -15% ', tone: 'negative' as const },
  },
  {
    label: '개설 승인 대기',
    value: '5건',
    description: '평균 검토 시간: 2.3시간',
    icon: 'figma:hourglass',
    trend: { text: '전일 대비 +8%', tone: 'positive' as const },
  },
  {
    label: '발주 미확정',
    value: '12건',
    description: '48시간 초과: 1건',
    icon: 'mynaui:truck',
  },
  {
    label: '오늘 처리 완료',
    value: '28건',
    description: '환불 18건 · 승인 10건',
    icon: 'figma:check-circle',
    trend: { text: '전일 대비 +12%', tone: 'positive' as const },
  },
];

const URGENT_REFUND_ROWS = [
  {
    requestId: 'REF-2401',
    caseLabel: 'B-달성후',
    customerName: '김**',
    itemName: '베이글 10개 세트',
    amount: '₩27,000',
    requestedAt: '2026-05-13 14:30',
    sla: '2시간 초과',
  },
  {
    requestId: 'REF-2398',
    caseLabel: 'G-분쟁',
    customerName: '이**',
    itemName: '마카롱 박스',
    amount: '₩35,000',
    requestedAt: '2026-05-13 16:45',
    sla: '23시간 남음',
  },
  {
    requestId: 'REF-2395',
    caseLabel: 'D-미수령',
    customerName: '박**',
    itemName: '크루아상 세트',
    amount: '₩18,000',
    requestedAt: '2026-05-13 09:15',
    sla: '6시간 초과',
  },
];

const PENDING_ORDER_ROWS = [
  {
    orderId: 'ORD-1523',
    itemName: '식빵 세트',
    storeName: '행복한빵집',
    achievedAt: '2026-05-12',
    elapsedLabel: '48시간 경과',
    elapsedHours: 48,
    slaHours: 48,
  },
  {
    orderId: 'ORD-1519',
    itemName: '도넛 박스',
    storeName: '달콤한아침',
    achievedAt: '2026-05-13',
    elapsedLabel: '미확정 24시간',
    elapsedHours: 24,
    slaHours: 48,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-g6">
      <div className="flex flex-col gap-g4">
        <h1 className="title-md-bold text-text-basic">대시보드</h1>
        <div className="flex flex-row gap-g7">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
      <AlertBanner
        title="긴급 처리 필요"
        description="SLA 초과 환불 요청 3건, 발주 미확정 48시간 초과 1건"
      />
      <div className="flex flex-col gap-g4">
        <UrgentRefundsTable
          title="긴급 처리 필요 환불 요청"
          description="SLA 초과 또는 임박한 케이스"
          rows={URGENT_REFUND_ROWS}
        />
        <PendingOrdersTable
          title="발주 미확정 모니터링"
          description="달성 후 48시간 경과 시 어드민 개입 필요"
          rows={PENDING_ORDER_ROWS}
        />
      </div>
    </div>
  );
}
