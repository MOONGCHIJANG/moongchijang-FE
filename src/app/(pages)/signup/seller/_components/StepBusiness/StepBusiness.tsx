import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { useStepBusiness } from './useStepBusiness';

type StepBusinessProps = {
  onNext: () => void;
};

const StepBusiness = ({ onNext }: StepBusinessProps) => {
  const {
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
  } = useStepBusiness(onNext);

  const { register } = form;

  return (
    <>
      <div className="flex flex-col gap-g4 pb-20">
        <p className="heading-lg-bold">사업자 정보를 입력해주세요</p>
        <div className="flex flex-col gap-g5">
          {/* 사업자 등록 번호 */}
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
            helperText={phoneHelperText}
            helperTextClassName={phoneHelperClassName}
            {...register('phoneNumber')}
          />
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button
          fullWidth
          size="lg"
          disabled={!canProceed}
          onClick={handleSubmit(onSubmit)}
        >
          완료
        </Button>
      </div>
    </>
  );
};

export default StepBusiness;
