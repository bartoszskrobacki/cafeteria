import Image from "next/image";
import { useTranslations } from "next-intl";
import { businessInfo } from "@/lib/business-info";

const Footer = () => {
  const t = useTranslations("footer");
  const common = useTranslations("common");

  return (
    <footer className="bg-white">
      <div className="bg-beige-background h-24 md:h-32"></div>

      <div className="container mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <div className="text-center md:text-left">
            <h3 className="text-dark-blue mb-6 font-serif text-sm tracking-[0.3em] uppercase">{t("location")}</h3>
            <div className="text-light-gray space-y-2 text-sm">
              <p>{businessInfo.address.streetAddress}</p>
              <p>
                {businessInfo.address.postalCode} {businessInfo.address.addressLocality}, Polska
              </p>
              <p>
                <a
                  href={businessInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-accent inline-block py-1 underline underline-offset-4"
                >
                  {t("directions")} →
                </a>
              </p>
              <p className="pt-2">
                <a href={`tel:${businessInfo.telephone}`} className="hover:text-coral-accent inline-block py-1">
                  {businessInfo.telephoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${businessInfo.email}`} className="hover:text-coral-accent inline-block py-1">
                  {businessInfo.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-32 w-64">
              <Image src="/logo.webp" alt={common("logoAlt")} fill className="object-contain" />
            </div>

            <div className="flex justify-center gap-6">
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={common("facebookLabel")}
                className="text-dark-blue hover:text-coral-accent flex h-12 w-12 items-center justify-center transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-dark-blue mb-6 font-serif text-sm tracking-[0.3em] uppercase">{t("hours")}</h3>
            <div className="text-light-gray space-y-2 text-sm">
              <p className="text-dark-blue italic">{t("academicYear")}</p>
              <p>{t("academicWeekdays")}</p>
              <p>{t("academicWeekend")}</p>
              <p>{t("academicSunday")}</p>
              <p className="text-dark-blue pt-2 italic">{t("holidays")}</p>
              <p>{t("holidayWeekdays")}</p>
              <p>{t("holidayWeekend")}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 py-8 text-center">
          <p className="text-light-gray text-xs italic">{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
