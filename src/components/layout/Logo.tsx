import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={BASE_URL}>
      <Image width={100} height={100} src="/images/cakeletter.png" alt="cakeletter_logo" />
    </Link>
  );
}
