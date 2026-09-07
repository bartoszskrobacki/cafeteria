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
    <section className="bg-white py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-dark-blue mb-4 text-4xl tracking-wider uppercase md:text-5xl lg:text-6xl">{title}</h2>
          {subtitle && <p className="text-light-gray text-base italic md:text-lg">{subtitle}</p>}
        </div>

        {/* Menu Items Grid */}
        <div className={`grid ${columns === 2 ? "md:grid-cols-2" : "grid-cols-1"} gap-x-16 gap-y-8`}>
          {items.map((item, index) => (
            <div key={index} className="group">
              {/* Item Name and Price */}
              <div className="mb-2 flex items-end justify-between gap-4">
                <h3 className="text-dark-blue min-w-0 font-serif text-lg tracking-wide uppercase md:text-xl">
                  {item.name}
                </h3>

                {/* Dotted Line */}
                <div className="mb-2 min-w-[20px] flex-1 shrink-0 border-b-2 border-dotted border-gray-300"></div>

                <span className="text-coral-accent flex-shrink-0 text-lg font-semibold">{item.price}</span>
              </div>

              {/* Item Description */}
              <p className="text-light-gray text-sm leading-relaxed md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
