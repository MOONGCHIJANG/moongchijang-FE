'use client';

import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ApiResponseBusinessRegistrationLookupDataStatus } from '@/api/generated/api.schemas';
import {
  useGetApiV1UsersMeSellerBusinessProfile,
  usePostApiV1UsersMeSellerBusinessRegistrationLookup,
  usePatchApiV1UsersMeSellerBusinessInfo,
} from '@/api/hooks/auth/auth';
import { formatPhoneNumber } from '@/schemas/auth';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';

const schema = z.object({
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

type FormValues = z.infer<typeof schema>;

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
  editableFields?: {
    storeName: boolean;
    ownerName: boolean;
    storeAddress: boolean;
  };
};

const initialLookupState: LookupState = {
  status: 'idle',
  helperText: '',
  helperClassName: '',
  editableFields: { storeName: false, ownerName: false, storeAddress: false },
};

export default function BusinessInfoPage() {
  const router = useRouter();
  const [lookupState, setLookupState] =
    useState<LookupState>(initialLookupState);
  const [lookedUpBizNumber, setLookedUpBizNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: profileData } = useGetApiV1UsersMeSellerBusinessProfile();
  const profile = profileData?.status === 200 ? profileData.data?.data : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
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
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!profile) return;
    const bizNum = profile.businessRegistrationNumber ?? '';
    reset({
      businessRegistrationNumber: bizNum,
      storeName: profile.storeName ?? '',
      ownerName: profile.ownerName ?? '',
      storeAddress: profile.storeAddress ?? '',
      phoneNumber: (profile.phoneNumber ?? '').replace(/[^0-9]/g, ''),
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLookedUpBizNumber(bizNum);

    setLookupState({
      status: 'valid',
      helperText: '사업자등록번호가 확인되었어요.',
      helperClassName: 'text-text-subtle-inverse',
      editableFields: { storeName: true, ownerName: true, storeAddress: true },
    });
  }, [profile, reset]);

  const bizNumber = useWatch({
    control,
    name: 'businessRegistrationNumber',
    defaultValue: '',
  });
  const storeName = useWatch({ control, name: 'storeName', defaultValue: '' });
  const ownerName = useWatch({ control, name: 'ownerName', defaultValue: '' });
  const storeAddress = useWatch({
    control,
    name: 'storeAddress',
    defaultValue: '',
  });
  const phoneValue = useWatch({
    control,
    name: 'phoneNumber',
    defaultValue: '',
  });

  useEffect(() => {
    if (lookupState.status === 'valid' && bizNumber !== lookedUpBizNumber) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLookupState(initialLookupState);
      setValue('storeName', '');
      setValue('ownerName', '');
      setValue('storeAddress', '');
    }
  }, [bizNumber, lookedUpBizNumber, lookupState.status, setValue]);

  const { mutate: lookup, isPending: isLooking } =
    usePostApiV1UsersMeSellerBusinessRegistrationLookup();
  const { mutate: save, isPending: isSaving } =
    usePatchApiV1UsersMeSellerBusinessInfo();

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
              helperText: '조회 중 오류가 발생했습니다.',
              helperClassName: 'text-text-brand',
            });
            return;
          }
          const {
            status,
            storeName: sn,
            ownerName: on,
            storeAddress: sa,
            message,
          } = result.data.data;
          if (
            status === ApiResponseBusinessRegistrationLookupDataStatus.VALID
          ) {
            setValue('storeName', sn ?? '');
            setValue('ownerName', on ?? '');
            setValue('storeAddress', sa ?? '');
            setLookedUpBizNumber(bizNumber);
            setLookupState({
              status: 'valid',
              helperText: '사업자등록번호가 확인되었어요.',
              helperClassName: 'text-text-subtle-inverse',
              editableFields: {
                storeName: !sn,
                ownerName: !on,
                storeAddress: !sa,
              },
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
            helperText: '조회 중 오류가 발생했습니다.',
            helperClassName: 'text-text-brand',
          });
        },
      },
    );
  };

  const isLookedUp =
    lookupState.status === 'valid' && bizNumber === lookedUpBizNumber;
  const isBizNumberValid = /^\d{3}-?\d{2}-?\d{5}$/.test(bizNumber);
  const isPhoneValid = /^010\d{8}$/.test(phoneValue);
  const canSave =
    isLookedUp && !!storeName && !!ownerName && !!storeAddress && isPhoneValid;

  const onSubmit = (values: FormValues) => {
    save(
      {
        data: {
          businessRegistrationNumber: values.businessRegistrationNumber,
          storeName: values.storeName,
          ownerName: values.ownerName,
          storeAddress: values.storeAddress,
          phoneNumber: formatPhoneNumber(values.phoneNumber),
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
      <Header text="사업자 정보 변경" showBackButton />

      <div className="flex flex-col gap-g5 px-g5 pt-p6 pb-[100px]">
        <Input
          label="사업자 등록 번호"
          placeholder="000-00-00000"
          helperText={lookupState.helperText}
          helperTextClassName={lookupState.helperClassName}
          {...register('businessRegistrationNumber')}
          rightButton={{
            label: isLooking ? '조회 중...' : '조회',
            onClick: handleLookup,
            disabled: !isBizNumberValid || isLooking || isLookedUp,
          }}
        />
        <Input
          label="가게명"
          placeholder="예) 뭉치장 베이커리"
          readOnly={!lookupState.editableFields?.storeName}
          noHelperSpace
          {...register('storeName')}
        />
        <Input
          label="대표자명"
          placeholder="홍길동"
          readOnly={!lookupState.editableFields?.ownerName}
          noHelperSpace
          {...register('ownerName')}
        />
        <Input
          label="가게 주소"
          placeholder="예) 서울특별시 강남구 테헤란로 123"
          readOnly={!lookupState.editableFields?.storeAddress}
          noHelperSpace
          {...register('storeAddress')}
        />
        <Input
          label="전화번호"
          placeholder="01012345678"
          inputMode="numeric"
          helperText={errors.phoneNumber?.message ?? '숫자만 입력해주세요'}
          helperTextClassName={
            errors.phoneNumber ? 'text-text-brand' : 'text-text-subtle-inverse'
          }
          {...register('phoneNumber')}
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

      <Modal
        isOpen={showSuccessModal}
        iconType="success"
        title="변경 완료"
        description="사업자 정보가 변경되었어요."
        confirmLabel="확인"
        onConfirm={() => {
          setShowSuccessModal(false);
          router.back();
        }}
      />
    </div>
  );
}
