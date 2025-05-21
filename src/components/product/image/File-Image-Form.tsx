"use client";

import { ChangeEvent, useRef } from "react";
import PlusBox from "../../plus-box";
import { ImageInput } from "../../Image-Input";
import SelectedImage from "./SelectedImage";
import { useProductContext } from "@/contexts/ProductContext";
import toast from "react-hot-toast";

type Props = {
  name: string;
};

export default function FileImageForm({ name }: Props) {
  const { state, dispatch } = useProductContext();
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

    if (state.images.length + files.length > maxImageCount) {
      toast.error("최대 5장까지만 추가할 수 있습니다.");
      return;
    }

    dispatch({ type: "ADD_IMAGES", images: Array.from(files) });

    // Ref 초기화
    // 초기화 안할 경우 특정 이미지 추가하고 제거 후 다시 같은 이미지 추가하면 추가가 안됨
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  const handleClickToRemoveImage = (index: number) => {
    dispatch({ type: "REMOVE_IMAGE", index: index });
  };

  return (
    <div className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
      <ImageInput name={name} onChange={handleSelectImages} ref={imageInput} />
      {state.images.length === 0 && <PlusBox size={550} onClick={handleClickToAddImage} />}
      {state.images.length >= 1 && (
        <div>
          <div className="relative mb-[10px] aspect-square h-full max-h-[550px] w-full max-w-[550px] overflow-hidden">
            <SelectedImage src={state.images[0].image} alt={"thumbnail"} size={550} idx={0} onRemove={handleClickToRemoveImage} />
          </div>
          <div className="flex flex-wrap gap-[10px]">
            {state.images.slice(1).map((src, index) => (
              <SelectedImage key={index} src={src.image} alt={`Selected image ${index + 1}`} size={100} isFixedSize={false} idx={index + 1} onRemove={handleClickToRemoveImage} />
            ))}
            {state.images.length < maxImageCount && <PlusBox size={100} onClick={handleClickToAddImage} />}
          </div>
        </div>
      )}
    </div>
  );
}
