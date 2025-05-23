import { getProductsByStore } from "@/lib/api/products";
import { Header } from "@/components/layout/Header";
import ProductListPage from "@/components/product/ProductList";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function UserOrderPage({ params }: { params: { storeId: string } }) {
  const storeId = parseInt(params.storeId, 10);
  if (isNaN(storeId)) notFound();

  const [store, products] = await Promise.all([
    prisma.store.findUnique({
      where: { id: storeId },
      select: { name: true },
    }),
    getProductsByStore(params.storeId),
  ]);

  if (!store) notFound();

  return (
    <div className="mx-auto w-[90%]">
      <Header />
      <ProductListPage storeName={store.name} products={products} />
    </div>
  );
}
