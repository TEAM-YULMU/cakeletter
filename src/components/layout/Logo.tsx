"use client";

import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Logo() {
  const pathname = usePathname();
  const handleClick = (e: React.MouseEvent) => {
    if (pathname === BASE_URL) {
      e.preventDefault();
      window.location.reload();
    }
  };
  return (
    <Link href={BASE_URL} onClick={handleClick}>
      <Image width={80} height={80} src="/images/cakeletter.png" alt="cakeletter_logo" />
    </Link>
  );
}
