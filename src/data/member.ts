import { verifySession } from "@/lib/actions/sessions";
import { prisma } from "@/lib/prisma";

export const getMemberByEmail = async (email: string) => {
  return await prisma.member.findUnique({ where: { email } });
};

export const getChatRoomsByMember = async () => {
  const session = await verifySession();

  if (!session) {
    throw new Error("인증된 사용자만 사용할 수 있습니다.");
  }

  const member = await prisma.member.findUnique({
    where: { id: Number(session.id) },
  });

  if (!member) return [];

  const rooms = await prisma.room.findMany({
    where: {
      members: {
        some: {
          id: member.id,
        },
      },
      OR: [
        {
          chatInvisibleTo: {
            equals: null,
          },
        },
        {
          chatInvisibleTo: {
            not: member.id,
          },
        },
      ],
    },
    include: {
      members: {
        where: {
          NOT: {
            id: member.id,
          },
        },
        select: {
          id: true,
          name: true,
          // avatar: true,
        },
      },
    },
  });

  const chatPromises = rooms.map((room) =>
    prisma.chat.findMany({
      take: 1,
      where: {
        roomId: room.id,
      },
      select: {
        chat: true,
        createdAt: true,
        roomId: true,
        imageUrl: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  );

  const roomsOfLastChat = (await Promise.all(chatPromises)).flat();
  roomsOfLastChat.sort((x, y) => (+x.createdAt > +y.createdAt ? -1 : 1));

  const sortedRooms = roomsOfLastChat
    .sort((a, b) => +b.createdAt - +a.createdAt)
    .map((chat) => {
      const room = rooms.find((r) => r.id === chat.roomId);
      if (!room) return null;
      return {
        ...room,
        lastChat: chat.imageUrl ? `사진을 보냈습니다.` : chat.chat,
        lastChatAt: chat.createdAt,
      };
    })
    .filter((room): room is NonNullable<typeof room> => room !== null);

  return sortedRooms;
};
