import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ThemeGuard } from "@/components/layout/ThemeGuard";
import { routing } from "../../i18n/routing";

export const metadata: Metadata = {
  title: "Gerardo de León - Portafolio",
  description:
    "Portafolio Gerardo de León garcía, Desarrollador Frontend en México",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeGuard>{children}</ThemeGuard>
    </NextIntlClientProvider>
  );
}
