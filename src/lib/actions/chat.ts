"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "./sessions";
import { revalidatePath } from "next/cache";
import { CHAT_ROUTES } from "@/constants/routes";

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

export const deleteRoom = async (roomId: string) => {
  const session = await verifySession();
  const userId = Number(session.id);

  const id = Number(roomId);
  const room = await prisma.room.findUnique({ where: { id } });

  if (!room) {
    throw new Error("채팅방이 존재하지 않습니다.");
  }

  // 이미 한 명이 나갔던 방이면 완전히 삭제
  if (room.chatInvisibleTo) {
    await prisma.room.delete({ where: { id } });
  } else {
    await prisma.room.update({
      where: { id },
      data: { chatInvisibleTo: userId },
    });
  }

  revalidatePath(CHAT_ROUTES.ROOMS);
};
