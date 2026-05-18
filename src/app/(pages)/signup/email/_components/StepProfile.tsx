import React from 'react';

type StepProfileProps = {
  onNext: () => void;
  onBack: () => void;
};

const StepProfile = ({ onNext, onBack }: StepProfileProps) => {
  return (
    <div>
      <h2>프로필 입력</h2>
      <button onClick={onBack}>이전</button>
      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default StepProfile;
