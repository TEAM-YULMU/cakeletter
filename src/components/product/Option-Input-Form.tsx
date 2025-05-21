"use client";

import { CirclePlus, X } from "lucide-react";
import { Label } from "../ui/label";
import LabelWithInput from "../Label-With-Input";
import OptionItemInputForm from "./Option-item-Input-Form";
import { useProductContext } from "@/contexts/ProductContext";
import LabelWithCheckBox from "../Label-With-CheckBox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  index: number;
  onRemoveOption: (index: number) => void;
};

export default function OptionInputForm({ index, onRemoveOption }: Props) {
  const { state, dispatch } = useProductContext();

  const optionName = `option${index}`;

  const handleChangeOptionName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_OPTION_GROUP", index: index, key: "name", value: event.target.value });
  };

  const handleChangeRequired = (checked: CheckedState) => {
    dispatch({ type: "UPDATE_OPTION_GROUP", index: index, key: "required", value: checked });
  };

  const handleChangeMultiple = (checked: CheckedState) => {
    dispatch({ type: "UPDATE_OPTION_GROUP", index: index, key: "multiple", value: checked });
  };

  const handleAddItem = () => {
    dispatch({ type: "ADD_OPTION_ITEM", optionIndex: index });
  };

  const handleRemoveItem = (itemIdx: number) => {
    dispatch({ type: "REMOVE_OPTION_ITEM", optionIndex: index, itemIndex: itemIdx });
  };

  return (
    <div className="flex flex-col gap-[14px] bg-[#D9D9D9] p-[20px]">
      <div className="flex flex-row justify-between">
        <Label className="text-sub-text">Option{index + 1}</Label>
        <button className="cursor-pointer" type="button" onClick={() => onRemoveOption(index)}>
          <X className="text-sub-text h-[22px] w-[22px]" />
        </button>
      </div>

      <div className="grid grid-cols-2">
        <LabelWithCheckBox label="필수 선택" checked={state.options[index].required} onChange={handleChangeRequired} />
        <LabelWithCheckBox label="다중 선택 가능" checked={state.options[index].multiple} onChange={handleChangeMultiple} />
      </div>

      <LabelWithInput label="옵션 제목" name={`${optionName}-name`} placeholder="추가할 옵션의 제목을 입력해주세요" onChange={handleChangeOptionName} required={true} />

      {state.options[index] &&
        state.options[index].items.map((item, itemIndex) => (
          <div key={item.id}>
            <OptionItemInputForm optionIndex={index} index={itemIndex} optionFormName={optionName} onRemoveItem={handleRemoveItem} />
          </div>
        ))}

      <button className="pointer-events-none flex cursor-pointer justify-center" type="button" onClick={handleAddItem}>
        <CirclePlus className="text-sub-text pointer-events-auto h-[22px] w-[22px]" />
      </button>
    </div>
  );
}
