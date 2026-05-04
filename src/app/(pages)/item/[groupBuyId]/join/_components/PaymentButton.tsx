import { Button } from '@/components/Button';
import React from 'react';

type Props = {
  price: number;
};

const PaymentButton = ({ price }: Props) => {
  return (
    <div className="fixed z-20 bottom-0 left-0 right-0 w-full mx-auto max-w-110">
      <div className="p-4">
        <Button size="lg" className="" fullWidth>
          {price.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
