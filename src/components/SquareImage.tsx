import { useImagePreview } from "@/hooks/useImagePreview";
import Image from "next/image";

type Props = {
  src: string | File;
  alt: string;
  size: number;
  isFixedSize?: boolean;
  onClick?: () => void;
};

export default function SquareImage({ src, alt, size, isFixedSize, onClick }: Props) {
  const imageUrl = typeof src === "string" ? src : useImagePreview(src);

  if (!imageUrl) {
    return (
      <div
        className="bg-line relative aspect-square overflow-hidden rounded-md"
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
      onClick={onClick}
      className={`relative aspect-square overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
      style={{
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        width: isFixedSize ? `${size}px` : "100%",
        height: isFixedSize ? `${size}px` : "100%",
      }}
    >
      <Image className="rounded-md object-cover" src={imageUrl} alt={alt} fill />
    </div>
  );
}
