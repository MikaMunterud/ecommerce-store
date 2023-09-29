interface HeroBannerProps {
  imageUrl: string;
  label: string;
}

export default function HeroBanner({ imageUrl, label }: HeroBannerProps) {
  const bannerStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#ffffff',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={bannerStyles}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}