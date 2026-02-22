import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "../components/hero/HeroSection";
import { DailyMenu } from "../components/dailymenu/DailyMenu";
import { StudentPromotions } from "../components/promotions/StudentPromotions";
import { MenuSection } from "../components/menu/MenuSection";

interface Props {
  params: Promise<{ locale: string }>;
}

interface Meal {
  id: number;
  name: string;
  description?: string;
  additionals?: string;
  price: number;
}

interface PromotionResponse {
  promotion: {
    id: string;
    name: string;
    meals: Meal[];
  };
  image: string;
}

async function fetchPromotion(): Promise<PromotionResponse | null> {
  const baseUrl = process.env.INTER_API_URL;
  const promotionId = process.env.PROMOTION_ID;

  if (!baseUrl || !promotionId) return null;

  try {
    const res = await fetch(`${baseUrl}/promotion/${promotionId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const promotionData = await fetchPromotion();

  const dailySpecials = promotionData
    ? promotionData.promotion.meals.map((meal) => ({
        name: meal.name,
        description: meal.description ?? "",
        price: `${meal.price} zł`,
        category: meal.additionals,
      }))
    : [
        {
          name: t("dailySpecials.schnitzel.name"),
          description: t("dailySpecials.schnitzel.description"),
          price: "12.99 zł",
          category: t("dailySpecials.schnitzel.category"),
        },
        {
          name: t("dailySpecials.pierogiRuskie.name"),
          description: t("dailySpecials.pierogiRuskie.description"),
          price: "10.50 zł",
          category: t("dailySpecials.pierogiRuskie.category"),
        },
        {
          name: t("dailySpecials.chickenSoup.name"),
          description: t("dailySpecials.chickenSoup.description"),
          price: "8.99 zł",
          category: t("dailySpecials.chickenSoup.category"),
        },
      ];

  const studentPromotions = [
    {
      title: t("studentPromotions.studentSet.title"),
      subtitle: t("studentPromotions.studentSet.subtitle"),
      description: t("studentPromotions.studentSet.description"),
      discount: "-20%",
      image: "/schabowy.jpg",
      category: t("studentPromotions.studentSet.category"),
    },
    {
      title: t("studentPromotions.happyHour.title"),
      subtitle: t("studentPromotions.happyHour.subtitle"),
      description: t("studentPromotions.happyHour.description"),
      discount: "-30%",
      image: "/main_banner.jpg",
      category: t("studentPromotions.happyHour.category"),
    },
    {
      title: t("studentPromotions.studentBreakfast.title"),
      subtitle: t("studentPromotions.studentBreakfast.subtitle"),
      description: t("studentPromotions.studentBreakfast.description"),
      discount: "-15%",
      image: "/main_banner.jpg",
      category: t("studentPromotions.studentBreakfast.category"),
    },
  ];

  const mainDishes = [
    {
      name: t("menuItems.dishes.schnitzel.name"),
      description: t("menuItems.dishes.schnitzel.description"),
      price: "12.99 zł",
    },
    {
      name: t("menuItems.dishes.pierogiRuskie.name"),
      description: t("menuItems.dishes.pierogiRuskie.description"),
      price: "10.50 zł",
    },
    {
      name: t("menuItems.dishes.chickenSoup.name"),
      description: t("menuItems.dishes.chickenSoup.description"),
      price: "8.99 zł",
    },
    {
      name: t("menuItems.dishes.beefStew.name"),
      description: t("menuItems.dishes.beefStew.description"),
      price: "14.50 zł",
    },
    {
      name: t("menuItems.dishes.crepes.name"),
      description: t("menuItems.dishes.crepes.description"),
      price: "9.99 zł",
    },
    {
      name: t("menuItems.dishes.spaghetti.name"),
      description: t("menuItems.dishes.spaghetti.description"),
      price: "11.99 zł",
    },
    {
      name: t("menuItems.dishes.roastChicken.name"),
      description: t("menuItems.dishes.roastChicken.description"),
      price: "13.50 zł",
    },
    {
      name: t("menuItems.dishes.potatoPancakes.name"),
      description: t("menuItems.dishes.potatoPancakes.description"),
      price: "10.99 zł",
    },
  ];

  const drinks = [
    {
      name: t("menuItems.drinks.compote.name"),
      description: t("menuItems.drinks.compote.description"),
      price: "3.00 zł",
    },
    {
      name: t("menuItems.drinks.coffee.name"),
      description: t("menuItems.drinks.coffee.description"),
      price: "5.50 zł",
    },
    {
      name: t("menuItems.drinks.tea.name"),
      description: t("menuItems.drinks.tea.description"),
      price: "4.00 zł",
    },
    {
      name: t("menuItems.drinks.juice.name"),
      description: t("menuItems.drinks.juice.description"),
      price: "4.50 zł",
    },
  ];

  return (
    <>
      <HeroSection title={t("hero.title")} subtitle={t("hero.subtitle")} ctaText={t("hero.cta")} ctaHref="/menu" backgroundImage="/main_banner.jpg" />

      <DailyMenu dishes={dailySpecials} />

      <StudentPromotions promotions={studentPromotions} />

      <MenuSection title={t("menu.mainDishes.title")} subtitle={t("menu.mainDishes.subtitle")} items={mainDishes} columns={2} />

      <div className="bg-secondary-background">
        <MenuSection title={t("menu.drinks.title")} subtitle={t("menu.drinks.subtitle")} items={drinks} columns={2} />
      </div>
    </>
  );
}
