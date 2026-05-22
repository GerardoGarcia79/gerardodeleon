import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "inglés",
  es: "español",
};

const LanguageToggle = () => {
  const locale = useLocale() as (typeof routing.locales)[number];
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale =
    routing.locales.find((supported) => supported !== locale) ??
    routing.defaultLocale;

  const handleClick = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface/60 px-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Cambiar idioma a ${localeLabels[nextLocale]}`}
      onClick={handleClick}
    >
      {locale.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
