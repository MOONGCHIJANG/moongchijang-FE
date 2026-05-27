'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { SellerSettlementInfoUpsertRequestBankCode } from '@/api/generated/api.schemas';
import { usePatchApiV1UsersMeSellerSettlementInfo } from '@/api/hooks/auth/auth';

const stepSettlementSchema = z.object({
  bankCode: z.string().min(1, { message: '은행을 선택해주세요.' }),
  accountNumber: z.string().min(1, { message: '계좌번호를 입력해주세요.' }),
  accountHolderName: z
    .string()
    .min(1, { message: '예금주명을 입력해주세요.' })
    .max(50, { message: '예금주명은 50자 이하로 입력해주세요.' }),
});

export type StepSettlementFormValues = z.infer<typeof stepSettlementSchema>;

export const useStepSettlement = () => {
  const router = useRouter();
  const [isBankSheetOpen, setIsBankSheetOpen] = useState(false);

  const form = useForm<StepSettlementFormValues>({
    resolver: zodResolver(stepSettlementSchema),
    mode: 'onBlur',
    defaultValues: {
      bankCode: '',
      accountNumber: '',
      accountHolderName: '',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedBankCode = watch('bankCode') as
    | (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode]
    | '';

  const { mutate: saveSettlement, isPending: isSaving } =
    usePatchApiV1UsersMeSellerSettlementInfo();

  // 은행 선택
  const handleSelectBank = (
    code: (typeof SellerSettlementInfoUpsertRequestBankCode)[keyof typeof SellerSettlementInfoUpsertRequestBankCode],
  ) => {
    setValue('bankCode', code, { shouldValidate: true });
    setIsBankSheetOpen(false);
  };

  // 제출
  const onSubmit = (values: StepSettlementFormValues) => {
    saveSettlement(
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
          if (result.status !== 200) return;
          router.replace('/feed');
        },
        onError: () => {
          // TODO: 에러 토스트
        },
      },
    );
  };

  const bankCode = watch('bankCode');
  const accountNumber = watch('accountNumber');
  const accountHolderName = watch('accountHolderName');

  const canProceed =
    !!bankCode &&
    !!accountNumber &&
    !!accountHolderName &&
    !errors.bankCode &&
    !errors.accountNumber &&
    !errors.accountHolderName;

  return {
    form,
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
  };
};
