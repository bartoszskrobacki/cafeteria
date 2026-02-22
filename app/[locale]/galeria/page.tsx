import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryGrid } from "../../components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");

  const galleryItems = [
    {
      image: "/main_banner.jpg",
      category: t("items.mainHall.category"),
      title: t("items.mainHall.title"),
      description: t("items.mainHall.description"),
    },
    {
      image: "/sala-mala.webp",
      category: t("items.conferenceRoom.category"),
      title: t("items.conferenceRoom.title"),
      description: t("items.conferenceRoom.description"),
    },
    {
      image: "/main_banner.jpg",
      category: t("items.ourDishes.category"),
      title: t("items.ourDishes.title"),
      description: t("items.ourDishes.description"),
    },
    {
      image: "/main_banner.jpg",
      category: t("items.friendlyPlace.category"),
      title: t("items.friendlyPlace.title"),
      description: t("items.friendlyPlace.description"),
    },
    {
      image: "/main_banner.jpg",
      category: t("items.ourTeam.category"),
      title: t("items.ourTeam.title"),
      description: t("items.ourTeam.description"),
    },
    {
      image: "/main_banner.jpg",
      category: t("items.specialOccasions.category"),
      title: t("items.specialOccasions.title"),
      description: t("items.specialOccasions.description"),
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="text-center py-16">
        <h2 className="text-4xl md:text-5xl text-dark-blue mb-4">{t("title")}</h2>
        <div className="w-24 h-1 bg-coral-accent mx-auto"></div>
      </div>

      <GalleryGrid items={galleryItems} columns={3} />
    </div>
  );
}
