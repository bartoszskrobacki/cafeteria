import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "../components/hero/HeroSection";
import { DailyMenu } from "../components/dailymenu/DailyMenu";
import { StudentPromotions } from "../components/promotions/StudentPromotions";
import { MenuCategories } from "../components/menu/MenuCategories";
import { InfoBar } from "../components/infobar/InfoBar";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const studentPromotions = (["monday", "tuesday", "wednesday", "thursday", "friday"] as const).map((day, index) => ({
    id: day,
    weekday: index + 1,
    day: t(`studentPromotions.${day}.day`),
    shortDay: t(`studentPromotions.${day}.shortDay`),
    title: t(`studentPromotions.${day}.title`),
    subtitle: t(`studentPromotions.${day}.subtitle`),
    highlight: t(`studentPromotions.${day}.highlight`),
    description: t(`studentPromotions.${day}.description`),
  }));

  return (
    <>
      <HeroSection
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        ctaText={t("hero.cta")}
        ctaHref={`/${locale}/menu/`}
      />

      <InfoBar />

      <section className="bg-white pt-16 md:pt-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-dark-blue mb-6 font-serif text-3xl md:text-4xl">{t("home.introTitle")}</h2>
          <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          <p className="text-light-gray text-lg leading-relaxed">{t("home.introText")}</p>
        </div>
      </section>

      <DailyMenu />

      <StudentPromotions promotions={studentPromotions} />

      <MenuCategories />
    </>
  );
}
