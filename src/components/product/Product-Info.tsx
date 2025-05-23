import { Product } from "@/types/product";
import OptionInfo from "./Option-Info";
import { Button } from "../ui/button";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="mix-w-[300px] flex w-full max-w-[550px] flex-col gap-5">
      <p className="f40">{product.name}</p>
      <p className="f18 text-sub-text">{product.description}</p>
      <p className="f32 text-primary-300">{product.price.toLocaleString()}원</p>
      {product.options.map((option) => (
        <OptionInfo key={option.id} option={option} />
      ))}
      <Button className="f16 bg-primary-300 hover:bg-primary-400 h-12 w-full">{"주문하기 >"}</Button>
    </div>
  );
}
