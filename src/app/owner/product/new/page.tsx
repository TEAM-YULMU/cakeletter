"use client";

import FileImageForm from "@/components/product/image/File-Image-Form";

export default function ProductRegisterPage() {
  return (
    <div className="pb-[40]">
      <div className="f28 py-[42]">상품 등록</div>
      <form className="flex flex-row">
        <FileImageForm name="image" />
        <div className="flex"></div>
      </form>
    </div>
  );
}
