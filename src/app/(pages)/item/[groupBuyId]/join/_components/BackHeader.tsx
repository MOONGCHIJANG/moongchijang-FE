import React from 'react';

type BackHeaderProps = {
  text?: string;
};

const BackHeader = ({ text }: BackHeaderProps) => {
  return <div>{text}</div>;
};

export default BackHeader;
