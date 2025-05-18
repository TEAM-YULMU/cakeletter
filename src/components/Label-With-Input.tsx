import { PropsWithChildren } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
};

export default function LabelWithInput({ name, label, type, placeholder, maxLength, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-[8px]">
      <Label className="text-sub-text" htmlFor={name}>
        {label}
      </Label>
      {children || <Input className="bg-white" id={name} name={name} type={type ?? "text"} placeholder={placeholder} maxLength={maxLength} />}
    </div>
  );
}
