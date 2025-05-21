import NewProductForm from "@/components/product/New-Product-Form";
import { ProductProvider } from "@/contexts/ProductContext";

export default function ProductRegisterPage() {
  return (
    <div className="flex w-[90%] flex-col pb-[40px]">
      <div className="f28 py-[42px]">상품 등록</div>
      <ProductProvider>
        <NewProductForm />
      </ProductProvider>
    </div>
  );
}
