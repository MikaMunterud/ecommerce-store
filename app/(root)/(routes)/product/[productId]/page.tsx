'use client';

import { getProduct } from '@/actions/get-product';
import { getProducts } from '@/actions/get-products';
import Info from '@/components/info';
import ProductCard from '@/components/product-card';
import { Separator } from '@/components/ui/separator';
import { FormattedProduct } from '@/types';
import { set } from 'date-fns';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<FormattedProduct | any>();
  const [products, setProducts] = useState<FormattedProduct[] | any>([]);

  useEffect(
    function () {
      getData();

      async function getData() {
        const product = await getProduct(productId);

        setProduct(product);

        const products = await getProducts();

        setProducts(products);
        setLoading(false);
      }
    },
    [productId],
  );

  if (loading) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-bold text-3xl">Loading...</h1>
      </div>
    );
  }

  const relatedProducts = products.filter(function (p: FormattedProduct) {
    return (
      p.categoryId === product.categoryId &&
      p.size === product.size &&
      p.id !== product.id
    );
  });

  return (
    <div>
      {product ? (
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Image
              priority
              src={product.img}
              alt={product.name}
              height={400}
              width={400}
              className="object-cover object-center p-6"
            />
            <div>
              <Info data={product} />
            </div>
          </div>

          <Separator className="my-10" />

          <h2 className="font-bold text-3xl mb-8">{'Related products'}</h2>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product: FormattedProduct) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 font-bold text-xl px-2">
              No related products found...
            </p>
          )}
        </div>
      ) : (
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-bold text-3xl">Product not found...</h1>
        </div>
      )}
    </div>
  );
}
