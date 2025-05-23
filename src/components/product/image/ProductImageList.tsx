"use client";

import SquareImage from "@/components/SquareImage";
import { ProductImage } from "@/types/product";
import { useState } from "react";

type Props = {
  images: ProductImage[];
};

export default function ProductImageList({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxSize = 550;

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full" style={{ maxWidth: `${maxSize}px` }}>
      <div>
        <div className="relative mb-[10px] aspect-square h-full max-h-[550px] w-full max-w-[550px] overflow-hidden" style={{ maxHeight: `${maxSize}px`, maxWidth: `${maxSize}px` }}>
          <SquareImage key={images[currentIndex].id} src={images[currentIndex].image} alt={"thumbnail"} size={550} />
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
