"use client";

import { StoreCardProps } from "@/types/store";
import Image from "next/image";
import Link from "next/link";

export function StoreCard({ id, name, imageUrl }: StoreCardProps) {
  return (
    <div className="relative mt-10.5 overflow-hidden rounded-md border-1 hover:scale-[1.02]">
      <Link href={`/store/${id}`}>
        <div className="relative h-[16rem] w-full">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>

        <div className="bg-primary-100 flex h-[7rem] flex-col justify-between p-4">
          <h3 className="f20 text-medium text-primary-text">{name}</h3>
          <p className="f10 mt-2 text-black">See More &gt;</p>
        </div>
      </Link>
    </div>
  );
}
