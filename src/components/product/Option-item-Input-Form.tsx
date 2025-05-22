import { X } from "lucide-react";
import LabelWithInput from "../Label-With-Input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useProductContext } from "@/contexts/ProductContext";

type Props = {
  optionIndex: number;
  index: number;
  optionFormName: string;
  onRemoveItem: (index: number) => void;
};

export default function OptionItemInputForm({ optionIndex, index, optionFormName, onRemoveItem }: Props) {
  const { state, dispatch } = useProductContext();
  const itemName = `${optionFormName}-${index}`;

  const handleChangeItemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_OPTION_ITEM",
      optionIndex: optionIndex,
      itemIndex: index,
      key: "name",
      value: event.target.value,
    });
  };

  const handleChangeItemDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_OPTION_ITEM",
      optionIndex: optionIndex,
      itemIndex: index,
      key: "description",
      value: event.target.value,
    });
  };

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
      <Input
        id={`${itemName}-name`}
        value={state.options[optionIndex].items[index].name}
        className="bg-white"
        name={`${itemName}-name`}
        placeholder="추가할 항목을 입력해주세요"
        onChange={handleChangeItemName}
        required
      />
      <LabelWithInput label="설명" name={`${itemName}-desc`} value={state.options[optionIndex].items[index].description} placeholder="설명을 입력해주세요" onChange={handleChangeItemDesc} />
    </div>
  );
}
