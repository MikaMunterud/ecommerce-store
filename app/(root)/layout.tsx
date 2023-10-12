"use client";

import Header from "@/components/header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardLink = {
  label: string;
  href: string;
  id: string;
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboardLinks, setDashboardLinks] = useState<DashboardLink[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function getCategories() {
      const response = await fetch(
        "https://ecommerce-dashboard-kohl.vercel.app/api/47844042-830e-489a-a010-ab5c442bb816/categories"
      );
      const categories = await response.json();
      const links = categories.map((category: any) => ({
        label: category.name,
        href: `/${category.id}`,
        id: category.id,
      }));
      setDashboardLinks(links);
    }
    getCategories();
  }, []);

  return (
    <>
      <Header
        links={dashboardLinks}
        currentUrl={pathname}
        storeName="Store"
        cartItems={6}
      />

      <main className="mx-auto max-w-7xl">
        <div className="space-y-10 pb-10">{children}</div>
      </main>
    </>
  );
}
