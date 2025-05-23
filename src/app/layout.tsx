import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { verify } from "@/lib/actions/sessions";
import { SessionProvider } from "@/hooks/session-context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await verify(cookie); // undefined 또는 { id, name, role }

  return (
    <html>
      <body className="w-full">
        <Toaster />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
