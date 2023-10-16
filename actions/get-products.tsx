import { Category, Color, Product, Size } from '@/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export async function getProducts() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
  );
  const data = await response.data;

  if (data.length > 0) {
    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    );
    const categoriesData = await categories.data;

    const sizes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sizes`);
    const sizesData = await sizes.data;

    const colors = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colors`);
    const colorsData = await colors.data;

    const formattedProducts = await formatProducts(
      data,
      categoriesData,
      sizesData,
      colorsData,
    );

    return formattedProducts;
  } else {
    return null;
  }
}

async function formatProducts(
  data: Product[],
  categories: Category[],
  sizes: Size[],
  colors: Color[],
) {
  const formattedProducts = data.map(function (product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: categories.find(function (category: Category) {
        return category.id === product.categoryId;
      })?.name,
      size: sizes.find(function (size: Size) {
        return size.id === product.sizeId;
      })?.name,

      color: colors.find(function (color: Color) {
        return color.id === product.colorId;
      })?.name,
      colorValue: colors.find(function (color: Color) {
        return color.id === product.colorId;
      })?.value,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      created: format(new Date(product.created), 'do MMM yyyy'),
      img: product.img,
    };
  });

  return formattedProducts;
}