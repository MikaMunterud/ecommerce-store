'use client';

import HeroBanner from '@/components/hero-banner';
import ProductCard from '@/components/product-card';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Product } from '@/types';

const heroBanner = {
  label: 'Category',
  url: 'https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2023/09/How-to-Create-WooCommerce-B2B-Wholesale-Multivendor-Marketplaces-Using-Dokan-and-WholesaleX.png?f=webp&q=90',
};

export default function Category() {
  const [products, setProducts] = useState<Product[]>([]);
  const categoryId = usePathname().replace('/category/', '');

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
      );
      const products = await response.json();

      setProducts(products);
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId,
  );

  return (
    <>
      <HeroBanner imageUrl={heroBanner.url} label={heroBanner.label} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}
