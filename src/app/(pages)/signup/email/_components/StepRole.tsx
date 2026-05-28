'use client';

import { Button } from '@/components/Button';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StepRole = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<'guest' | 'seller'>();

  const handleComplete = () => {
    if (selected === 'guest') {
      router.push('/feed');
    } else if (selected === 'seller') {
      router.push('/signup/seller');
    }
  };

  return (
    <>
      <div className="flex justify-between items-start pb-g12">
        <p className="heading-lg-bold whitespace-pre-line">
          {`손님이신가요?
              사장님이신가요?`}
        </p>
        <Image
          src="/icons/progress-3.png"
          alt="progress"
          width={512}
          height={113}
          className="w-32.75 h-7.2"
        />
      </div>
      <div className="flex flex-col gap-6.5 pb-18">
        <button
          onClick={() => setSelected('guest')}
          className={`px-3.75 flex rounded-[17.6px] h-26.75 border items-center transition-colors ${
            selected === 'guest'
              ? 'border-border-brand bg-surface-brand-lighter'
              : 'border-border-subtle'
          }`}
        >
          <Image
            src="/images/customer.svg"
            alt="customer"
            width={61}
            height={52}
          />
          <div className="flex flex-col gap-g2 px-p5 flex-1 items-start">
            <p className="heading-lg-bold">손님이에요</p>
            <p className="heading-sm-regular text-text-tertiary">
              공구 참여하고 개설 요청하기
            </p>
          </div>
          <Icon
            icon="lucide:chevron-right"
            width={24}
            height={24}
            className="text-icon-basic"
          />
        </button>
        <button
          onClick={() => setSelected('seller')}
          className={`px-3.75 flex rounded-[17.6px] h-26.75 border border-border-subtle items-center ${
            selected === 'seller'
              ? 'border-border-brand bg-surface-brand-lighter'
              : 'border-border-subtle'
          }`}
        >
          <Image src="/images/owner.svg" alt="owner" width={61} height={52} />
          <div className="flex flex-col gap-g2 px-p5 flex-1 items-start">
            <p className="heading-lg-bold">사장님이에요</p>
            <p className="heading-sm-regular text-text-tertiary">
              공구 관리하기
            </p>
          </div>
          <Icon
            icon="lucide:chevron-right"
            width={24}
            height={24}
            className="text-icon-basic"
          />
        </button>
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button
          onClick={handleComplete}
          fullWidth
          size="lg"
          disabled={selected === null}
        >
          가입 완료
        </Button>
      </div>
    </>
  );
};

export default StepRole;
