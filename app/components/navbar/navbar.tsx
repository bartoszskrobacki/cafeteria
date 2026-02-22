import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SheetDemo } from "./navbarModal";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const t = useTranslations("navigation");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/menu", label: t("menu") },
    { href: "/konferencje", label: t("conferences") },
    { href: "/imprezy", label: t("events") },
    { href: "/o-nas", label: t("about") },
    { href: "/galeria", label: t("gallery") },
    { href: "/kontakt", label: t("contact") },
  ];

  return (
    <div className="fixed h-24 flex items-center bg-white text-primary-500 w-full justify-between px-4 z-20 text-primary">
      <Link href="/" className="relative w-64 h-16">
        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
      </Link>
      <nav className="overflow-x-auto hidden lg:block">
        <ul className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 lg:gap-16 h-full items-center text-sm justify-center font-bold text-[11px] tracking-[0.3em] underline-offset-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-coral-accent transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <SheetDemo />
      </div>
    </div>
  );
};
