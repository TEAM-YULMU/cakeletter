import { StoreDetail } from "@/types/store";

export async function getStoreDetail(storeId: string): Promise<StoreDetail | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${storeId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}
