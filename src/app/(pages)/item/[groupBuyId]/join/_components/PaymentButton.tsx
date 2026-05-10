import { Button } from '@/components/Button';

type Props = {
  price: number;
  disabled?: boolean;
  onClick?: () => void;
};

const PaymentButton = ({ price, disabled, onClick }: Props) => {
  return (
    <div className="fixed z-20 bottom-0 left-0 right-0 w-full mx-auto max-w-110">
      <div className="p-4">
        <Button size="lg" fullWidth disabled={disabled} onClick={onClick}>
          {price.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
