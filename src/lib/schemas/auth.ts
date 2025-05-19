import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "패스워드는 최소 8자 이상이어야 합니다." })
    // .regex(/[A-Z]/, {
    //   message: "패스워드는 최소 1개 이상의 대문자를 포함해야 합니다.",
    // })
    .regex(/[a-z]/, {
      message: "패스워드는 최소 1개 이상의 소문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "패스워드는 최소 1개 이상의 숫자를 포함해야 합니다.",
    })
    .regex(/[\W_]/, {
      message: "패스워드는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    }),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, {
    message: "전화번호는 010-XXXX-XXXX 형식이어야 합니다.",
  }),
  birth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "생년월일을 선택해주세요.",
  }),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "성별을 선택해주세요.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식을 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "패스워드를 입력해주세요.",
  }),
});
