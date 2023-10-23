import { Category, Color, FormattedProduct, Product, Size } from '@/types';
import axios from 'axios';
import { format } from 'date-fns';
import { getCategories } from './get-categories';
import { getSizes } from './get-sizes';
import { getColors } from './get-colors';

export async function getProducts(): Promise<FormattedProduct | any> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
  );
  const data = await response.data;

  if (data.length > 0) {
    const categories = await getCategories();

    const sizes = await getSizes();

    const colors = await getColors();

    const products = data.filter(function (product: Product) {
      return !product.isArchived;
    });

    const formattedProducts = await formatProducts(
      products,
      categories,
      sizes,
      colors,
    );

    return formattedProducts;
  } else {
    return [];
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
      price: Number(product.price).toFixed(2),
      categoryId: product.categoryId,
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
      created: format(new Date(product.created), 'do MMM yyyy'),
      img: product.img,
    };
  });

  return formattedProducts;
}
