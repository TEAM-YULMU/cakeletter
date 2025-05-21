"use client";

import { useEffect, useState } from "react";
import RegionSelectBox from "./RegionSelectBox";
import { StoreCard } from "./StoreCard";
import type { StoreCardProps } from "@/types/store";

type Props = {
  initialStores: StoreCardProps[];
};

export default function StoreList({ initialStores }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreCardProps[]>(initialStores);

  useEffect(() => {
    const fetchStores = async () => {
      const params = new URLSearchParams();
      if (selectedProvince) params.append("city_province", selectedProvince);
      if (selectedDistrict) params.append("district", selectedDistrict);

      const res = await fetch(`/api/stores?${params.toString()}`);
      const data = await res.json();
      setStores(data);
    };

    fetchStores();
  }, [selectedProvince, selectedDistrict]);

  return (
    <div className="mx-auto mt-10.5 w-[80%]">
      <RegionSelectBox
        onChange={(province, district) => {
          setSelectedProvince(province);
          setSelectedDistrict(district);
        }}
      />

      {stores.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,240px)] justify-center gap-x-10.5">
          {stores.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      ) : (
        <p className="text-sub-text mt-10.5 text-center">선택한 지역에 등록된 가게가 없습니다.</p>
      )}
    </div>
  );
}
