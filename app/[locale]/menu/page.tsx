import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MenuCategories } from "../../components/menu/MenuCategories";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "menu", "menu");
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24">
      <MenuCategories />
    </div>
  );
}
