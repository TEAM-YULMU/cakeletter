import ProductInputForm from "@/components/product/Product-Input-Form";
import { ProductProvider } from "@/contexts/ProductContext";
import { getProduct } from "@/lib/actions/product";
import { getMyStoreId } from "@/lib/actions/store";
import { redirect } from "next/navigation";

type Props = {
  productId: string;
};

export default async function ProductEditPage({ params }: { params: Promise<Props> }) {
  const productId = parseInt((await params).productId);
  if (isNaN(productId)) {
    redirect("/owner");
  }

  const product = await getProduct(productId);
  if (!product) {
    redirect("/owner");
  }

  const storeId = await getMyStoreId();
  if (!storeId || storeId !== product.storeId) {
    redirect("/owner");
  }

  return (
    <div className="flex w-[90%] flex-col pb-[40px]">
      <div className="f28 py-[42px]">상품 수정</div>
      <ProductProvider propsState={{ ...product, removedUrlImages: [] }}>
        <ProductInputForm />
      </ProductProvider>
    </div>
  );
}
