import { setRequestLocale } from "next-intl/server";
import { MenuSection } from "../../components/menu/MenuSection";
import { getMenuCategories } from "../../../lib/contentful";

interface Props {
  params: Promise<{ locale: string }>;
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
              price: `${meal.fields.price.toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
    </div>
  );
}
