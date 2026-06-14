import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "../components/hero/HeroSection";
import { DailyMenu } from "../components/dailymenu/DailyMenu";
import { StudentPromotions } from "../components/promotions/StudentPromotions";
import { MenuSection } from "../components/menu/MenuSection";
import { getMenuCategories } from "../../lib/contentful";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

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

  const categories = await getMenuCategories();

  return (
    <>
      <HeroSection title={t("hero.title")} subtitle={t("hero.subtitle")} ctaText={t("hero.cta")} ctaHref={`/${locale}/menu`} backgroundImage="/main_banner.jpg" />

      <DailyMenu />

      <StudentPromotions promotions={studentPromotions} />

      {categories.map((category, index) => (
        <div key={category.fields.name} className={index % 2 === 1 ? "bg-secondary-background" : ""}>
          <MenuSection
            title={category.fields.name.toUpperCase()}
            items={(category.fields.listOfMeals ?? []).map((meal) => ({
              name: meal.fields.name,
              description: meal.fields.description ?? "",
              price: `${(meal.fields.price ?? 0).toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
    </>
  );
}
