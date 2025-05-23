"use client";

import { useEffect, useState } from "react";
import RegionSelectBox from "@/components/store/RegionSelectBox";
import ItemCardList from "@/components/common/ItemList";
import { StoreCardProps } from "@/types/store";
import { getFilteredStores } from "@/lib/api/store";

type Props = {
  initialStores: StoreCardProps[];
};

export default function StoreList({ initialStores }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreCardProps[]>(initialStores);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getFilteredStores(selectedProvince, selectedDistrict);
        setStores(data);
      } catch {
        console.error("가게 불러오기 실패");
      }
    };

    fetchStores();
  }, [selectedProvince, selectedDistrict]);

  const cards = stores.map((store) => ({
    id: store.id,
    title: store.name,
    imageUrl: store.imageUrl,
    href: `/store/${store.id}`,
    footerText: "See More >",
    bgColorClass: "bg-primary-100",
  }));

  return (
    <div className="mx-auto mt-10.5 w-[80%]">
      <RegionSelectBox
        onChange={(province, district) => {
          setSelectedProvince(province);
          setSelectedDistrict(district);
        }}
      />

      <ItemCardList items={cards} />
    </div>
  );
}
