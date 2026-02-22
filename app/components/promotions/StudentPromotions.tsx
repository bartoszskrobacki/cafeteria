"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Promotion {
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  image: string;
  category: string;
}

interface StudentPromotionsProps {
  promotions: Promotion[];
}

export const StudentPromotions = ({ promotions }: StudentPromotionsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations("promotions");

  const currentPromo = promotions[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
      setIsAnimating(false);
    }, 300);
  };

  const categories = [
    t("categories.sets"),
    t("categories.lunches"),
    t("categories.breakfasts"),
    t("categories.drinks"),
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-dark-blue mb-3 font-serif uppercase tracking-wider">
              {t("title")}
            </h2>
            <p className="text-light-gray italic text-sm">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-3 flex lg:flex-col gap-6 lg:gap-8 justify-center lg:justify-start overflow-x-auto lg:overflow-visible">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="text-dark-blue hover:text-coral-accent transition-colors uppercase tracking-[0.3em] text-sm font-serif whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="lg:col-span-9 relative h-[400px] md:h-[500px] overflow-hidden">
              <div
                className={`absolute inset-0 transition-transform duration-500 ${
                  isAnimating ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <Image
                  src={currentPromo.image}
                  alt={currentPromo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 right-6 bg-coral-accent text-white px-6 py-3 rounded-full">
                  <span className="text-2xl font-bold">
                    {currentPromo.discount}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-md"
                  aria-label={t("prevPromo")}
                >
                  <svg
                    className="w-5 h-5 text-dark-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-md"
                  aria-label={t("nextPromo")}
                >
                  <svg
                    className="w-5 h-5 text-dark-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-baby-blue w-full py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className={`bg-white p-6 transition-all ${
                  index === currentIndex
                    ? "border-2 border-coral-accent shadow-lg"
                    : "border border-gray-200 hover:shadow-md"
                }`}
              >
                <p className="text-coral-accent uppercase text-xs tracking-wider mb-2">
                  {promo.category}
                </p>

                <h3 className="text-xl font-serif text-dark-blue uppercase tracking-wide mb-3">
                  {promo.title}
                </h3>

                <p className="text-light-gray text-sm leading-relaxed mb-4">
                  {promo.description}
                </p>

                <button className="text-coral-accent text-sm uppercase tracking-wider hover:text-primary transition-colors font-semibold">
                  {t("checkIt")}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-coral-accent"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={t("goToPromo", { number: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
