import { verifySession } from "@/lib/actions/sessions";
import { prisma } from "@/lib/prisma";
import { deleteImageFromS3, uploadImageToS3 } from "@/lib/s3";
import { OptionCategory } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { storeId: string; productId: string } }) {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ message: "로그인을 진행해주세요." }, { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { memberId: parseInt(session.id) },
  });

  const storeId = parseInt(params.storeId);
  const productId = parseInt(params.productId);

  if (!store) {
    return NextResponse.json({ message: "사용자 형식이 맞지 않습니다." }, { status: 400 });
  }
  if (isNaN(storeId) || isNaN(productId)) {
    return NextResponse.json({ message: "유효한 요청이 아닙니다." }, { status: 400 });
  }

  const form = await req.formData();
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const price = parseInt(form.get("price") as string, 10);
  const options = JSON.parse(form.get("options") as string) as OptionCategory[];

  if (!name || isNaN(price)) {
    return NextResponse.json({ message: "유효한 입력값이 아닙니다." }, { status: 400 });
  }

  const files = form.getAll("images") as (File | string)[];
  if (files.length === 0) {
    return NextResponse.json({ message: "이미지를 제출해주세요." }, { status: 400 });
  }

  const removedUrlImages = form.getAll("removedUrlImages") as string[];

  try {
    const product = await prisma.$transaction(async (tx) => {
      // 기존 옵션 제거, 옵션 아이템은 CASCADE 제약 조건 떄문에 자동으로 삭제
      await tx.optionCategory.deleteMany({
        where: { productId: productId },
      });

      // 상품 DB 수정
      const product = await tx.product.update({
        where: { id: productId },
        data: {
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

      // s3 삭제한 이미지 삭제
      await Promise.all(removedUrlImages.map((url) => deleteImageFromS3({ url })));

      // s3 업로드
      const urls = await Promise.all(
        files
          .filter((file) => file instanceof File)
          .map((file) =>
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

    return NextResponse.json({ message: "상품 수정 성공.", productId: product.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "상품 수정 실패.", error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { storeId: string; productId: string } }) {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ message: "로그인을 진행해주세요." }, { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { memberId: parseInt(session.id) },
  });

  const storeId = parseInt(params.storeId);
  const productId = parseInt(params.productId);

  if (!store) {
    return NextResponse.json({ message: "사용자 형식이 맞지 않습니다." }, { status: 400 });
  }
  if (isNaN(storeId) || isNaN(productId)) {
    return NextResponse.json({ message: "유효한 요청이 아닙니다." }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const images = await tx.image.findMany({
        where: { productId: productId },
      });

      // s3 이미지 삭제
      await Promise.all(images.map((image) => deleteImageFromS3({ url: image.url })));

      // 상품 DB 삭제
      await tx.product.delete({
        where: { id: productId },
      });
    });

    return NextResponse.json({ message: "상품 삭제 성공." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "상품 삭제 실패.", error: String(error) }, { status: 500 });
  }
}
