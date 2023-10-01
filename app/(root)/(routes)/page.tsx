import HeroBanner from '@/components/hero-banner';
import ProductCard from '@/components/product-card';

const heroBanner = {
  label: 'E-commerce Store',
  url: 'https://media.istockphoto.com/id/1316968335/sv/foto/kundvagn-full-av-mat-p%C3%A5-gul-bakgrund-mataff%C3%A4rskoncept.jpg?s=612x612&w=0&k=20&c=5NBtN9fhss48STDiV-KAdYkpmc6tB8LEcdKF2nEaT44=',
};

const products = [
  {
    imageUrl:
      'https://media.istockphoto.com/id/629734762/sv/foto/green-apple-with-leaf-isolated-on-white-clipping-path-included.jpg?s=612x612&w=0&k=20&c=3xRf2-2sP61BC_Zurh45pulrLnzU9EVojN5Cinw-BBI=',
    label: 'Apple',
    category: 'Fruit',
    price: 1,
  },
  {
    imageUrl:
      'https://media.istockphoto.com/id/186861864/sv/foto/pear-green-with-leaf.jpg?s=612x612&w=0&k=20&c=I97dqGuocoDv8YSiZbmUGQcIxLskTwZ_C-Egg7KdEpc=',
    label: 'Pear',
    category: 'Fruit',

    price: 2,
  },
  {
    imageUrl:
      'https://media.istockphoto.com/id/1231559990/sv/foto/apelsinfrukt-med-skugga-p%C3%A5-vit-bakgrund-kommersiell-bild-av-citrusfrukter-i-isolerade-med.jpg?s=612x612&w=0&k=20&c=CFnG83BhAo9OptdjX_Fz-iIpid5AYdW9wtiwGsIOULk=',
    label: 'Orange',
    category: 'Fruit',

    price: 3,
  },
  {
    imageUrl:
      'https://media.istockphoto.com/id/682505832/sv/foto/mogen-r%C3%B6d-druva-rosa-g%C3%A4ng-med-l%C3%B6v-isolerade-p%C3%A5-vitt-med-urklippsbana-fullt-sk%C3%A4rpedjup.jpg?s=612x612&w=0&k=20&c=fjgbRs9Hva4T3KCDKn7_YZqI--2fdsDa5pAuUEwV-Z4=',
    label: 'Grapes',
    category: 'Fruit',

    price: 4,
  },
];

export default function Home() {
  return (
    <>
      <HeroBanner imageUrl={heroBanner.url} label={heroBanner.label} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(function (product, index) {
            return (
              <ProductCard
                key={index}
                imageUrl={product.imageUrl}
                label={product.label}
                category={product.category}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
