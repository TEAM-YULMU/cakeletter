"use client";

import { ChangeEvent, useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { TSignUpFormError } from "@/types/form";
import { SignUpSchema } from "@/lib/schemas/auth";
import { FormMessage } from "./FormMessage";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { signUp } from "@/app/actions/signup";
import toast from "react-hot-toast";

type Props = {
  role: "user" | "owner";
};

export function SignUpForm({ role }: Props) {
  const [error, action] = useActionState(signUp, undefined);
  const { errors, validateField } = useFormValidate<TSignUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title={role === "user" ? "일반 회원가입" : "사장님 회원가입"}
      footer={{
        label: "이미 계정이 있으신가요?",
        links: [{ label: "로그인 페이지로 이동", href: "/login" }],
      }}
    >
      <form action={action} className="space-y-6">
        {/* 이름 */}
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input id="name" name="name" placeholder="이름을 입력해주세요" onChange={handleChange} />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>

        {/* 이메일 */}
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" type="email" placeholder="example@example.com" onChange={handleChange} />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" name="password" type="password" placeholder="비밀번호를 입력해주세요" onChange={handleChange} />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>

        {/* 전화번호 */}
        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <Input id="phone" name="phone" placeholder="010-XXXX-XXXX" onChange={handleChange} />
          {errors?.phone && <FormMessage message={errors.phone[0]} />}
        </div>

        {/* 생년월일 */}
        <div className="space-y-2">
          <Label htmlFor="birth">생년월일</Label>
          <Input id="birth" name="birth" type="date" onChange={handleChange} className="w-fit min-w-0 px-3" />
          {errors?.birth && <FormMessage message={errors.birth[0]} />}
        </div>

        {/* 성별 */}
        <div className="space-y-2">
          <Label htmlFor="gender">성별</Label>
          <RadioGroup name="gender" defaultValue="MALE" className="flex gap-4" onValueChange={(value) => validateField("gender", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MALE" id="male" />
              <Label htmlFor="male">남자</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FEMALE" id="female" />
              <Label htmlFor="female">여자</Label>
            </div>
          </RadioGroup>
          {errors?.gender && <FormMessage message={errors.gender[0]} />}
        </div>

        <Submit className="w-full" role={role}>
          가입하기
        </Submit>
      </form>
    </FormCard>
  );
}
