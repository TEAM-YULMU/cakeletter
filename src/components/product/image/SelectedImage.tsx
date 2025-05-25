import SquareImage from "@/components/SquareImage";
import { X } from "lucide-react";
import ImageActionButton from "./Image-Action-Button";

type Props = {
  src: string | File;
  alt: string;
  size: number;
  isFixedSize?: boolean;
  idx: number;
  onRemove: (idx: number) => void;
};

export default function SelectedImage({ src, alt, size, isFixedSize, idx, onRemove }: Props) {
  return (
    <div
      className="relative"
      style={{
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        width: isFixedSize ? `${size}px` : "100%",
        height: isFixedSize ? `${size}px` : "100%",
      }}
    >
      <SquareImage src={src} alt={alt} size={size} isFixedSize={isFixedSize} />
      <ImageActionButton size={size} onAction={() => onRemove(idx)}>
        <X className="h-full w-full text-white" />
      </ImageActionButton>
    </div>
  );
}
