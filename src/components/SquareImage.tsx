import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Props = {
  src: string | StaticImport;
  alt: string;
  size: number;
  isFixedSize?: boolean;
};

export default function SquareImage({ src, alt, size, isFixedSize }: Props) {
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
      <Image src={src} alt={alt} fill objectFit="cover" />
    </div>
  );
}
