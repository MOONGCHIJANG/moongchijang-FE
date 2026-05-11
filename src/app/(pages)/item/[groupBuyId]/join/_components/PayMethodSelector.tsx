'use client';

export type PayMethod = 'EASY_PAY' | 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER';

const PAY_METHODS: { value: PayMethod; label: string; disabled?: boolean }[] = [
  { value: 'CARD', label: '신용카드' },
  { value: 'TRANSFER', label: '계좌이체' },
];

type Props = {
  value: PayMethod | null;
  onChange: (value: PayMethod) => void;
};

const PayMethodSelector = ({ value, onChange }: Props) => {
  return (
    <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex flex-col gap-g4 mt-3">
      <p className="heading-md-bold">결제 수단</p>
      <div className="grid grid-cols-2 gap-g3">
        {PAY_METHODS.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => onChange(method.value)}
            disabled={method.disabled}
            className={`py-p4 rounded-xlarge border body-md-semibold transition-colors
              ${
                value === method.value
                  ? 'border-border-brand bg-surface-brand-lighter text-text-brand'
                  : 'border-border-subtle bg-surface-white text-text-basic'
              }`}
          >
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PayMethodSelector;
