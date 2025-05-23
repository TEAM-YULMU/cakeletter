"use server";

import { prisma } from "@/lib/prisma";
import { ChatWithMember } from "@/types/chat";

export const getChatMessages = async (roomId: number): Promise<ChatWithMember[]> => {
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
