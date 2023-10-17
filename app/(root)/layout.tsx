'use client';

import Header from '@/components/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl">
        <div className="space-y-10 pb-10">{children}</div>
      </main>
    </>
  );
}
