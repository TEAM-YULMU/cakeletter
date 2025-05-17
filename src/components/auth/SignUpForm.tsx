import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";

type Props = {
  role: "user" | "owner";
};

export function SignUpForm({ role }: Props) {
  return (
    <FormCard title={role === "user" ? "일반 회원가입" : "사장님 회원가입"} footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}>
      <form className="space-y-6">
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            // error={!!errors?.name}
            // onChange={handleChange}
          />
          {/* {errors?.name && <FormMessage message={errors?.name[0]} />} */}
        </div>
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            // error={!!errors?.email}
            // onChange={handleChange}
          />
          {/* {errors?.email && <FormMessage message={errors?.email[0]} />} */}
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            // error={!!errors?.password}
            // onChange={handleChange}
          />
          {/* {errors?.password && <FormMessage message={errors?.password[0]} />} */}
        </div>
        <Submit className="w-full" role={role}>
          가입하기
        </Submit>
      </form>
    </FormCard>
  );
}
