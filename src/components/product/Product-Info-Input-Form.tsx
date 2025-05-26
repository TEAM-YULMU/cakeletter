"use client";

import { useState } from "react";
import LabelWithInput from "../Label-With-Input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CirclePlus } from "lucide-react";
import OptionInputForm from "./Option-Input-Form";
import { Button } from "../ui/button";
import { useProductContext } from "@/contexts/ProductContext";
import { DialogButton } from "../Dialog-Button";
import { Textarea } from "../ui/textarea";

type Props = {
  isSubmitting: boolean;
  onDelete?: () => void;
};

const parsePrice = (value: string) => {
  const numeric = value.replace(/[^\d]/g, ""); // 숫자만 남김
  if (!numeric) return "";
  const number = parseInt(numeric, 10);
  if (isNaN(number)) return "";
  return number;
};

export default function ProductInfoInputForm({ isSubmitting, onDelete }: Props) {
  const { state, dispatch } = useProductContext();
  const initialPrice = state.price === 0 ? "" : parsePrice(state.price.toString());
  const [price, setPrice] = useState(initialPrice);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FIELD", key: "name", value: event.target.value });
  };

  const handleChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <LabelWithInput name="name" label="케이크 이름" type="text" value={state.name} placeholder="케이크 이름을 입력해주세요" onChange={handleChangeName} required={true} />
      <LabelWithInput name="desc" label="케이크 설명" type="text">
        <Textarea className="h-36" id="desc" name="desc" placeholder="케이크 설명을 입력해주세요" rows={6} maxLength={1000} value={state.description} onChange={handleChangeDesc} />
      </LabelWithInput>
      <LabelWithInput name="price" label="케이크 가격">
        <Input id="price" name="price" type="text" inputMode="numeric" value={price} maxLength={11} placeholder="케이크 가격을 입력해주세요" onChange={handleChangePrice} required={true} />
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

      {state.id === 0 ? (
        // 상품 생성 버튼
        <Button className="bg-secondary-300 hover:bg-secondary-400 flex h-[48px] w-full" type="submit" disabled={isSubmitting}>
          완료
        </Button>
      ) : (
        // 상품 수정 버튼
        <div className="flex flex-row gap-[15px]">
          <DialogButton
            className="bg-primary-300 hover:bg-primary-400 flex h-[48px] flex-2"
            buttonLabel="삭제"
            title="정말 삭제하시겠습니까?"
            description="삭제한 상품은 복구할 수 없습니다."
            onAction={onDelete!}
            actionLabel="삭제"
            actionClassName="bg-primary-300 hover:bg-primary-400"
          />
          <Button className="bg-secondary-300 hover:bg-secondary-400 flex h-[48px] flex-3" type="submit" disabled={isSubmitting}>
            완료
          </Button>
        </div>
      )}
    </div>
  );
}
