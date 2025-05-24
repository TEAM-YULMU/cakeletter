import { CircleUserRound } from "lucide-react";
import { CHAT_ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";
import { getChatRoomsByMember } from "@/data/member";

// const SIDEBAR_ITEM = [
//   {
//     id: "1",
//     name: "이름",
//     lastChat: "새로운 대화",
//     icon: <CircleUserRound className="text-gray-600" size={26} />,
//     href: CHAT_ROUTES.ROOMS,
//   },
// ];

export async function Sidebar() {
  const rooms = await getChatRoomsByMember();

  const formattedItems = rooms.map((room) => ({
    id: String(room.id),
    name: room.members?.[0]?.name || "",
    lastChat: room.lastChat || "",
    icon: <CircleUserRound className="text-gray-600" size={26} />,
    href: `${CHAT_ROUTES.ROOMS}/${room.id}`,
  }));

  return (
    <nav className="b flex h-full flex-col border-t border-b border-l bg-white text-black">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {formattedItems.length > 0 ? (
          formattedItems.map((item) => <SidebarItem key={item.id} item={item} />)
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-4 text-center text-sm text-zinc-500">
            아직 대화가 없습니다.
            <br /> 새로운 대화를 시작해보세요!
          </div>
        )}
      </div>
    </nav>
  );
}
