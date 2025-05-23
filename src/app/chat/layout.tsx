import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/chat/Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen w-[90%] flex-col items-center">
      <Header />
      <div className="mt-5 mb-5 h-full w-[80%] md:flex">
        {/* 사이드바 영역 */}
        <div className="hidden w-[300px] md:block">
          <Sidebar />
        </div>
        {/* Header + chat 영역 */}
        {/* <div className="flex h-full flex-1 flex-col overflow-y-auto border"> */}
        <div className="flex h-full flex-1 flex-col border">
          {/* <Header /> */}
          {children}
        </div>
      </div>
    </div>
  );
}
