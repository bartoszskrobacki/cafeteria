import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuCategories } from "../../components/menu/MenuCategories";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "menu", "menu");
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("menuPage");

  return (
    <div className="min-h-screen pt-24">
      <section className="bg-white pt-16 md:pt-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-dark-blue mb-6 font-serif text-4xl tracking-wider uppercase md:text-5xl">{t("title")}</h1>
          <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          <p className="text-light-gray text-lg leading-relaxed">{t("intro")}</p>
        </div>
      </section>
      <MenuCategories />
    </div>
  );
}
