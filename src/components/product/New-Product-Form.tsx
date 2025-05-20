"use client";

import { useProductContext } from "@/contexts/ProductContext";
import FileImageForm from "./image/File-Image-Form";
import ProductInputForm from "./Product-Input-Form";

const NewProductForm = () => {
  const { state } = useProductContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert("제출 완료!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-[42px]">
      <FileImageForm name="image" />
      <ProductInputForm />
    </form>
  );
};

export default NewProductForm;
