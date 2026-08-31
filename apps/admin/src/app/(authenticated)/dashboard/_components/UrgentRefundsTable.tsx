import { StatusBadge } from './StatusBadge';

interface UrgentRefundRow {
  requestId: string;
  caseLabel: string;
  customerName: string;
  itemName: string;
  amount: string;
  requestedAt: string;
  sla: string;
}

interface UrgentRefundsTableProps {
  title: string;
  description: string;
  rows: UrgentRefundRow[];
}

function CaseTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center gap-g1 rounded-full bg-primary-50 px-g4 py-g2 body-md-bold text-primary-400">
      {label}
    </span>
  );
}

const HEADERS = [
  '요청 ID',
  '케이스',
  '소비자',
  '공구명',
  '환불 금액',
  '요청 일시',
  'SLA',
];

export function UrgentRefundsTable({
  title,
  description,
  rows,
}: UrgentRefundsTableProps) {
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
              <tr
                key={row.requestId}
                className="border-b border-border-default"
              >
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.requestId}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <CaseTag label={row.caseLabel} />
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.customerName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.itemName}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-semibold text-text-subtle">
                  {row.amount}
                </td>
                <td className="whitespace-nowrap p-p6 heading-sm-regular text-text-subtle">
                  {row.requestedAt}
                </td>
                <td className="whitespace-nowrap p-p6">
                  <StatusBadge label={row.sla} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
