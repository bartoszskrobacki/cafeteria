import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Features } from "../../components/hallComponents/features";
import { Halls } from "../../components/hallComponents/halls";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "conferences", "konferencje");
}

export default async function ConferencesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("conferences");

  return (
    <div className="min-h-screen pt-24">
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-light-gray mb-3 text-sm italic">{t("title")}</p>
          <h1 className="text-dark-blue mb-6 font-serif text-3xl md:text-4xl">{t("heading")}</h1>
          <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          <p className="text-light-gray text-lg leading-relaxed">{t("description")}</p>
        </div>
      </section>

      <Halls />
      <Features />
    </div>
  );
}
