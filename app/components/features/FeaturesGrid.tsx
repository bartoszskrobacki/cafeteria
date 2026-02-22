interface Feature {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeaturesGrid = ({ features, columns = 4 }: FeaturesGridProps) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className="py-16 md:py-24 bg-beige-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-12 md:gap-16`}>
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="flex justify-center mb-6 text-coral-accent">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl uppercase tracking-wide text-dark-blue mb-2 font-serif">
                {feature.title}
              </h3>

              {/* Subtitle */}
              {feature.subtitle && (
                <p className="text-coral-accent italic text-sm mb-3">
                  {feature.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-light-gray text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
