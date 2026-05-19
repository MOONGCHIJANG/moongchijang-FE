import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';
import React from 'react';

type StepEmailProps = {
  onNext: () => void;
};

const StepEmail = ({ onNext }: StepEmailProps) => {
  return (
    <>
      <div className="flex justify-between items-start pb-g8">
        <Image
          src="/images/mcj-logo-1.png"
          alt="Logo"
          width={118}
          height={49}
        />
        <Image
          src="/icons/progress-1.png"
          alt="progress"
          width={131}
          height={28.8}
        />
      </div>
      <div className="flex flex-col gap-g4 pb-18">
        <Input
          label="이메일 주소"
          placeholder="이메일 주소를 입력해주세요."
          helperText="이미 가입된 이메일이에요" // 이메일 정합성 체크
          rightButton={{
            label: '중복확인',
          }}
        />
        <Input
          label="인증 코드"
          placeholder="메일로 전송된 코드를 입력해주세요."
          helperText="코드가 일치하지 않아요"
          rightButton={{
            label: '코드확인',
          }}
        />
        <Input
          label="비밀번호"
          isPassword
          helperText="영문, 숫자, 특수문자가 모두 들어간 8자 이상"
        />
        <Input
          label="비밀번호 확인"
          isPassword
          helperText="비밀번호가 일치하지 않아요"
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

export default StepEmail;
