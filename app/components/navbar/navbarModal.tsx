"use client";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { businessInfo } from "@/lib/business-info";

export function SheetDemo() {
  const t = useTranslations("mobileMenu");
  const navT = useTranslations("navigation");
  const common = useTranslations("common");

  const navItems = [
    { href: "/", label: navT("home") },
    { href: "/menu", label: navT("menu") },
    { href: "/konferencje", label: navT("conferences") },
    { href: "/imprezy", label: navT("events") },
    { href: "/o-nas", label: navT("about") },
    { href: "/galeria", label: navT("gallery") },
    { href: "/kontakt", label: navT("contact") },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t("open")}
          className="flex h-12 w-12 cursor-pointer items-center justify-center"
        >
          <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true">
            <rect x="0" y="0" width="30" height="2" rx="1" fill="#000" />
            <rect x="0" y="10" width="30" height="2" rx="1" fill="#000" />
            <rect x="0" y="20" width="30" height="2" rx="1" fill="#000" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-baby-blue flex w-full flex-col overflow-y-auto sm:max-w-md">
        <SheetTitle className="sr-only">{t("title")}</SheetTitle>
        <div className="border-b border-gray-200 pt-8 pb-6 text-center">
          <div className="relative mx-auto mb-4 h-32 w-32">
            <Image src="/logo.webp" alt={common("logoAlt")} fill className="object-contain" />
          </div>
        </div>
        <nav className="border-b border-gray-200 px-6 py-6 xl:hidden">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href} className="text-center">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="text-dark-blue hover:text-coral-accent text-sm font-semibold tracking-wider uppercase transition-colors"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-b border-gray-200 px-6 py-8 text-center">
          <SheetDescription className="text-light-gray text-sm leading-relaxed">{t("description")}</SheetDescription>
        </div>

        <div className="space-y-4 px-6 py-8">
          <h3 className="text-dark-blue mb-6 text-center font-serif text-lg tracking-wider uppercase">
            {t("contactTitle")}
          </h3>

          <div className="space-y-3 text-center">
            <div>
              <p className="text-light-gray mb-1 text-sm">{t("phone")}</p>
              <a href="tel:+48322372347" className="text-dark-blue hover:text-coral-accent transition-colors">
                +48 32 237 23 47
              </a>
            </div>

            <div>
              <p className="text-light-gray mb-1 text-sm">{t("email")}</p>
              <a
                href="mailto:stolowkalyzcka24@gmail.com"
                className="text-dark-blue hover:text-coral-accent text-sm transition-colors"
              >
                stolowkalyzcka24@gmail.com
              </a>
            </div>

            <div>
              <p className="text-light-gray mb-1 text-sm">{t("address")}</p>
              <p className="text-dark-blue text-sm">
                ul. Łużycka 24
                <br />
                44-100 Gliwice
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-6">
          <h3 className="text-dark-blue mb-4 text-center font-serif text-sm tracking-wider uppercase">
            {t("followUs")}
          </h3>
          <div className="flex justify-center gap-4">
            <a
              href={businessInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={common("facebookLabel")}
              className="text-coral-accent hover:bg-coral-accent flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
