import { Size } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export async function getSize(id: string): Promise<Size> {
  const response = await axios.get(`${url}/sizes/${id}`);
  const data = await response.data;

  return data;
}
