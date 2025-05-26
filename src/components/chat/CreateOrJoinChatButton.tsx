"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

type Props = {
  storeId: number;
  className?: string;
  variant?: ButtonProps["variant"];
  children: React.ReactNode;
};

export default function CreateOrJoinChatButton({ storeId, className, variant, children }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId }),
      });

      const data = await res.json();

      if (data.ok && data.ok && data.roomId) {
        router.push(`/chat/${data.roomId}`); // 채팅 페이지로 이동
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("채팅방 생성 오류:", error);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Button onClick={handleClick} className={className} variant={variant}>
      {children}
    </Button>
  );
}
