'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ApiResponseBusinessRegistrationLookupDataStatus } from '@/api/generated/api.schemas';
import { usePostApiV1UsersMeSellerBusinessRegistrationLookup } from '@/api/hooks/auth/auth';
import { formatPhoneNumber } from '@/schemas/auth';

export const SELLER_BUSINESS_INFO_KEY = 'sellerBusinessInfo';

const stepBusinessSchema = z.object({
  businessRegistrationNumber: z.string().regex(/^\d{3}-?\d{2}-?\d{5}$/, {
    message: '올바른 사업자등록번호를 입력해주세요.',
  }),
  storeName: z.string().min(1),
  ownerName: z.string().min(1),
  storeAddress: z.string().min(1),
  phoneNumber: z
    .string()
    .regex(/^010\d{8}$/, { message: '올바른 전화번호를 입력해주세요.' }),
});

export type StepBusinessFormValues = z.infer<typeof stepBusinessSchema>;

type LookupStatus =
  | 'idle'
  | 'loading'
  | 'valid'
  | 'closed'
  | 'not_found'
  | 'error';

type LookupState = {
  status: LookupStatus;
  helperText: string;
  helperClassName: string;
};

const initialLookupState: LookupState = {
  status: 'idle',
  helperText: '',
  helperClassName: '',
};

export const useStepBusiness = (onNext: () => void) => {
  const form = useForm<StepBusinessFormValues>({
    resolver: zodResolver(stepBusinessSchema),
    mode: 'onBlur',
    defaultValues: {
      businessRegistrationNumber: '',
      storeName: '',
      ownerName: '',
      storeAddress: '',
      phoneNumber: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const bizNumber = useWatch({
    control,
    name: 'businessRegistrationNumber',
    defaultValue: '',
  });
  const phoneValue = useWatch({
    control,
    name: 'phoneNumber',
    defaultValue: '',
  });
  const storeName = useWatch({ control, name: 'storeName', defaultValue: '' });
  const ownerName = useWatch({ control, name: 'ownerName', defaultValue: '' });
  const storeAddress = useWatch({
    control,
    name: 'storeAddress',
    defaultValue: '',
  });

  const [lookupState, setLookupState] =
    useState<LookupState>(initialLookupState);
  const isLookedUp = lookupState.status === 'valid';

  // 사업자 번호 변경 시 조회 상태 초기화
  const prevBizNumberRef = useRef(bizNumber);
  useEffect(() => {
    if (prevBizNumberRef.current !== bizNumber) {
      prevBizNumberRef.current = bizNumber;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLookupState(initialLookupState);
      setValue('storeName', '');
      setValue('ownerName', '');
      setValue('storeAddress', '');
    }
  }, [bizNumber, setValue]);

  const { mutate: lookup, isPending: isLooking } =
    usePostApiV1UsersMeSellerBusinessRegistrationLookup();

  // 사업자 번호 조회 핸들러
  const handleLookup = () => {
    if (!bizNumber) return;

    setLookupState({ status: 'loading', helperText: '', helperClassName: '' });

    lookup(
      { data: { businessRegistrationNumber: bizNumber } },
      {
        onSuccess: (result) => {
          if (result.status !== 200) {
            setLookupState({
              status: 'error',
              helperText: '조회 중 오류가 발생했습니다. 다시 시도해주세요.',
              helperClassName: 'text-text-brand',
            });
            return;
          }

          const { status, storeName, ownerName, storeAddress, message } =
            result.data.data;

          if (
            status === ApiResponseBusinessRegistrationLookupDataStatus.VALID
          ) {
            setValue('storeName', storeName ?? '');
            setValue('ownerName', ownerName ?? '');
            setValue('storeAddress', storeAddress ?? '');
            setLookupState({
              status: 'valid',
              helperText: '사업자등록번호가 확인되었어요.',
              helperClassName: 'text-text-subtle-inverse',
            });
          } else if (
            status === ApiResponseBusinessRegistrationLookupDataStatus.CLOSED
          ) {
            setLookupState({
              status: 'closed',
              helperText: message ?? '휴업/폐업 사업자입니다.',
              helperClassName: 'text-text-brand',
            });
          } else {
            setLookupState({
              status: 'not_found',
              helperText:
                message ?? '사업자등록번호가 조회되지 않아 다시 입력해주세요.',
              helperClassName: 'text-text-brand',
            });
          }
        },
        onError: () => {
          setLookupState({
            status: 'error',
            helperText: '조회 중 오류가 발생했습니다. 다시 시도해주세요.',
            helperClassName: 'text-text-brand',
          });
        },
      },
    );
  };

  const isPhoneValid = /^010\d{8}$/.test(phoneValue);
  const canProceed =
    isLookedUp && !!storeName && !!ownerName && !!storeAddress && isPhoneValid;

  const onSubmit = (values: StepBusinessFormValues) => {
    const payload = {
      businessRegistrationNumber: values.businessRegistrationNumber,
      storeName: values.storeName,
      ownerName: values.ownerName,
      storeAddress: values.storeAddress,
      phoneNumber: formatPhoneNumber(values.phoneNumber),
    };

    sessionStorage.setItem(SELLER_BUSINESS_INFO_KEY, JSON.stringify(payload));
    onNext();
  };

  const phoneHelperText = errors.phoneNumber?.message ?? '숫자만 입력해주세요';
  const phoneHelperClassName = errors.phoneNumber
    ? 'text-text-brand'
    : 'text-text-subtle-inverse';

  const isBizNumberValid = /^\d{3}-?\d{2}-?\d{5}$/.test(bizNumber);

  return {
    form,
    lookupState,
    isLookedUp,
    isLooking,
    isBizNumberValid,
    canProceed,
    phoneHelperText,
    phoneHelperClassName,
    handleLookup,
    handleSubmit,
    onSubmit,
  };
};
