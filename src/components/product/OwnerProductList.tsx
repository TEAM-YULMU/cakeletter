import ItemCardList from "@/components/common/ItemList";
import type { ProductPreview } from "@/types/product";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  products: ProductPreview[];
};

export default function OwnerProductList({ products }: Props) {
  const cards = products.map((product) => ({
    id: product.id,
    title: product.name,
    imageUrl: product.imageUrl ?? "/images/cake_image.png",
    href: `/owner/product/${product.id}/edit`,
    footerText: "수정하기 >",
    bgColorClass: "bg-secondary-100",
  }));

  return (
    <div className="mx-auto mt-10.5 w-full">
      <div className="mx-10.5 flex items-center justify-end gap-2">
        <Link href="owner/product/new">
          <Button className="bg-primary-300 hover:bg-primary-400 h-12 w-40 rounded-none">
            <div className="f22 font-semibold">상품 추가</div>
          </Button>
        </Link>
      </div>
      <ItemCardList items={cards} />
    </div>
  );
}
