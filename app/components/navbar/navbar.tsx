import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SheetDemo } from "./navbarModal";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const t = useTranslations("navigation");
  const common = useTranslations("common");

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
    <div className="text-primary-500 text-primary fixed z-20 flex h-24 w-full items-center justify-between gap-4 bg-white px-4">
      <Link href="/" className="relative h-16 w-36 shrink-0 sm:w-48 xl:w-64">
        <Image src="/logo.webp" alt={common("logoAlt")} fill className="object-contain" priority />
      </Link>
      <nav className="hidden min-w-0 lg:block">
        <ul className="flex flex-nowrap items-center justify-center gap-4 text-[10px] font-bold tracking-[0.2em] whitespace-nowrap underline-offset-3 xl:gap-8 xl:text-[11px] xl:tracking-[0.3em] 2xl:gap-12">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-coral-accent transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <LanguageSwitcher />
        <SheetDemo />
      </div>
    </div>
  );
};
