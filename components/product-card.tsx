import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import IconButton from '@/components/ui/icon-button';
import { ShoppingCart, Expand } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { MouseEventHandler } from 'react';
import { FormattedProduct, Product } from '@/types';
import usePreviewModal from '@/hooks/use-preview-modal';
import { useRouter } from 'next/navigation';

interface ProductProps {
  data: FormattedProduct;
}

export default function ProductCard({ data }: ProductProps) {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <Card
      className="aspect-square rounded-xl relative cursor-pointer"
      onClick={(e) => router.push(`/product/${data.id}`)}
    >
      <Image
        className="aspect-square object-cover rounded-xl p-6"
        src={data.img}
        alt={data.name}
        height={400}
        width={400}
      />
      <div className="flex opacity-0 hover:opacity-100 transition absolute w-full h-full bottom-0 justify-center items-center">
        <IconButton
          onClick={onPreview}
          icon={<Expand size={20} className="text-gray-600" />}
        />
      </div>
      <CardContent className="mt-4">
        <CardTitle className="font-semibold text-lg ">{data.name}</CardTitle>
        <CardFooter className="flex items-left justify-between mt-2 p-0">
          <div className="font-semibold">{`${data.price} kr`}</div>
          <IconButton
            className="z-10"
            onClick={onAddToCart}
            icon={<ShoppingCart size={20} className="text-gray-600" />}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
