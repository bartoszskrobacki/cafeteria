// Centralne dane lokalu — reużywane w SEO (JSON-LD), stopce i kontakcie.
export const businessInfo = {
  name: 'Stołówka Studencka',
  url: 'https://stolowkastudencka.pl',
  telephone: '+48322372347',
  telephoneDisplay: '+48 32 237 23 47',
  email: 'stolowkalyzcka24@gmail.com',
  address: {
    streetAddress: 'ul. Łużycka 24',
    postalCode: '44-100',
    addressLocality: 'Gliwice',
    addressCountry: 'PL',
  },
  // Rok akademicki: Pn–Pt 8:00–18:00, Sb–Nd 10:00–16:00 (wakacje: Pn–Pt 9:00–17:00, weekend nieczynne)
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday', 'Sunday'], opens: '10:00', closes: '16:00' },
  ],
  priceRange: '$',
  servesCuisine: 'Polish',
  logo: '/logo.png',
  image: '/main_banner.jpg',
} as const;

// JSON-LD schema.org/Restaurant do osadzenia w <head>.
export function restaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: businessInfo.name,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    image: `${businessInfo.url}${businessInfo.image}`,
    logo: `${businessInfo.url}${businessInfo.logo}`,
    priceRange: businessInfo.priceRange,
    servesCuisine: businessInfo.servesCuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      postalCode: businessInfo.address.postalCode,
      addressLocality: businessInfo.address.addressLocality,
      addressCountry: businessInfo.address.addressCountry,
    },
    openingHoursSpecification: businessInfo.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}
