"use client";

import ItemCardList from "@/components/common/ItemList";
import type { ProductPreview } from "@/types/product";
import BackTitle from "@/components/common/BackTitle";

type Props = {
  storeId: number;
  storeName: string;
  products: ProductPreview[];
};

export default function ProductListPage({ storeId, storeName, products }: Props) {
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
      <BackTitle title={storeName} />
      <ItemCardList items={cards} />
    </div>
  );
}
