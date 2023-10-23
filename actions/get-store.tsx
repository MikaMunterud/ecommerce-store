import { Store } from '@/types';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export async function getStore(): Promise<Store> {
  const modifiedURL = url?.replace('/api', '/api/stores');

  const response = await axios.get(`${modifiedURL}`);
  const data = await response.data;

  return data;
}
