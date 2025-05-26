"use client";

import { ChatContainer, MainContainer, Message, MessageInput, MessageList } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useSession } from "@/hooks/session-context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import { getChatMessages } from "@/lib/actions/chat";
import { cn } from "@/lib/utils";
import { ChatHeader } from "@/components/chat/ChatHeader";

type MessageModel = {
  message: string;
  sender: string;
  direction: "incoming" | "outgoing";
  position: "single";
  createdAt?: Date;
};

export default function ChatRoomPage() {
  const { session } = useSession();
  const params = useParams();
  const roomId = Number(params.chatId);

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (!roomId || !session?.id) return;

    // 기존 채팅 불러오기
    getChatMessages(roomId).then((data) => {
      setRoomName(data.room.name); // 채팅방 이름 -> 채팅방 이름 가게 이름으로 저장

      const formatted = data.messages.map(
        (chat): MessageModel => ({
          message: chat.chat,
          sender: chat.member?.name ?? "unknown",
          direction: chat.memberId === Number(session.id) ? "outgoing" : "incoming",
          position: "single",
          createdAt: new Date(chat.createdAt),
        })
      );

      setMessages(formatted);
    });

    // 소켓 룸 입장
    socket.emit("onJoinRoom", roomId);

    // 새 메시지 수신
    socket.on("onReceive", (data: { member: { id: number; name: string }; chat: string; createdAt: string }) => {
      const newMsg: MessageModel = {
        message: data.chat,
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
          <MainContainer className="h-full w-full">
            <ChatContainer className="flex h-full flex-col">
              {/* 메시지 영역이 스크롤 대상 */}
              <MessageList autoScrollToBottom autoScrollToBottomOnMount scrollBehavior="smooth" className="mt-2 min-h-0 flex-1 overflow-y-auto px-1">
                {messages.map((m, idx) => (
                  <div key={idx} className="mb-2">
                    {m.direction === "incoming" && <div className="ml-1 text-sm text-gray-600">{m.sender}</div>}
                    <Message model={m} />
                    <div className={cn("mt-1 text-xs text-gray-400", m.direction === "incoming" ? "ml-1 text-left" : "mr-1 mb-3 text-right")}>{formatTime(m.createdAt)}</div>
                  </div>
                ))}
              </MessageList>
              <MessageInput placeholder="메시지를 입력하세요..." onSend={sendMessage} className="shrink-0" />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}
