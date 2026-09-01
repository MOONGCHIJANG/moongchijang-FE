import { StatusBadge } from '@/components/StatusBadge';

interface PendingOrderRow {
  orderId: string;
  itemName: string;
  storeName: string;
  achievedAt: string;
  elapsedLabel: string;
  elapsedHours: number;
  slaHours: number;
}

interface PendingOrdersTableProps {
  title: string;
  description: string;
  rows: PendingOrderRow[];
}

const HEADERS = [
  '주문 ID',
  '공구명',
  '매장명',
  '달성 일시',
  '경과 시간',
  '진행률',
];

function OrderProgress({
  elapsedHours,
  slaHours,
}: {
  elapsedHours: number;
  slaHours: number;
}) {
  const percent = Math.min((elapsedHours / slaHours) * 100, 100);
  const isOverdue = elapsedHours >= slaHours;

  return (
    <div className="flex items-center gap-g3">
      <div className="h-1.5 w-[114px] overflow-hidden rounded-full bg-primary-50">
        <div
          className="h-full rounded-full bg-primary-400"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="body-md-semibold text-primary-400">
        {elapsedHours}h{isOverdue ? '+' : ''}
      </span>
    </div>
  );
}

export function PendingOrdersTable({
  title,
  description,
  rows,
}: PendingOrdersTableProps) {
  return (
    <section className="flex flex-col gap-g6 rounded-large bg-bg-white p-p7 shadow-[1px_2px_10px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-g2">
        <h2 className="heading-lg-semibold text-black/[87%]">{title}</h2>
        <p className="heading-sm-medium text-black/60">{description}</p>
      </div>
      <div className="overflow-x-auto">
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
            {rows.map((row) => (
              <tr key={row.orderId} className="border-b border-border-default">
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.orderId}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.itemName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.storeName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.achievedAt}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <StatusBadge label={row.elapsedLabel} />
                </td>
                <td className="whitespace-nowrap p-p6">
                  <OrderProgress
                    elapsedHours={row.elapsedHours}
                    slaHours={row.slaHours}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
