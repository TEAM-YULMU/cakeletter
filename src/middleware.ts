import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./lib/actions/sessions";
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "./constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const cookieStore = await cookies();

  const cookie = cookieStore.get("session")?.value;
  const session = await verify(cookie);

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

// login, signup의 경우에만 middleware.ts 거치도록 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    "/login",
    "/signup/user",
    "/signup/owner",
  ],
};
