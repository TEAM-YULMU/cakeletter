export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[1280] justify-center px-[78]">{children}</div>
    </div>
  );
}
