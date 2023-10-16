'use client';

import HeroBanner from '@/components/hero-banner';
import ProductCard from '@/components/product-card';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FormattedProduct } from '@/types';
import { getProducts } from '@/actions/get-products';

const heroBanner = {
  label: 'Category',
  url: 'https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2023/09/How-to-Create-WooCommerce-B2B-Wholesale-Multivendor-Marketplaces-Using-Dokan-and-WholesaleX.png?f=webp&q=90',
};

export default function Category() {
  const [products, setProducts] = useState<FormattedProduct[] | any>([]);
  const categoryId = usePathname().replace('/category/', '');

  useEffect(() => {
    async function getData() {
      const products = await getProducts();

      setProducts(products);
    }
    getData();
  }, []);

  const filteredProducts = products.filter(
    (product: FormattedProduct) => product.categoryId === categoryId,
  );

  return (
    <>
      <HeroBanner imageUrl={heroBanner.url} label={heroBanner.label} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product: FormattedProduct) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}
