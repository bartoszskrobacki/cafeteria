import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "../../components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "kontakt");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl text-dark-blue mb-6">
                {t("writeToUs")}
              </h2>
              <div className="w-24 h-1 bg-coral-accent mb-8"></div>

              <ContactForm />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl text-dark-blue mb-6">
                {t("contactDetails")}
              </h2>
              <div className="w-24 h-1 bg-coral-accent mb-8"></div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-serif text-dark-blue mb-3 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-coral-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {t("info.address")}
                  </h3>
                  <p className="text-light-gray leading-relaxed">
                    ul. Łużycka 24
                    <br />
                    44-100 Gliwice
                    <br />
                    Polska
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-dark-blue mb-3 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-coral-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {t("info.phone")}
                  </h3>
                  <p className="text-light-gray">
                    <a
                      href="tel:+48322372347"
                      className="hover:text-coral-accent transition-colors"
                    >
                      +48 32 237 23 47
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-dark-blue mb-3 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-coral-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {t("info.openingHours")}
                  </h3>
                  <div className="text-light-gray space-y-1">
                    <p className="text-dark-blue italic">
                      {t("info.academicYear")}
                    </p>
                    <p>{t("info.academicWeekdays")}</p>
                    <p>{t("info.academicWeekend")}</p>
                    <p className="pt-2 text-dark-blue italic">
                      {t("info.holidays")}
                    </p>
                    <p>{t("info.holidayWeekdays")}</p>
                    <p>{t("info.holidayWeekend")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-dark-blue mb-3 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-coral-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email
                  </h3>
                  <p className="text-light-gray">
                    <a
                      href="mailto:stolowkalyzcka24@gmail.com"
                      className="hover:text-coral-accent transition-colors"
                    >
                      stolowkalyzcka24@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
