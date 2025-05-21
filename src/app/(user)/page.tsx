"use client";

import { Header } from "@/components/layout/Header";
import { StoreCard } from "@/components/store/StoreCard";
import type { StoreCardProps } from "@/types/store";
import { useState } from "react";
import RegionSelectBox from "@/components/store/RegionSelectBox";

const mockStores: StoreCardProps[] = [
  {
    id: 1,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "서울특별시",
    district: "강남구",
  },
  {
    id: 2,
    name: "우와케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/3.jpeg",
    city_province: "서울특별시",
    district: "광진구",
  },
  {
    id: 3,
    name: "르베랑",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/4.jpeg",
    city_province: "서울특별시",
    district: "강서구",
  },
  {
    id: 4,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/5.jpeg",
    city_province: "부산광역시",
    district: "부산진구",
  },
  {
    id: 5,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/6.jpeg",
    city_province: "부산광역시",
    district: "해운대구",
  },
  {
    id: 6,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "부산광역시",
    district: "사하구",
  },
  {
    id: 7,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "인천광역시",
    district: "계양구",
  },
  {
    id: 8,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "인천광역시",
    district: "남동구",
  },
  {
    id: 9,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "대전광역시",
    district: "서구",
  },
  {
    id: 10,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "세종특별자치시",
  },
  {
    id: 11,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "서울특별시",
  },
  {
    id: 12,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "서울특별시",
    district: "광진구",
  },
  {
    id: 13,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "서울특별시",
    district: "강남구",
  },
  {
    id: 14,
    name: "건대케이크",
    imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
    city_province: "서울특별시",
    district: "강서구",
  },
];

export default function UserHomePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const filteredStores = mockStores.filter((store) => {
    if (!selectedProvince) return true;
    if (!selectedDistrict) return store.city_province === selectedProvince;
    return store.city_province === selectedProvince && store.district === selectedDistrict;
  });

  return (
    <div className="mx-auto w-[90%]">
      <Header />
      <main className="mx-auto w-[80%]">
        <div className="mt-10.5">
          <RegionSelectBox
            onChange={(province, district) => {
              setSelectedProvince(province);
              setSelectedDistrict(district);
            }}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-10.5">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </main>
    </div>
  );
}
