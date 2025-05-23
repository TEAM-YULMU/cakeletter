"use client";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Ellipsis, LogOut } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
// import { deleteConversation, } from "@/actions/conversation";
import { BASE_URL } from "@/constants/routes";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    name: string;
    label: string;
  };
};

export function SidebarItem({ item }: Props) {
  const { id, href, icon, name, label } = item;
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      // await deleteConversation(id);
      toast.success("삭제에 성공했습니다.");
      if (params.conversationId === id) {
        router.push(BASE_URL);
      }
    } catch (error) {
      console.error(error);
      toast.error("삭제에 실패했습니다.");
    }
  };

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "group flex items-center justify-between border p-3 text-sm text-zinc-800 hover:bg-gray-100 hover:text-black",

        isMenuOpen || pathname === href ? "bg-white text-black" : "text-zinc-400"
      )}
    >
      {/* label영역 */}
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col">
          <div className="text truncate font-semibold">{name}</div>
          <div className="truncate text-sm text-zinc-500">{label}</div>
        </div>
      </div>
      {/* 드롭다운 메뉴 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis className={cn("text-gray-400 group-hover:block hover:text-black", isMenuOpen ? "block text-white" : "text-gray-400 md:hidden")} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2" onClick={handleDelete}>
              <LogOut size={18} />
              나가기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
