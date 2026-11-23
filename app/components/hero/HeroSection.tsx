import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const HeroSection = ({ title, subtitle, ctaText = "Zobacz więcej", ctaHref = "#" }: HeroSectionProps) => {
  return (
    <div className="relative h-[65vh] min-h-[420px] w-full overflow-hidden md:h-[700px] lg:h-[800px]">
      {/* Background Image — element LCP: responsywne źródła WebP, ładowany z wysokim priorytetem */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport (images.unoptimized), srcset trzeba podać ręcznie */}
        <img
          src="/main_banner.webp"
          srcSet="/main_banner-800.webp 800w, /main_banner.webp 1440w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container - Logo + Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64 md:h-96 md:w-96 lg:h-[32rem] lg:w-[32rem]">
          {/* Ozdobna ramka (dekoracja, bez tekstu alternatywnego) */}
          <Image src="/main_banner_logo.png" alt="" fill className="object-contain" priority />

          {/* Text on top of logo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            {subtitle && (
              <p className="text-primary mb-2 text-[9px] tracking-[0.2em] uppercase md:text-xs">{subtitle}</p>
            )}

            <h1 className="text-primary mb-4 font-serif text-2xl leading-tight md:text-4xl lg:text-5xl">{title}</h1>

            {ctaText && (
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 px-6 py-4 text-xs tracking-wider text-white uppercase"
              >
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
