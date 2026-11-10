import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Fragment } from 'react';

const STEPS = [
  {
    label: '픽업일 선택하기',
    icon: <Icon icon="uis:calender" className="size-5 text-primary-300" />,
  },
  {
    label: '친구 초대하기',
    icon: (
      <Image
        src="/icons/guide-speech-bubble.svg"
        alt=""
        width={20}
        height={18}
      />
    ),
  },
  {
    label: '수량 달성 시 결제',
    icon: (
      <Icon icon="andrsrxn:money-bag" className="size-5 text-primary-300" />
    ),
  },
];

export const GuestGuideCard = () => {
  return (
    <div className="flex flex-col gap-2 rounded-2xlarge border border-border-subtle bg-surface-secondary-lighter px-[19px] pb-[15px] pt-[9px]">
      <p className="text-center body-lg-semibold text-text-basic">
        혼자 15개는 많다면, 친구랑 나눠 사요
      </p>
      <div className="flex items-center justify-center gap-1">
        {STEPS.map((step, i) => (
          <Fragment key={step.label}>
            {i > 0 && (
              <Image
                src="/icons/guide-step-arrow.svg"
                alt=""
                width={14}
                height={14}
                className="shrink-0"
              />
            )}
            <div className="flex h-[57px] w-[89px] flex-col items-center justify-center gap-1 rounded-xlarge bg-surface-white">
              {step.icon}
              <span className="text-[10px] font-medium leading-[18px] text-text-basic">
                {step.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
