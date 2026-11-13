import { Button } from '@moongchijang/ui';
import type { ComponentProps } from 'react';

type Props = {
  price: number;
  disabled?: boolean;
  onClick?: () => void;
  /** 기본 primary. 혼자 사기 결제는 black */
  variant?: ComponentProps<typeof Button>['variant'];
  className?: string;
};

const PaymentButton = ({
  price,
  disabled,
  onClick,
  variant,
  className,
}: Props) => {
  return (
    <div className="pwa-pb fixed z-20 bottom-0 left-0 right-0 w-full mx-auto max-w-110">
      <div className="p-4">
        <Button
          size="lg"
          fullWidth
          variant={variant}
          disabled={disabled}
          onClick={onClick}
          className={className}
        >
          {price.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
