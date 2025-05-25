export type Product = {
  id: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  options: OptionCategory[];
};

export type ProductImage = {
  id: number;
  productId: number;
  image: string | File;
};

export type OptionCategory = {
  id: number;
  productId: number;
  name: string;
  required: boolean;
  multiple: boolean;
  items: OptionItem[];
};

export type OptionItem = {
  id: number;
  optionCategoryId: number;
  name: string;
  addtionalPrice?: number;
  description?: string;
};

export type ProductPreview = {
  id: number;
  name: string;
  imageUrl: string | null;
};
