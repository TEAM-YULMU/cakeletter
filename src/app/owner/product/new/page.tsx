"use client";

import FileImageForm from "@/components/product/image/File-Image-Form";
import ProductInputForm from "@/components/product/Product-Input-Form";

export default function ProductRegisterPage() {
  return (
    <div className="pb-[40]">
      <div className="f28 py-[42]">상품 등록</div>
      <form className="flex flex-row gap-[42px]">
        <FileImageForm name="image" />
        <ProductInputForm />
      </form>
    </div>
  );
}
