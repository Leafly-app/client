import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("올바른 이메일 형식이 아닙니다.");

const passwordSchema = z
  .string()
  .min(1, "비밀번호를 입력해주세요.")
  .min(8, "비밀번호는 8-16자이어야 합니다.")
  .max(16, "비밀번호는 8-16자이어야 합니다.")
  .refine(
    (val) =>
      [/[A-Z]/.test(val), /[a-z]/.test(val), /\d/.test(val), /[^A-Za-z0-9]/.test(val)].filter(
        Boolean,
      ).length >= 2,
    "영문 대소문자, 숫자, 특수문자 중 2가지 이상 포함해주세요.",
  );

const nicknameSchema = z
  .string()
  .min(1, "닉네임을 입력해주세요.")
  .min(2, "닉네임은 2-10자여야 합니다.")
  .max(10, "닉네임은 2-10자여야 합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "특수문자 및 공백은 사용할 수 없습니다.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordCheck: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    nickname: nicknameSchema,
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
