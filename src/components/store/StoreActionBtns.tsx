"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateOrJoinChatButton from "../chat/CreateOrJoinChatButton";

export default function StoreActionButtons({ storeId }: { storeId: number }) {
  const router = useRouter();

  return (
    <div className="mt-4 flex justify-start gap-3">
      <Button variant="outline" className="f16 bg-primary-100 text-sub-text hover:bg-primary-200 h-12 w-50 rounded-md border-none" onClick={() => router.push(`/store/${storeId}/product`)}>
        상품 보기 &gt;
      </Button>

      <CreateOrJoinChatButton storeId={storeId} variant="outline" className="f16 bg-secondary-100 text-sub-text hover:bg-secondary-300 h-12 w-50 rounded-md border-none">
        {"커스텀 주문 >"}
      </CreateOrJoinChatButton>
    </div>
  );
}
