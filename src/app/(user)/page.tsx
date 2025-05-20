"use client";

import { Header } from "@/components/layout/Header";
import { StoreCard } from "@/components/store/StoreCard";
import type { StoreCardProps } from "@/types/store";

const mockStores: StoreCardProps[] = [
  {
    id: 1,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 2,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 3,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 4,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 5,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 6,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 7,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 8,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 9,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 10,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 11,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 12,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 13,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
  {
    id: 14,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
  },
];

export default function UserHomePage() {
  return (
    <div className="mx-auto w-[90%]">
      <Header />
      <main className="p-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {mockStores.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </main>
    </div>
  );
}
