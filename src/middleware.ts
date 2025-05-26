import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./lib/actions/sessions";
import { BASE_URL, PUBLIC_ROUTES, PROTECTED_ROUTES } from "./constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await verify(cookie);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isChatRoute = pathname.startsWith(PROTECTED_ROUTES.CHAT);
  const isOwnerRoute = pathname.startsWith(PROTECTED_ROUTES.OWNER);

  // 인증되지 않은 사용자가 보호된 경로 접근 시
  if ((isChatRoute || isOwnerRoute) && !session) {
    return NextResponse.redirect(new URL(BASE_URL, request.url));
  }

  // 인증된 일반 사용자가 OWNER 경로 접근 시
  if (isOwnerRoute && session?.role !== "OWNER") {
    return NextResponse.redirect(new URL(BASE_URL, request.url));
  }

  // 로그인 중인데 로그인/회원가입 페이지 접근 시
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup/user", "/signup/owner", "/chat/:path*", "/owner/:path*"],
};
