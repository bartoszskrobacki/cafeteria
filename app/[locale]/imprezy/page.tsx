import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hall } from "../../components/hallComponents/hall";
import { Features } from "../../components/hallComponents/features";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("events");

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl text-dark-blue mb-6 font-serif uppercase tracking-wider">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-coral-accent mx-auto mb-8"></div>
          <p className="text-light-gray text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>
      </section>

      <div className="bg-baby-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Hall
            title={t("services.catering.title")}
            description={t("services.catering.description")}
            contactLink="/kontakt"
            imageSrc="/main_banner.jpg"
            imageAlt="Catering"
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
            imageSrc="/main_banner.jpg"
            imageAlt="BBQs and Picnics"
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
            imageSrc="/main_banner.jpg"
            imageAlt="Corporate Events"
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
            imageSrc="/main_banner.jpg"
            imageAlt="Communions and Baptisms"
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
            imageSrc="/main_banner.jpg"
            imageAlt="Wakes"
            imageOnLeft={true}
          />
        </div>
      </div>

      <Features />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl text-dark-blue mb-6 font-serif">
            {t("cta.title")}
          </h2>
          <div className="w-24 h-1 bg-coral-accent mx-auto mb-8"></div>
          <p className="text-light-gray text-lg leading-relaxed mb-8">
            {t("cta.description")}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-coral-accent text-white px-8 py-4 uppercase tracking-wider font-semibold hover:bg-primary transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
