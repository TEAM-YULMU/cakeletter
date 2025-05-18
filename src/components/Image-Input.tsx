import { ChangeEventHandler, forwardRef } from "react";

type Props = {
  name: string;
  isMultiple?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const ImageInput = forwardRef<HTMLInputElement, Props>(({ name, isMultiple, onChange }: Props, ref) => {
  return <input className="hidden" type="file" id={name} name={name} accept="image/png, image/jpeg" multiple={isMultiple ?? true} ref={ref} onChange={onChange} required />;
});
