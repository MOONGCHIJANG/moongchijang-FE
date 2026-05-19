'use client';

import { useState } from 'react';
import StepEmail from './StepEmail';
import StepProfile from './StepProfile';
import StepRole from './StepRole';

type Step = 1 | 2 | 3;

export default function SignUpClient() {
  const [step, setStep] = useState<Step>(1);

  const handleNextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  };

  return (
    <div className="p-4">
      {step === 1 && <StepEmail onNext={handleNextStep} />}
      {step === 2 && (
        <StepProfile onNext={handleNextStep} onBack={handlePrevStep} />
      )}
      {step === 3 && <StepRole onBack={handlePrevStep} />}
    </div>
  );
}
