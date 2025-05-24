"use client";

import { ChatContainer, MainContainer, Message, MessageInput, MessageList, type MessageModel } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useSession } from "@/hooks/session-context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import { getChatMessages } from "@/lib/actions/chat";

export default function ChatRoomPage() {
  const { session } = useSession();
  const params = useParams();
  const roomId = Number(params.chatId);

  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (!roomId || !session?.id) return;

    // 기존 채팅 불러오기
    getChatMessages(roomId).then((data) => {
      const formatted = data.map(
        (chat): MessageModel => ({
          message: chat.chat,
          sender: chat.member?.name ?? "unknown",
          direction: chat.memberId === Number(session.id) ? "outgoing" : "incoming",
          position: "single",
        })
      );
      setMessages(formatted);
    });

    // 소켓 룸 입장
    socket.emit("onJoinRoom", roomId);

    // 새 메시지 수신
    socket.on("onReceive", (data: { member: { id: number; name: string }; chat: string }) => {
      const newMsg: MessageModel = {
        message: data.chat,
        sender: data.member.name,
        direction: data.member.id === Number(session.id) ? "outgoing" : "incoming",
        position: "single",
      };
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("onReceive");
    };
  }, [roomId]);

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
      },
    ]);
  };

  return (
    <div className="h-full w-full bg-gray-100 p-3">
      <div className="flex h-full flex-col">
        <MainContainer className="h-full">
          <ChatContainer className="flex h-full flex-col">
            <MessageList autoScrollToBottom={true} scrollBehavior="smooth" className="mt-2 min-h-0 flex-1 overflow-y-auto">
              {messages.map((m, idx) => (
                <div key={idx} className="mb-2">
                  {m.direction === "incoming" && <div className="ml-2 text-xs text-gray-600">{m.sender}</div>}
                  <Message model={m} />
                </div>
              ))}
            </MessageList>
            <MessageInput placeholder="메시지를 입력하세요..." onSend={sendMessage} className="shrink-0" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
