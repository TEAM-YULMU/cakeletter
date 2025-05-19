"use client";
import Link from "next/link";
import { useSession } from "@/hooks/session-context";

export default function Nav() {
  const { session } = useSession();

  if (!session) {
    return (
      <nav>
        <Link href="/">HOME</Link>
        <Link href="/login">LOGIN</Link>
      </nav>
    );
  }

  // href 임시 설정
  return (
    <nav>
      {session.role === "USER" && (
        <>
          <Link href="/">HOME</Link>
          <Link href="/chat">CHAT</Link>
          <Link href="/cart">CART</Link>
          <Link href="/mypage">MYPAGE</Link>
        </>
      )}
      {session.role === "OWNER" && (
        <>
          <Link href="/chat">CHAT</Link>
          <Link href="/mypage">MYPAGE</Link>
        </>
      )}
    </nav>
  );
}
