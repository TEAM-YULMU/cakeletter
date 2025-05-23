"use client";

import { useRouter } from "next/navigation";

type BackTitleProps = {
  title: string;
};

export default function BackTitle({ title }: BackTitleProps) {
  const router = useRouter();

  return (
    <div className="ml-15 flex items-center gap-2">
      <button onClick={() => router.back()} className="f28 text-primary-text hover:text-sub-text leading-none font-medium">
        &lt; {title}
      </button>
    </div>
  );
}
