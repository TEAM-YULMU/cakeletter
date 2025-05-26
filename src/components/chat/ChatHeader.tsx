import { ConversationHeader } from "@chatscope/chat-ui-kit-react";
import { Ellipsis, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { deleteRoom } from "@/lib/actions/chat";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CHAT_ROUTES } from "@/constants/routes";
import { useState } from "react";

export function ChatHeader({ room }: { room: { id: string; name: string; avatar?: string } }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(room.id);
      toast.success("채팅방을 나갔습니다.");
      router.push(CHAT_ROUTES.ROOMS);
      router.refresh();
      // setTimeout(() => { router.refresh(); }, 100);
    } catch (err) {
      toast.error("나가기 실패");
      console.error(err);
    }
  };

  return (
    <ConversationHeader>
      <ConversationHeader.Content className="text-base" userName={room.name} />
      <ConversationHeader.Actions>
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis className={cn("text-gray-400 group-hover:block hover:text-black", isMenuOpen ? "block text-gray-500" : "text-gray-400")} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2" onClick={handleDelete}>
              <LogOut size={18} />
              나가기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConversationHeader.Actions>
    </ConversationHeader>
  );
}
