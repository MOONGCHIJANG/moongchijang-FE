import { z } from 'zod';

export const stepEmailSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
    verificationCode: z
      .string()
      .length(6, { message: '인증번호 6자리를 입력해주세요.' }),
    password: z
      .string()
      .min(8, { message: '8자 이상 20자 이하로 입력해주세요.' })
      .max(20, { message: '8자 이상 20자 이하로 입력해주세요.' })
      .regex(/^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/, {
        message: '영문, 숫자가 모두 들어간 8자 이상',
      }),
    passwordConfirm: z.string(),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    message: '비밀번호가 일치하지 않아요',
    path: ['passwordConfirm'],
  });

export type StepEmailFormValues = z.infer<typeof stepEmailSchema>;

export const stepProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: '2자 이상 입력해주세요.' })
    .max(10, { message: '10자 이하로 입력해주세요.' })
    .regex(/^[A-Za-z0-9가-힣]{2,10}$/, {
      message: '한글, 영문, 숫자만 사용 가능해요.',
    }),
  phoneNumber: z
    .string()
    .regex(/^01[0-9]\d{7,8}$/, { message: '올바른 전화번호를 입력해주세요.' }),
  verificationCode: z
    .string()
    .length(6, { message: '인증번호 6자리를 입력해주세요.' }),
});

export type StepProfileFormValues = z.infer<typeof stepProfileSchema>;

// 전화번호 포맷 변환 (01012345678 → 010-1234-5678)
export const formatPhoneNumber = (raw: string): string =>
  `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
