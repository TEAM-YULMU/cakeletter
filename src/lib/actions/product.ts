import { OptionCategory, OptionItem, Product, ProductImage } from "@/types/product";
import { prisma } from "@/lib/prisma";

export const getProduct = async (productId: number): Promise<Product> => {
  const productData = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!productData) {
    throw Error("조회된 상품이 없습니다.");
  }

  const imageDatas = await prisma.image.findMany({
    where: { productId: productId },
  });

  const optionDatas = await prisma.optionCategory.findMany({
    where: { productId: productId },
  });

  const options = <OptionCategory[]>[];

  for (const optionData of optionDatas) {
    const items = await prisma.optionItem.findMany({
      where: { optionCategoryId: optionData.id },
    });

    options.push({
      ...optionData,
      items: items.map(
        (item): OptionItem => ({
          ...item,
          description: item.description ?? "",
          addtionalPrice: item.addtionalPrice ?? undefined,
        })
      ),
    });
  }

  return {
    ...productData,
    description: productData.description ?? "",
    options: options,
    images: imageDatas.map(
      (image): ProductImage => ({
        ...image,
        image: image.url,
      })
    ),
  };
};
