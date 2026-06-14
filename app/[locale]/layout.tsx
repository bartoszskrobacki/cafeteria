import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { businessInfo, restaurantJsonLd } from "@/lib/business-info";
import "../globals.css";
import { Navbar } from "../components/navbar/navbar";
import { Mulish, Cormorant_Garamond } from "next/font/google";
import Footer from "../components/footer/footer";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant_garamond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const baseUrl = 'https://stolowkastudencka.pl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: metadata.title,
      template: `%s | ${businessInfo.name}`,
    },
    description: metadata.description,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      type: "website",
      siteName: businessInfo.name,
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/`,
      locale: locale === "pl" ? "pl_PL" : "en_US",
      images: [{ url: businessInfo.image, width: 1200, height: 630, alt: businessInfo.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [businessInfo.image],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${mulish.variable} ${cormorant_garamond.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
