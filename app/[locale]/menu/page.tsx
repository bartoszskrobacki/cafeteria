import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MenuSection } from "../../components/menu/MenuSection";
import { getMenuCategories } from "../../../lib/contentful";
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

  const categories = await getMenuCategories();

  return (
    <div className="min-h-screen pt-24">
      {categories.map((category, index) => (
        <div key={category.fields.name} className={index % 2 === 1 ? "bg-secondary-background" : ""}>
          <MenuSection
            title={category.fields.name.toUpperCase()}
            items={(category.fields.listOfMeals ?? []).map((meal) => ({
              name: meal.fields.name,
              description: meal.fields.description ?? "",
              price: `${(meal.fields.price ?? 0).toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
    </div>
  );
}
