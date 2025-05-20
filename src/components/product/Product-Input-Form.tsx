"use client";

import { useState } from "react";
import LabelWithInput from "../Label-With-Input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CirclePlus } from "lucide-react";
import OptionInputForm from "./Option-Input-Form";
import { Button } from "../ui/button";
import { useProductContext } from "@/contexts/ProductContext";

export default function ProductInputForm() {
  const { state, dispatch } = useProductContext();
  const [price, setPrice] = useState("");

  const parsePrice = (value: string) => {
    const numeric = value.replace(/[^\d]/g, ""); // 숫자만 남김
    if (!numeric) return "";
    const number = parseInt(numeric, 10);
    if (isNaN(number)) return "";
    return number;
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FIELD", key: "name", value: event.target.value });
  };

  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FIELD", key: "description", value: event.target.value });
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedPrice = parsePrice(event.target.value);

    // 3자리마다 , 추가
    setPrice(parsedPrice.toLocaleString());

    dispatch({ type: "UPDATE_FIELD", key: "price", value: parsedPrice });
  };

  const handleAddOption = () => {
    dispatch({ type: "ADD_OPTION_GROUP" });
  };

  const handleRemoveOption = (optionIdx: number) => {
    dispatch({ type: "REMOVE_OPTION_GROUP", index: optionIdx });
  };

  return (
    <div className="mix-w-[300px] flex w-full max-w-[550px] flex-col gap-[20px]">
      <LabelWithInput name="name" label="케이크 이름" type="text" placeholder="케이크 이름을 입력해주세요" onChange={handleChangeName} />
      <LabelWithInput name="desc" label="케이크 설명" type="text" placeholder="케이크 설명을 입력해주세요" onChange={handleChangeDesc} />
      <LabelWithInput name="price" label="케이크 가격">
        <Input id="price" name="price" type="text" inputMode="numeric" value={price} maxLength={11} placeholder="케이크 가격을 입력해주세요" onChange={handleChangePrice} />
      </LabelWithInput>
      <div className="flex flex-row justify-between">
        <Label className="text-sub-text">커스텀 옵션</Label>
        <button className="cursor-pointer" type="button" onClick={handleAddOption}>
          <CirclePlus className="text-sub-text h-[22px] w-[22px]" />
        </button>
      </div>

      {state.options.map((option, index) => (
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
