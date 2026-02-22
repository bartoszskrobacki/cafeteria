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
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`
            text-xs uppercase tracking-wider px-2 py-1 rounded transition-colors
            ${
              locale === loc
                ? "bg-coral-accent text-white"
                : "text-dark-blue hover:text-coral-accent"
            }
          `}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
