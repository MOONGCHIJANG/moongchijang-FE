import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import InputArea from './_components/InputArea';

const page = () => {
  return (
    <>
      <Header text="로그인" />
      <div className="flex-1 flex flex-col pt-10 items-center gap-9 w-full px-4">
        <Image
          src="/images/mcj-logo-1.png"
          alt="뭉치장 로고"
          width={183}
          height={76}
          className="w-40 h-16.5"
        />
        <InputArea />
      </div>
    </>
  );
};

export default page;
