import { ProductPreview } from "@/types/product";

export async function getProductsByStore(storeId: string): Promise<ProductPreview[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${storeId}/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}
