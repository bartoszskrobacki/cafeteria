"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePromotion } from "../../hooks/usePromotion";

const PROMOTION_TAG = "stolowka_studencka";

interface DailyDish {
  name: string;
  description: string;
  price: string;
  category?: string;
}

interface DailyMenuProps {
  tag?: string;
}

export const DailyMenu = ({ tag = PROMOTION_TAG }: DailyMenuProps) => {
  const locale = useLocale();
  const t = useTranslations("dailyMenu");
  const tSpecials = useTranslations("dailySpecials");
  const { data, isLoading } = usePromotion(tag);

  const menuDate = data?.promotion.updatedAt ? new Date(data.promotion.updatedAt) : new Date();
  const today = menuDate.toLocaleDateString(locale === "pl" ? "pl-PL" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fallbackDishes: DailyDish[] = [
    {
      name: tSpecials("schnitzel.name"),
      description: tSpecials("schnitzel.description"),
      price: "12.99 zł",
      category: tSpecials("schnitzel.category"),
    },
    {
      name: tSpecials("pierogiRuskie.name"),
      description: tSpecials("pierogiRuskie.description"),
      price: "10.50 zł",
      category: tSpecials("pierogiRuskie.category"),
    },
    {
      name: tSpecials("chickenSoup.name"),
      description: tSpecials("chickenSoup.description"),
      price: "8.99 zł",
      category: tSpecials("chickenSoup.category"),
    },
  ];

  const dishes: DailyDish[] = data
    ? data.promotion.meals.map((meal) => ({
        name: meal.name,
        description: meal.description ?? "",
        price: `${meal.price} zł`,
        category: meal.description ?? "",
      }))
    : fallbackDishes;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-dark-blue mb-3 font-serif text-4xl tracking-wider uppercase md:text-5xl">{t("title")}</h2>
          <p className="text-light-gray text-sm italic">{t("subtitle")}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-0 md:grid-cols-2">
          <div className="z-10 flex items-center">
            <div className="relative z-10 h-[300px] max-h-[400px] w-full md:h-[600px]">
              <Image src="/schabowy.webp" alt={t("imageAlt")} fill className="object-cover" />
            </div>
          </div>

          <div className="relative md:ml-[-100px]">
            <div className="border border-gray-200 bg-white px-6 py-4 shadow-lg md:px-32 md:py-8">
              <p className="text-light-gray mb-8 text-sm italic">{today}</p>

              {isLoading ? (
                <p className="text-light-gray italic">{t("loading")}</p>
              ) : (
                <div className="space-y-8">
                  {dishes.map((dish, index) => (
                    <div key={index}>
                      <h3 className="text-dark-blue mb-2 font-serif text-xl tracking-wide uppercase md:text-2xl">
                        {dish.name}
                      </h3>

                      {dish.category && <p className="text-coral-accent mb-2 text-sm italic">{dish.category}</p>}

                      <p className="text-coral-accent text-lg font-semibold">{dish.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
