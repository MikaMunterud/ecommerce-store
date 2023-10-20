import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { X, Minus, Plus } from 'lucide-react';

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { FormattedProduct, Product } from '@/types';

interface CartItemProps {
  data: FormattedProduct;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ data, amount }) => {
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
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.img}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex flex-col justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
            <p className="text-gray-500">{data.description}</p>
            <p className=" text-lg font-semibold text-black">{`${data.price} kr`}</p>
          </div>

          <div className="mt-1 flex text-sm items-center justify-center">
            <p className="text-gray-500">{data.color}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-6 mb-4">
          <IconButton onClick={removeItem} icon={<Minus size={15} />} />
          <p className="inline-flex items-center">{amount}</p>
          <IconButton onClick={addItem} icon={<Plus size={15} />} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
