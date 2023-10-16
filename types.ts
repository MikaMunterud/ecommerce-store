/* Declare interface types here that can be imported everywhere */
export interface Product {
  id: string;
  name: string;
  img: string;
  description: string;
  storeId: string;
  categoryId: string;
  sizeId: string;
  colorId: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  created: Date;
}

export interface FormattedProduct {
  id: string;
  name: string;
  img: string;
  description: string;
  storeId: string;
  category: string;
  size: string;
  color: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  created: Date;
}
export interface Billboard {
  id: string;
  label: string;
  img: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
