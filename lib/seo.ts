import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/config';
import { businessInfo } from './business-info';

export const baseUrl = businessInfo.url;

// Lista tras (segmenty wspólne dla wszystkich języków).
export const routes = ['', 'menu', 'o-nas', 'galeria', 'imprezy', 'konferencje', 'kontakt'] as const;

function urlFor(locale: string, path = '') {
  const clean = path ? `/${path}` : '';
  // trailingSlash: true w next.config — utrzymujemy spójne URL-e.
  return `${baseUrl}/${locale}${clean}/`;
}

// Kanoniczny URL + hreflang dla danej strony (do pola `alternates` w metadata).
export function buildAlternates(locale: string, path = '') {
  return {
    canonical: urlFor(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, urlFor(l, path)])),
      'x-default': urlFor(defaultLocale, path),
    },
  };
}

// Jednolinijkowy generator metadanych dla podstron.
// `key` to klucz w namespace "metadata", `path` to segment URL (np. "menu").
export async function pageMetadata(locale: string, key: string, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: urlFor(locale, path),
    },
  };
}
