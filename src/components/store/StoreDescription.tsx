export default function StoreDescription({ content }: { content: string }) {
  return (
    <div className="mt-4 max-h-[500px] flex-grow overflow-y-auto pr-1">
      <p className="f22 text-regular text-sub-text whitespace-pre-line">{content}</p>
    </div>
  );
}
