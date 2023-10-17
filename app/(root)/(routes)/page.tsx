'use client';

import getBillboard from '@/actions/get-billboard';
import { getProducts } from '@/actions/get-products';
import HeroBanner from '@/components/hero-banner';
import ProductCard from '@/components/product-card';
import { Billboard, FormattedProduct } from '@/types';

import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<FormattedProduct[] | any>([]);
  const [billboard, setBillboard] = useState({} as Billboard);

  useEffect(() => {
    async function getData() {
      const products = await getProducts();

      setProducts(products);

      const billboard = await getBillboard(
        `${process.env.NEXT_PUBLIC_HOMEPAGE_BILLBOARD}`,
      );

      setBillboard(billboard);
    }
    getData();
  }, []);

  const featuredProducts = products.filter((product: FormattedProduct) => {
    return product.isFeatured;
  });

  return (
    <>
      <HeroBanner data={billboard} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product: FormattedProduct) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}
