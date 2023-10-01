import Link from 'next/link';
import Navbar from './navbar';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  links: { label: string; href: string; id: string }[];
  currentUrl: string;
  storeName: string;
  cartItems: number;
}
export default function Header({
  links,
  currentUrl,
  storeName,
  cartItems,
}: HeaderProps) {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={'/'}>
            <p className="font-bold text-xl">{storeName}</p>
          </Link>
          <Navbar links={links} currentUrl={currentUrl} />
          <div className="ml-auto flex items-center gap-x-4">
            <Button className="w-auto border-transparent disabled:cursor-not-allowed font-semibold hover:opacity-75 transition flex rounded-full bg-black">
              <ShoppingBag width={20} height={20} />
              <span className="ml-2 text-sm font-medium text-white">
                {cartItems}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
