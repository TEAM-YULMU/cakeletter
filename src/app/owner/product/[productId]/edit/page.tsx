import NewProductForm from "@/components/product/New-Product-Form";
import { ProductProvider } from "@/contexts/ProductContext";
import { getProduct } from "@/lib/actions/product";

type Props = {
  productId: string;
};

export default async function ProductEditPage({ params }: { params: Promise<Props> }) {
  const productId = parseInt((await params).productId);
  if (isNaN(productId)) {
    throw Error("유효하지 않은 상품 ID 입니다.");
  }

  const product = await getProduct(productId);

  return (
    <div className="flex w-[90%] flex-col pb-[40px]">
      <div className="f28 py-[42px]">상품 수정</div>
      <ProductProvider propsState={product}>
        <NewProductForm />
      </ProductProvider>
    </div>
  );
}
