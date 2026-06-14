import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { baseUrl, routes } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((path) => {
      const clean = path ? `/${path}` : '';
      return {
        url: `${baseUrl}/${locale}${clean}/`,
        lastModified,
        changeFrequency: path === '' || path === 'menu' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            [...locales.map((l) => [l, `${baseUrl}/${l}${clean}/`]), ['x-default', `${baseUrl}/${defaultLocale}${clean}/`]]
          ),
        },
      };
    })
  );
}
