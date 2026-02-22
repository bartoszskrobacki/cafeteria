import { getTranslations, setRequestLocale } from "next-intl/server";
import { Features } from "../../components/hallComponents/features";
import { Halls } from "../../components/hallComponents/halls";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ConferencesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("conferences");

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl text-dark-blue mb-6 font-serif">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-coral-accent mx-auto mb-8"></div>
          <p className="text-light-gray text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>
      </section>

      <Halls />
      <Features />
    </div>
  );
}
