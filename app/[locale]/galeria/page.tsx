import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryGrid } from "../../components/gallery/GalleryGrid";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "gallery", "galeria");
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");

  const galleryItems = [
    {
      image: "/main_banner.webp",
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
      image: "/main_banner.webp",
      category: t("items.ourDishes.category"),
      title: t("items.ourDishes.title"),
      description: t("items.ourDishes.description"),
    },
    {
      image: "/main_banner.webp",
      category: t("items.friendlyPlace.category"),
      title: t("items.friendlyPlace.title"),
      description: t("items.friendlyPlace.description"),
    },
    {
      image: "/main_banner.webp",
      category: t("items.ourTeam.category"),
      title: t("items.ourTeam.title"),
      description: t("items.ourTeam.description"),
    },
    {
      image: "/main_banner.webp",
      category: t("items.specialOccasions.category"),
      title: t("items.specialOccasions.title"),
      description: t("items.specialOccasions.description"),
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="py-16 text-center">
        <h1 className="text-dark-blue mb-4 text-4xl md:text-5xl">{t("title")}</h1>
        <div className="bg-coral-accent mx-auto h-1 w-24"></div>
      </div>

      <GalleryGrid items={galleryItems} columns={3} />
    </div>
  );
}
