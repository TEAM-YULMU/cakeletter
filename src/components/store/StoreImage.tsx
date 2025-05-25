export default function StoreImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="bg-line ml-10.5 aspect-square w-full overflow-hidden rounded-md md:w-[600px]">
      <img src={imageUrl} alt="가게 이미지" className="h-full w-full object-cover" />
    </div>
  );
}
