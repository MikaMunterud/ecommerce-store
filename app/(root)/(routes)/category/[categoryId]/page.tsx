'use client';

import HeroBanner from '@/components/hero-banner';
import ProductCard from '@/components/product-card';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Billboard, Category, FormattedProduct } from '@/types';
import { getProducts } from '@/actions/get-products';
import { getCategory } from '@/actions/get-category';
import { getBillboard } from '@/actions/get-billboard';

export default function Category() {
  const [products, setProducts] = useState<FormattedProduct[] | any>([]);
  const [category, setCategory] = useState({} as Category);
  const [billboard, setBillboard] = useState({} as Billboard);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const products = await getProducts();

      setProducts(products);

      const category = await getCategory(`${params.categoryId}`);

      setCategory(category);

      const billboard = await getBillboard(`${category.billboardId}`);

      setBillboard(billboard);
    }
    getData();
  }, [params.categoryId]);

  const filteredProducts = products.filter((product: FormattedProduct) => {
    return product.categoryId === category.id;
  });

  return (
    <>
      <HeroBanner data={billboard} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">{category.name}</h3>
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
