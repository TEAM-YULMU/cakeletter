import { Header } from "@/components/layout/Header";
import { prisma } from "@/lib/prisma";
import StoreList from "@/components/store/StoreList";

export default async function UserHomePage() {
  const initialStores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      cityProvince: true,
      district: true,
    },
  });

  return (
    <div className="mx-auto w-[90%]">
      <Header />
      <StoreList initialStores={initialStores} />
    </div>
  );
}
