'use client';

import { useState, useEffect, useRef } from 'react';
import StepEmail from './StepEmail/StepEmail';
import StepProfile from './StepProfile/StepProfile';
import StepRole from './StepRole';
import { useSearchParams } from 'next/navigation';
import { logEvent } from '@/lib/analytics';

type Step = 1 | 2 | 3;

const STEP_NAMES: Record<Step, string> = {
  1: '이메일 입력',
  2: '프로필 설정',
  3: '역할 선택',
};

// TODO: 토큰 없는 사람들이 Step 2, 3으로 직접 접근하는 경우 막기 (현재는 URL에 ?step=profile 붙이면 접근 가능)
// 회원 추가정보 완료 안하고 이탈 시에 로그아웃 처리

export default function SignUpClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(
    searchParams.get('step') === 'profile' ? 2 : 1,
  );
  const stepRef = useRef(step);
  const completedRef = useRef(false);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    logEvent('sign_up_step', { step, step_name: STEP_NAMES[step] });
  }, [step]);

  useEffect(() => {
    return () => {
      if (!completedRef.current) {
        logEvent('sign_up_abandon', {
          step: stepRef.current,
          step_name: STEP_NAMES[stepRef.current],
        });
      }
    };
  }, []);

  const handleNextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  };

  const handleComplete = () => {
    completedRef.current = true;
  };

  return (
    <div className="p-4">
      {step === 1 && <StepEmail onNext={handleNextStep} />}
      {step === 2 && <StepProfile onNext={handleNextStep} />}
      {step === 3 && <StepRole onComplete={handleComplete} />}
    </div>
  );
}
