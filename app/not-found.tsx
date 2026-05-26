import Link from "next/link";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-bold text-foreground">404</h1>
      <p className="max-w-sm text-muted-foreground">
        {t("NotFound.description")}
      </p>
      <Link
        href={`/${routing.defaultLocale}`}
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {t("NotFound.home")}
      </Link>
    </main>
  );
}
