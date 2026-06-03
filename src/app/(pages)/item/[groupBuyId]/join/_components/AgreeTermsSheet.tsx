'use client';

import { useId } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { useTermsSheetStore } from '@/store/termsSheetStore';
import { TERM_ITEMS } from '../_data/terms';

const CheckboxIcon = ({ checked }: { checked: boolean }) => {
  const clipId = useId();
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${checked ? 'text-button-primary-fill' : ''}`}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M22.8 2.80005H9.19999C5.66537 2.80005 2.79999 5.66543 2.79999 9.20005V22.8C2.79999 26.3347 5.66537 29.2 9.19999 29.2H22.8C26.3346 29.2 29.2 26.3347 29.2 22.8V9.20005C29.2 5.66543 26.3346 2.80005 22.8 2.80005Z"
          fill={checked ? 'currentColor' : '#C4C4C8'}
        />
        <path
          d="M14.4824 21.3487C14.1136 21.3487 13.7456 21.2087 13.464 20.9271L8.6816 16.1447C8.1192 15.5823 8.1192 14.6703 8.6816 14.1079C9.244 13.5463 10.156 13.5463 10.7184 14.1079L14.4824 17.8727L21.2816 11.0735C21.8448 10.5119 22.7568 10.5119 23.3184 11.0735C23.8808 11.6359 23.8808 12.5479 23.3184 13.1103L15.5008 20.9271C15.2192 21.2079 14.8512 21.3487 14.4824 21.3487Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  groupBuyId: string;
};

const AgreeTermsSheet = ({ isOpen, onClose, onConfirm, groupBuyId }: Props) => {
  const router = useRouter();
  const { checked, toggle } = useTermsSheetStore();

  const allChecked = TERM_ITEMS.every(({ key }) => checked[key]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col pb-5">
        <div className="flex flex-col gap-2 px-8 py-4">
          <Image src="/images/chef.svg" alt="" width={40} height={40} />
          <p className="heading-lg-bold text-text-basic">
            유의사항을 확인해주세요
          </p>
        </div>

        <div className="flex flex-col gap-3 px-8 pb-8">
          {TERM_ITEMS.map(({ key, label, routeKey }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <button
                className="flex items-start gap-2 flex-1 text-left"
                onClick={() => toggle(key)}
              >
                <CheckboxIcon checked={checked[key]} />
                <div className="flex gap-g1 items-start">
                  <span className="body-sm-bold text-text-error">*</span>
                  <span className="body-lg-regular text-text-subtle">
                    {label}
                  </span>
                </div>
              </button>
              {routeKey && (
                <button
                  className="w-4 h-4 shrink-0"
                  onClick={() =>
                    router.push(`/item/${groupBuyId}/join/terms/${routeKey}`)
                  }
                  aria-label={`${label} 상세 보기`}
                >
                  <Icon
                    icon="lucide:chevron-right"
                    className="w-4 h-4 text-icon-subtle"
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="px-8 pt-2">
          <Button
            variant="black"
            size="md"
            fullWidth
            disabled={!allChecked}
            onClick={onConfirm}
          >
            확인했어요
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AgreeTermsSheet;
