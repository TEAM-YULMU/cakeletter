import { X } from "lucide-react";
import LabelWithInput from "../Label-With-Input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  index: number;
  optionFormName: string;
  onRemoveItem: (index: number) => void;
};

export default function OptionItemInputForm({ index, optionFormName, onRemoveItem }: Props) {
  const itemName = `${optionFormName}-${index}`;

  return (
    <div className="flex flex-col gap-[8px] border-t-[2px] border-white pt-[12px]">
      <div className="flex flex-row justify-between">
        <Label htmlFor={`${itemName}-name`} className="text-sub-text">
          항목
        </Label>
        <button className="cursor-pointer" type="button" onClick={() => onRemoveItem(index)}>
          <X className="text-sub-text h-[16px] w-[16px]" />
        </button>
      </div>
      <Input id={`${itemName}-name`} className="bg-white" name={`${itemName}-name`} placeholder="추가할 항목을 입력해주세요" />
      <LabelWithInput label="설명" name={`${itemName}-desc`} placeholder="설명을 입력해주세요" />
    </div>
  );
}
