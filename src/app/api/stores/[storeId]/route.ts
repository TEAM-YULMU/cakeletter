import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathnameParts = url.pathname.split("/");
    const storeId = parseInt(pathnameParts[pathnameParts.length - 1], 10);

    if (isNaN(storeId)) {
      return NextResponse.json({ message: "유효하지 않은 가게 ID입니다." }, { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        name: true,
        openDays: true,
        address: true,
        intro: true,
        content: true,
        imageUrl: true,
      },
    });

    if (!store) {
      return NextResponse.json({ message: "해당 가게를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({
      name: store.name,
      openDays: store.openDays,
      address: store.address,
      intro: store.intro,
      content: store.content,
      imageUrl: store.imageUrl,
    });
  } catch {
    return NextResponse.json({ message: "가게 정보를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
