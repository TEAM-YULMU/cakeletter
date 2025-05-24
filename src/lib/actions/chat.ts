"use server";

import { prisma } from "@/lib/prisma";

export const getChatMessages = async (roomId: number) => {
  return await prisma.chat.findMany({
    where: { roomId },
    include: {
      member: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
