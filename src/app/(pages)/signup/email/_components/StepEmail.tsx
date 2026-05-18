import React from 'react';

type StepEmailProps = {
  onNext: () => void;
};

const StepEmail = ({ onNext }: StepEmailProps) => {
  return (
    <div>
      <h2>이메일 입력</h2>
      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default StepEmail;
