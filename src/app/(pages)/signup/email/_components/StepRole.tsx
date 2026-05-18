import React from 'react';

type StepRoleProps = {
  onBack: () => void;
};

const StepRole = ({ onBack }: StepRoleProps) => {
  return (
    <div>
      <h2>역할 선택</h2>
      <button onClick={onBack}>이전</button>
    </div>
  );
};

export default StepRole;
