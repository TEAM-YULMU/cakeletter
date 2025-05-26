import { getProductsByStore } from "@/lib/api/products";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OwnerProductList from "@/components/product/OwnerProductList";
import { verifySession } from "@/lib/actions/sessions";

export default async function OwnerMyPage() {
  const session = await verifySession();
  if (!session) notFound();

  const memberId = +session.id;
  if (isNaN(memberId)) notFound();

  const store = await prisma.store.findUnique({
    where: { memberId: memberId },
    select: { id: true, name: true },
  });

  if (!store) notFound();

  const products = await getProductsByStore(store.id.toString());

  return (
    <div className="mx-auto w-full">
      <OwnerProductList products={products} />
    </div>
  );
}
