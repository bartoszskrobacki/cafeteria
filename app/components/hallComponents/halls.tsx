import { useTranslations } from "next-intl";
import { Hall } from "./hall";

export const Halls = () => {
  const t = useTranslations("conferences.halls");

  return (
    <div className="space-y-24 py-16">
      <Hall
        title={t("small.title")}
        description={t("small.description")}
        contactLink="/kontakt"
        imageSrc="/sala-mala.webp"
        imageAlt="Small Hall"
        imageOnLeft={true}
      />

      <Hall
        title={t("large.title")}
        description={t("large.description")}
        contactLink="/kontakt"
        imageSrc="/sala-mala.webp"
        imageAlt="Large Hall"
        imageOnLeft={false}
      />
    </div>
  );
};
