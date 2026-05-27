import { Button } from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';

type StepBusinessProps = {
  onNext: () => void;
};

const StepBusiness = ({ onNext }: StepBusinessProps) => {
  return (
    <>
      <div className="flex flex-col gap-g4 pb-g8">
        <p className="heading-lg-bold">사업자 정보를 입력해주세요</p>
        <div className="flex flex-col gap-g5">
          <Input
            label="사업자 등록 번호"
            rightButton={{ label: '조회', onClick: () => {} }}
            helperText="ⓘ 사업자등록번호가 조회되지 않아 다시 입력해주세요."
          />
          <Input label="가게명" placeholder="예) 뭉치장베이커리" />
          <Input label="대표자명" placeholder="홍길동" />
          <Input
            label="가게 주소"
            placeholder="예) 서울시 강남구 테헤란로 123, 2층"
          />
          {/* 숫자만 입력하면 자동으로 - 추가 */}
          <Input label="전화번호" placeholder="010-0000-0000" />
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button fullWidth size="lg" onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default StepBusiness;
