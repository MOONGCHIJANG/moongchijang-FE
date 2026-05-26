import Header from '@/components/Header';
import React, { Suspense } from 'react';
import SignUpClient from './_components/SignUpClient';

const page = () => {
  return (
    <>
      <Header text="회원가입" />
      <Suspense fallback={<div></div>}>
        <SignUpClient />
      </Suspense>
    </>
  );
};

export default page;
