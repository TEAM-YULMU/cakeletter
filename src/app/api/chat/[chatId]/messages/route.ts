import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/actions/sessions";
import { getChatMessages } from "@/lib/actions/chat";

export async function GET(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId: chatIdParam } = await params;
  const chatId = parseInt(chatIdParam);

  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ ok: false, message: "인증되지 않은 사용자입니다." }, { status: 401 });
    }

    const data = await getChatMessages(chatId, Number(session.id));

    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "FORBIDDEN") return NextResponse.json({ ok: false, message: "채팅방 접근 권한이 없습니다." }, { status: 403 });
      if (e.message === "NOT_FOUND") return NextResponse.json({ ok: false, message: "채팅방이 존재하지 않습니다." }, { status: 404 });
    }

    return NextResponse.json({ ok: false, message: "서버 오류" }, { status: 500 });
  }
}
