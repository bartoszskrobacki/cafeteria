interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuSectionProps {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  columns?: 1 | 2;
}

export const MenuSection = ({ title, subtitle, items, columns = 2 }: MenuSectionProps) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-dark-blue mb-4 uppercase tracking-wider">{title}</h2>
          {subtitle && <p className="text-light-gray italic text-base md:text-lg">{subtitle}</p>}
        </div>

        {/* Menu Items Grid */}
        <div className={`grid ${columns === 2 ? "md:grid-cols-2" : "grid-cols-1"} gap-x-16 gap-y-8`}>
          {items.map((item, index) => (
            <div key={index} className="group">
              {/* Item Name and Price */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg md:text-xl uppercase tracking-wide text-dark-blue font-serif flex-shrink-0">{item.name}</h3>

                {/* Dotted Line */}
                <div className="flex-1 border-b-2 border-dotted border-gray-300 mb-2 min-w-[20px]"></div>

                <span className="text-coral-accent font-semibold text-lg flex-shrink-0">{item.price}</span>
              </div>

              {/* Item Description */}
              <p className="text-light-gray text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
