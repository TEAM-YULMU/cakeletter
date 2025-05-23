"use client";

import SquareImage from "@/components/SquareImage";
import { ProductImage } from "@/types/product";
import { useState } from "react";
import ImageActionButton from "./Image-Action-Button";
import { Download } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  productName: string;
  images: ProductImage[];
};

const downloadImage = async (imageUrl: string, fileName = "downloaded.jpg") => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    toast.error("이미지 다운로드에 실패했어요");
  }
};

export default function ProductImageList({ productName, images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxSize = 550;

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const downloadCurrentImage = () => {
    downloadImage(images[currentIndex].image as string, `${productName}${currentIndex + 1}`);
  };

  return (
    <div className="w-full" style={{ maxWidth: `${maxSize}px` }}>
      <div>
        <div className="relative mb-[10px] aspect-square h-full max-h-[550px] w-full max-w-[550px] overflow-hidden" style={{ maxHeight: `${maxSize}px`, maxWidth: `${maxSize}px` }}>
          <SquareImage key={images[currentIndex].id} src={images[currentIndex].image} alt={"thumbnail"} size={550} />
          <ImageActionButton size={550} onAction={downloadCurrentImage}>
            <Download className="h-full w-full text-white" />
          </ImageActionButton>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {images
            .filter((_, i) => i !== currentIndex)
            .map((src, index) => (
              <SquareImage key={src.id} src={src.image} alt={`image ${index + 1}`} size={100} isFixedSize={false} onClick={() => handleImageClick(index)} />
            ))}
        </div>
      </div>
    </div>
  );
}
