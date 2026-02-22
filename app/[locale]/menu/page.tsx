import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuSection } from "../../components/menu/MenuSection";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const mainDishes = [
    {
      name: t("menuItems.dishes.schnitzel.name"),
      description: t("menuItems.dishes.schnitzel.description"),
      price: "12.99 zł",
    },
    {
      name: t("menuItems.dishes.pierogiRuskie.name"),
      description: t("menuItems.dishes.pierogiRuskie.description"),
      price: "10.50 zł",
    },
    {
      name: t("menuItems.dishes.chickenSoup.name"),
      description: t("menuItems.dishes.chickenSoup.description"),
      price: "8.99 zł",
    },
    {
      name: t("menuItems.dishes.beefStew.name"),
      description: t("menuItems.dishes.beefStew.description"),
      price: "14.50 zł",
    },
    {
      name: t("menuItems.dishes.crepes.name"),
      description: t("menuItems.dishes.crepes.description"),
      price: "9.99 zł",
    },
    {
      name: t("menuItems.dishes.spaghetti.name"),
      description: t("menuItems.dishes.spaghetti.description"),
      price: "11.99 zł",
    },
    {
      name: t("menuItems.dishes.roastChicken.name"),
      description: t("menuItems.dishes.roastChicken.description"),
      price: "13.50 zł",
    },
    {
      name: t("menuItems.dishes.potatoPancakes.name"),
      description: t("menuItems.dishes.potatoPancakes.description"),
      price: "10.99 zł",
    },
  ];

  const drinks = [
    {
      name: t("menuItems.drinks.compote.name"),
      description: t("menuItems.drinks.compote.description"),
      price: "3.00 zł",
    },
    {
      name: t("menuItems.drinks.coffee.name"),
      description: t("menuItems.drinks.coffee.description"),
      price: "5.50 zł",
    },
    {
      name: t("menuItems.drinks.tea.name"),
      description: t("menuItems.drinks.tea.description"),
      price: "4.00 zł",
    },
    {
      name: t("menuItems.drinks.juice.name"),
      description: t("menuItems.drinks.juice.description"),
      price: "4.50 zł",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <MenuSection
        title={t("menu.mainDishes.title")}
        subtitle={t("menu.mainDishes.subtitle")}
        items={mainDishes}
        columns={2}
      />

      <div className="bg-secondary-background">
        <MenuSection
          title={t("menu.drinks.title")}
          subtitle={t("menu.drinks.subtitle")}
          items={drinks}
          columns={2}
        />
      </div>
    </div>
  );
}
