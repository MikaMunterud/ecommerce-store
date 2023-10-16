import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import IconButton from '@/components/ui/icon-button';
import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { MouseEventHandler } from 'react';
import { FormattedProduct, Product } from '@/types';

interface ProductProps {
  data: FormattedProduct;
}

export default function ProductCard({ data }: ProductProps) {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <Card>
      <Image
        className="aspect-square object-cover rounded-md"
        src={data.img}
        alt={data.name}
        height={400}
        width={400}
      />
      <CardContent className="mt-4">
        <CardTitle className="font-semibold text-lg ">{data.name}</CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          {data.description}
        </CardDescription>
        <CardFooter className="flex items-left justify-between mt-4 p-0">
          <div className="font-semibold">{`${data.price} kr`}</div>
          <IconButton
            onClick={onAddToCart}
            icon={<ShoppingCart size={20} className="text-gray-600" />}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
