import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeaturesGrid } from "../../components/features/FeaturesGrid";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", "o-nas");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const features = [
    {
      icon: (
        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("features.freshProducts.title"),
      subtitle: t("features.freshProducts.subtitle"),
      description: t("features.freshProducts.description"),
    },
    {
      icon: (
        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("features.quality.title"),
      subtitle: t("features.quality.subtitle"),
      description: t("features.quality.description"),
    },
    {
      icon: (
        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("features.affordablePrices.title"),
      subtitle: t("features.affordablePrices.subtitle"),
      description: t("features.affordablePrices.description"),
    },
    {
      icon: (
        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: t("features.homeAtmosphere.title"),
      subtitle: t("features.homeAtmosphere.subtitle"),
      description: t("features.homeAtmosphere.description"),
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h1 className="text-dark-blue mb-6 text-4xl md:text-5xl">{t("title")}</h1>
            <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          </div>

          <div className="text-light-gray space-y-6 text-base leading-relaxed md:text-lg">
            <p>{t("paragraphs.p1")}</p>
            <p>{t("paragraphs.p2")}</p>
            <p>{t("paragraphs.p3")}</p>
          </div>
        </div>
      </section>

      <FeaturesGrid features={features} columns={4} />
    </div>
  );
}
