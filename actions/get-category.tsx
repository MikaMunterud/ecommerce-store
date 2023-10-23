import { Category } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export async function getCategory(id: string): Promise<Category> {
  const response = await axios.get(`${url}/categories/${id}`);
  const data = await response.data;

  return data;
}
