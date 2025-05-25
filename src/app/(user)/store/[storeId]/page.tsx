import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import StoreImage from "@/components/store/StoreImage";
import StoreInfo from "@/components/store/StoreInfo";
import StoreDescription from "@/components/store/StoreDescription";
import StoreActionButtons from "@/components/store/StoreActionBtns";

type Props = {
  params: Promise<{ storeId: string }>;
};

export default async function StoreDetailPage({ params }: Props) {
  const awaitedParams = await params;
  const storeId = Number(awaitedParams.storeId);
  if (isNaN(storeId)) notFound();

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: {
      name: true,
      openDays: true,
      address: true,
      content: true,
      imageUrl: true,
    },
  });

  if (!store) notFound();

  return (
    <div className="mt-10.5 flex max-w-[1920px] flex-col gap-10.5 md:flex-row">
      <StoreImage imageUrl={store.imageUrl} />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-5">
          <StoreInfo name={store.name} openDays={store.openDays} address={store.address} />
        </div>
        <StoreDescription content={store.content} />
        <StoreActionButtons storeId={storeId} />
      </div>
    </div>
  );
}
