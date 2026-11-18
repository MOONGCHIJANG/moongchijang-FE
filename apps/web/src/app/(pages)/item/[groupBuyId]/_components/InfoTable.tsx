import type { ReactNode } from 'react';

export interface InfoRow {
  label: string;
  value: ReactNode;
}

interface Props {
  rows: InfoRow[];
}

const InfoTable = ({ rows }: Props) => {
  return (
    <div className="p-p3 divide-y divide-dashed caption-sm-medium divide-border-subtle rounded-xlarge border-border-subtle border">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex justify-between p-p3">
          <p className="text-text-disabled">{label}</p>
          <p className="text-text-basic">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoTable;
