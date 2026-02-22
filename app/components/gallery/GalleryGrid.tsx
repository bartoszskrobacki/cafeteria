import Image from "next/image";

interface GalleryItem {
  image: string;
  category?: string;
  title: string;
  description?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 2 | 3;
}

export const GalleryGrid = ({ items, columns = 3 }: GalleryGridProps) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8 md:gap-12`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-square mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                {item.category && (
                  <p className="text-coral-accent text-sm uppercase tracking-wider">
                    {item.category}
                  </p>
                )}

                <h3 className="text-xl md:text-2xl text-dark-blue uppercase tracking-wide font-serif">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-light-gray text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
