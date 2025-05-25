"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { deleteRoom } from "@/lib/actions/chat";
import { CHAT_ROUTES } from "@/constants/routes";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    name: string;
    lastChat: string;
    lastChatAt: Date;
  };
};

export function SidebarItem({ item }: Props) {
  const { id, href, icon, name, lastChat, lastChatAt } = item;
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(id);
      toast.success("삭제에 성공했습니다.");
      router.push(CHAT_ROUTES.ROOMS);
      setTimeout(() => {
        router.refresh();
      }, 100);
    } catch (error) {
      console.error(error);
      toast.error("삭제에 실패했습니다.");
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";

    const now = new Date();
    const isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return html;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  };

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "group hover:bg-primary-100 flex items-center justify-between border-b p-3 text-sm text-zinc-800 hover:text-black",
        isMenuOpen || pathname === href ? "bg-gray-100 text-black" : "text-zinc-400"
      )}
    >
      {/* icon, name, lastChat 영역 */}
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="w-[155px] truncate font-semibold text-zinc-500">{name}</div>
            <div className="text-xs text-zinc-400">{formatTime(lastChatAt)}</div>
          </div>
          <div className="w-[180px] truncate text-sm text-zinc-500">{stripHtml(lastChat)}</div>
        </div>
      </div>
      {/* 드롭다운 메뉴 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis className={cn("text-gray-400 group-hover:block hover:text-black", isMenuOpen ? "block text-gray-500" : "text-gray-400 md:hidden")} />
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
