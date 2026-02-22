"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SheetDemo() {
  const t = useTranslations("mobileMenu");
  const navT = useTranslations("navigation");

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
      <SheetTrigger asChild className="m-8 mt-13 cursor-pointer">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect x="10" y="0" width="30" height="2" rx="2" fill="#000" />
          <rect x="10" y="10" width="30" height="2" rx="2" fill="#000" />
          <rect x="10" y="20" width="30" height="2" rx="2" fill="#000" />
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-baby-blue flex flex-col overflow-y-auto w-full sm:max-w-md">
        <div className="pt-8 pb-6 text-center border-b border-gray-200">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h2 className="text-2xl font-serif text-dark-blue tracking-wider">
            {t("title")}
          </h2>
        </div>

        <div className="py-8 px-6 text-center border-b border-gray-200">
          <p className="text-light-gray leading-relaxed text-sm">
            {t("description")}
          </p>
        </div>

        <nav className="py-6 px-6 border-b border-gray-200">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href} className="text-center">
                <Link
                  href={item.href}
                  className="text-dark-blue hover:text-coral-accent transition-colors uppercase tracking-wider text-sm font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="py-8 px-6 space-y-4">
          <h3 className="text-lg font-serif text-dark-blue uppercase tracking-wider text-center mb-6">
            {t("contactTitle")}
          </h3>

          <div className="space-y-3 text-center">
            <div>
              <p className="text-light-gray text-sm mb-1">{t("phone")}</p>
              <a
                href="tel:+48322372347"
                className="text-dark-blue hover:text-coral-accent transition-colors"
              >
                +48 32 237 23 47
              </a>
            </div>

            <div>
              <p className="text-light-gray text-sm mb-1">{t("email")}</p>
              <a
                href="mailto:stolowkastudencka@gmail.com"
                className="text-dark-blue hover:text-coral-accent transition-colors text-sm"
              >
                stolowkastudencka@gmail.com
              </a>
            </div>

            <div>
              <p className="text-light-gray text-sm mb-1">{t("address")}</p>
              <p className="text-dark-blue text-sm">
                ul. Łużycka 123
                <br />
                44-100 Gliwice
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 px-6 border-t border-gray-200">
          <h3 className="text-sm font-serif text-dark-blue uppercase tracking-wider text-center mb-4">
            {t("followUs")}
          </h3>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-coral-accent hover:bg-coral-accent hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-coral-accent hover:bg-coral-accent hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
