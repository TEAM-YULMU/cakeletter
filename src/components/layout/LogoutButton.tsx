"use client";

import { deleteSession } from "@/lib/actions/sessions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button onClick={() => deleteSession()} className="text-muted-foreground hover:text-primary flex cursor-pointer items-center font-medium transition-colors">
      <LogOut className="mr-2 h-4 w-4" />
      LOGOUT
    </button>
  );
}
