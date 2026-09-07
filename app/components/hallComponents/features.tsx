import { useTranslations } from "next-intl";
import {
  AirVent,
  Volume2,
  Wifi,
  Sun,
  Monitor,
  Projector,
  Mic,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const hallFeatures: { translationKey: string; Icon: LucideIcon }[] = [
  { translationKey: "airConditioning", Icon: AirVent },
  { translationKey: "sound", Icon: Volume2 },
  { translationKey: "wifi", Icon: Wifi },
  { translationKey: "daylight", Icon: Sun },
  { translationKey: "screen", Icon: Monitor },
  { translationKey: "projector", Icon: Projector },
  { translationKey: "microphone", Icon: Mic },
  { translationKey: "catering", Icon: UtensilsCrossed },
];

export const Features = () => {
  const t = useTranslations("hallFeatures");

  return (
    <section className="py-16 md:py-24 bg-beige-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center text-dark-blue font-serif mb-6">
          {t("title")}
        </h2>
        <div className="w-24 h-1 bg-coral-accent mx-auto mb-12 md:mb-16"></div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-12">
          {hallFeatures.map(({ translationKey, Icon }) => (
            <li
              key={translationKey}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full bg-white border border-coral-accent/20 shadow-sm flex items-center justify-center transition-colors group-hover:border-coral-accent/60">
                <Icon
                  className="w-7 h-7 md:w-8 md:h-8 text-coral-accent"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <span className="text-base md:text-lg font-medium text-dark-blue">
                {t(translationKey)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
