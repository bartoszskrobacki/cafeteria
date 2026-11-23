// Centralne dane lokalu — reużywane w SEO (JSON-LD), stopce i kontakcie.
// Nazwa, adres i telefon muszą być identyczne z wizytówką Google i Facebookiem.
export const businessInfo = {
  // Nazwa wyświetlana na stronie (tytuły, stopka).
  name: "Stołówka Studencka u Piotra",
  // Nazwa dokładnie jak w wizytówce Google.
  gbpName: "Stołówka Studencka „u Piotra”",
  alternateName: "Stołówka Studencka",
  url: "https://stolowkastudencka.pl",
  telephone: "+48322372347",
  telephoneDisplay: "+48 32 237 23 47",
  email: "stolowkalyzcka24@gmail.com",
  foundingDate: "1985",
  address: {
    streetAddress: "ul. Łużycka 24",
    postalCode: "44-100",
    addressLocality: "Gliwice",
    addressRegion: "śląskie",
    addressCountry: "PL",
  },
  // Współrzędne budynku przy ul. Łużyckiej 24 (OpenStreetMap).
  geo: { latitude: 50.28833, longitude: 18.67434 },
  // Pn–Pt 8:00–18:00, Sb 10:00–16:00, Nd nieczynne.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
  priceRange: "$",
  servesCuisine: ["Polish", "Home-style"],
  social: {
    facebook: "https://www.facebook.com/stolowkastudencka/",
  },
  // TODO: podmienić na link „Udostępnij” z wizytówki Google (maps.app.goo.gl/…), gdy będzie dostępny.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sto%C5%82%C3%B3wka+Studencka+u+Piotra%2C+%C5%81u%C5%BCycka+24%2C+Gliwice",
  logo: "/logo.png",
  image: "/main_banner.webp",
  ogImage: "/og-image.jpg",
} as const;

// JSON-LD schema.org (WebSite + Restaurant) do osadzenia w <head>.
export function restaurantJsonLd(locale: string) {
  const { url } = businessInfo;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url: `${url}/`,
        name: businessInfo.name,
        alternateName: businessInfo.alternateName,
        inLanguage: locale,
        publisher: { "@id": `${url}/#restaurant` },
      },
      {
        "@type": "Restaurant",
        "@id": `${url}/#restaurant`,
        name: businessInfo.gbpName,
        alternateName: [businessInfo.name, businessInfo.alternateName],
        url: `${url}/`,
        telephone: businessInfo.telephone,
        email: businessInfo.email,
        foundingDate: businessInfo.foundingDate,
        image: [`${url}${businessInfo.image}`, `${url}${businessInfo.ogImage}`],
        logo: `${url}${businessInfo.logo}`,
        priceRange: businessInfo.priceRange,
        servesCuisine: businessInfo.servesCuisine,
        hasMenu: `${url}/${locale}/menu/`,
        hasMap: businessInfo.mapsUrl,
        sameAs: Object.values(businessInfo.social),
        address: {
          "@type": "PostalAddress",
          ...businessInfo.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: businessInfo.geo.latitude,
          longitude: businessInfo.geo.longitude,
        },
        openingHoursSpecification: businessInfo.openingHours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      },
    ],
  };
}
