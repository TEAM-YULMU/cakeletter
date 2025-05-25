import { NextRequest, NextResponse } from "next/server";
import { uploadImageToS3 } from "@/lib/s3";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/actions/sessions";
import { OptionCategory, ProductPreview } from "@/types/product";

export async function POST(req: NextRequest) {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ message: "로그인을 진행해주세요." }, { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { memberId: parseInt(session.id) },
  });

  if (!store) {
    return NextResponse.json({ message: "조회된 가게가 없습니다." }, { status: 404 });
  }

  const form = await req.formData();
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const price = parseInt(form.get("price") as string, 10);
  const options = JSON.parse(form.get("options") as string) as OptionCategory[];

  if (!name || isNaN(price)) {
    return NextResponse.json({ message: "유효한 입력값이 아닙니다." }, { status: 400 });
  }

  const files = form.getAll("images") as File[];

  if (files.length === 0) {
    return NextResponse.json({ message: "이미지를 제출해주세요." }, { status: 400 });
  }

  try {
    const product = await prisma.$transaction(async (tx) => {
      // 상품 DB 저장
      const product = await tx.product.create({
        data: {
          storeId: store.id,
          name,
          description,
          price,
          optionCategories: {
            create: options.map((option) => ({
              name: option.name,
              required: option.required,
              multiple: option.multiple,
              optionItems: {
                create: option.items.map((item) => ({
                  name: item.name,
                  description: item.description,
                })),
              },
            })),
          },
        },
      });

      // s3 업로드
      const urls = await Promise.all(
        files.map((file) =>
          uploadImageToS3({
            path: `store/${store.id}/product/${product.id}`,
            image: file,
          })
        )
      );

      // 이미지 DB 저장
      for (const url of urls) {
        await tx.image.create({
          data: {
            productId: product.id,
            url: url,
          },
        });
      }

      return product;
    });

    return NextResponse.json({ message: "상품 등록 성공", productId: product.id }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "상품 등록 실패" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: Promise<{ storeId: string }> }) {
  try {
    const { storeId: storeIdParam } = await context.params;
    const storeId = parseInt(storeIdParam, 10);

    if (isNaN(storeId)) {
      return NextResponse.json({ message: "유효하지 않은 storeId입니다." }, { status: 400 });
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });

    if (!store) {
      return NextResponse.json({ message: "해당 가게를 찾을 수 없습니다." }, { status: 404 });
    }

    const products = await prisma.product.findMany({
      where: { storeId },
      select: {
        id: true,
        name: true,
        Image: {
          select: { url: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const response: ProductPreview[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.Image[0]?.url ?? null,
    }));

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
