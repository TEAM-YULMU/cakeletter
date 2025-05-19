import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city_province");
    const district = searchParams.get("district");

    const where = {
      ...(city && { cityProvince: city }),
      ...(district && { district }),
    };

    const stores = await prisma.store.findMany({
      where,
      select: {
        id: true,
        name: true,
        cityProvince: true,
        district: true,
        imageUrl: true,
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.error("[GET /api/stores]", error);
    return NextResponse.json({ message: "가게 정보를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
