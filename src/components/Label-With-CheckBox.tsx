import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type Props = {
  checked: boolean;
  label: string;
  onChange: (checked: CheckedState) => void;
};

export default function LabelWithCheckBox({ checked, label, onChange }: Props) {
  return (
    <div className="flex flex-row gap-[8px]">
      <Checkbox className="border-sub-text data-[state=checked]:bg-sub-text data-[state=checked]:border-sub-text" checked={checked} onCheckedChange={onChange} />
      <Label className="text-sub-text">{label}</Label>
    </div>
  );
}
