"use client";
import { createContext, useContext, useState } from "react";

export type SessionPayload = {
  id: string;
  name: string;
  role: "USER" | "OWNER";
};

const SessionContext = createContext<{ session: SessionPayload | null }>({ session: null });

export const SessionProvider = ({ children, session }: { children: React.ReactNode; session: SessionPayload | undefined }) => {
  return <SessionContext.Provider value={{ session: session || null }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
