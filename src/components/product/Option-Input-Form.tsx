import { CirclePlus, X } from "lucide-react";
import { Label } from "../ui/label";
import LabelWithInput from "../Label-With-Input";
import { useState } from "react";
import OptionItemInputForm from "./Option-item-Input-Form";

type ProductOptionItem = {
  id: string;
  name: string;
  desc?: string;
  additionalPrice?: number;
};

type Props = {
  index: number;
  onRemoveOption: (index: number) => void;
};

export default function OptionInputForm({ index, onRemoveOption }: Props) {
  const [items, setItems] = useState<ProductOptionItem[]>([]);

  const optionName = `option${index}`;

  const handleAddItem = () => {
    const id = crypto.randomUUID();
    setItems((prev) => [
      ...prev,
      {
        id: id,
        name: "",
      },
    ]);
  };

  const handleRemoveItem = (itemIdx: number) => {
    setItems((prev) => prev.filter((_, index) => index !== itemIdx));
  };

  return (
    <div className="flex flex-col gap-[14px] bg-[#D9D9D9] p-[20px]">
      <div className="flex flex-row justify-between">
        <Label className="text-sub-text">Option{index + 1}</Label>
        <button className="cursor-pointer" type="button" onClick={() => onRemoveOption(index)}>
          <X className="text-sub-text h-[22px] w-[22px]" />
        </button>
      </div>

      <LabelWithInput label="옵션 제목" name={`${optionName}-name`} placeholder="추가할 옵션의 제목을 입력해주세요" />

      {items.map((item, index) => (
        <div key={item.id}>
          <OptionItemInputForm index={index} optionFormName={optionName} onRemoveItem={handleRemoveItem} />
        </div>
      ))}

      <button className="pointer-events-none flex cursor-pointer justify-center" type="button" onClick={handleAddItem}>
        <CirclePlus className="text-sub-text pointer-events-auto h-[22px] w-[22px]" />
      </button>
    </div>
  );
}
