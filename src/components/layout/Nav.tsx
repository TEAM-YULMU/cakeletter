"use client";

import Link from "next/link";
import { useSession } from "@/hooks/session-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

export default function Nav() {
  const { session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // href 임시 설정
  return (
    <nav className="border-line flex items-center justify-between border-t border-b px-6 py-4">
      <div className="flex items-center space-x-8">
        <Link href="/" className={cn("hover:text-primary flex items-center font-medium transition-colors", isActive("/") ? "text-primary" : "text-sub-text")}>
          HOME
        </Link>

        {session && (
          <Link href="/chat" className={cn("hover:text-primary flex items-center font-medium transition-colors", isActive("/chat") ? "text-primary" : "text-sub-text")}>
            CHAT
          </Link>
        )}
      </div>

      <div className="flex space-x-8">
        {session && session.role === "OWNER" && (
          <Link href="/owner" className={cn("hover:text-primary flex items-center font-medium transition-colors", isActive("/owner") ? "text-primary" : "text-sub-text")}>
            MYSTORE
          </Link>
        )}
        {!session ? (
          <Link href="/login" className="text-sub-text hover:text-primary flex items-center font-medium transition-colors">
            <LogIn className="mr-2 h-4 w-4" />
            LOGIN
          </Link>
        ) : (
          <LogoutButton />
        )}
      </div>
    </nav>
  );
}
