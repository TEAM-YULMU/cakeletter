"use client";

import { useProductContext } from "@/contexts/ProductContext";
import FileImageForm from "./image/File-Image-Form";
import ProductInfoInputForm from "./Product-Info-Input-Form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductInputForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { state } = useProductContext();

  const setFormData = () => {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price.toString());
    formData.append("options", JSON.stringify(state.options));

    state.images.forEach((image) => {
      formData.append("images", image.image);
    });

    state.removedUrlImages?.forEach((url) => {
      formData.append("removedUrlImages", url);
    });

    return formData;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.images.length === 0) {
      toast.error("이미지를 추가해주세요.");
      return;
    }

    setIsSubmitting(true);

    const formData = setFormData();

    try {
      const response = await fetch("/api/stores/0/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        router.push("/owner");
      } else if (response.status === 401) {
        const result = await response.json();
        toast.error(result.message);
        router.push("/login");
      } else {
        toast.error(await response.text());
      }

      setIsSubmitting(false);
    } catch (error) {
      toast.error("상품 등록에 실패했습니다.");
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.images.length === 0) {
      toast.error("이미지를 추가해주세요.");
      return;
    }

    setIsSubmitting(true);

    const formData = setFormData();

    try {
      const response = await fetch(`/api/stores/${state.storeId}/products/${state.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        // 요청 성공
        const result = await response.json();
        console.log(result);
        router.push("/owner");
      } else if (response.status === 401) {
        const result = await response.json();
        toast.error(result.message);
        router.push("/login");
      } else {
        toast.error(await response.text());
      }

      setIsSubmitting(false);
    } catch (error) {
      toast.error("상품 수정에 실패했습니다.");
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/stores/${state.storeId}/products/${state.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // 요청 성공
        toast.success("상품 삭제에 성공했습니다.");
        router.push("/owner");
      } else if (response.status === 401) {
        const result = await response.json();
        toast.error(result.message);
        router.push("/login");
      } else {
        toast.error(await response.text());
      }

      setIsSubmitting(false);
    } catch (error) {
      toast.error("상품 삭제에 실패했습니다.");
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={state.id === 0 ? handleAddProduct : handleEditProduct} className="product-form flex justify-center">
      <FileImageForm name="image" />
      <ProductInfoInputForm isSubmitting={isSubmitting} onDelete={handleDeleteProduct} />
    </form>
  );
};

export default ProductInputForm;
