import { PropsWithChildren } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  name: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelWithInput({ name, label, type, value, placeholder, maxLength, required = false, onChange, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-[8px]">
      <Label className="text-sub-text" htmlFor={name}>
        {label}
      </Label>
      {children || <Input className="bg-white" id={name} name={name} type={type ?? "text"} value={value} placeholder={placeholder} maxLength={maxLength} onChange={onChange} required={required} />}
    </div>
  );
}
