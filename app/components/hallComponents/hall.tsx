import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface HallProps {
  title: string;
  description: string;
  contactLink: string;
  imageSrc: string;
  imageAlt: string;
  imageOnLeft?: boolean;
}

export const Hall = ({
  title,
  description,
  contactLink,
  imageSrc,
  imageAlt,
  imageOnLeft = true,
}: HallProps) => {
  const t = useTranslations("conferences");

  const ImageSection = (
    <div className="relative w-full h-96 md:h-[500px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );

  const ContentSection = (
    <div className="flex flex-col justify-center space-y-6 p-6 md:p-8">
      <h2 className="text-4xl md:text-5xl font-serif text-dark-blue">{title}</h2>

      <div className="w-24 h-1 bg-coral-accent"></div>

      <p className="text-light-gray text-lg leading-relaxed max-w-lg">
        {description}
      </p>

      <Link
        href={contactLink}
        className="inline-block text-coral-accent font-semibold uppercase tracking-wider text-sm hover:text-primary transition-colors"
      >
        {t("contactLink")}
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
      {imageOnLeft ? (
        <>
          {ImageSection}
          {ContentSection}
        </>
      ) : (
        <>
          {ContentSection}
          {ImageSection}
        </>
      )}
    </div>
  );
};
