'use client';

import { FormattedProduct } from '@/types';
import Currency from '@/components/ui/currency';

import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { Button } from './ui/button';

interface InfoProps {
  data: FormattedProduct;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex flex-col items-start justify-between gap-2">
        <p className="text-2xl text-gray-500 ">{data.description}</p>
        <p className="text-2xl font-bold text-gray-900">{`${data?.price} kr`}</p>
      </div>
      <hr className="my-4" />
      <div className="mt-1 flex text-sm items-center">
        <p className="text-gray-500">{data.color}</p>
        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
          {data.size}
        </p>
        <div
          className="h-6 w-6 ml-4 rounded-full border border-gray-200"
          style={{ backgroundColor: data.colorValue }}
        />
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
