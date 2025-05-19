import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={BASE_URL}>
      <Image width={110} height={110} src="/images/cakeletter.png" alt="cakeletter_logo" />
    </Link>
  );
}
