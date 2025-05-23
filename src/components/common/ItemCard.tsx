"use client";

import Image from "next/image";
import Link from "next/link";
import { ItemCardProps } from "@/types/common";

export function ItemCard({ id, title, imageUrl, href, footerText = "See More >", bgColorClass = "bg-primary-100" }: ItemCardProps) {
  return (
    <div className="relative mt-10.5 overflow-hidden rounded-md border-1 hover:scale-[1.02]">
      <Link href={href}>
        <div className="relative h-[16rem] w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <div className={`${bgColorClass} flex h-[7rem] flex-col justify-between p-4`}>
          <h3 className="f20 text-medium text-primary-text">{title}</h3>
          <p className="f10 mt-2 text-black">{footerText}</p>
        </div>
      </Link>
    </div>
  );
}
