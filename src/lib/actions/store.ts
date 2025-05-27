import { prisma } from "@/lib/prisma";
import { StoreDetail } from "@/types/store";
import { verifySession } from "./sessions";

export const getMyStoreId = async () => {
  const session = await verifySession();
  if (!session) return;

  const storeId = await prisma.store.findUnique({
    where: { memberId: +session.id },
    select: {
      id: true,
    },
  });

  return storeId?.id;
};

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
