import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/chat/Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen w-[90%] flex-col items-center overflow-hidden">
      <Header />
      <div className="mt-5 mb-5 h-full w-[80%] overflow-hidden md:flex">
        {/* 사이드바 영역 */}
        <div className="hidden h-full w-[300px] flex-col border-r md:block">
          <Sidebar />
        </div>
        {/* chat 영역 */}
        <div className="flex h-full flex-1 flex-col overflow-hidden border">{children}</div>
      </div>
    </div>
  );
}
