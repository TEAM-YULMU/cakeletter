import { CircleUserRound } from "lucide-react";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";
// import { getConversationsByUser } from "@/data/user";

const SIDEBAR_ITEM = [
  {
    id: "1",
    name: "이름",
    label: "새로운 대화",
    icon: <CircleUserRound className="text-gray-600" size={26} />,
    href: CHAT_ROUTES.CONVERSATIONS,
  },
  {
    id: "2",
    name: "이름",
    label: "새로운 대화",
    icon: <CircleUserRound className="text-gray-600" size={26} />,
    href: CHAT_ROUTES.CONVERSATIONS,
  },
  {
    id: "3",
    name: "이름",
    label: "새로운 대화",
    icon: <CircleUserRound className="text-gray-600" size={26} />,
    href: CHAT_ROUTES.CONVERSATIONS,
  },
];

export async function Sidebar() {
  //   const conversations = await getConversationsByUser();

  //   const formattedItems = [
  //     NEW_SIDEBAR_ITEM,
  //     ...conversations.map((conversation) => ({
  //       id: conversation.id,
  //       label: conversation.name || "",
  //       icon: <MessageSquare />,
  //       href: `${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`,
  //     })),
  //   ];

  const formattedItems = SIDEBAR_ITEM;

  return (
    <nav className="flex h-full flex-col bg-white text-black">
      {/*메뉴 아이템 */}
      <div className="flex flex-col overflow-y-auto">
        {formattedItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
}
