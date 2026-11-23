"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1" role="group" aria-label={t("label")}>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          aria-current={locale === loc ? "true" : undefined}
          onClick={() => handleLocaleChange(loc)}
          className={`flex min-h-11 min-w-11 items-center justify-center rounded px-2 text-xs tracking-wider uppercase transition-colors ${
            locale === loc ? "bg-coral-accent text-white" : "text-dark-blue hover:text-coral-accent"
          } `}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
