import Header from '@/components/Header';
import React from 'react';
import SignUpClient from './_components/SignUpClient';

const page = () => {
  return (
    <>
      <Header text="회원가입" />
      <SignUpClient />
    </>
  );
};

export default page;
