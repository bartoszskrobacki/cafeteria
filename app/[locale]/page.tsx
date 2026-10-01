import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "../components/hero/HeroSection";
import { DailyMenu } from "../components/dailymenu/DailyMenu";
import { StudentPromotions } from "../components/promotions/StudentPromotions";
import { MenuCategories } from "../components/menu/MenuCategories";

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

  return (
    <>
      <HeroSection title={t("hero.title")} subtitle={t("hero.subtitle")} ctaText={t("hero.cta")} ctaHref={`/${locale}/menu`} backgroundImage="/main_banner.jpg" />

      <DailyMenu />

      <StudentPromotions promotions={studentPromotions} />

      <MenuCategories />
    </>
  );
}
