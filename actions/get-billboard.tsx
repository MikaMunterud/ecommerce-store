import { Billboard } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export async function getBillboard(id: string): Promise<Billboard> {
  const response = await axios.get(`${url}/billboards/${id}`);
  const data = await response.data;

  return data;
}
