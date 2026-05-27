import { Button } from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';

const StepSettlement = () => {
  return (
    <>
      <div className="flex flex-col gap-g4 pb-g8">
        <p className="heading-lg-bold">정산 정보를 입력해주세요</p>
        <div className="flex flex-col gap-g5">
          <Input label="은행" placeholder="은행을 선택해주세요" />
          <Input label="계좌번호" placeholder="계좌번호를 입력해주세요" />
          <Input label="예금주명" placeholder="홍길동" />
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button fullWidth size="lg">
          완료
        </Button>
      </div>
    </>
  );
};

export default StepSettlement;
