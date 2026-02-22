import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage: string;
}

export const HeroSection = ({ title, subtitle, ctaText = "Zobacz więcej", ctaHref = "#", backgroundImage }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="" fill className="object-cover" priority />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container - Logo + Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]">
          {/* Logo */}
          <Image src="/main_banner_logo.png" alt="Logo" fill className="object-contain" />

          {/* Text on top of logo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {subtitle && <p className="text-xs md:text-sm text-primary uppercase tracking-[0.2em] mb-2">{subtitle}</p>}

            <h1 className="text-2xl md:text-4xl lg:text-5xl text-primary mb-4 leading-tight font-serif">{title}</h1>

            {ctaText && (
              <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-4 text-xs tracking-wider uppercase">
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
