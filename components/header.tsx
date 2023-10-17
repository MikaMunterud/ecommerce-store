'use client';

import Link from 'next/link';
import Navbar from './navbar';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useCart from '@/hooks/use-cart';
import { useEffect, useState } from 'react';
import { Store } from '@/types';
import { getStore } from '@/actions/get-store';

export default function Header() {
  const [storeName, setStoreName] = useState({} as Store);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    async function getData() {
      const storeName = await getStore();

      setStoreName(storeName);

      setMounted(true);
    }
    getData();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="relative px-4 sm:px-6 lg:px-8 flex gap-4 h-16 items-center">
          <Link href={'/'}>
            <p className="font-bold text-xl">{storeName.name}</p>
          </Link>
          <Navbar />
          <div className="ml-auto flex items-center gap-x-4">
            <Button
              onClick={() => router.push('/cart')}
              className="w-auto border-transparent disabled:cursor-not-allowed font-semibold hover:opacity-75 transition flex rounded-full bg-black"
            >
              <ShoppingBag width={20} height={20} />
              <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
