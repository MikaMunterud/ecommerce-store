import { Category } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export async function getCategories(): Promise<Category[]> {
  const response = await axios.get(`${url}/categories`);
  const data = await response.data;

  return data;
}
