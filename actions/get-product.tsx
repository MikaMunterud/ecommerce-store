import { FormattedProduct } from '@/types';
import axios from 'axios';
import { format } from 'date-fns';

import { getCategory } from './get-category';
import { getSize } from './get-size';
import { getColor } from './get-color';

export async function getProduct(id: string): Promise<FormattedProduct | null> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
  );
  const data = await response.data;

  if (data) {
    const category = await getCategory(data.categoryId);

    const size = await getSize(data.sizeId);

    const color = await getColor(data.colorId);

    const formattedProducts = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: Number(data.price).toFixed(2),
      categoryId: data.categoryId,
      category: category.name,
      size: size.name,
      color: color.name,
      colorValue: color.value,
      isFeatured: data.isFeatured,
      created: format(new Date(data.created), 'do MMM yyyy'),
      img: data.img,
    };

    return formattedProducts;
  } else {
    return null;
  }
}
