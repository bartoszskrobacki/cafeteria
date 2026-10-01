import { getMenu } from "@/lib/api";
import { MenuSection } from "./MenuSection";

const MENU_TAG = "stolowka_studencka";

// Fetched at build time - the site is statically exported
export const MenuCategories = async () => {
  const menu = await getMenu(MENU_TAG);
  const categories = menu?.categories ?? [];

  return (
    <>
      {categories.map((category, index) => (
        <div key={category.id} className={index % 2 === 1 ? "bg-secondary-background" : ""}>
          <MenuSection
            title={category.name.toUpperCase()}
            subtitle={category.description ?? undefined}
            items={category.items.map((item) => ({
              name: item.name,
              description: item.description ?? "",
              // API returns decimals as strings
              price: `${Number(item.price).toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
    </>
  );
};
