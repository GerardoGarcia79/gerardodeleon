import { ThemeProvider } from "@teispace/next-themes";
import { getTheme } from "@teispace/next-themes/server";
import { Geist, Geist_Mono } from "next/font/google";
import { themeConfig } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
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
