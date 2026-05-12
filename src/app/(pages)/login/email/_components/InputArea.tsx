'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { loginSchema } from '@/lib/validation';
import Link from 'next/link';
import React, { useState } from 'react';

const InputArea = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = loginSchema.safeParse({ email, password }).success;

  return (
    <>
      <div className="flex flex-col gap-g4 w-full">
        <Input
          label="이메일 주소"
          placeholder="이메일 주소를 입력해주세요."
          value={email}
          onChange={setEmail}
        />
        <Input
          label="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요."
          helperText="영문, 숫자, 특수문자가 모두 들어간 8자 이상"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="flex flex-col gap-g5 w-full">
        <Button
          variant="primary"
          size="lg"
          disabled={!isValid}
          className={`w-full ${!isValid ? 'bg-button-disabled-fill' : ''}`}
        >
          로그인
        </Button>
        <div className="w-full flex items-center justify-center text-text-tertiary body-md-regular">
          <Link href="/login/email/find" className="text-text-tertiary">
            아이디/비밀번호 찾기
          </Link>
          <span className="mx-g5 text-border-subtle">|</span>
          <button>회원가입</button>
        </div>
      </div>
    </>
  );
};

export default InputArea;
