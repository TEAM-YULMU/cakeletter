"use client";

import SquareImage from "@/components/SquareImage";
import { ProductImage } from "@/types/product";

type Props = {
  images: ProductImage[];
};

export default function ProductImageList({ images }: Props) {
  const maxSize = 550;

  return (
    <div className="w-full" style={{ maxWidth: `${maxSize}px` }}>
      <div>
        <div className="relative mb-[10px] aspect-square h-full max-h-[550px] w-full max-w-[550px] overflow-hidden" style={{ maxHeight: `${maxSize}px`, maxWidth: `${maxSize}px` }}>
          <SquareImage key={images[0].id} src={images[0].image} alt={"thumbnail"} size={550} />
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {images.slice(1).map((src, index) => (
            <SquareImage key={src.id} src={src.image} alt={`image ${index + 1}`} size={100} isFixedSize={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
