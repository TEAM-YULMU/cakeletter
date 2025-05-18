"use client";

import { useFormValidate } from "@/hooks/useFormValidate";
import { ChangeEvent, useActionState, useEffect } from "react";
import { FormCard } from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormMessage } from "./FormMessage";
import { Submit } from "./Submit";
import { TLoginFormError } from "@/types/form";
import { LoginSchema } from "@/lib/schemas/auth";
import { login } from "@/app/actions/login";
import toast from "react-hot-toast";

export function LoginForm() {
  const [error, action] = useActionState(login, undefined);
  const { errors, validateField } = useFormValidate<TLoginFormError>(LoginSchema);

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
      title="로그인"
      footer={{
        label: "아직 계정이 없으신가요?",
        links: [
          { label: "일반 회원가입", href: "/signup/user" },
          { label: "사장님 회원가입", href: "/signup/owner" },
        ],
      }}
    >
      <form action={action} className="space-y-6">
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

        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
