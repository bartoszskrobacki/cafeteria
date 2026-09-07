"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, type TransitionEvent } from "react";
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

const AUTOPLAY_MS = 5000;

export const StudentPromotions = ({ promotions }: StudentPromotionsProps) => {
  const t = useTranslations("promotions");
  const count = promotions.length;

  // Track position in the extended slide list: [clone of last, ...promotions, clone of first].
  // Position 1..count maps to real promotions; 0 and count+1 are clones used for the seamless loop.
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);

  const currentIndex = ((position - 1) % count + count) % count;

  const goTo = useCallback((index: number) => {
    setAnimated(true);
    setPosition(index + 1);
  }, []);

  const handleNext = useCallback(() => {
    setAnimated(true);
    setPosition((prev) => Math.min(prev + 1, count + 1));
  }, [count]);

  const handlePrev = useCallback(() => {
    setAnimated(true);
    setPosition((prev) => Math.max(prev - 1, 0));
  }, []);

  // When we land on a clone, jump (without animation) to its real counterpart.
  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (position === count + 1) {
      setAnimated(false);
      setPosition(1);
    } else if (position === 0) {
      setAnimated(false);
      setPosition(count);
    }
  };

  // Auto-advance; restarts whenever the position changes so manual navigation resets the timer.
  useEffect(() => {
    if (count <= 1) return;
    const interval = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [position, count, handleNext]);

  const categories = [
    t("categories.sets"),
    t("categories.lunches"),
    t("categories.breakfasts"),
    t("categories.drinks"),
  ];

  const activeCategory = promotions[currentIndex]?.category.toUpperCase();

  const slides =
    count > 1
      ? [promotions[count - 1], ...promotions, promotions[0]]
      : promotions;

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
              {categories.map((category) => {
                const isActive = category.toUpperCase() === activeCategory;
                const targetIndex = promotions.findIndex(
                  (promo) => promo.category.toUpperCase() === category.toUpperCase()
                );
                return (
                  <button
                    key={category}
                    onClick={() => targetIndex >= 0 && goTo(targetIndex)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative uppercase tracking-[0.3em] text-sm font-serif whitespace-nowrap transition-colors text-left lg:pl-6 ${
                      isActive
                        ? "text-coral-accent font-semibold"
                        : "text-dark-blue hover:text-coral-accent"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-coral-accent transition-all duration-300 ${
                        isActive ? "w-4" : "w-0"
                      }`}
                    />
                    <span
                      className={`block lg:inline border-b-2 pb-1 lg:border-b-0 lg:pb-0 transition-colors ${
                        isActive ? "border-coral-accent" : "border-transparent"
                      }`}
                    >
                      {category}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-9 relative h-[400px] md:h-[500px] overflow-hidden">
              <div
                className={`flex h-full ${
                  animated
                    ? "transition-transform duration-700 ease-in-out motion-reduce:transition-none"
                    : ""
                }`}
                style={{ transform: `translateX(-${(count > 1 ? position : 0) * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((promo, slideIndex) => {
                  const isCurrent = count > 1 ? slideIndex === position : true;
                  return (
                    <div
                      key={slideIndex}
                      className="relative h-full w-full flex-shrink-0"
                      aria-hidden={!isCurrent}
                    >
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        className="object-cover"
                        priority={slideIndex === 1}
                      />
                      <div className="absolute top-6 right-6 bg-coral-accent text-white px-6 py-3 rounded-full">
                        <span className="text-2xl font-bold">{promo.discount}</span>
                      </div>
                    </div>
                  );
                })}
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
                onClick={() => goTo(index)}
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
