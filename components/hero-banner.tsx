import { Billboard } from '@/types';

interface HeroBannerProps {
  data: Billboard;
}

export default function HeroBanner({ data }: HeroBannerProps) {
  const bannerStyles = {
    backgroundImage: `url(${data.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#4a4a4a',
  };
  console.log(data);

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={bannerStyles}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs bg-white py-4 px-6 rounded-3xl bg-opacity-75">
            {data.name}
          </div>
        </div>
      </div>
    </div>
  );
}
