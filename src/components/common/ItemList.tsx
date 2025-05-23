"use client";

import { ItemCard } from "./ItemCard";
import type { ItemCardProps } from "@/types/common";

type Props = {
  items: ItemCardProps[];
};

export default function ItemCardList({ items }: Props) {
  return (
    <div className="w-full">
      {items.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,240px)] justify-center gap-x-10.5">
          {items.map((item) => (
            <ItemCard key={item.id} id={item.id} title={item.title} imageUrl={item.imageUrl} href={item.href} footerText={item.footerText} bgColorClass={item.bgColorClass} />
          ))}
        </div>
      ) : (
        <p className="text-sub-text mt-10.5 text-center">조회된 항목이 없습니다.</p>
      )}
    </div>
  );
}
