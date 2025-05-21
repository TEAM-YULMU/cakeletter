"use client";

type Props = {
  size: number;
  onClick: () => void;
};

export default function CakeImageBox({ size, onClick }: Props) {
  return (
    <div className="border-line relative flex aspect-square items-center justify-center border-[3px]" style={{ maxWidth: `${size}px`, maxHeight: `${size}px`, width: "100%" }} onClick={onClick}>
      <img src={"/images/cake_image.png"} alt={"cake_image"} className="h-[50%] w-[50%]"></img>
      {/* 플러스 아이콘 */}
      {/* <div className="absolute inset-0 flex items-center justify-center"> */}
      {/* 수평선 */}
      {/* <div className="bg-line absolute h-[3px] w-1/4 rounded-full" /> */}
      {/* 수직선 */}
      {/* <div className="bg-line absolute h-1/4 w-[3px] rounded-full" /> */}
      {/* </div> */}
    </div>
  );
}
