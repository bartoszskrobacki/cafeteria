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
        category: meal.additionals,
      }))
    : fallbackDishes;

  const promotionImage = data?.image ?? "/schabowy.jpg";

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-dark-blue mb-3 font-serif uppercase tracking-wider">{t("title")}</h2>
          <p className="text-light-gray italic text-sm">{t("subtitle")}</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="flex items-center z-10">
            <div className="relative h-[300px] md:h-[600px] max-h-[400px] z-10 w-full">
              <Image src={promotionImage} alt="Menu Dnia" fill className="object-cover" />
            </div>
          </div>

          <div className="relative md:ml-[-100px] ">
            <div className="bg-white border border-gray-200 py-4 md:py-8 md:px-32  shadow-lg">
              <p className="text-light-gray text-sm italic mb-8">{today}</p>

              {isLoading ? (
                <p className="text-light-gray italic">{t("loading")}</p>
              ) : (
                <div className="space-y-8">
                  {dishes.map((dish, index) => (
                    <div key={index}>
                      <h3 className="text-xl md:text-2xl font-serif text-dark-blue uppercase tracking-wide mb-2">{dish.name}</h3>

                      {dish.category && <p className="text-coral-accent italic text-sm mb-2">{dish.category}</p>}

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
