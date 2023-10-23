import Image from 'next/image';

import { X, Minus, Plus } from 'lucide-react';

import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { FormattedProduct } from '@/types';
import { useRouter } from 'next/navigation';

interface CartItemProps {
  data: FormattedProduct;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ data, amount }) => {
  const router = useRouter();
  const cart = useCart();

  const onRemove = () => {
    cart.removeAllItems(data.id);
  };

  const addItem = () => {
    cart.addItem(data);
  };

  const removeItem = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div
        className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer"
        onClick={(e) => router.push(`/product/${data.id}`)}
      >
        <Image
          fill
          src={data.img}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative mt-4 pr-9 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:pr-0 h-full">
          <div
            className="flex flex-col justify-between gap-4 col-span-3 items-start cursor-pointer"
            onClick={(e) => router.push(`/product/${data.id}`)}
          >
            <p className=" text-lg font-semibold text-black">{data.name}</p>
            <div className="mb-4 flex text-sm items-center justify-end">
              <p className="text-gray-500">{data.size}</p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                {data.color}
              </p>
              <div
                className="h-6 w-6 ml-4 rounded-full border border-gray-200"
                style={{ backgroundColor: data.colorValue }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-6 mb-4 items-center">
          <p className=" text-md font-semibold text-black">{`${data.price} kr`}</p>
          <div className="flex flex-row justify-between gap-6">
            <IconButton onClick={removeItem} icon={<Minus size={15} />} />
            <p className="inline-flex items-center">{amount}</p>
            <IconButton onClick={addItem} icon={<Plus size={15} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
