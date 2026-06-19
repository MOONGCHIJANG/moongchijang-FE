'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SellerSettlementInfoUpsertRequestBankCode } from '@/api/generated/api.schemas';
import {
  useGetApiV1UsersMeSellerSettlementAccount,
  usePatchApiV1UsersMeSellerSettlementInfo,
} from '@/api/hooks/auth/auth';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';
import Modal from '@/components/Modal';
import { BANK_OPTIONS } from '@/app/(pages)/signup/seller/_components/StepSettlement/StepSettlement';

const schema = z.object({
  bankCode: z.string().min(1, { message: '은행을 선택해주세요.' }),
  accountNumber: z.string().min(1, { message: '계좌번호를 입력해주세요.' }),
  accountHolderName: z
    .string()
    .min(1, { message: '예금주명을 입력해주세요.' })
    .max(50, { message: '예금주명은 50자 이하로 입력해주세요.' }),
});

type FormValues = z.infer<typeof schema>;

export default function SettlementInfoPage() {
  const router = useRouter();
  const [isBankSheetOpen, setIsBankSheetOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: accountData } = useGetApiV1UsersMeSellerSettlementAccount();
  const account = accountData?.status === 200 ? accountData.data?.data : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { bankCode: '', accountNumber: '', accountHolderName: '' },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!account) return;
    reset({
      bankCode: account.bankCode ?? '',
      accountNumber: account.accountNumber ?? '',
      accountHolderName: account.accountHolderName ?? '',
    });
  }, [account, reset]);

  const selectedBankCode = watch('bankCode') as
    | (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode]
    | '';
  const accountNumber = watch('accountNumber');
  const accountHolderName = watch('accountHolderName');

  const selectedBankLabel =
    BANK_OPTIONS.find((b) => b.code === selectedBankCode)?.label ?? '';

  const { mutate: save, isPending: isSaving } =
    usePatchApiV1UsersMeSellerSettlementInfo();

  const handleSelectBank = (
    code: (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode],
  ) => {
    setValue('bankCode', code, { shouldValidate: true });
    setIsBankSheetOpen(false);
  };

  const canSave =
    !!selectedBankCode &&
    !!accountNumber &&
    !!accountHolderName &&
    !errors.bankCode &&
    !errors.accountNumber &&
    !errors.accountHolderName;

  const onSubmit = (values: FormValues) => {
    save(
      {
        data: {
          bankCode:
            values.bankCode as (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode],
          accountNumber: values.accountNumber,
          accountHolderName: values.accountHolderName,
        },
      },
      {
        onSuccess: (result) => {
          if (result.status === 200) setShowSuccessModal(true);
        },
      },
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-bg-white">
      <Header text="정산 정보 변경" showBackButton />

      <div className="flex flex-col gap-g5 px-g5 pt-p6 pb-[100px]">
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
            <p className="caption-sm-medium text-text-brand">
              {errors.bankCode.message}
            </p>
          )}
        </div>

        <Input
          label="계좌번호"
          placeholder="계좌번호를 입력해주세요"
          helperText={errors.accountNumber?.message ?? ''}
          helperTextClassName={
            errors.accountNumber
              ? 'text-text-brand'
              : 'text-text-subtle-inverse'
          }
          {...register('accountNumber')}
          noHelperSpace
        />

        <Input
          label="예금주명"
          placeholder="홍길동"
          helperText={errors.accountHolderName?.message ?? ''}
          helperTextClassName={
            errors.accountHolderName
              ? 'text-text-brand'
              : 'text-text-subtle-inverse'
          }
          {...register('accountHolderName')}
          noHelperSpace
        />
      </div>

      <div className="fixed bottom-[58px] left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-g5 pb-g5 pt-2 bg-bg-white">
        <Button
          fullWidth
          size="lg"
          disabled={!canSave || isSaving}
          onClick={handleSubmit(onSubmit)}
        >
          변경 완료
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

      <Modal
        isOpen={showSuccessModal}
        iconType="success"
        title="변경 완료"
        description="정산 정보가 변경되었어요."
        confirmLabel="확인"
        onConfirm={() => {
          setShowSuccessModal(false);
          router.back();
        }}
      />
    </div>
  );
}
