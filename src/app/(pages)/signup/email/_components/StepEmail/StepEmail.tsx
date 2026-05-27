import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';
import { useWatch } from 'react-hook-form';
import { useStepEmail } from './useStepEmail';

type StepEmailProps = {
  onNext: () => void;
};

const StepEmail = ({ onNext }: StepEmailProps) => {
  const { form, email, code, password, state, handlers } = useStepEmail(onNext);

  const {
    register,
    formState: { errors },
    control,
  } = form;
  const codeValue = useWatch({
    control,
    name: 'verificationCode',
    defaultValue: '',
  });

  return (
    <>
      <div className="flex justify-between items-start pb-g8">
        <Image
          src="/images/mcj-logo-1.png"
          alt="Logo"
          width={118}
          height={49}
        />
        <Image
          src="/icons/progress-1.png"
          alt="progress"
          width={512}
          height={113}
          className="w-32.75 h-7.2"
        />
      </div>

      <div className="flex flex-col gap-g4 pb-18">
        {/* 이메일 */}
        <Input
          label="이메일 주소"
          placeholder="이메일 주소를 입력해주세요."
          helperText={email.helperText}
          helperTextClassName={email.helperColor}
          {...register('email')}
          rightButton={{
            label:
              email.status === 'checking' || state.isSendingCode
                ? '확인 중...'
                : code.status !== 'idle'
                  ? '재전송'
                  : '인증하기',
            onClick: handlers.handleCheckAndSendCode,
            disabled:
              !email.isFormatValid ||
              email.status === 'checking' ||
              state.isSendingCode ||
              code.status === 'verified',
          }}
        />

        {/* 인증코드 */}
        {code.status !== 'idle' && (
          <div className="flex flex-col gap-g2">
            <div className="flex items-center gap-g2">
              <p className="caption-sm-medium text-text-tertiary">인증 코드</p>
              {code.status !== 'verified' && code.timer > 0 && (
                <p className="caption-sm-medium text-text-brand">
                  {code.formatTimer(code.timer)}
                </p>
              )}
            </div>
            <Input
              placeholder="메일로 전송된 코드를 입력해주세요."
              {...register('verificationCode')}
              helperText={code.helperText}
              helperTextClassName={code.helperColor}
              helperAction={
                code.status !== 'verified'
                  ? {
                      label: '재발송하기',
                      onClick: handlers.handleResend,
                      disabled: state.isSendingCode,
                    }
                  : undefined
              }
              rightButton={{
                label: state.isVerifyingCode ? '확인 중...' : '코드확인',
                onClick: handlers.handleVerifyCode,
                disabled:
                  codeValue?.length !== 6 ||
                  state.isVerifyingCode ||
                  code.status === 'verified',
              }}
            />
          </div>
        )}

        {/* 비밀번호 */}
        <Input
          label="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요."
          helperText={
            errors.password?.message ?? '영문, 숫자가 모두 들어간 8자 이상'
          }
          {...register('password')}
        />

        <Input
          label="비밀번호 확인"
          isPassword
          placeholder="비밀번호를 다시 입력해주세요."
          helperText={password.confirmHelperText}
          helperTextClassName={
            password.confirmHelperColor === 'error'
              ? 'text-text-brand'
              : 'text-text-subtle-inverse'
          }
          {...register('passwordConfirm')}
        />
      </div>

      <div className="fixed left-0 right-0 bottom-4 px-4 w-full max-w-md mx-auto z-10">
        <Button
          onClick={handlers.handleSubmit(handlers.onSubmit)}
          fullWidth
          size="lg"
          disabled={!state.canProceed || state.isSigningUp}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default StepEmail;
