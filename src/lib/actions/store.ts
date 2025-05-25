import { prisma } from "@/lib/prisma";
import { StoreDetail } from "@/types/store";

export const getStore = async (storeId: number): Promise<StoreDetail> => {
  const storeData = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!storeData) {
    throw Error("조회된 가게가 없습니다.");
  }

  return {
    ...storeData,
  };
};
