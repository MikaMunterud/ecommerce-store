'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { usePathname } from 'next/navigation';

const dashboardLinks = [
  { label: 'Category 1', href: '/1' },
  { label: 'Category 2', href: '/2' },
  { label: 'Category 3', href: '/3' },

  // Add more links as needed
];

const exampleStore: string = 'Hakims e-shop';
const exampleCartItems: number = 4;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Header
        links={dashboardLinks}
        currentUrl={pathname}
        storeName={exampleStore}
        cartItems={exampleCartItems}
      />

      <main className="mx-auto max-w-7xl">
        <div className="space-y-10 pb-10">{children}</div>
      </main>
      <Footer storeName={exampleStore} />
    </>
  );
}
