"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
      className={cn("group hover:bg-primary-100 flex items-center justify-between border-b p-3 text-sm text-zinc-800 hover:text-black", pathname === href ? "bg-gray-100 text-black" : "text-zinc-400")}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="w-[180px] truncate font-semibold text-zinc-500">{name}</div>
            <div className="text-xs text-zinc-400">{formatTime(lastChatAt)}</div>
          </div>
          <div className="w-[180px] truncate text-sm text-zinc-500">{stripHtml(lastChat)}</div>
        </div>
      </div>
    </Link>
  );
}
