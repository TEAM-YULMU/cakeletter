import ProductImageList from "@/components/product/image/ProductImageList";
import ProductInfo from "@/components/product/Product-Info";
import { getProduct } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { notFound } from "next/navigation";
import BackTitle from "@/components/common/BackTitle";

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
    <div className="mt-10.5 flex w-full flex-col">
      <BackTitle title={store.name} />
      <div className="product-form mt-10.5 flex justify-center">
        <ProductImageList productName={product.name} images={product.images}></ProductImageList>
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
