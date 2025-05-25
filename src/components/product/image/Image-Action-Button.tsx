import { PropsWithChildren } from "react";

type Props = {
  size: number;
  onAction: () => void;
};

export default function ImageActionButton({ size, onAction, children }: PropsWithChildren<Props>) {
  const xSize = size > 200 ? 40 : 20;
  const xPadding = size > 200 ? 8 : 4;
  const xMargin = size > 200 ? 10 : 4;

  return (
    <button
      className="absolute z-10 cursor-pointer rounded-full bg-black/20"
      style={{
        padding: `${xPadding}px`,
        top: `${xMargin}px`,
        right: `${xMargin}px`,
        width: `${xSize}px`,
        height: `${xSize}px`,
      }}
      type="button"
      onClick={onAction}
    >
      {children}
    </button>
  );
}
