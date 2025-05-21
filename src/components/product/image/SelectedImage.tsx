import SquareImage from "@/components/SquareImage";
import { X } from "lucide-react";

type Props = {
  src: string | File;
  alt: string;
  size: number;
  isFixedSize?: boolean;
  idx: number;
  onRemove: (idx: number) => void;
};

export default function SelectedImage({ src, alt, size, isFixedSize, idx, onRemove }: Props) {
  const xSize = size > 200 ? 40 : 20;
  const xPadding = size > 200 ? 8 : 4;
  const xMargin = size > 200 ? 10 : 4;

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
      <button
        className="absolute z-10 cursor-pointer rounded-full bg-black/20"
        style={{
          padding: `${xPadding}px`,
          top: `${xMargin}px`,
          right: `${xMargin}px`,
          width: `${xSize}px`,
          height: `${xSize}px`,
        }}
        type="button"
        onClick={() => onRemove(idx)}
      >
        <X className="h-full w-full text-white" />
      </button>
    </div>
  );
}
