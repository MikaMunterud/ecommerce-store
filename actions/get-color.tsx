import { Color } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export async function getColor(id: string): Promise<Color> {
  const response = await axios.get(`${url}/colors/${id}`);
  const data = await response.data;

  return data;
}
