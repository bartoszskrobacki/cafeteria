"use client";

import { useState, useEffect, useCallback, type TransitionEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Clock,
  Coffee,
  Croissant,
  GraduationCap,
  PartyPopper,
  Soup,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type PromotionId = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

interface Promotion {
  id: PromotionId;
  weekday: number; // 1 = Monday ... 5 = Friday, as returned by Date.getDay()
  day: string;
  shortDay: string;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
}

interface StudentPromotionsProps {
  promotions: Promotion[];
}

interface SlideTheme {
  background: string;
  icon: LucideIcon;
  secondaryIcon?: LucideIcon;
}

// Slides alternate between the site's two light section backgrounds; text and accents stay on-brand.
const SLIDE_THEMES: Record<PromotionId, SlideTheme> = {
  monday: { background: "var(--baby-blue)", icon: Clock },
  tuesday: { background: "var(--beige-background)", icon: Coffee, secondaryIcon: Croissant },
  wednesday: { background: "var(--baby-blue)", icon: UtensilsCrossed },
  thursday: { background: "var(--beige-background)", icon: Soup },
  friday: { background: "var(--baby-blue)", icon: PartyPopper },
};

const AUTOPLAY_MS = 5000;

const PromotionSlide = ({
  promo,
  studentIdLabel,
}: {
  promo: Promotion;
  studentIdLabel: string;
}) => {
  const theme = SLIDE_THEMES[promo.id];
  const Icon = theme.icon;
  const SecondaryIcon = theme.secondaryIcon;

  return (
    <div
      className="relative h-full w-full overflow-hidden text-dark-blue"
      style={{ background: theme.background }}
    >
      {/* Decorative rings */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[40px] opacity-10"
        style={{ borderColor: "var(--coral-accent)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(var(--dark-blue-text) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Illustration */}
      <div
        aria-hidden
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center justify-center md:flex md:right-12 lg:right-16"
      >
        <div
          className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-md lg:h-64 lg:w-64"
        >
          <Icon className="h-28 w-28 text-coral-accent lg:h-32 lg:w-32" strokeWidth={1.25} />
        </div>
        {SecondaryIcon && (
          <div
            className="absolute -bottom-4 -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-coral-accent shadow-lg"
          >
            <SecondaryIcon className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Watermark icon for small screens */}
      <Icon
        aria-hidden
        className="absolute -bottom-6 -right-6 h-44 w-44 text-coral-accent opacity-15 md:hidden"
        strokeWidth={1}
      />

      {/* Copy */}
      <div className="relative flex h-full flex-col justify-center gap-3 p-8 md:max-w-[60%] md:p-12 lg:p-16">
        <p
          className="font-serif text-sm uppercase tracking-[0.35em] text-coral-accent md:text-base"
        >
          {promo.day}
        </p>
        <h3 className="font-serif text-3xl uppercase tracking-wide md:text-4xl">{promo.title}</h3>
        <p
          className="font-serif text-7xl font-bold leading-none text-coral-accent md:text-8xl lg:text-9xl"
        >
          {promo.highlight}
        </p>
        <p className="text-lg font-semibold uppercase tracking-wider md:text-xl">{promo.subtitle}</p>
        <p className="max-w-md text-sm leading-relaxed text-light-gray md:text-base">{promo.description}</p>
        <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-light-gray">
          <GraduationCap className="h-4 w-4" />
          {studentIdLabel}
        </p>
      </div>
    </div>
  );
};

export const StudentPromotions = ({ promotions }: StudentPromotionsProps) => {
  const t = useTranslations("promotions");
  const count = promotions.length;

  // Track position in the extended slide list: [clone of last, ...promotions, clone of first].
  // Position 1..count maps to real promotions; 0 and count+1 are clones used for the seamless loop.
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [todayIndex, setTodayIndex] = useState(-1);
  // Hide the slides until today's promotion is selected, so Monday doesn't flash on load.
  const [ready, setReady] = useState(false);

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

  // The page is statically exported, so today's promotion can only be resolved on the client.
  useEffect(() => {
    const index = promotions.findIndex((promo) => promo.weekday === new Date().getDay());
    if (index >= 0) {
      setTodayIndex(index);
      setAnimated(false);
      setPosition(index + 1);
    }
    setReady(true);
  }, [promotions]);

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

  const slides =
    count > 1
      ? [promotions[count - 1], ...promotions, promotions[0]]
      : promotions;

  return (
    <section className="py-16 md:py-24">
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl text-dark-blue mb-3 font-serif uppercase tracking-wider">
              {t("title")}
            </h2>
            <p className="text-light-gray italic text-sm">{t("subtitle")}</p>
          </div>

          <div className="mb-12 flex flex-col items-center justify-center gap-3 bg-coral-accent px-6 py-4 text-center text-white sm:flex-row">
            <GraduationCap className="h-7 w-7 shrink-0" strokeWidth={1.5} />
            <p className="font-serif text-lg uppercase tracking-wider">
              {t("everyday")} <span className="text-sm normal-case opacity-90">{t("everydayNote")}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Mobile: compact day pills in a single row, no horizontal scrolling */}
            <div className="grid grid-cols-5 gap-2 lg:hidden">
              {promotions.map((promo, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={promo.id}
                    onClick={() => goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={promo.day}
                    className={`flex min-h-11 flex-col items-center justify-center rounded-full border py-2 font-serif text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-coral-accent border-transparent text-white font-semibold"
                        : "border-gray-200 bg-white text-dark-blue"
                    }`}
                  >
                    {promo.shortDay}
                    {index === todayIndex && (
                      <span
                        aria-hidden
                        className={`mt-1 h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-coral-accent"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical day list */}
            <div className="hidden lg:col-span-3 lg:flex lg:flex-col lg:gap-8">
              {promotions.map((promo, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={promo.id}
                    onClick={() => goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative uppercase tracking-[0.3em] text-sm font-serif whitespace-nowrap transition-colors text-left pl-6 ${
                      isActive
                        ? "text-coral-accent font-semibold"
                        : "text-dark-blue hover:text-coral-accent"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-coral-accent transition-all duration-300 ${
                        isActive ? "w-4" : "w-0"
                      }`}
                    />
                    {promo.day}
                    {index === todayIndex && (
                      <span className="ml-2 rounded-full bg-coral-accent px-2 py-0.5 align-middle text-[10px] tracking-widest text-white">
                        {t("today")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-9 relative h-[440px] md:h-[500px] overflow-hidden">
              <div
                className={`flex h-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"} ${
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
                      <PromotionSlide promo={promo} studentIdLabel={t("withStudentId")} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {promotions.map((promo, index) => (
              <button
                key={promo.id}
                onClick={() => goTo(index)}
                className={`bg-white p-5 text-left transition-all border-2 ${
                  index === currentIndex
                    ? "border-coral-accent shadow-lg"
                    : "border-gray-200 hover:shadow-md"
                }`}
              >
                <p className="text-coral-accent uppercase text-xs tracking-wider mb-2">
                  {promo.day}
                  {index === todayIndex && ` · ${t("today")}`}
                </p>

                <p className="font-serif text-3xl font-bold text-dark-blue mb-1">{promo.highlight}</p>

                <h3 className="text-lg font-serif text-dark-blue uppercase tracking-wide mb-3">
                  {promo.title}
                </h3>

                <p className="text-light-gray text-sm leading-relaxed">{promo.description}</p>
              </button>
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
