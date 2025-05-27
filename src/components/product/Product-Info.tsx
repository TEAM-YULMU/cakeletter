import { Product } from "@/types/product";
import OptionInfo from "./Option-Info";
import CreateOrJoinChatButton from "../chat/CreateOrJoinChatButton";

type Props = {
  product: Product;
  storeId: number;
};

export default function ProductInfo({ product, storeId }: Props) {
  return (
    <div className="mix-w-[300px] flex w-full max-w-[600px] flex-col gap-7.5">
      <p className="f36 text-medium text-primary-text leading-none">{product.name}</p>
      <p className="f22 text-medium text-sub-text leading-none">{product.description}</p>
      <p className="f32 text-primary-300 leading-none">{product.price.toLocaleString()}원</p>
      {product.options.map((option) => (
        <OptionInfo key={option.id} option={option} />
      ))}
      <CreateOrJoinChatButton storeId={storeId} className="f18 bg-primary-300 hover:bg-primary-400 h-12 w-full">
        {"주문하기 >"}
      </CreateOrJoinChatButton>
    </div>
  );
}
