import { useTranslations } from "next-intl";
import { businessInfo } from "@/lib/business-info";

// Pasek z najważniejszymi informacjami (adres, godziny, telefon) widoczny zaraz pod hero.
export const InfoBar = () => {
  const t = useTranslations("infoBar");

  return (
    <section className="bg-[var(--dark-blue-text)] text-white">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 text-center text-sm md:grid-cols-3 md:text-left">
        <div>
          <p className="mb-1 text-xs tracking-[0.2em] text-white/70 uppercase">{t("address")}</p>
          <p>
            {businessInfo.address.streetAddress}, {businessInfo.address.postalCode}{" "}
            {businessInfo.address.addressLocality}
          </p>
          <a
            href={businessInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral-accent inline-block py-2 underline underline-offset-4"
          >
            {t("directions")} →
          </a>
        </div>
        <div>
          <p className="mb-1 text-xs tracking-[0.2em] text-white/70 uppercase">{t("hours")}</p>
          <p>{t("hoursWeekdays")}</p>
          <p>{t("hoursSaturday")}</p>
        </div>
        <div className="md:text-right">
          <p className="mb-1 text-xs tracking-[0.2em] text-white/70 uppercase">{t("phone")}</p>
          <a
            href={`tel:${businessInfo.telephone}`}
            className="hover:text-coral-accent inline-block py-2 text-lg font-semibold"
          >
            {businessInfo.telephoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
};
