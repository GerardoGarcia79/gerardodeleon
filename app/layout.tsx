import { ThemeProvider } from "@teispace/next-themes";
import { getTheme } from "@teispace/next-themes/server";
import localFont from "next/font/local";
import { themeConfig } from "@/lib/theme";
import "./globals.css";

const apfelGrotezk = localFont({
  src: [
    {
      path: "../public/fonts/apfel-grotezk-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apfel-grotezk-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apfel",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme =
    (await getTheme({ themes: [...themeConfig.themes] })) ??
    themeConfig.defaultTheme;

  return (
    <html
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={apfelGrotezk.variable}
    >
      <body className="font-apfel antialiased bg-background text-foreground">
        <ThemeProvider
          attribute={themeConfig.attribute}
          defaultTheme={themeConfig.defaultTheme}
          themes={[...themeConfig.themes]}
          enableSystem={themeConfig.enableSystem}
          storageKey={themeConfig.storageKey}
          initialTheme={initialTheme}
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
