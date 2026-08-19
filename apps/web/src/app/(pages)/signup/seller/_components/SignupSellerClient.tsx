'use client';

import { useState } from 'react';
import StepBusiness from './StepBusiness/StepBusiness';
import StepSettlement from './StepSettlement/StepSettlement';
import Header from '@/components/Header';

type Step = 1 | 2;

export default function SignupSellerClient() {
  const [step, setStep] = useState<Step>(1);

  return (
    <>
      {/* 뒤로가기 클릭 시 이탈하면 사장님 회원가입 취소된다는 워딩 표현 */}
      <Header text="회원가입" />
      <div className="p-4">
        {step === 1 && <StepBusiness onNext={() => setStep(2)} />}
        {step === 2 && <StepSettlement />}
      </div>
    </>
  );
}
