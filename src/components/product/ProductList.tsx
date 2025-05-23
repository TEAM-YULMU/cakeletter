"use client";

import { useRouter } from "next/navigation";
import ItemCardList from "@/components/common/ItemList";
import type { ProductPreview } from "@/types/product";

type Props = {
  storeId: number;
  storeName: string;
  products: ProductPreview[];
};

export default function ProductListPage({ storeId, storeName, products }: Props) {
  const router = useRouter();

  const cards = products.map((product) => ({
    id: product.id,
    title: product.name,
    imageUrl: product.imageUrl ?? "/images/cake_image.png",
    href: `/store/${storeId}/product/${product.id}`,
    footerText: "주문하기 >",
    bgColorClass: "bg-secondary-100",
  }));

  return (
    <div className="mx-auto mt-10.5 w-full">
      <div className="mx-10.5 flex items-center gap-2">
        <button onClick={() => router.back()} className="f28 text-medium text-primary-text hover:text-sub-text ml-10.5 leading-none">
          &lt; {storeName}
        </button>
      </div>
      <ItemCardList items={cards} />
    </div>
  );
}
