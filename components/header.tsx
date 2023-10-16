'use client';

import Link from 'next/link';
import Navbar from './navbar';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useCart from '@/hooks/use-cart';
import { useEffect, useState } from 'react';

interface HeaderProps {
  links: { label: string; href: string; id: string }[];
  currentUrl: string;
  storeName: string;
}
export default function Header({ links, currentUrl, storeName }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={'/'}>
            <p className="font-bold text-xl">{storeName}</p>
          </Link>
          <Navbar links={links} currentUrl={currentUrl} />
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
