import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n/config";
import { businessInfo } from "./business-info";

export const baseUrl = businessInfo.url;

// Lista tras (segmenty wspólne dla wszystkich języków).
// 'o-nas' tymczasowo usunięte — strona ukryta (kod w app/[locale]/_o-nas).
export const routes = ["", "menu", "galeria", "imprezy", "konferencje", "kontakt"] as const;

export function urlFor(locale: string, path = "") {
  const clean = path ? `/${path}` : "";
  // trailingSlash: true w next.config — utrzymujemy spójne URL-e.
  return `${baseUrl}/${locale}${clean}/`;
}

// Kanoniczny URL + hreflang dla danej strony (do pola `alternates` w metadata).
export function buildAlternates(locale: string, path = "") {
  return {
    canonical: urlFor(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, urlFor(l, path)])),
      "x-default": urlFor(defaultLocale, path),
    },
  };
}

// Pełny zestaw OpenGraph + Twitter. Next.js nie scala `openGraph` z layoutu
// z `openGraph` strony (strona nadpisuje całość), więc każda strona dostaje komplet.
export function socialMetadata(locale: string, path: string, title: string, description: string) {
  const image = {
    url: businessInfo.ogImage,
    width: 1200,
    height: 630,
    alt: businessInfo.name,
  };

  return {
    openGraph: {
      type: "website" as const,
      siteName: businessInfo.name,
      title,
      description,
      url: urlFor(locale, path),
      locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? ["en_US"] : ["pl_PL"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [businessInfo.ogImage],
    },
  };
}

// Jednolinijkowy generator metadanych dla podstron.
// `key` to klucz w namespace "metadata", `path` to segment URL (np. "menu").
export async function pageMetadata(locale: string, key: string, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    ...socialMetadata(locale, path, `${title} | ${businessInfo.name}`, description),
  };
}
