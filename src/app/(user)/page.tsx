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

  return <StoreList initialStores={initialStores} />;
}
