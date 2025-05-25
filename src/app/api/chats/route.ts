import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/actions/sessions";

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }

  const { storeId } = await req.json();

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: {
      memberId: true,
      name: true,
    },
  });

  if (!store) {
    return NextResponse.json({ ok: false, message: "해당 store를 찾을 수 없습니다." }, { status: 404 });
  }

  // 두 유저 id 추출
  const memberId = +session.id;
  const ownerId = store.memberId;

  // 두 명의 멤버가 연결된 방이 있는지 찾기
  const exRoom = await prisma.room.findFirst({
    where: {
      AND: [{ members: { some: { id: memberId } } }, { members: { some: { id: ownerId } } }],
    },
  });

  // 채팅방이 존재하면, 존재하는 rommId 반환
  if (exRoom) {
    await prisma.room.update({
      where: { id: exRoom.id },
      data: { chatInvisibleTo: null },
    });

    return NextResponse.json({
      ok: true,
      message: "이미 채팅방이 존재합니다.",
      roomId: exRoom.id,
    });
  }

  // 채팅방이 존재하지 않으면, room 생성
  const newRoom = await prisma.room.create({
    data: {
      name: store.name, // 채팅방 이름 - 가게 이름
      members: {
        connect: [{ id: memberId }, { id: ownerId }],
      },
    },
  });

  return NextResponse.json(
    {
      ok: true,
      message: "채팅방을 생성했습니다.",
      roomId: newRoom.id,
    },
    { status: 201 }
  );
}
