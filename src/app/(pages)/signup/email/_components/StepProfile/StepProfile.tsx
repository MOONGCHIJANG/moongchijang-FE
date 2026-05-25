import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';
import { useStepProfile } from './useStepProfile';

type StepProfileProps = {
  onNext: () => void;
};

const StepProfile = ({ onNext }: StepProfileProps) => {
  const {
    form,
    codeValue,
    timer,
    formatTimer,
    isPhoneFormatValid,
    canProceed,
    isSendingCode,
    isVerifyingCode,
    isSaving,
    phoneStatus,
    nicknameHelperText,
    nicknameHelperClassName,
    phoneHelperText,
    phoneHelperClassName,
    codeHelperText,
    codeHelperClassName,
    handleSendCode,
    handleResend,
    handleVerifyCode,
    handleSubmit,
    onSubmit,
  } = useStepProfile(onNext);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex justify-between items-start pb-g8">
        <p className="heading-lg-bold whitespace-pre-line">
          {`반가워요! 🥐\n닉네임을 알려주세요`}
        </p>
        <Image
          src="/icons/progress-2.png"
          alt="progress"
          width={512}
          height={113}
          className="w-32.75 h-7.2"
        />
      </div>

      <div className="flex flex-col gap-g4 pb-18">
        {/* 닉네임 */}
        <Input
          label="닉네임"
          placeholder="닉네임을 알려주세요."
          helperText={nicknameHelperText}
          helperTextClassName={nicknameHelperClassName}
          {...register('nickname')}
        />

        {/* 전화번호 */}
        <Input
          label="전화번호"
          placeholder="01012345678"
          inputMode="numeric"
          helperText={phoneHelperText}
          helperTextClassName={phoneHelperClassName}
          {...register('phoneNumber')}
          rightButton={{
            label: isSendingCode
              ? '전송 중...'
              : phoneStatus !== 'idle'
                ? '재전송'
                : '인증하기',
            onClick: phoneStatus === 'idle' ? handleSendCode : handleResend,
            disabled:
              !isPhoneFormatValid ||
              isSendingCode ||
              phoneStatus === 'verified',
          }}
        />

        {/* 인증코드 (전송 후 노출) */}
        {phoneStatus !== 'idle' && (
          <div className="flex flex-col gap-g2">
            <div className="flex items-center gap-g2">
              <p className="caption-sm-medium text-text-tertiary">인증 코드</p>
              {phoneStatus !== 'verified' && timer > 0 && (
                <p className="caption-sm-medium text-text-brand">
                  {formatTimer(timer)}
                </p>
              )}
            </div>
            <Input
              placeholder="번호로 전송된 코드를 입력해주세요."
              helperText={codeHelperText}
              helperTextClassName={codeHelperClassName}
              helperAction={
                phoneStatus !== 'verified'
                  ? {
                      label: '재발송하기',
                      onClick: handleResend,
                      disabled: isSendingCode,
                    }
                  : undefined
              }
              {...register('verificationCode')}
              rightButton={{
                label: isVerifyingCode ? '확인 중...' : '코드확인',
                onClick: handleVerifyCode,
                disabled:
                  codeValue?.length !== 6 ||
                  isVerifyingCode ||
                  phoneStatus === 'verified',
              }}
            />
          </div>
        )}
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button
          onClick={handleSubmit(onSubmit)}
          fullWidth
          size="lg"
          disabled={!canProceed || isSaving}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default StepProfile;
