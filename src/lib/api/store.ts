import { StoreDetail } from "@/types/store";
import { StoreCardProps } from "@/types/store";

export async function getStoreDetail(storeId: string): Promise<StoreDetail | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${storeId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getFilteredStores(province: string | null, district: string | null): Promise<StoreCardProps[]> {
  const params = new URLSearchParams();
  if (province) params.append("city_province", province);
  if (district) params.append("district", district);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  return res.json();
}
