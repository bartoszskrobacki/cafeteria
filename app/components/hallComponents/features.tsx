import { useTranslations } from "next-intl";
import {
  AirConditioning,
  Speaker,
  Wifi,
  Daylight,
  Screen,
  Projector,
  Microphone,
} from "../icons";

const hallFeatures = [
  { translationKey: "airConditioning", iconName: "AirConditioning" },
  { translationKey: "sound", iconName: "Speaker" },
  { translationKey: "wifi", iconName: "Wifi" },
  { translationKey: "daylight", iconName: "Daylight" },
  { translationKey: "screen", iconName: "Screen" },
  { translationKey: "projector", iconName: "Projector" },
  { translationKey: "microphone", iconName: "Microphone" },
];

export const Features = () => {
  const t = useTranslations("hallFeatures");

  const iconMap = {
    AirConditioning,
    Speaker,
    Wifi,
    Daylight,
    Screen,
    Projector,
    Microphone,
  };

  return (
    <div className="py-12 bg-beige-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-dark-blue">
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {hallFeatures.map((feature, index) => {
            const IconComponent =
              iconMap[feature.iconName as keyof typeof iconMap];
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <IconComponent className="text-coral-accent" />
                </div>
                <span className="text-2xl font-semibold text-dark-blue">
                  {t(feature.translationKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
