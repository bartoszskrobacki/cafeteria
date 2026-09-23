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

  const studentPromotions = (["monday", "tuesday", "wednesday", "thursday", "friday"] as const).map(
    (day, index) => ({
      id: day,
      weekday: index + 1,
      day: t(`studentPromotions.${day}.day`),
      shortDay: t(`studentPromotions.${day}.shortDay`),
      title: t(`studentPromotions.${day}.title`),
      subtitle: t(`studentPromotions.${day}.subtitle`),
      highlight: t(`studentPromotions.${day}.highlight`),
      description: t(`studentPromotions.${day}.description`),
    })
  );

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
