import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/config";
import { routes, urlFor } from "@/lib/seo";

export const dynamic = "force-static";

// Bez lastModified/changefreq/priority: data buildu nie jest prawdziwą datą zmiany
// treści (Google przestaje jej ufać), a changefreq i priority Google ignoruje.
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((path) => ({
      url: urlFor(locale, path),
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, urlFor(l, path)]),
          ["x-default", urlFor(defaultLocale, path)],
        ]),
      },
    }))
  );
}
