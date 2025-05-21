"use client";

import { useProductContext } from "@/contexts/ProductContext";
import FileImageForm from "./image/File-Image-Form";
import ProductInputForm from "./Product-Input-Form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewProductForm = () => {
  const router = useRouter();
  const { state } = useProductContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.images.length === 0) {
      toast.error("이미지를 추가해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price.toString());
    formData.append("options", JSON.stringify(state.options));

    state.images.forEach((image) => {
      formData.append("images", image.image);
    });

    try {
      const response = await fetch("../../api/stores/0/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log(await response.json());
        router.push("/owner");
      } else {
        toast.error(await response.text());
      }
    } catch (error) {
      toast.error("상품 등록에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-[42px]">
      <FileImageForm name="image" />
      <ProductInputForm />
    </form>
  );
};

export default NewProductForm;
