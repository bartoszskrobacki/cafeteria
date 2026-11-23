import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hall } from "../../components/hallComponents/hall";
import { Features } from "../../components/hallComponents/features";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "events", "imprezy");
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("events");

  return (
    <div className="min-h-screen pt-24">
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-dark-blue mb-6 font-serif text-4xl tracking-wider uppercase md:text-5xl">{t("title")}</h1>
          <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          <p className="text-light-gray text-lg leading-relaxed">{t("description")}</p>
        </div>
      </section>

      <div className="bg-baby-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.catering.title")}
            description={t("services.catering.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.webp"
            imageAlt={t("services.catering.title")}
            imageOnLeft={true}
          />
        </div>
      </div>

      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.grillsAndPicnics.title")}
            description={t("services.grillsAndPicnics.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.webp"
            imageAlt={t("services.grillsAndPicnics.title")}
            imageOnLeft={false}
          />
        </div>
      </div>

      <div className="bg-baby-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.corporateEvents.title")}
            description={t("services.corporateEvents.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.webp"
            imageAlt={t("services.corporateEvents.title")}
            imageOnLeft={true}
          />
        </div>
      </div>

      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.communionsAndBaptisms.title")}
            description={t("services.communionsAndBaptisms.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.webp"
            imageAlt={t("services.communionsAndBaptisms.title")}
            imageOnLeft={false}
          />
        </div>
      </div>

      <div className="bg-baby-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.wakes.title")}
            description={t("services.wakes.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.webp"
            imageAlt={t("services.wakes.title")}
            imageOnLeft={true}
          />
        </div>
      </div>

      <Features />

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-dark-blue mb-6 font-serif text-3xl md:text-4xl">{t("cta.title")}</h2>
          <div className="bg-coral-accent mx-auto mb-8 h-1 w-24"></div>
          <p className="text-light-gray mb-8 text-lg leading-relaxed">{t("cta.description")}</p>
          <Link
            href="/kontakt"
            className="bg-coral-accent hover:bg-primary inline-block px-8 py-4 font-semibold tracking-wider text-white uppercase transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
