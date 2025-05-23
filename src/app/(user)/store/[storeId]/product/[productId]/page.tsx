import ProductImageList from "@/components/product/image/ProductImageList";
import ProductInfo from "@/components/product/Product-Info";
import { getProduct } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  storeId: string;
  productId: string;
};

export default async function UserProductDetailPage({ params }: { params: Promise<Props> }) {
  const storeId = parseInt((await params).storeId);
  const productId = parseInt((await params).productId);

  if (isNaN(storeId) || isNaN(productId)) {
    return notFound();
  }

  const product = await getProduct(productId);
  const store = await getStore(storeId);

  return (
    <div className="flex w-[90%] flex-col pb-[40px]">
      <Link href={`/store/${product.storeId}`} className="f28 w-fit py-[42px]">{`< ${store.name}`}</Link>
      <div className="product-form flex justify-center">
        <ProductImageList images={product.images}></ProductImageList>
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
