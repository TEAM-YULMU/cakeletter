"use server";

import bcrypt from "bcryptjs";
import { getMemberByEmail } from "@/data/member";
import { SignUpSchema } from "@/lib/schemas/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const signUp = async (_: unknown, formData: FormData) => {
  // 1. validate Fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    birth: formData.get("birth"),
    gender: formData.get("gender"),
  });

  if (!validatedFields.success) {
    // console.error("회원가입 검증 실패:", validatedFields.error.flatten());
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 필드 분해
  const { email, name, password, phone, birth: birthStr, gender } = validatedFields.data;
  const birth = new Date(birthStr);

  const role = formData.get("role")?.toString().toUpperCase() as "USER" | "OWNER";
  if (role !== "USER" && role !== "OWNER") {
    return { errorMessage: "잘못된 사용자 유형입니다." };
  }

  try {
    // 3. 존재하는 사용자 확인
    const existingUser = await getMemberByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자입니다.",
      };
    }

    // 4. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. DB 저장
    await prisma.member.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        birth,
        gender,
        role,
      },
    });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return { errorMessage: "회원가입 중 문제가 발생했습니다." };
  }

  // 6. 성공 시 로그인 페이지로 리디렉션
  redirect("/login");
};
