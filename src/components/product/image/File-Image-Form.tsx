"use client";

import { ChangeEvent, useRef, useState } from "react";
import PlusBox from "../../plus-box";
import { ImageInput } from "../../Image-Input";
import SelectedImage from "./SelectedImage";

type Props = {
  name: string;
};

export default function FileImageForm({ name }: Props) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);
  const maxImageCount = 5;
  const maxWidth = 550;

  const handleClickToAddImage = () => {
    imageInput.current?.click();
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const fileReaders: FileReader[] = [];
    const imageUrls: string[] = [];

    // 최대 5장까지 추가 가능
    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReaders.push(fileReader);

      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          imageUrls.push(fileReader.result);

          if (imageUrls.length === files.length) {
            setSelectedImages((prev) => [...prev, ...imageUrls]);
          }
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleClickToRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
      <ImageInput name={name} onChange={handleSelectImages} ref={imageInput} />
      {selectedImages.length === 0 && <PlusBox size={550} onClick={handleClickToAddImage} />}
      {selectedImages.length >= 1 && (
        <div>
          <div className="relative mb-[10px] aspect-square h-full max-h-[550px] w-full max-w-[550px] overflow-hidden">
            <SelectedImage src={selectedImages[0]} alt={"thumbnail"} size={550} idx={0} onRemove={handleClickToRemoveImage} />
          </div>
          <div className="flex flex-wrap gap-[10px]">
            {selectedImages.slice(1).map((src, index) => (
              <SelectedImage key={index} src={src} alt={`Selected image ${index + 1}`} size={100} isFixedSize={false} idx={index + 1} onRemove={handleClickToRemoveImage} />
            ))}
            {selectedImages.length < maxImageCount && <PlusBox size={100} onClick={handleClickToAddImage} />}
          </div>
        </div>
      )}
    </div>
  );
}
