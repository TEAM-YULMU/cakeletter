import { useImagePreview } from "@/hooks/useImagePreview";
import Image from "next/image";

type Props = {
  src: string | File;
  alt: string;
  size: number;
  isFixedSize?: boolean;
};

export default function SquareImage({ src, alt, size, isFixedSize }: Props) {
  const imageUrl = typeof src === "string" ? src : useImagePreview(src);

  if (!imageUrl) {
    return (
      <div
        className="bg-line relative aspect-square overflow-hidden"
        style={{
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          width: isFixedSize ? `${size}px` : "100%",
          height: isFixedSize ? `${size}px` : "100%",
        }}
      ></div>
    );
  }

  return (
    <div
      className="relative aspect-square overflow-hidden"
      style={{
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        width: isFixedSize ? `${size}px` : "100%",
        height: isFixedSize ? `${size}px` : "100%",
      }}
    >
      <Image className="object-cover" src={imageUrl} alt={alt} fill />
    </div>
  );
}
