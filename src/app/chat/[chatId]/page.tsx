"use client";

import { ChatContainer, MainContainer, Message, MessageInput, MessageList } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useSession } from "@/hooks/session-context";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socketClient";
import { cn } from "@/lib/utils";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ImageInput } from "@/components/Image-Input";
import SquareImage from "@/components/SquareImage";
import toast from "react-hot-toast";
import { CHAT_ROUTES } from "@/constants/routes";

type MessageModel = {
  message: string;
  image?: string | File;
  sender: string;
  direction: "incoming" | "outgoing";
  position: "single";
  createdAt?: Date;
};

type ChatResponse = {
  id: number;
  chat: string | null;
  imageUrl: string | null;
  memberId: number;
  roomId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  member: {
    id: number;
    name: string;
  };
};

export default function ChatRoomPage() {
  const imageInput = useRef<HTMLInputElement>(null);
  const { session } = useSession();
  const router = useRouter();
  const params = useParams();
  const roomId = Number(params.chatId);

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (!roomId || !session?.id) return;

    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${roomId}/messages`);

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "채팅방 정보를 불러올 수 없습니다.");
        router.push(CHAT_ROUTES.ROOMS);
        router.refresh();
        return;
      }

      const data = await res.json();

      setRoomName(data.room.name);

      const formatted = data.messages.map(
        (chat: ChatResponse): MessageModel => ({
          message: chat.chat ?? "",
          image: chat.imageUrl ?? "",
          sender: chat.member?.name ?? "unknown",
          direction: chat.memberId === Number(session?.id) ? "outgoing" : "incoming",
          position: "single",
          createdAt: new Date(chat.createdAt),
        })
      );

      setMessages(formatted);
    };

    fetchMessages();

    // 소켓 룸 입장
    socket.emit("onJoinRoom", roomId);

    // 새 메시지 수신
    socket.on("onReceive", (data: { member: { id: number; name: string }; chat: string; image: string; createdAt: string }) => {
      const newMsg: MessageModel = {
        message: data.chat,
        image: data.image,
        sender: data.member.name,
        direction: data.member.id === Number(session.id) ? "outgoing" : "incoming",
        position: "single",
        createdAt: new Date(data.createdAt),
      };
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("onReceive");
    };
  }, [roomId, session?.id]);

  const sendMessage = (text: string) => {
    if (!session?.id) return;

    socket.emit("onSend", {
      memberId: Number(session.id),
      roomId,
      chat: text,
    });

    setMessages((prev) => [
      ...prev,
      {
        message: text,
        sender: "me",
        direction: "outgoing",
        position: "single",
        createdAt: new Date(),
      },
    ]);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleClickToAddImage = () => {
    imageInput.current?.click();
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !session) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result as string;

      socket.emit("onSend", {
        memberId: Number(session?.id),
        roomId,
        chat: "",
        imageData: base64Image,
      });

      setMessages((prev) => [
        ...prev,
        {
          message: "",
          image: base64Image,
          sender: "me",
          direction: "outgoing",
          position: "single",
          createdAt: new Date(),
        },
      ]);
    };

    reader.readAsDataURL(file);

    // Ref 초기화
    // 초기화 안할 경우 특정 이미지 추가하고 제거 후 다시 같은 이미지 추가하면 추가가 안됨
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  return (
    <div className="h-full w-full bg-gray-100 p-1">
      <div className="flex h-full flex-col">
        {/* 고정된 높이의 헤더 */}
        <div className="mb-1 h-auto shrink-0">
          <ChatHeader
            room={{
              id: String(roomId),
              name: roomName,
            }}
          />
        </div>
        {/* 나머지 영역이 채팅 컨텐츠 (스크롤 가능) */}
        <div className="flex flex-1 overflow-hidden">
          <ImageInput name={"image"} onChange={handleSelectImages} ref={imageInput} />
          <MainContainer className="h-full w-full">
            <ChatContainer className="flex h-full flex-col">
              {/* 메시지 영역이 스크롤 대상 */}
              <MessageList autoScrollToBottom autoScrollToBottomOnMount scrollBehavior="smooth" className="mt-2 min-h-0 flex-1 overflow-y-auto px-1">
                {messages.map((m, idx) => (
                  <div key={idx} className="mb-2">
                    {m.direction === "incoming" && <div className="ml-1 text-sm text-gray-600">{m.sender}</div>}
                    {m.image ? (
                      <div className={cn("mt-1 flex flex-row", m.direction === "incoming" ? "justify-start" : "justify-end")}>
                        <SquareImage src={m.image} alt="image" size={200} />
                      </div>
                    ) : (
                      <Message model={m} />
                    )}
                    <div className={cn("mt-1 text-xs text-gray-400", m.direction === "incoming" ? "ml-1 text-left" : "mr-1 mb-3 text-right")}>{formatTime(m.createdAt)}</div>
                  </div>
                ))}
              </MessageList>
              <MessageInput className="shrink-0" placeholder="메시지를 입력하세요..." onSend={sendMessage} onAttachClick={handleClickToAddImage} />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}
