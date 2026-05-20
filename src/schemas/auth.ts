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
