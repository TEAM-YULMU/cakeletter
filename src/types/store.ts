export type StoreCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  city_province?: string;
  district?: string;
};

export type StoreDetail = {
  name: string;
  openDays: number;
  address: string;
  intro: string;
  content: string;
  imageUrl: string;
};
