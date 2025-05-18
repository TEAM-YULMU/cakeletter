import { useState } from "react";
import LabelWithInput from "../Label-With-Input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CirclePlus } from "lucide-react";
import OptionInputForm from "./Option-Input-Form";
import { Button } from "../ui/button";

type ProductOption = {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
};

export default function ProductInputForm() {
  const [price, setPrice] = useState("");
  const [options, setOptions] = useState<ProductOption[]>([]);

  const formatPrice = (value: string) => {
    const numeric = value.replace(/[^\d]/g, ""); // 숫자만 남김
    if (!numeric) return "";
    const number = parseInt(numeric, 10);
    if (isNaN(number)) return "";
    return number.toLocaleString();
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(event.target.value);
    setPrice(formatted);
  };

  const handleAddOption = () => {
    const id = crypto.randomUUID();

    setOptions((prev) => [
      ...prev,
      {
        id: id,
        name: "",
        required: false,
        multiple: false,
      },
    ]);
  };

  const handleRemoveOption = (optionIdx: number) => {
    setOptions((prev) => prev.filter((_, index) => index !== optionIdx));
  };

  return (
    <div className="mix-w-[300px] flex w-full max-w-[550px] flex-col gap-[20px]">
      <LabelWithInput name="name" label="케이크 이름" type="text" placeholder="케이크 이름을 입력해주세요" />
      <LabelWithInput name="desc" label="케이크 설명" type="text" placeholder="케이크 설명을 입력해주세요" />
      <LabelWithInput name="price" label="케이크 가격">
        <Input id="price" name="price" type="text" inputMode="numeric" value={price} pattern="\d*" maxLength={11} placeholder="케이크 가격을 입력해주세요" onChange={handleChangePrice} />
      </LabelWithInput>
      <div className="flex flex-row justify-between">
        <Label className="text-sub-text">커스텀 옵션</Label>
        <button className="cursor-pointer" type="button" onClick={handleAddOption}>
          <CirclePlus className="text-sub-text h-[22px] w-[22px]" />
        </button>
      </div>

      {options.map((option, index) => (
        <div key={option.id}>
          <OptionInputForm index={index} onRemoveOption={handleRemoveOption} />
        </div>
      ))}

      <Button className="bg-secondary-300 hover:bg-secondary-400 flex h-[48px] w-full" type="submit">
        완료
      </Button>
    </div>
  );
}
