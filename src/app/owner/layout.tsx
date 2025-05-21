import { Header } from "@/components/layout/Header";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center">
      <Header />
      {children}
    </div>
  );
}
