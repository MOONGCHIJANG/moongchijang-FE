import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';
import React from 'react';

type StepProfileProps = {
  onNext: () => void;
  onBack: () => void;
};

const StepProfile = ({ onNext, onBack }: StepProfileProps) => {
  return (
    <>
      <div className="flex justify-between items-start pb-g8">
        <p className="heading-lg-bold whitespace-pre-line">
          {`반가워요! 🥐
          닉네임을 알려주세요 `}
        </p>
        <Image
          src="/icons/progress-2.png"
          alt="progress"
          width={512}
          height={113}
          className="w-32.75 h-7.2"
        />
      </div>
      <div className="flex flex-col gap-g4 pb-18">
        <Input
          label="닉네임"
          placeholder="닉네임을 알려주세요."
          helperText="2~10자, 한글/영문/숫자"
        />
        <Input
          label="전화번호"
          placeholder="01012345678"
          helperText="숫자만 입력해주세요"
          rightButton={{
            label: '인증하기',
          }}
        />
        <Input
          label="인증 코드"
          placeholder="번호로 전송된 코드를 입력해주세요"
          rightButton={{
            label: '코드확인',
          }}
        />
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button onClick={onNext} className="" fullWidth size="lg">
          다음
        </Button>
      </div>
    </>
  );
};

export default StepProfile;
