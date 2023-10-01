import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

interface ProductProps {
  imageUrl: string;
  label: string;
  category: string;
  price: number;
}

export default function ProductCard({
  imageUrl,
  label,
  category,
  price,
}: ProductProps) {
  return (
    <Card>
      <Image
        className="aspect-square object-cover rounded-md"
        src={imageUrl}
        alt={label}
        height={400}
        width={400}
      />
      <CardContent className="mt-4">
        <CardTitle className="font-semibold text-lg ">{label}</CardTitle>
        <CardDescription>{category}</CardDescription>
        <CardFooter className="flex items-left justify-between mt-4 p-0">
          <div className="font-semibold">$ {price}</div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
