import NewProductForm from "@/components/product/New-Product-Form";
import { ProductProvider } from "@/contexts/ProductContext";

export default function ProductRegisterPage() {
  return (
    <div className="pb-[40]">
      <div className="f28 py-[42]">상품 등록</div>
      <ProductProvider>
        <NewProductForm />
      </ProductProvider>
    </div>
  );
}
