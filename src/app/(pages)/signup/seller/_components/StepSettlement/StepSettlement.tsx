import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { BottomSheet } from '@/components/BottomSheet';
import { useStepSettlement } from './useStepSettlement';
import Image from 'next/image';

export const BANK_OPTIONS: { code: string; label: string }[] = [
  { code: 'NONGHYEOP', label: 'NH농협' },
  { code: 'KAKAOBANK', label: '카카오뱅크' },
  { code: 'KOOKMIN', label: 'KB국민' },
  { code: 'TOSSBANK', label: '토스뱅크' },
  { code: 'SHINHAN', label: '신한' },
  { code: 'WOORI', label: '우리' },
  { code: 'IBK', label: 'IBK기업' },
  { code: 'HANA', label: '하나' },
  { code: 'SAEMAUL', label: '새마을' },
  { code: 'BUSANBANK', label: '부산' },
  { code: 'DAEGUBANK', label: 'IM뱅크' },
  { code: 'KBANK', label: '케이뱅크' },
  { code: 'SHINHYEOP', label: '신협' },
  { code: 'POST', label: '우체국' },
  { code: 'SC', label: 'SC제일' },
  { code: 'KYONGNAMBANK', label: '경남' },
  { code: 'GWANGJUBANK', label: '광주' },
  { code: 'SUHYEOP', label: '수협' },
  { code: 'JEONBUKBANK', label: '전북' },
  { code: 'SAVINGBANK', label: '저축은행' },
  { code: 'JEJUBANK', label: '제주' },
];

const StepSettlement = () => {
  const {
    register,
    errors,
    selectedBankCode,
    isBankSheetOpen,
    setIsBankSheetOpen,
    handleSelectBank,
    canProceed,
    isSaving,
    handleSubmit,
    onSubmit,
  } = useStepSettlement();

  const selectedBankLabel =
    BANK_OPTIONS.find((b) => b.code === selectedBankCode)?.label ?? '';

  return (
    <>
      <div className="flex flex-col gap-g4 pb-g8">
        <p className="heading-lg-bold">정산 정보를 입력해주세요</p>
        <div className="flex flex-col gap-g5">
          {/* 은행 선택 */}
          <div className="flex flex-col gap-g2 w-full">
            <p className="caption-sm-medium text-text-tertiary">은행</p>
            <button
              type="button"
              onClick={() => setIsBankSheetOpen(true)}
              className={`w-full px-g4 py-g5 border-border-subtle border rounded-2xlarge body-md-regular text-left ${selectedBankCode ? 'text-text-basic' : 'text-text-subtle-inverse'}`}
            >
              {selectedBankLabel || '은행을 선택해주세요'}
            </button>
            {errors.bankCode && (
              <p className="caption-sm-medium text-brand">
                {errors.bankCode.message}
              </p>
            )}
          </div>

          {/* 계좌번호 */}
          <Input
            label="계좌번호"
            placeholder="계좌번호를 입력해주세요"
            helperText={errors.accountNumber?.message ?? ''}
            helperTextClassName={errors.accountNumber ? 'text-brand' : ''}
            {...register('accountNumber')}
            noHelperSpace
          />

          {/* 예금주명 */}
          <Input
            label="예금주명"
            placeholder="홍길동"
            helperText={errors.accountHolderName?.message ?? ''}
            helperTextClassName={errors.accountHolderName ? 'text-brand' : ''}
            {...register('accountHolderName')}
            noHelperSpace
          />
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit(onSubmit)}
          disabled={!canProceed || isSaving}
        >
          완료
        </Button>
      </div>

      {/* 은행 선택 바텀시트 */}
      <BottomSheet
        isOpen={isBankSheetOpen}
        onClose={() => setIsBankSheetOpen(false)}
      >
        <div className="px-p10 pb-p8 flex flex-col overflow-y-scroll h-130 scrollbar-hide">
          <div className="heading-lg-bold py-2.5">은행을 선택해주세요</div>
          <div className="grid grid-cols-3 gap-x-2.25 gap-y-1.75">
            {BANK_OPTIONS.map((bank) => (
              <button
                key={bank.code}
                type="button"
                onClick={() =>
                  handleSelectBank(
                    bank.code as Parameters<typeof handleSelectBank>[0],
                  )
                }
                className="flex flex-col gap-2 border border-border-subtle rounded-xlarge py-3.5 justify-center items-center"
              >
                <Image
                  src={`/icons/banks/${bank.code}.svg`}
                  alt={bank.label}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <p className="body-md-regular">{bank.label}</p>
              </button>
            ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default StepSettlement;
